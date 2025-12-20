import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Grid, List, Edit, Trash2, Loader2 } from 'lucide-react';
import ProductForm from './ProductForm';
import api from '../../utils/api';
import { toast } from 'sonner';

interface BackendProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  images: Array<{
    url: string;
    alt: string;
    featured: boolean;
  }>;
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: {
    weight: string;
    speciality: string;
    brand: string;
    countryOfOrigin: string;
    flavor: string;
    storage: string;
    type: string;
  };
  nutritionalInfo: {
    servingSize: string;
    calories: string;
    fat: string;
    protein: string;
    sugars: string;
    carbohydrates: string;
    ingredients: string;
  };
  isActive: boolean;
  inStock?: boolean;
  image?: string; // Main/featured image URL (computed)
  imagesArray?: string[]; // Array of image URLs (computed, renamed to avoid conflict)
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: 'active' | 'inactive';
  image: string;
}

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    stock: '',
    status: '',
  });

  const [products, setProducts] = useState<Product[]>([]);

  // Transform backend product to frontend format
  const transformProduct = (backendProduct: BackendProduct): Product => {
    // Get image URL from computed image property, or from first image object, or fallback
    const imageUrl = backendProduct.image 
      || backendProduct.imagesArray?.[0]
      || backendProduct.images?.find(img => img.featured)?.url
      || backendProduct.images?.[0]?.url
      || '🥜';
    
    return {
      id: backendProduct.id,
      name: backendProduct.title,
      sku: backendProduct.sku,
      category: backendProduct.category,
      stock: backendProduct.stock,
      price: `₹${backendProduct.price.toLocaleString('en-IN')}`,
      status: backendProduct.isActive ? 'active' : 'inactive',
      image: imageUrl,
    };
  };

  // Transform frontend product to backend format for ProductForm
  const transformToFormData = (backendProduct: BackendProduct) => {
    return {
      title: backendProduct.title,
      description: backendProduct.description || '',
      category: backendProduct.category,
      sku: backendProduct.sku,
      price: backendProduct.price.toString(),
      compareAtPrice: backendProduct.compareAtPrice?.toString() || '',
      stock: backendProduct.stock,
      images: backendProduct.images.map((img, index) => ({
        id: `img-${index}`,
        url: img.url,
        alt: img.alt || '',
        featured: img.featured || false,
      })),
      rating: backendProduct.rating,
      reviewCount: backendProduct.reviewCount,
      features: backendProduct.features || [],
      specifications: backendProduct.specifications || {
        weight: '',
        speciality: '',
        brand: 'Makario',
        countryOfOrigin: 'India (Bihar)',
        flavor: '',
        storage: 'Cool, dry place',
        type: '',
      },
      nutritionalInfo: backendProduct.nutritionalInfo || {
        servingSize: 'Per 5g serving',
        calories: '',
        fat: '',
        protein: '',
        sugars: '',
        carbohydrates: '',
        ingredients: '',
      },
    };
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsRefreshing(true);
      const params: any = {};
      
      if (filters.category) {
        params.category = filters.category;
      }
      
      if (filters.status) {
        params.isActive = filters.status === 'active';
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await api.get('/products', { params });
      
      if (response.data.success) {
        const backendProducts: BackendProduct[] = response.data.data.products || [];
        const transformedProducts = backendProducts.map(transformProduct);
        setProducts(transformedProducts);
      } else {
        toast.error('Failed to load products');
        setProducts([]);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load products';
      toast.error(errorMessage);
      setProducts([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.category, filters.status, searchQuery]);

  // Handle product deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await api.delete(`/products/${id}`);
      
      if (response.data.success) {
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh the list
      } else {
        throw new Error(response.data.message || 'Failed to delete product');
      }
    } catch (error: any) {
      console.error('Delete product error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      toast.error(errorMessage);
    }
  };

  // Handle opening edit form
  const handleEdit = async (productId: string) => {
    try {
      const response = await api.get(`/products/${productId}`);
      
      if (response.data.success) {
        const backendProduct: BackendProduct = response.data.data.product;
        setEditingProductId(productId);
        setShowProductForm(true);
      } else {
        throw new Error('Failed to load product');
      }
    } catch (error: any) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product details');
    }
  };

  // Handle opening create form
  const handleCreate = () => {
    setEditingProductId(null);
    setShowProductForm(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    fetchProducts();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  // Client-side filtering for stock (since backend handles category and status)
  const filteredProducts = products.filter((product) => {
    const matchesStock =
      !filters.stock ||
      (filters.stock === 'in' && product.stock > 0) ||
      (filters.stock === 'out' && product.stock === 0) ||
      (filters.stock === 'low' && product.stock > 0 && product.stock <= 50);

    return matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your product catalog.</p>
        </div>
        <button
          onClick={handleCreate}
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
              <option value="Raw Makhana">Raw Makhana</option>
              <option value="Classic Makhana">Classic Makhana</option>
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

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(product.id)}
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
                        <button onClick={() => handleEdit(product.id)} className="text-[#d4af37] hover:text-[#f4d03f] text-sm font-medium">
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#d4af37]" size={32} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600">No products found</p>
        </div>
      )}

      {/* Product Form */}
      {showProductForm && (
        <ProductForm
          onClose={() => {
            setShowProductForm(false);
            setEditingProductId(null);
          }}
          isEditing={!!editingProductId}
          productId={editingProductId || undefined}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
