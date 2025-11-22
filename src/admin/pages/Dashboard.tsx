import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  AlertCircle,
  Eye,
} from 'lucide-react';
import KPICard from '../components/KPICard';
import SalesChart from '../components/charts/SalesChart';
import TopProductsTable from '../components/tables/TopProductsTable';
import RecentOrdersTable from '../components/tables/RecentOrdersTable';
import TrafficChart from '../components/charts/TrafficChart';
import NotificationFeed from '../components/NotificationFeed';

export default function Dashboard() {
  const kpiData = [
    {
      title: 'Total Sales',
      value: '₹2,45,690',
      change: '+12.5%',
      isPositive: true,
      period: 'Last 30 Days',
      icon: TrendingUp,
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      isPositive: true,
      period: 'Last 30 Days',
      icon: ShoppingCart,
    },
    {
      title: 'Avg Order Value',
      value: '₹1,967',
      change: '-2.3%',
      isPositive: false,
      period: 'Last 30 Days',
      icon: TrendingDown,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      isPositive: true,
      period: 'Last 30 Days',
      icon: Eye,
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '+15.3%',
      isPositive: true,
      period: 'Last 30 Days',
      icon: Users,
    },
    {
      title: 'Abandoned Carts',
      value: '156',
      change: '+5.2%',
      isPositive: false,
      period: 'Last 30 Days',
      icon: AlertCircle,
    },
  ];

  const quickActions = [
    {
      label: 'Add Product',
      href: '/admin/products/new',
      icon: '📦',
    },
    {
      label: 'Create Discount',
      href: '/admin/discounts/new',
      icon: '🎟️',
    },
    {
      label: 'View Abandoned Checkouts',
      href: '/admin/abandoned-checkouts',
      icon: '🛒',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((item, index) => (
          <KPICard key={index} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow inline-flex items-center gap-2"
          >
            <span className="text-lg">{action.icon}</span>
            {action.label}
          </a>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h2>
          <SalesChart />
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <TrafficChart />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <a href="/admin/products" className="text-[#d4af37] hover:text-[#f4d03f] text-sm font-medium">
              View all
            </a>
          </div>
          <TopProductsTable />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-[#d4af37] hover:text-[#f4d03f] text-sm font-medium">
              View all
            </a>
          </div>
          <RecentOrdersTable />
        </div>
      </div>

      {/* Notifications Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Feed */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Notifications</h2>
          <NotificationFeed />
        </div>
      </div>
    </div>
  );
}
