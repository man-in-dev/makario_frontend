import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, TrendingUp, X } from 'lucide-react';

interface Discount {
  id: number;
  code: string;
  type: 'Percentage' | 'Fixed' | 'Free Shipping';
  value: string;
  usage: number;
  limit: number | string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  performance: 'top' | 'normal';
}

export default function Discounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      code: 'MAKARIO20',
      type: 'Percentage',
      value: '20%',
      usage: 145,
      limit: 500,
      status: 'active',
      startDate: 'Nov 1, 2024',
      endDate: 'Nov 30, 2024',
      performance: 'top',
    },
    {
      id: 2,
      code: 'SAVE500',
      type: 'Fixed',
      value: '₹500',
      usage: 78,
      limit: 200,
      status: 'active',
      startDate: 'Nov 15, 2024',
      endDate: 'Dec 15, 2024',
      performance: 'normal',
    },
    {
      id: 3,
      code: 'FIRSTORDER',
      type: 'Percentage',
      value: '15%',
      usage: 234,
      limit: 'Unlimited',
      status: 'active',
      startDate: 'Oct 1, 2024',
      endDate: 'Dec 31, 2024',
      performance: 'top',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Discount>({
    id: 0,
    code: '',
    type: 'Percentage',
    value: '',
    usage: 0,
    limit: 'Unlimited',
    status: 'active',
    startDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    endDate: '',
    performance: 'normal',
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Percentage':
        return 'bg-blue-100 text-blue-700';
      case 'Fixed':
        return 'bg-purple-100 text-purple-700';
      case 'Free Shipping':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      id: Math.max(...discounts.map((d) => d.id), 0) + 1,
      code: '',
      type: 'Percentage',
      value: '',
      usage: 0,
      limit: 'Unlimited',
      status: 'active',
      startDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      endDate: '',
      performance: 'normal',
    });
    setShowModal(true);
  };

  const openEditModal = (discount: Discount) => {
    setEditingId(discount.id);
    setFormData(discount);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.code || !formData.value || !formData.endDate) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setDiscounts(discounts.map((d) => (d.id === editingId ? formData : d)));
    } else {
      setDiscounts([formData, ...discounts]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(discounts.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discounts & Coupons</h1>
          <p className="text-gray-600 text-sm mt-1">Create and manage discount codes.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus size={18} />
          Create Discount
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.length > 0 ? (
                filteredDiscounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                          {discount.code}
                        </span>
                        {discount.performance === 'top' && (
                          <span title="Top Performer" className="text-xs font-bold text-[#d4af37]">
                            <TrendingUp size={16} />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(discount.type)}`}>
                        {discount.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900">{discount.value}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {discount.usage}/{discount.limit}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <p className="text-xs">{discount.startDate}</p>
                        <p className="text-xs">{discount.endDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(discount.status)}`}>
                        {discount.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEditModal(discount)} className="text-[#d4af37] hover:text-[#f4d03f] text-sm">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(discount.id)} className="text-red-600 hover:text-red-700 text-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No discounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Discount' : 'Create Discount'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Discount Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm font-mono"
                  placeholder="E.g., MAKARIO20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed Amount</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Value *</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="E.g., 20% or ₹500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Usage Limit</label>
                <input
                  type="text"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: isNaN(parseInt(e.target.value)) ? 'Unlimited' : parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Start Date</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Nov 1, 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">End Date *</label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Nov 30, 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
