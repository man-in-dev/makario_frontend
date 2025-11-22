import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'sales' | 'customers' | 'products' | 'marketing'>('sales');

  const tabs = [
    { id: 'sales', label: 'Sales', icon: '📊' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
  ];

  const salesData = [
    { day: 'Mon', value: 45000 },
    { day: 'Tue', value: 62000 },
    { day: 'Wed', value: 55000 },
    { day: 'Thu', value: 78000 },
    { day: 'Fri', value: 88000 },
    { day: 'Sat', value: 95000 },
    { day: 'Sun', value: 70000 },
  ];

  const maxValue = Math.max(...salesData.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 text-sm mt-1">Comprehensive business insights and performance metrics.</p>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          Export Report
        </button>
      </div>

      {/* Time Period Selector */}
      <div className="flex gap-2 flex-wrap">
        {['Today', 'Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'].map(
          (period) => (
            <button
              key={period}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              {period}
            </button>
          )
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sales Analytics */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: '₹2,45,690', change: '+12.5%' },
              { label: 'Total Orders', value: '1,248', change: '+8.2%' },
              { label: 'Avg Order Value', value: '₹1,967', change: '-2.3%' },
              { label: 'Revenue Growth', value: '+15.3%', change: 'vs last month' },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-sm text-gray-600 font-medium">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                <p className="text-xs text-green-600 mt-2">{card.change}</p>
              </div>
            ))}
          </div>

          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-6">Daily Sales Trend</h3>
            <div className="flex items-end justify-between gap-2 h-64">
              {salesData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#d4af37] to-[#f4d03f] transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${(item.value / maxValue) * 200}px`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center text-xs text-gray-600">
              <div>₹0</div>
              <div>₹50k</div>
              <div>₹100k+</div>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Sales by Category</h3>
            <div className="space-y-4">
              {[
                { name: 'Premium Products', value: 45, amount: '₹1,10,450' },
                { name: 'Organic Products', value: 28, amount: '₹68,670' },
                { name: 'Flavored Products', value: 22, amount: '₹53,850' },
                { name: 'Gifting Sets', value: 5, amount: '₹12,720' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customers Analytics */}
      {activeTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Customers', value: '892' },
              { label: 'New Customers', value: '125' },
              { label: 'Returning Rate', value: '42.5%' },
              { label: 'Avg Lifetime Value', value: '₹12,450' },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-xs text-gray-600 font-medium">{card.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Customer Segments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Customer Segments</h3>
            <div className="space-y-3">
              {[
                { name: 'B2C Customers', count: 650, color: 'bg-blue-500' },
                { name: 'B2B Partners', count: 142, color: 'bg-purple-500' },
                { name: 'Distributors', count: 100, color: 'bg-green-500' },
              ].map((segment, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                  <span className="text-sm text-gray-600 flex-1">{segment.name}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {segment.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {(activeTab === 'products' || activeTab === 'marketing') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Analytics data coming soon</p>
        </div>
      )}
    </div>
  );
}
