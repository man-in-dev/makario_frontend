import React from 'react';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function Support() {
  const logs = [
    {
      id: 1,
      type: 'error',
      title: 'Payment Gateway Timeout',
      message: 'Razorpay API timeout while processing order #12485',
      timestamp: 'Nov 22, 2024 - 2:15 PM',
      status: 'resolved',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Classic Makhana (500g) stock below minimum threshold',
      timestamp: 'Nov 22, 2024 - 1:45 PM',
      status: 'pending',
    },
    {
      id: 3,
      type: 'info',
      title: 'Integration Status',
      message: 'Shiprocket sync completed successfully',
      timestamp: 'Nov 22, 2024 - 1:00 PM',
      status: 'resolved',
    },
    {
      id: 4,
      type: 'error',
      title: 'Email Delivery Failed',
      message: 'Failed to send order confirmation email to customer',
      timestamp: 'Nov 21, 2024 - 11:30 PM',
      status: 'resolved',
    },
    {
      id: 5,
      type: 'warning',
      title: 'High Cart Abandonment',
      message: 'Abandonment rate increased by 15% in the last 7 days',
      timestamp: 'Nov 21, 2024 - 9:00 PM',
      status: 'pending',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="text-red-600" size={20} />;
      case 'warning':
        return <AlertCircle className="text-orange-600" size={20} />;
      case 'info':
        return <CheckCircle className="text-blue-600" size={20} />;
      default:
        return null;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-orange-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'resolved'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support & Logs</h1>
        <p className="text-gray-600 text-sm mt-1">System alerts, errors, and integration logs.</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Critical Errors', count: '2', color: 'from-red-500 to-red-600' },
          { label: 'Warnings', count: '3', color: 'from-orange-500 to-orange-600' },
          { label: 'Info Logs', count: '12', color: 'from-blue-500 to-blue-600' },
          { label: 'Resolved', count: '156', color: 'from-green-500 to-green-600' },
        ].map((card, index) => (
          <div key={index} className={`bg-gradient-to-r ${card.color} text-white rounded-lg p-4`}>
            <p className="text-sm font-medium opacity-90">{card.label}</p>
            <p className="text-2xl font-bold mt-2">{card.count}</p>
          </div>
        ))}
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`rounded-lg border border-gray-200 p-4 ${getTypeBg(log.type)} hover:shadow-sm transition-shadow cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">{getTypeIcon(log.type)}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {log.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Clock size={12} />
                      {log.timestamp}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="text-center">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
          View All Logs
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-800 mb-4">
          Contact our support team for assistance with integration setup, API issues, or other concerns.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Contact Support
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
