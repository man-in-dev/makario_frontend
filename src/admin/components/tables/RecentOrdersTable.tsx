import React from 'react';
import { Check, Clock, Truck, AlertCircle, RefreshCw } from 'lucide-react';

export default function RecentOrdersTable() {
  const orders = [
    {
      id: '#12485',
      date: 'Nov 22, 2024',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      status: 'delivered',
      paymentStatus: 'paid',
      amount: '₹4,850',
      channel: 'Website',
    },
    {
      id: '#12484',
      date: 'Nov 21, 2024',
      customer: 'Amit Kumar',
      email: 'amit@example.com',
      status: 'shipped',
      paymentStatus: 'paid',
      amount: '₹8,500',
      channel: 'B2B',
    },
    {
      id: '#12483',
      date: 'Nov 21, 2024',
      customer: 'Neha Singh',
      email: 'neha@example.com',
      status: 'processing',
      paymentStatus: 'paid',
      amount: '₹2,350',
      channel: 'Website',
    },
    {
      id: '#12482',
      date: 'Nov 20, 2024',
      customer: 'Raj Patel',
      email: 'raj@example.com',
      status: 'pending',
      paymentStatus: 'cod',
      amount: '₹3,200',
      channel: 'WhatsApp',
    },
    {
      id: '#12481',
      date: 'Nov 20, 2024',
      customer: 'Sarah Khan',
      email: 'sarah@example.com',
      status: 'cancelled',
      paymentStatus: 'failed',
      amount: '₹1,500',
      channel: 'Website',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check size={16} className="text-green-600" />;
      case 'shipped':
        return <Truck size={16} className="text-blue-600" />;
      case 'processing':
        return <Clock size={16} className="text-orange-600" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'cancelled':
        return <RefreshCw size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'cod':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Channel
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900">
                  {order.id}
                </span>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold capitalize ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentColor(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {order.amount}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{order.channel}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
