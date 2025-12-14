import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Trash2, Edit, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'sonner';

interface BackendUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  addresses?: Array<{
    id: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    label: string;
    isDefault: boolean;
  }>;
  orders: number;
  totalSpend: number;
  lastOrder: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'B2C' | 'B2B' | 'Distributor';
  orders: number;
  totalSpend: string;
  lastOrder: string;
  status: 'active' | 'inactive' | 'blocked';
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    type: '',
    status: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Transform backend user to frontend customer format
  const transformUser = (backendUser: BackendUser): Customer => {
    // Determine customer type based on order count and total spend
    let type: 'B2C' | 'B2B' | 'Distributor' = 'B2C';
    if (backendUser.orders > 20 || backendUser.totalSpend > 100000) {
      type = 'B2B';
    } else if (backendUser.orders > 50 || backendUser.totalSpend > 500000) {
      type = 'Distributor';
    }

    // Format last order date
    let lastOrder = 'Never';
    if (backendUser.lastOrder) {
      const date = new Date(backendUser.lastOrder);
      lastOrder = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Format total spend
    const totalSpend = `₹${backendUser.totalSpend.toLocaleString('en-IN')}`;

    return {
      id: backendUser.id,
      name: backendUser.name,
      email: backendUser.email,
      phone: backendUser.phone || 'N/A',
      type,
      orders: backendUser.orders,
      totalSpend,
      lastOrder,
      status: 'active', // All registered users are active by default
    };
  };

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setIsRefreshing(true);
      const params: any = {};
      
      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await api.get('/auth/users', { params });
      
      if (response.data.success) {
        const backendUsers: BackendUser[] = response.data.data.users || [];
        const transformedCustomers = backendUsers.map(transformUser);
        setCustomers(transformedCustomers);
      } else {
        toast.error('Failed to load customers');
        setCustomers([]);
      }
    } catch (error: any) {
      console.error('Error fetching customers:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load customers';
      toast.error(errorMessage);
      setCustomers([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

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

  // Client-side filtering (backend handles search)
  const filteredCustomers = customers.filter((customer) => {
    const matchesType = !filters.type || customer.type === filters.type;
    const matchesStatus = !filters.status || customer.status === filters.status;

    return matchesType && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return;
    }

    try {
      // Note: We don't have a delete user endpoint yet, so this is a placeholder
      // You may want to implement user deletion in the backend
      toast.error('User deletion is not yet implemented');
      // const response = await api.delete(`/auth/users/${id}`);
      // if (response.data.success) {
      //   toast.success('Customer deleted successfully');
      //   fetchCustomers();
      // }
    } catch (error: any) {
      console.error('Delete customer error:', error);
      toast.error('Failed to delete customer');
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
          onClick={fetchCustomers}
          disabled={isRefreshing}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Loader2 size={18} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#d4af37]" size={32} />
        </div>
      )}

      {/* Customers Table */}
      {!isLoading && (
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
                        <div>
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
                          <a
                            href={`mailto:${customer.email}`}
                            title="Send Email"
                            className="text-gray-600 hover:text-[#d4af37] transition-colors"
                          >
                            <Mail size={16} />
                          </a>
                          <button
                            title="Delete"
                            onClick={() => handleDelete(customer.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
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
          </div>
        </div>
      )}
    </div>
  );
}
