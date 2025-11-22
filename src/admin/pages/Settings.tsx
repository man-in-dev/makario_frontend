import React, { useState } from 'react';
import { Save, Upload, Eye, EyeOff } from 'lucide-react';

interface SettingsData {
  // Store Info
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  storeCity: string;
  storeState: string;
  storeZip: string;
  storeCountry: string;
  // Branding
  logoUrl: string;
  faviconUrl: string;
  storeCurrency: string;
  // Payment
  paymentMethods: {
    creditCard: boolean;
    upi: boolean;
    cod: boolean;
    bankTransfer: boolean;
  };
  // Shipping
  freeShippingThreshold: string;
  defaultShippingCost: string;
  // Email Settings
  smtpHost: string;
  smtpPort: string;
  smtpEmail: string;
  smtpPassword: string;
  // Notifications
  orderNotification: boolean;
  customerNotification: boolean;
  adminNotification: boolean;
  // SEO
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  // General
  businessHours: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
}

export default function Settings() {
  const [formData, setFormData] = useState<SettingsData>({
    storeName: 'Makario',
    storeEmail: 'info@makario.in',
    storePhone: '+91 9953240031',
    storeAddress: 'Makhana Export Hub',
    storeCity: 'Darbhanga',
    storeState: 'Bihar',
    storeZip: '846004',
    storeCountry: 'India',
    logoUrl: '',
    faviconUrl: '',
    storeCurrency: 'INR',
    paymentMethods: {
      creditCard: true,
      upi: true,
      cod: true,
      bankTransfer: false,
    },
    freeShippingThreshold: '1000',
    defaultShippingCost: '50',
    smtpHost: '',
    smtpPort: '587',
    smtpEmail: '',
    smtpPassword: '',
    orderNotification: true,
    customerNotification: true,
    adminNotification: true,
    siteName: 'Makario - Premium Bihar Makhana',
    siteDescription: 'Leading makhana exporter from Bihar, India',
    siteKeywords: 'makhana, foxnuts, organic, bihar',
    businessHours: '10:00 AM - 6:00 PM IST',
    timezone: 'Asia/Kolkata',
    theme: 'light',
  });

  const [activeTab, setActiveTab] = useState<
    'store' | 'payment' | 'shipping' | 'email' | 'seo' | 'general'
  >('store');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Settings Saved:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          logoUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 text-sm mt-1">Manage store configuration and preferences</p>
        </div>
        {saved && (
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            ✓ Settings saved successfully!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-lg">
        {[
          { id: 'store', label: 'Store Info', icon: '🏪' },
          { id: 'payment', label: 'Payment', icon: '💳' },
          { id: 'shipping', label: 'Shipping', icon: '🚚' },
          { id: 'email', label: 'Email', icon: '📧' },
          { id: 'seo', label: 'SEO', icon: '🔍' },
          { id: 'general', label: 'General', icon: '⚙️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-8">
        {/* Store Info Tab */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Store Name</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Store Email</label>
                <input
                  type="email"
                  value={formData.storeEmail}
                  onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.storePhone}
                  onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Currency</label>
                <select
                  value={formData.storeCurrency}
                  onChange={(e) => setFormData({ ...formData, storeCurrency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
              <input
                type="text"
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                <input
                  type="text"
                  value={formData.storeCity}
                  onChange={(e) => setFormData({ ...formData, storeCity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">State</label>
                <input
                  type="text"
                  value={formData.storeState}
                  onChange={(e) => setFormData({ ...formData, storeState: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Zip Code</label>
                <input
                  type="text"
                  value={formData.storeZip}
                  onChange={(e) => setFormData({ ...formData, storeZip: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                <input
                  type="text"
                  value={formData.storeCountry}
                  onChange={(e) => setFormData({ ...formData, storeCountry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-4">Store Logo</label>
              {formData.logoUrl ? (
                <div className="flex gap-4">
                  <img src={formData.logoUrl} alt="Logo" className="h-20 object-contain" />
                  <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span className="text-sm font-medium">Change Logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#d4af37]">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Upload Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {Object.entries(formData.paymentMethods).map(([method, enabled]) => (
                  <div key={method} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={method}
                      checked={enabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMethods: {
                            ...formData.paymentMethods,
                            [method]: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <label htmlFor={method} className="font-medium text-gray-900 capitalize">
                      {method.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Default Shipping Cost (₹)</label>
                <input
                  type="number"
                  value={formData.defaultShippingCost}
                  onChange={(e) => setFormData({ ...formData, defaultShippingCost: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                SMTP settings for sending transactional emails. Contact your email provider for these details.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SMTP Host</label>
                <input
                  type="text"
                  value={formData.smtpHost}
                  onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                  placeholder="smtp.gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SMTP Port</label>
                <input
                  type="text"
                  value={formData.smtpPort}
                  onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SMTP Email</label>
                <input
                  type="email"
                  value={formData.smtpEmail}
                  onChange={(e) => setFormData({ ...formData, smtpEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SMTP Password</label>
                <input
                  type="password"
                  value={formData.smtpPassword}
                  onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="orderNotif"
                    checked={formData.orderNotification}
                    onChange={(e) => setFormData({ ...formData, orderNotification: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="orderNotif" className="font-medium text-gray-900">
                    Send order notification emails
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="custNotif"
                    checked={formData.customerNotification}
                    onChange={(e) => setFormData({ ...formData, customerNotification: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="custNotif" className="font-medium text-gray-900">
                    Send customer notification emails
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="adminNotif"
                    checked={formData.adminNotification}
                    onChange={(e) => setFormData({ ...formData, adminNotification: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="adminNotif" className="font-medium text-gray-900">
                    Send admin notification emails
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Site Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Site Description</label>
              <textarea
                value={formData.siteDescription}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Site Keywords</label>
              <input
                type="text"
                value={formData.siteKeywords}
                onChange={(e) => setFormData({ ...formData, siteKeywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>
          </div>
        )}

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Business Hours</label>
                <input
                  type="text"
                  value={formData.businessHours}
                  onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                  placeholder="10:00 AM - 6:00 PM"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System Preference)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center gap-2"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
