import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface UserDropdownProps {
  user: any;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        className="h-11 px-4 rounded-xl hover:bg-golden/10 text-heritage hover:text-golden transition-all duration-300 font-semibold group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="hidden md:inline md:ml-2 text-sm font-bold">{user.name}</span>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-golden/20 z-50 overflow-hidden">
          {/* Profile Option */}
          <button
            onClick={() => handleNavigate("/profile")}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-golden/5 transition-colors border-b border-golden/10"
          >
            <User className="h-4 w-4" />
            <span className="text-sm font-medium text-heritage">Profile</span>
          </button>

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
