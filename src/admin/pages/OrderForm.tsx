import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: string;
}

interface OrderFormData {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'cod' | 'failed';
  paymentMethod: 'card' | 'upi' | 'cod' | 'bank';
  items: OrderItem[];
  subtotal: string;
  tax: string;
  shipping: string;
  discount: string;
  total: string;
  notes: string;
  channel: string;
}

interface Props {
  onClose: () => void;
  initialData?: OrderFormData;
  isEditing?: boolean;
}

export default function OrderForm({ onClose, initialData, isEditing = false }: Props) {
  const [formData, setFormData] = useState<OrderFormData>(
    initialData || {
      id: `#${Math.random().toString().slice(2, 7)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      customer: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      status: 'pending',
      paymentStatus: 'cod',
      paymentMethod: 'cod',
      items: [],
      subtotal: '0',
      tax: '0',
      shipping: '0',
      discount: '0',
      total: '0',
      notes: '',
      channel: 'Website',
    }
  );

  const [activeTab, setActiveTab] = useState<'customer' | 'items' | 'shipping' | 'payment'>('customer');
  const [newItem, setNewItem] = useState<OrderItem>({
    id: '',
    productName: '',
    sku: '',
    quantity: 1,
    price: '',
  });

  const addItem = () => {
    if (!newItem.productName || !newItem.price) {
      alert('Please fill product name and price');
      return;
    }
    setFormData({
      ...formData,
      items: [...formData.items, { ...newItem, id: Date.now().toString() }],
    });
    setNewItem({ id: '', productName: '', sku: '', quantity: 1, price: '' });
  };

  const removeItem = (id: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity || 0);
    }, 0);
    const tax = parseFloat(formData.tax) || 0;
    const shipping = parseFloat(formData.shipping) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const total = subtotal + tax + shipping - discount;
    return { subtotal: subtotal.toFixed(2), total: total.toFixed(2) };
  };

  const { subtotal, total } = calculateTotal();

  const handleSave = () => {
    if (!formData.customer || !formData.email || !formData.items.length) {
      alert('Please fill customer info and add at least one item');
      return;
    }
    console.log('Order Data:', { ...formData, subtotal, total });
    alert('Order saved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto pt-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mb-8">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Order' : 'Create New Order'}</h1>
            <p className="text-sm text-gray-500 mt-1">Order ID: {formData.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-8 bg-gray-50">
          {[
            { id: 'customer', label: 'Customer', icon: '👤' },
            { id: 'items', label: 'Items', icon: '📦' },
            { id: 'shipping', label: 'Shipping', icon: '🚚' },
            { id: 'payment', label: 'Payment', icon: '💳' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Customer Info Tab */}
          {activeTab === 'customer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    placeholder="Enter customer name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Channel</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="Website">Website</option>
                    <option value="B2B">B2B</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Order notes, special requests..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
            </div>
          )}

          {/* Items Tab */}
          {activeTab === 'items' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Add Order Item</h3>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Product Name *</label>
                    <input
                      type="text"
                      value={newItem.productName}
                      onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                      placeholder="Product name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">SKU</label>
                    <input
                      type="text"
                      value={newItem.sku}
                      onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                      placeholder="SKU"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Qty</label>
                    <input
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Price *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-600">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="0.00"
                        className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={addItem}
                  className="w-full px-4 py-2 bg-[#d4af37] text-gray-800 rounded-lg hover:bg-[#f4d03f] font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add Item
                </button>
              </div>

              {formData.items.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {formData.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-500">{item.sku}</p>
                        </div>
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-900">
                            ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">×{item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="Zip code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Shipping Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-600">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.shipping}
                    onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                    className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Status</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="paid">Paid</option>
                    <option value="cod">COD</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-900">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Tax:</span>
                    <div className="flex items-center gap-2">
                      <span>₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.tax}
                        onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Shipping:</span>
                    <span>₹{parseFloat(formData.shipping).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Discount:</span>
                    <div className="flex items-center gap-2">
                      <span>-₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-2 font-bold text-lg flex justify-between text-[#d4af37]">
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-8 py-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            {isEditing ? 'Update Order' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
