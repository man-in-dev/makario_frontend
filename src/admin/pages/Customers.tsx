import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, MessageSquare, Trash2, Edit, X } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'B2C' | 'B2B' | 'Distributor';
  orders: number;
  totalSpend: string;
  lastOrder: string;
  status: 'active' | 'inactive' | 'blocked';
  tags: string[];
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      type: 'B2C',
      orders: 12,
      totalSpend: '₹24,500',
      lastOrder: 'Nov 22, 2024',
      status: 'active',
      tags: ['VIP', 'Frequent buyer'],
    },
    {
      id: 2,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+91 96123 45678',
      type: 'B2B',
      orders: 45,
      totalSpend: '₹2,45,000',
      lastOrder: 'Nov 21, 2024',
      status: 'active',
      tags: ['Bulk buyer', 'High value'],
    },
    {
      id: 3,
      name: 'Neha Singh',
      email: 'neha@example.com',
      phone: '+91 97654 32109',
      type: 'B2C',
      orders: 3,
      totalSpend: '₹5,200',
      lastOrder: 'Nov 15, 2024',
      status: 'active',
      tags: ['New customer'],
    },
  ]);

  const [filters, setFilters] = useState({
    type: '',
    status: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Customer>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'B2C',
    orders: 0,
    totalSpend: '₹0',
    lastOrder: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: 'active',
    tags: [],
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'B2C':
        return 'bg-blue-100 text-blue-700';
      case 'B2B':
        return 'bg-purple-100 text-purple-700';
      case 'Distributor':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesType = !filters.type || customer.type === filters.type;
    const matchesStatus = !filters.status || customer.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      id: Math.max(...customers.map((c) => c.id), 0) + 1,
      name: '',
      email: '',
      phone: '',
      type: 'B2C',
      orders: 0,
      totalSpend: '₹0',
      lastOrder: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'active',
      tags: [],
    });
    setShowModal(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingId(customer.id);
    setFormData(customer);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setCustomers(customers.map((c) => (c.id === editingId ? formData : c)));
    } else {
      setCustomers([formData, ...customers]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 text-sm mt-1">Manage customer accounts and relationships.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
          >
            <option value="">All Types</option>
            <option value="B2C">B2C</option>
            <option value="B2B">B2B</option>
            <option value="Distributor">Distributor</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Spend</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="cursor-pointer hover:text-[#d4af37]">
                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{customer.email}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(customer.type)}`}>
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">{customer.orders}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">{customer.totalSpend}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{customer.lastOrder}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                          customer.status === 'active' ? 'bg-green-100 text-green-700' : customer.status === 'inactive' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button title="Send Email" className="text-gray-600 hover:text-[#d4af37] transition-colors">
                          <Mail size={16} />
                        </button>
                        <button title="Edit" onClick={() => openEditModal(customer)} className="text-gray-600 hover:text-[#d4af37] transition-colors">
                          <Edit size={16} />
                        </button>
                        <button title="Delete" onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-700 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing {filteredCustomers.length} of {customers.length} customers</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Customer' : 'Add Customer'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="B2C">B2C</option>
                  <option value="B2B">B2B</option>
                  <option value="Distributor">Distributor</option>
                </select>
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
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Total Spend</label>
                <input
                  type="text"
                  value={formData.totalSpend}
                  onChange={(e) => setFormData({ ...formData, totalSpend: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="₹0"
                />
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
