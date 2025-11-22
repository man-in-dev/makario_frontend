import React from 'react';
import { ShoppingCart, UserPlus, AlertTriangle, CreditCard, Check } from 'lucide-react';

export default function NotificationFeed() {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order',
      message: 'Order #12485 from Priya Sharma',
      time: '2 min ago',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      id: 2,
      type: 'user',
      title: 'New Signup',
      message: 'Amit Kumar registered as B2B distributor',
      time: '15 min ago',
      icon: UserPlus,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      id: 3,
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'Classic Makhana (500g) stock below threshold',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Failed',
      message: 'Order #12480 payment declined',
      time: '2 hours ago',
      icon: CreditCard,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Delivered',
      message: 'Order #12425 delivered to customer',
      time: '3 hours ago',
      icon: Check,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="space-y-3">
      {notifications.map((notif) => {
        const Icon = notif.icon;
        return (
          <div
            key={notif.id}
            className={`${notif.bg} p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${notif.bg}`}>
                <Icon size={16} className={notif.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                <p className="text-xs text-gray-600 mt-1 truncate">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
