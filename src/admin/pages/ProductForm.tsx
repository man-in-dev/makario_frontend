import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, Trash2, Eye, EyeOff, Save, ChevronDown, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'sonner';

interface ProductImage {
    id: string;
    url: string;
    alt: string;
    featured: boolean;
}

interface ProductFormData {
  // Fields that render on product detail page
  title: string;
  description: string;
  category: string;
  sku: string;
  price: string;
  compareAtPrice: string; // Original price shown on detail page
  stock: number; // Stock quantity
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  features: string[]; // Key benefits/features shown on product page
  specifications: {
    weight: string; // Display weight (e.g., "100 Grams")
    speciality: string; // e.g., "Gluten-free, Natural, Premium, Protein-rich, Raw"
    brand: string; // e.g., "Makario"
    countryOfOrigin: string; // e.g., "India (Bihar)"
    flavor: string; // e.g., "Unflavoured"
    storage: string; // e.g., "Cool, dry place"
    type: string; // e.g., "Raw Makhana (Fox Nut)"
  };
  nutritionalInfo: {
    servingSize: string; // e.g., "Per 5g serving"
    calories: string; // e.g., "Approx. 127 kcal"
    fat: string; // e.g., "0.1g"
    protein: string; // e.g., "4.5g"
    sugars: string; // e.g., "7.6g"
    carbohydrates: string; // e.g., "76.9g"
    ingredients: string; // e.g., "Raw Makhana"
  };
}

interface Props {
  onClose: () => void;
  initialData?: ProductFormData;
  isEditing?: boolean;
  productId?: string;
  onSuccess?: () => void;
}

export default function ProductForm({ onClose, initialData, isEditing = false, productId, onSuccess }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      title: '',
      description: '',
      category: 'Raw Makhana',
      sku: '',
      price: '',
      compareAtPrice: '',
      stock: 0,
      images: [],
      rating: 0,
      reviewCount: 0,
      features: [],
      specifications: {
        weight: '',
        speciality: '',
        brand: 'Makario',
        countryOfOrigin: 'India (Bihar)',
        flavor: '',
        storage: 'Cool, dry place',
        type: '',
      },
      nutritionalInfo: {
        servingSize: 'Per 5g serving',
        calories: '',
        fat: '',
        protein: '',
        sugars: '',
        carbohydrates: '',
        ingredients: '',
      },
    }
  );

  const [newFeature, setNewFeature] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'pricing' | 'inventory' | 'features' | 'specifications' | 'nutrition'>('basic');

  // Load product data when editing
  useEffect(() => {
    const loadProductData = async () => {
      if (isEditing && productId && !initialData) {
        setIsLoading(true);
        try {
          const response = await api.get(`/products/${productId}`);
          if (response.data.success) {
            const product = response.data.data.product;
            setFormData({
              title: product.title || '',
              description: product.description || '',
              category: product.category || 'Raw Makhana',
              sku: product.sku || '',
              price: product.price?.toString() || '',
              compareAtPrice: product.compareAtPrice?.toString() || '',
              stock: product.stock || 0,
              images: product.images?.map((img: any, index: number) => ({
                id: `img-${index}`,
                url: img.url,
                alt: img.alt || '',
                featured: img.featured || false,
              })) || [],
              rating: product.rating || 0,
              reviewCount: product.reviewCount || 0,
              features: product.features || [],
              specifications: product.specifications || {
                weight: '',
                speciality: '',
                brand: 'Makario',
                countryOfOrigin: 'India (Bihar)',
                flavor: '',
                storage: 'Cool, dry place',
                type: '',
              },
              nutritionalInfo: product.nutritionalInfo || {
                servingSize: 'Per 5g serving',
                calories: '',
                fat: '',
                protein: '',
                sugars: '',
                carbohydrates: '',
                ingredients: '',
              },
            });
          }
        } catch (error: any) {
          console.error('Error loading product:', error);
          toast.error('Failed to load product data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProductData();
  }, [isEditing, productId, initialData]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const newImage: ProductImage = {
                        id: Date.now().toString(),
                        url: event.target?.result as string,
                        alt: '',
                        featured: formData.images.length === 0,
                    };
                    setFormData({
                        ...formData,
                        images: [...formData.images, newImage],
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (id: string) => {
        setFormData({
            ...formData,
            images: formData.images.filter((img) => img.id !== id),
        });
    };

    const setFeaturedImage = (id: string) => {
        setFormData({
            ...formData,
            images: formData.images.map((img) => ({
                ...img,
                featured: img.id === id,
            })),
        });
    };

    const updateImage = (id: string, alt: string) => {
        setFormData({
            ...formData,
            images: formData.images.map((img) => (img.id === id ? { ...img, alt } : img)),
        });
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            });
            setNewTag('');
        }
    };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.price || !formData.sku) {
      toast.error('Please fill all required fields (Title, Price, SKU)');
      return;
    }

    setIsSaving(true);

    try {
      // Prepare data for backend (convert images format)
      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        sku: formData.sku,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice || null,
        stock: formData.stock,
        images: formData.images.map(img => ({
          url: img.url,
          alt: img.alt,
          featured: img.featured,
        })),
        rating: formData.rating,
        reviewCount: formData.reviewCount,
        features: formData.features,
        specifications: formData.specifications,
        nutritionalInfo: formData.nutritionalInfo,
        isActive: true,
      };

      let response;
      if (isEditing && productId) {
        // Update existing product
        response = await api.put(`/products/${productId}`, productData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        response = await api.post('/products', productData);
        toast.success('Product created successfully!');
      }

      if (response.data.success) {
        onSuccess?.();
        onClose();
      } else {
        throw new Error(response.data.message || 'Failed to save product');
      }
    } catch (error: any) {
      console.error('Save product error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save product';
      
      // Handle duplicate SKU error
      if (errorMessage.includes('SKU') || errorMessage.includes('duplicate')) {
        toast.error('A product with this SKU already exists');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8">
          <Loader2 className="animate-spin text-[#d4af37] mx-auto" size={32} />
          <p className="text-gray-600 mt-4">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto pt-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mb-8">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage product details and inventory</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-8 bg-gray-50 overflow-x-auto">
          {[
            { id: 'basic', label: 'Basic Info', icon: '📝' },
            { id: 'media', label: 'Media', icon: '🖼️' },
            { id: 'pricing', label: 'Pricing', icon: '💰' },
            { id: 'inventory', label: 'Inventory', icon: '📦' },
            { id: 'features', label: 'Features', icon: '⭐' },
            { id: 'specifications', label: 'Specifications', icon: '📋' },
            { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
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
        <div className="px-8 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Product Title *</label>
                <input
                  type="text"
                  maxLength={255}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E.g., Makhana 100g Pack of 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/255</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product in detail..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Plain text or HTML supported</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="Raw Makhana">Raw Makhana</option>
                  <option value="Classic Makhana">Classic Makhana</option>
                  <option value="Premium">Premium</option>
                  <option value="Organic">Organic</option>
                  <option value="Flavored">Flavored</option>
                  <option value="Gifting">Gifting</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="0.0 - 5.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Review Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviewCount}
                    onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={32} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">Click to upload or drag images</span>
                      <span className="text-xs text-gray-500">Multiple images supported</span>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={28} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-8 bg-gray-50">
                    {[
                        { id: 'basic', label: 'Basic Info', icon: '📝' },
                        { id: 'media', label: 'Media', icon: '🖼️' },
                        { id: 'pricing', label: 'Pricing', icon: '💰' },
                        { id: 'inventory', label: 'Inventory', icon: '📦' },
                        { id: 'shipping', label: 'Shipping', icon: '🚚' },
                        { id: 'seo', label: 'SEO', icon: '🔍' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-[#d4af37] text-[#d4af37]'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="px-8 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Product Title *</label>
                                <input
                                    type="text"
                                    maxLength={255}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="E.g., Premium Makhana (500g)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/255</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#d4af37]">
                                    <ReactQuill
                                        value={formData.description}
                                        onChange={(content) => setFormData({ ...formData, description: content })}
                                        placeholder="Describe your product in detail..."
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['link', 'image'],
                                                [{ align: [] }],
                                                [{ color: [] }, { background: [] }],
                                                ['clean'],
                                            ],
                                        }}
                                        formats={[
                                            'header',
                                            'bold',
                                            'italic',
                                            'underline',
                                            'strike',
                                            'list',
                                            'bullet',
                                            'link',
                                            'image',
                                            'align',
                                            'color',
                                            'background',
                                        ]}
                                        theme="snow"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Format text, add images, lists, and links</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    >
                                        <option value="Premium">Premium</option>
                                        <option value="Organic">Organic</option>
                                        <option value="Flavored">Flavored</option>
                                        <option value="Gifting">Gifting</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Visibility</label>
                                    <select
                                        value={formData.visibility}
                                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    >
                                        <option value="public">Public</option>
                                        <option value="hidden">Hidden</option>
                                        <option value="b2b">B2B Only</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                        placeholder="Add tag and press Enter"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                                    />
                                    <button
                                        onClick={addTag}
                                        className="px-4 py-2 bg-[#d4af37] text-gray-800 rounded-lg hover:bg-[#f4d03f] font-medium"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                                        >
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="ml-1">
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-4">Product Images</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <label className="cursor-pointer">
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload size={32} className="text-gray-400" />
                                            <span className="text-sm font-medium text-gray-900">Click to upload or drag images</span>
                                            <span className="text-xs text-gray-500">Multiple images supported</span>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {formData.images.map((image) => (
                                        <div key={image.id} className="relative group">
                                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                                                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                                                {image.featured && (
                                                    <div className="absolute top-2 right-2 bg-[#d4af37] text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                                                        Featured
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                                {!image.featured && (
                                                    <button
                                                        onClick={() => setFeaturedImage(image.id)}
                                                        className="p-2 bg-white text-gray-900 rounded hover:bg-[#d4af37]"
                                                        title="Set as featured"
                                                    >
                                                        ⭐
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => removeImage(image.id)}
                                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={image.alt}
                                                onChange={(e) => updateImage(image.id, e.target.value)}
                                                placeholder="Alt text"
                                                className="w-full mt-2 px-2 py-1 border border-gray-300 rounded text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === 'pricing' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Selling Price *</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-600">₹</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Compare At Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-600">₹</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.compareAtPrice}
                                            onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Original price</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Cost Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-600">₹</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.cost}
                                            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            {formData.cost && formData.price && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-green-700 mb-1">Profit per unit</p>
                                            <p className="text-xl font-bold text-green-700">₹{profit.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-green-700 mb-1">Profit Margin</p>
                                            <p className="text-xl font-bold text-green-700">{margin}%</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Inventory Tab */}
                    {activeTab === 'inventory' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">SKU *</label>
                                    <input
                                        type="text"
                                        value={formData.sku}
                                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                        placeholder="E.g., MAKH-500-CLS"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Barcode</label>
                                    <input
                                        type="text"
                                        value={formData.barcode}
                                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                        placeholder="Optional barcode"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    placeholder="0"
                                />
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                    <p className="text-sm font-medium text-blue-900">
                                        {formData.stock > 50 ? '✅ In Stock' : formData.stock > 0 ? '⚠️ Low Stock' : '❌ Out of Stock'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shipping Tab */}
                    {activeTab === 'shipping' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Weight</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Unit</label>
                                    <select
                                        value={formData.weightUnit}
                                        onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    >
                                        <option value="g">Grams (g)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="lb">Pounds (lb)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-4">Dimensions (optional)</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-600 mb-1 block">Length (cm)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.dimensions.length}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    dimensions: { ...formData.dimensions, length: e.target.value },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 mb-1 block">Width (cm)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.dimensions.width}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    dimensions: { ...formData.dimensions, width: e.target.value },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 mb-1 block">Height (cm)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.dimensions.height}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    dimensions: { ...formData.dimensions, height: e.target.value },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    maxLength={60}
                                    value={formData.seoTitle}
                                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                    placeholder="Optimize for search engines"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/60 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Meta Description</label>
                                <textarea
                                    maxLength={160}
                                    value={formData.seoDescription}
                                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                    placeholder="Brief product description for search engines"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Meta Keywords</label>
                                <input
                                    type="text"
                                    value={formData.metaKeywords}
                                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                    placeholder="keyword1, keyword2, keyword3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                />
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
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Save Product
                    </button>
                </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selling Price *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-600">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-600">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Shown as strikethrough price on product page</p>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="E.g., MKR-100g pack 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">Shown on product detail page</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  placeholder="0"
                />
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm font-medium text-blue-900">
                    {formData.stock > 50 ? '✅ In Stock' : formData.stock > 0 ? '⚠️ Low Stock' : '❌ Out of Stock'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Key Benefits/Features</label>
                <p className="text-xs text-gray-500 mb-3">Add key selling points that appear on the product detail page (e.g., "Whatsapp and phone customer service support")</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    placeholder="Add feature and press Enter"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  />
                  <button
                    onClick={addFeature}
                    className="px-4 py-2 bg-[#d4af37] text-gray-800 rounded-lg hover:bg-[#f4d03f] font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <span className="flex-1 text-sm text-gray-700">{feature}</span>
                      <button
                        onClick={() => removeFeature(feature)}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {formData.features.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No features added yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Product Specifications</label>
                <p className="text-xs text-gray-500 mb-4">These details appear in the Specification tab on the product detail page</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Weight (Display Format)</label>
                    <input
                      type="text"
                      value={formData.specifications.weight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, weight: e.target.value },
                        })
                      }
                      placeholder="e.g., 100 Grams"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Brand</label>
                    <input
                      type="text"
                      value={formData.specifications.brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, brand: e.target.value },
                        })
                      }
                      placeholder="e.g., Makario"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Type</label>
                    <input
                      type="text"
                      value={formData.specifications.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, type: e.target.value },
                        })
                      }
                      placeholder="e.g., Raw Makhana (Fox Nut)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Flavor</label>
                    <input
                      type="text"
                      value={formData.specifications.flavor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, flavor: e.target.value },
                        })
                      }
                      placeholder="e.g., Unflavoured"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Speciality</label>
                    <input
                      type="text"
                      value={formData.specifications.speciality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, speciality: e.target.value },
                        })
                      }
                      placeholder="e.g., Gluten-free, Natural, Premium, Protein-rich, Raw"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Country of Origin</label>
                    <input
                      type="text"
                      value={formData.specifications.countryOfOrigin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, countryOfOrigin: e.target.value },
                        })
                      }
                      placeholder="e.g., India (Bihar)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Storage Instructions</label>
                    <input
                      type="text"
                      value={formData.specifications.storage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, storage: e.target.value },
                        })
                      }
                      placeholder="e.g., Cool, dry place"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Nutritional Information</label>
                <p className="text-xs text-gray-500 mb-4">Enter nutritional values as they appear on the product detail page</p>
                
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-1">Serving Size</label>
                  <input
                    type="text"
                    value={formData.nutritionalInfo.servingSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nutritionalInfo: { ...formData.nutritionalInfo, servingSize: e.target.value },
                      })
                    }
                    placeholder="e.g., Per 5g serving"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Calories</label>
                    <input
                      type="text"
                      value={formData.nutritionalInfo.calories}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nutritionalInfo: { ...formData.nutritionalInfo, calories: e.target.value },
                        })
                      }
                      placeholder="e.g., Approx. 127 kcal"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Fat</label>
                    <input
                      type="text"
                      value={formData.nutritionalInfo.fat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nutritionalInfo: { ...formData.nutritionalInfo, fat: e.target.value },
                        })
                      }
                      placeholder="e.g., 0.1g"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Protein</label>
                    <input
                      type="text"
                      value={formData.nutritionalInfo.protein}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nutritionalInfo: { ...formData.nutritionalInfo, protein: e.target.value },
                        })
                      }
                      placeholder="e.g., 4.5g"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Sugars</label>
                    <input
                      type="text"
                      value={formData.nutritionalInfo.sugars}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nutritionalInfo: { ...formData.nutritionalInfo, sugars: e.target.value },
                        })
                      }
                      placeholder="e.g., 7.6g"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Carbohydrates</label>
                    <input
                      type="text"
                      value={formData.nutritionalInfo.carbohydrates}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nutritionalInfo: { ...formData.nutritionalInfo, carbohydrates: e.target.value },
                        })
                      }
                      placeholder="e.g., 76.9g"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Ingredients</label>
                  <textarea
                    value={formData.nutritionalInfo.ingredients}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nutritionalInfo: { ...formData.nutritionalInfo, ingredients: e.target.value },
                      })
                    }
                    placeholder="e.g., Raw Makhana"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                  />
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
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : (isEditing ? 'Update Product' : 'Save Product')}
          </button>
        </div>
      </div>
    </div>
  );
}
