import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PageFormData {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  updated: string;
  image?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'script',
  'color', 'background',
  'align',
  'link', 'image',
];

export default function PageCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PageFormData>({
    id: 0,
    title: '',
    slug: '',
    content: '',
    status: 'draft',
    updated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    image: '',
    metaDescription: '',
    metaKeywords: '',
  });

  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo' | 'settings'>('content');

  const generateSlug = (title: string) => {
    return '/' + title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }
    console.log('Page Data:', formData);
    alert('Page created successfully!');
    navigate('/admin/content');
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (confirm('Discard changes? This cannot be undone.')) {
        navigate('/admin/content');
      }
    } else {
      navigate('/admin/content');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">➕ Create New Page</h1>
              <p className="text-sm text-gray-500 mt-1">Create and manage static pages for your website</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8">
            {[
              { id: 'content', label: '📝 Content' },
              { id: 'media', label: '🖼️ Media' },
              { id: 'seo', label: '🔍 SEO' },
              { id: 'settings', label: '⚙️ Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#d4af37] text-[#d4af37]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Page Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={255}
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="E.g., About Us, Quality Standards, etc."
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37] text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.title.length}/255 characters</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from title"
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">Example: /about-us</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Page Content <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-[#d4af37]">
                  <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    theme="snow"
                    placeholder="Write your page content here..."
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">Page Banner Image</label>
                {formData.image ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.image}
                      alt="Featured"
                      className="w-full max-w-md h-64 object-cover rounded-xl border-2 border-gray-300"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#d4af37] hover:bg-amber-50 transition-colors block">
                    <div className="text-5xl mb-4">📸</div>
                    <p className="text-lg font-medium text-gray-900 mb-2">Click to upload banner image</p>
                    <p className="text-sm text-gray-500">Recommended: 1200x400px | PNG, JPG, WebP</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <strong>💡 Pro Tip:</strong> Optimize these fields to improve search engine visibility
                </p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Meta Description (160 chars)</label>
                <textarea
                  maxLength={160}
                  value={formData.metaDescription || ''}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Brief description for search engines"
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{(formData.metaDescription || '').length}/160 characters</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.metaKeywords || ''}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="draft">🔒 Draft</option>
                  <option value="published">✅ Published</option>
                </select>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Created:</strong> {formData.updated}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-8 py-4 flex gap-3">
          <button
            onClick={handleCancel}
            className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-xl hover:shadow-xl transition-shadow font-bold text-lg flex items-center gap-2"
          >
            💾 Create Page
          </button>
        </div>
      </div>
    </div>
  );
}
