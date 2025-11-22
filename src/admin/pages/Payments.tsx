import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

export default function Payments() {
  const transactions = [
    {
      id: 'TXN-001',
      orderId: '#12485',
      method: 'Razorpay',
      status: 'success',
      amount: '₹4,850',
      fees: '₹145',
      net: '₹4,705',
      date: 'Nov 22, 2024',
    },
    {
      id: 'TXN-002',
      orderId: '#12484',
      method: 'PhonePe',
      status: 'success',
      amount: '₹8,500',
      fees: '₹255',
      net: '₹8,245',
      date: 'Nov 21, 2024',
    },
    {
      id: 'TXN-003',
      orderId: '#12483',
      method: 'COD',
      status: 'pending',
      amount: '₹2,350',
      fees: '₹0',
      net: '₹2,350',
      date: 'Nov 21, 2024',
    },
    {
      id: 'TXN-004',
      orderId: '#12482',
      method: 'Cashfree',
      status: 'success',
      amount: '₹3,200',
      fees: '₹96',
      net: '₹3,104',
      date: 'Nov 20, 2024',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments & Payouts</h1>
        <p className="text-gray-600 text-sm mt-1">Track transactions and manage payment gateways.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: '₹2,45,690', color: 'from-green-500 to-green-600' },
          { label: 'Pending Payouts', value: '₹45,600', color: 'from-orange-500 to-orange-600' },
          { label: 'Transaction Fees', value: '₹12,456', color: 'from-red-500 to-red-600' },
          { label: 'COD vs Prepaid', value: '65% / 35%', color: 'from-blue-500 to-blue-600' },
        ].map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} text-white rounded-lg p-4`}
          >
            <p className="text-sm font-medium opacity-90">{card.label}</p>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID, order ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={18} />
            Filters
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fees
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Net
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900 font-mono">
                      {txn.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{txn.orderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {txn.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        txn.status
                      )}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {txn.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-600">{txn.fees}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {txn.net}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{txn.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 4 of 2,456 transactions</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
