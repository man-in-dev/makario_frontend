import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import "@/styles/mobile-menu.css";

const menuItems = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Shop", icon: ShoppingCart, to: "/shop" },
  { label: "Wishlist", icon: Heart, to: "/wishlist" },
  { label: "Profile", icon: User, to: "/profile" },
];

const MobileBottomMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [showLabels, setShowLabels] = React.useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Only show the menu on mobile devices
  if (!isMobile) return null;

  // Don't show the menu on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/profile');
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50 flex safe-bottom">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          
          if (item.to === '/profile') {
            const isProfileActive = location.pathname === '/profile';
            return (
              <button
                key={item.to}
                onClick={handleProfileClick}
                className={cn(
                  "menu-item relative flex-1 flex flex-col items-center justify-center py-3",
                  isProfileActive && "active"
                )}
              >
                <Icon className="icon w-6 h-6" />
                <span className="label text-xs font-medium mt-1">
                  {user ? 'Profile' : 'Login'}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "menu-item relative flex-1 flex flex-col items-center justify-center py-3",
                active && "active"
              )}
            >
              <Icon className="icon w-6 h-6" />
              <span className="label text-xs font-medium mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default MobileBottomMenu;
