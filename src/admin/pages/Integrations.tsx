import React, { useState } from 'react';
import { Settings, CheckCircle, Circle, ExternalLink, X } from 'lucide-react';

export default function Integrations() {
  const [configureModal, setConfigureModal] = useState<{
    isOpen: boolean;
    integration: string;
    category: string;
  }>({
    isOpen: false,
    integration: '',
    category: '',
  });

  const [credentials, setCredentials] = useState({
    apiKey: '',
    secretKey: '',
    merchantId: '',
    accountId: '',
  });

  const [integrations] = useState([
    {
      id: 1,
      category: 'Payment Gateways',
      items: [
        {
          name: 'Razorpay',
          logo: '💳',
          status: 'connected',
          lastSync: '2 min ago',
          description: 'Accept payments via UPI, cards, and netbanking',
        },
        {
          name: 'PhonePe',
          logo: '📱',
          status: 'connected',
          lastSync: '15 min ago',
          description: 'Mobile payment gateway integration',
        },
        {
          name: 'Cashfree',
          logo: '💰',
          status: 'not_connected',
          lastSync: null,
          description: 'Payment processing platform',
        },
        {
          name: 'PayU',
          logo: '🏦',
          status: 'not_connected',
          lastSync: null,
          description: 'Digital payment solutions',
        },
      ],
    },
    {
      id: 2,
      category: 'Shipping & Logistics',
      items: [
        {
          name: 'Shiprocket',
          logo: '📦',
          status: 'connected',
          lastSync: '5 min ago',
          description: 'Multi-carrier shipping platform',
        },
        {
          name: 'Shipway',
          logo: '🚚',
          status: 'not_connected',
          lastSync: null,
          description: 'Logistics management solution',
        },
        {
          name: 'iThink Logistics',
          logo: '📍',
          status: 'not_connected',
          lastSync: null,
          description: 'Full-service logistics provider',
        },
      ],
    },
    {
      id: 3,
      category: 'Communication',
      items: [
        {
          name: 'SendGrid Email',
          logo: '📧',
          status: 'connected',
          lastSync: '1 min ago',
          description: 'Email delivery service',
        },
        {
          name: 'Twilio SMS',
          logo: '💬',
          status: 'connected',
          lastSync: '3 min ago',
          description: 'SMS and messaging platform',
        },
        {
          name: 'WhatsApp API',
          logo: '💭',
          status: 'not_connected',
          lastSync: null,
          description: 'Business messaging via WhatsApp',
        },
      ],
    },
  ]);

  const handleConfigure = (integration: string, category: string) => {
    setConfigureModal({
      isOpen: true,
      integration,
      category,
    });
    setCredentials({
      apiKey: '',
      secretKey: '',
      merchantId: '',
      accountId: '',
    });
  };

  const handleSaveConfiguration = () => {
    console.log('Saving configuration for:', configureModal.integration, credentials);
    alert(`${configureModal.integration} configured successfully!`);
    setConfigureModal({ isOpen: false, integration: '', category: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 text-sm mt-1">Connect and manage external services.</p>
      </div>

      {/* Integration Categories */}
      {integrations.map((category) => (
        <div key={category.id} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((integration, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-4xl">{integration.logo}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {integration.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === 'connected' ? (
                      <CheckCircle
                        size={24}
                        className="text-green-600"
                      />
                    ) : (
                      <Circle size={24} className="text-gray-300" />
                    )}
                  </div>
                </div>

                {/* Status */}
                {integration.status === 'connected' && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Connected • Last synced: {integration.lastSync}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleConfigure(integration.name, category.category)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    Configure
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Connection Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-700">
          Check our{' '}
          <a href="#" className="underline font-medium hover:text-blue-600">
            integration documentation
          </a>{' '}
          for step-by-step setup guides.
        </p>
      </div>

      {/* Configuration Modal */}
      {configureModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Configure {configureModal.integration}
              </h2>
              <button
                onClick={() => setConfigureModal({ isOpen: false, integration: '', category: '' })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={credentials.apiKey}
                  onChange={(e) => setCredentials({ ...credentials, apiKey: e.target.value })}
                  placeholder="Enter API Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={credentials.secretKey}
                  onChange={(e) => setCredentials({ ...credentials, secretKey: e.target.value })}
                  placeholder="Enter Secret Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Merchant ID
                </label>
                <input
                  type="text"
                  value={credentials.merchantId}
                  onChange={(e) => setCredentials({ ...credentials, merchantId: e.target.value })}
                  placeholder="Enter Merchant ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Account ID
                </label>
                <input
                  type="text"
                  value={credentials.accountId}
                  onChange={(e) => setCredentials({ ...credentials, accountId: e.target.value })}
                  placeholder="Enter Account ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  💡 Keep your credentials secure. Never share your keys.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setConfigureModal({ isOpen: false, integration: '', category: '' })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfiguration}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
