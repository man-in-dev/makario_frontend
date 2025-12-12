import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

interface AdminTopBarProps {
  onMenuToggle: () => void;
}

export default function AdminTopBar({ onMenuToggle }: AdminTopBarProps) {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const notifications = [
    { id: 1, type: 'order', message: 'New order #12345 received', time: '2 min ago' },
    { id: 2, type: 'user', message: 'New customer signup', time: '15 min ago' },
    { id: 3, type: 'stock', message: 'Low stock alert: Classic Makhana', time: '1 hour ago' },
    { id: 4, type: 'payment', message: 'Payment failed for order #12340', time: '2 hours ago' },
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
      {/* Left Section - Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 max-w-md flex-1">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="bg-transparent ml-3 outline-none text-sm flex-1 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Search size={20} className="text-gray-600" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={20} className="text-gray-600" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Dropdown */}
          {notificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-gray-700 font-medium">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
                <a href="#" className="text-xs text-[#d4af37] hover:text-[#f4d03f] font-medium">
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative ml-2">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a4d3e] to-[#0f3d2f] flex items-center justify-center text-white text-sm font-bold">
              {admin?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
            </div>
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <p className="font-semibold text-gray-800">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
                  <User size={16} />
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
                  <Settings size={16} />
                  Preferences
                </button>
              </div>
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent ml-3 outline-none text-sm flex-1 text-gray-700"
            />
          </div>
        </div>
      )}
    </div>
  );
}
