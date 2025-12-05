import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, X, Edit2, Trash2, Loader2, Check, Clock, Truck, AlertCircle, RefreshCw } from 'lucide-react';
import OrderForm from './OrderForm';
import api from '../../utils/api';
import { toast } from 'sonner';

interface BackendOrder {
  id: string;
  orderId: string;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'online';
  paymentDetails?: {
    paymentStatus: 'pending' | 'completed' | 'failed';
  };
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'cod' | 'failed';
  amount: string;
  channel: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    dateRange: '',
    minAmount: '',
    maxAmount: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Transform backend order to admin order format
  const transformOrder = (backendOrder: BackendOrder): Order => {
    // Map status: 'confirmed' -> 'processing'
    let status: Order['status'] = backendOrder.status === 'confirmed' ? 'processing' : backendOrder.status as Order['status'];
    
    // Map payment status
    let paymentStatus: Order['paymentStatus'] = 'paid';
    if (backendOrder.paymentMethod === 'cod') {
      paymentStatus = 'cod';
    } else if (backendOrder.paymentDetails?.paymentStatus === 'failed') {
      paymentStatus = 'failed';
    } else if (backendOrder.paymentDetails?.paymentStatus === 'completed') {
      paymentStatus = 'paid';
    } else if (backendOrder.paymentDetails?.paymentStatus === 'pending') {
      paymentStatus = 'failed'; // Treat pending online payments as failed for admin view
    }

    // Format date
    const date = new Date(backendOrder.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Format amount
    const amount = `₹${backendOrder.total.toLocaleString('en-IN')}`;

    return {
      id: backendOrder.orderId,
      date,
      customer: backendOrder.shippingInfo.fullName,
      email: backendOrder.shippingInfo.email,
      phone: backendOrder.shippingInfo.phone,
      status,
      paymentStatus,
      amount,
      channel: 'Website', // Default channel, can be enhanced later
    };
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setIsRefreshing(true);
      const response = await api.get('/orders?all=true');
      
      if (response.data.success) {
        const backendOrders: BackendOrder[] = response.data.data.orders || [];
        const transformedOrders = backendOrders.map(transformOrder);
        setOrders(transformedOrders);
      } else {
        toast.error('Failed to load orders');
        setOrders([]);
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load orders';
      toast.error(errorMessage);
      setOrders([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [formData, setFormData] = useState<Order>({
    id: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    customer: '',
    email: '',
    phone: '',
    status: 'pending',
    paymentStatus: 'cod',
    amount: '',
    channel: 'Website',
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'processing':
        return <Clock size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'cancelled':
        return <RefreshCw size={16} />;
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesPayment = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      id: `#${Math.random().toString().slice(2, 7)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      customer: '',
      email: '',
      phone: '',
      status: 'pending',
      paymentStatus: 'cod',
      amount: '',
      channel: 'Website',
    });
    setShowModal(true);
  };

  const viewOrderDetails = (order: Order) => {
    alert(`Order Details:\n\nID: ${order.id}\nCustomer: ${order.customer}\nEmail: ${order.email}\nPhone: ${order.phone}\nAmount: ${order.amount}\nStatus: ${order.status}\nPayment: ${order.paymentStatus}`);
  };

  const openEditModal = (order: Order) => {
    setEditingId(order.id);
    setFormData(order);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.customer || !formData.email || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setOrders(orders.map((o) => (o.id === editingId ? formData : o)));
    } else {
      setOrders([formData, ...orders]);
    }

    setShowModal(false);
    setFormData({
      id: '',
      date: '',
      customer: '',
      email: '',
      phone: '',
      status: 'pending',
      paymentStatus: 'cod',
      amount: '',
      channel: 'Website',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const handleExport = () => {
    const csv = [
      ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'Status', 'Payment', 'Amount', 'Channel'],
      ...filteredOrders.map((o) => [o.id, o.date, o.customer, o.email, o.phone, o.status, o.paymentStatus, o.amount, o.channel]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 text-sm mt-1">Manage all customer orders and track shipments.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchOrders}
            disabled={isRefreshing}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh orders"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => setShowOrderForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Create Order
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Filter size={18} />
            Filters
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            >
              <option value="">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="cod">COD</option>
              <option value="failed">Failed</option>
            </select>

            <button
              onClick={() => setFilters({ status: '', paymentStatus: '', dateRange: '', minAmount: '', maxAmount: '' })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-[#d4af37]" size={32} />
            <span className="ml-3 text-gray-600">Loading orders...</span>
          </div>
        ) : (
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
                    Date
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
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span 
                          onClick={() => viewOrderDetails(order)}
                          className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-[#d4af37] transition-colors"
                          title="Click to view details"
                        >
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700 capitalize">
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditModal(order)}
                            className="text-[#d4af37] hover:text-[#f4d03f] transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Delete"
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
                      {searchQuery || filters.status || filters.paymentStatus 
                        ? 'No orders match your filters' 
                        : 'No orders found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing {filteredOrders.length} of {orders.length} orders</p>
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

      {/* Order Form */}
      {showOrderForm && (
        <OrderForm onClose={() => setShowOrderForm(false)} />
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Order' : 'Create New Order'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Amount *</label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="₹ Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Payment Status</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="paid">Paid</option>
                  <option value="cod">COD</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Channel</label>
                <input
                  type="text"
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Website, B2B, etc."
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
