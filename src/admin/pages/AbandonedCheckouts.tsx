import React from 'react';
import { Plus, Search, Filter, Mail, MessageSquare, Tag } from 'lucide-react';

export default function AbandonedCheckouts() {
  const carts = [
    {
      id: 'CART-001',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      date: 'Nov 22, 2024',
      value: '₹3,450',
      items: 3,
      status: 'not_contacted',
      recovery: '0%',
    },
    {
      id: 'CART-002',
      customer: 'Guest User',
      email: 'guest@example.com',
      date: 'Nov 21, 2024',
      value: '₹8,900',
      items: 5,
      status: 'email_sent',
      recovery: '0%',
    },
    {
      id: 'CART-003',
      customer: 'Amit Kumar',
      email: 'amit@example.com',
      date: 'Nov 20, 2024',
      value: '₹12,500',
      items: 8,
      status: 'recovered',
      recovery: '100%',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_contacted':
        return 'bg-gray-100 text-gray-700';
      case 'email_sent':
        return 'bg-blue-100 text-blue-700';
      case 'recovered':
        return 'bg-green-100 text-green-700';
      case 'lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Abandoned Checkouts</h1>
          <p className="text-gray-600 text-sm mt-1">Recover lost sales and engaged customers.</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Abandoned', value: '156', color: 'from-orange-500 to-orange-600' },
          { label: 'Recovery Rate', value: '32.5%', color: 'from-green-500 to-green-600' },
          { label: 'Recovered Value', value: '₹85,600', color: 'from-green-500 to-green-600' },
          { label: 'Potential Value', value: '₹2,45,600', color: 'from-blue-500 to-blue-600' },
        ].map((stat, index) => (
          <div key={index} className={`bg-gradient-to-r ${stat.color} text-white rounded-lg p-4`}>
            <p className="text-sm font-medium opacity-90">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by cart ID, customer, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cart ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cart Value
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr
                  key={cart.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {cart.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {cart.customer}
                      </p>
                      <p className="text-xs text-gray-500">{cart.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{cart.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {cart.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-600">{cart.items}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        cart.status
                      )}`}
                    >
                      {cart.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        title="Send Email"
                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                      >
                        <Mail size={16} />
                      </button>
                      <button
                        title="Apply Coupon"
                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                      >
                        <Tag size={16} />
                      </button>
                      <button className="text-[#d4af37] hover:text-[#f4d03f] text-sm font-medium">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
