import React, { useState } from 'react';
import { Search, Filter, Plus, Grid, List, Edit, Trash2, Eye, EyeOff, X } from 'lucide-react';
import ProductForm from './ProductForm';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: 'active' | 'inactive';
  visibility: 'public' | 'b2b';
  image: string;
}

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({
    category: '',
    stock: '',
    status: '',
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Classic Makhana (500g)',
      sku: 'MAKH-500-CLS',
      category: 'Premium',
      stock: 145,
      price: '₹350',
      status: 'active',
      visibility: 'public',
      image: '🥜',
    },
    {
      id: 2,
      name: 'Organic Makhana (1kg)',
      sku: 'MAKH-1KG-ORG',
      category: 'Organic',
      stock: 89,
      price: '₹650',
      status: 'active',
      visibility: 'public',
      image: '🥜',
    },
    {
      id: 3,
      name: 'Premium Gift Box Set',
      sku: 'GIFT-PREM-01',
      category: 'Gifting',
      stock: 45,
      price: '₹1,200',
      status: 'active',
      visibility: 'public',
      image: '🎁',
    },
  ]);

  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    sku: '',
    category: 'Premium',
    stock: 0,
    price: '',
    status: 'active',
    visibility: 'public',
    image: '🥜',
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesStatus = !filters.status || product.status === filters.status;
    const matchesStock =
      !filters.stock ||
      (filters.stock === 'in' && product.stock > 0) ||
      (filters.stock === 'out' && product.stock === 0) ||
      (filters.stock === 'low' && product.stock > 0 && product.stock <= 50);

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name: '',
      sku: '',
      category: 'Premium',
      stock: 0,
      price: '',
      status: 'active',
      visibility: 'public',
      image: '🥜',
    });
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.sku || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setProducts(products.map((p) => (p.id === editingId ? formData : p)));
    } else {
      setProducts([formData, ...products]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your product catalog.</p>
        </div>
        <button
          onClick={() => setShowProductForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search & View Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, SKU..."
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
          <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#d4af37] text-gray-800' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-[#d4af37] text-gray-800' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            >
              <option value="">All Categories</option>
              <option value="Premium">Premium</option>
              <option value="Organic">Organic</option>
              <option value="Flavored">Flavored</option>
              <option value="Gifting">Gifting</option>
            </select>

            <select
              value={filters.stock}
              onChange={(e) => setFilters({ ...filters, stock: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            >
              <option value="">All Stock</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
              <option value="low">Low Stock</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl relative">
                {product.image}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.sku}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#d4af37]">{product.price}</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{product.category}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={`font-semibold ${product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    Stock: {product.stock}
                  </span>
                  <span className={`px-2 py-1 rounded font-semibold ${getStatusColor(product.status)}`}>{product.status}</span>
                </div>

                <div className="text-xs text-gray-600 flex items-center gap-1">
                  {product.visibility === 'public' ? (
                    <>
                      <Eye size={14} />
                      Public
                    </>
                  ) : (
                    <>
                      <EyeOff size={14} />
                      B2B Only
                    </>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products List */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{product.sku}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold ${product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEditModal(product)} className="text-[#d4af37] hover:text-[#f4d03f] text-sm font-medium">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Form */}
      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="SKU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="Premium">Premium</option>
                  <option value="Organic">Organic</option>
                  <option value="Flavored">Flavored</option>
                  <option value="Gifting">Gifting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Price *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="₹ Price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  placeholder="0"
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Visibility</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                >
                  <option value="public">Public</option>
                  <option value="b2b">B2B Only</option>
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
