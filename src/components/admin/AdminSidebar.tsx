import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FileText,
  Truck,
  Heart,
  Tag,
  DollarSign,
  TrendingUp,
  Mail,
  Megaphone
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    submenu: [
      { title: 'All Products', href: '/admin/products' },
      { title: 'Add Product', href: '/admin/products/add' },
      { title: 'Categories', href: '/admin/products/categories' },
      { title: 'Inventory', href: '/admin/products/inventory' }
    ]
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    submenu: [
      { title: 'All Orders', href: '/admin/orders' },
      { title: 'Pending Orders', href: '/admin/orders?status=pending' },
      { title: 'Shipped Orders', href: '/admin/orders?status=shipped' },
      { title: 'Delivered Orders', href: '/admin/orders?status=delivered' }
    ]
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    submenu: [
      { title: 'Sales Report', href: '/admin/analytics/sales' },
      { title: 'Customer Analytics', href: '/admin/analytics/customers' },
      { title: 'Product Performance', href: '/admin/analytics/products' }
    ]
  },
  {
    title: 'Shipping',
    href: '/admin/shipping',
    icon: Truck,
    submenu: [
      { title: 'Manage Shipments', href: '/admin/shipping' },
      { title: 'Shiprocket Config', href: '/admin/shipping/config' }
    ]
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: DollarSign,
    submenu: [
      { title: 'Payment Gateways', href: '/admin/payments' },
      { title: 'Transactions', href: '/admin/payments/transactions' }
    ]
  },
  {
    title: 'Marketing',
    href: '/admin/marketing',
    icon: TrendingUp,
    submenu: [
      { title: 'Marketing Dashboard', href: '/admin/marketing' },
      { title: 'Campaigns', href: '/admin/marketing/campaigns' },
      { title: 'Promotions', href: '/admin/marketing/promotions' },
      { title: 'Email Campaigns', href: '/admin/marketing/email-campaigns' },
      { title: 'Coupons', href: '/admin/marketing/coupons' }
    ]
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    submenu: [
      { title: 'General', href: '/admin/settings/general' },
      { title: 'Shipping', href: '/admin/settings/shipping' },
      { title: 'Payment', href: '/admin/settings/payment' },
      { title: 'Taxes', href: '/admin/settings/taxes' }
    ]
  }
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50",
        "lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">Makario</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </NavLink>
              
              {/* Submenu */}
              {item.submenu && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.href}
                      className={({ isActive }) =>
                        cn(
                          "block px-3 py-1 rounded text-xs transition-colors",
                          isActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )
                      }
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs font-medium text-gray-800">Makario Admin v1.0</p>
            <p className="text-xs text-gray-500 mt-1">Bihar Makhana Pride</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;