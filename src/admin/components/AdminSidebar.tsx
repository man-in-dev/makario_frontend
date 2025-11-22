import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  ShoppingBag,
  Ticket,
  FileText,
  BookOpen,
  CreditCard,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: Package,
    },
    {
      label: 'Customers',
      href: '/admin/customers',
      icon: Users,
    },
    {
      label: 'Abandoned Checkouts',
      href: '/admin/abandoned-checkouts',
      icon: ShoppingBag,
    },
    {
      label: 'Discounts & Coupons',
      href: '/admin/discounts',
      icon: Ticket,
    },
    {
      label: 'Blog & Content',
      href: '/admin/content',
      icon: FileText,
    },
    {
      label: 'Blog Management',
      href: '/admin/blog',
      icon: BookOpen,
    },
    {
      label: 'Payments & Payouts',
      href: '/admin/payments',
      icon: CreditCard,
    },
    {
      label: 'Integrations',
      href: '/admin/integrations',
      icon: Zap,
    },
    {
      label: 'Analytics & Reports',
      href: '/admin/analytics',
      icon: BarChart3,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
    {
      label: 'Support / Logs',
      href: '/admin/support',
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-[#1a4d3e] to-[#0f3d2f] text-white transition-all duration-300 ease-in-out flex flex-col h-screen`}
    >
      {/* Logo Section */}
      <div
        className={`py-4 px-3 border-b border-white/10 transition-all duration-300 flex items-center ${
          !isOpen && 'justify-center'
        }`}
      >
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center text-xs font-bold text-gray-800">
              M
            </div>
            <span className="text-white text-sm font-bold">Makario</span>
          </div>
        ) : (
          <div className="w-7 h-7 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center text-xs font-bold text-gray-800">
            M
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group relative text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 shadow-lg'
                    : 'text-gray-200 hover:bg-white/10'
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="flex-1 text-sm">{item.label}</span>}
              {isOpen && (
                <ChevronRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}

              {/* Tooltip for collapsed sidebar */}
              {!isOpen && (
                <div className="absolute left-20 bg-gray-800 text-white px-3 py-2 rounded-lg whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`border-t border-white/10 py-2 px-2 ${
          !isOpen && 'flex justify-center'
        }`}
      >
        <div className="text-xs text-gray-400 text-center">
          {isOpen ? 'v1.0' : 'v'}
        </div>
      </div>
    </div>
  );
}
