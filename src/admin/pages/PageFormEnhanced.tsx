import React, { useState } from 'react';
import { X, Upload, Save, Trash2 } from 'lucide-react';
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

interface Props {
  onClose: () => void;
  initialData?: PageFormData;
  isEditing?: boolean;
  onSave?: (formData: PageFormData) => void;
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

export default function PageFormEnhanced({ onClose, initialData, isEditing = false, onSave }: Props) {
  const [formData, setFormData] = useState<PageFormData>(
    initialData || {
      id: 0,
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      updated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      image: '',
      metaDescription: '',
      metaKeywords: '',
    }
  );

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
    if (onSave) {
      onSave(formData);
    } else {
      console.log('Page Data:', formData);
      alert('Page saved successfully!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 z-50 flex items-start justify-center overflow-y-auto pt-4 pb-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? '✏️ Edit Page' : '➕ Create New Page'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Create and manage static pages for your website</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-8 bg-gray-50 sticky top-[88px] z-10">
          {[
            { id: 'content', label: '📝 Content' },
            { id: 'media', label: '🖼️ Media' },
            { id: 'seo', label: '🔍 SEO' },
            { id: 'settings', label: '⚙️ Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#d4af37] text-[#d4af37] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label.split(' ')[0]} {tab.label.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 py-8 max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Page Title */}
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

              {/* Slug */}
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

              {/* Rich Text Editor */}
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
              {/* Featured Image */}
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
                      <Trash2 size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#d4af37] hover:bg-amber-50 transition-colors">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Click to upload banner image</p>
                    <p className="text-sm text-gray-500">Recommended: 1200x400px</p>
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
                  <strong>Last Updated:</strong> {formData.updated}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-8 py-6 border-t border-gray-200 bg-gray-50 sticky bottom-0 rounded-b-xl">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-xl hover:shadow-xl transition-shadow font-bold text-lg flex items-center justify-center gap-2"
          >
            <Save size={22} />
            {isEditing ? 'Update Page' : 'Create Page'}
          </button>
        </div>
      </div>
    </div>
  );
}
