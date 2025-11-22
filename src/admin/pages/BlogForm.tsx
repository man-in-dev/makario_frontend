import React, { useState } from 'react';
import { X, Upload, Eye, EyeOff } from 'lucide-react';

interface BlogFormData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  author: string;
  date: string;
  status: 'published' | 'draft' | 'scheduled';
  featured: boolean;
  visibility: 'public' | 'private' | 'members';
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
}

interface Props {
  onClose: () => void;
  initialData?: BlogFormData;
  isEditing?: boolean;
  onSave?: (formData: BlogFormData) => void;
}

export default function BlogForm({ onClose, initialData, isEditing = false, onSave }: Props) {
  const [formData, setFormData] = useState<BlogFormData>(
    initialData || {
      id: Date.now().toString(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Bihar Statewide',
      image: '',
      tags: [],
      author: 'Makario Team',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      featured: false,
      visibility: 'public',
      seoTitle: '',
      seoDescription: '',
      metaKeywords: '',
    }
  );

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'meta' | 'seo'>('content');

  const generateSlug = (title: string) => {
    return title
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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
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
      console.log('Blog Data:', formData);
      alert('Blog post saved successfully!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto pt-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mb-8">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            <p className="text-sm text-gray-500 mt-1">Write and publish engaging content</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-8 bg-gray-50">
          {[
            { id: 'content', label: 'Content', icon: '📝' },
            { id: 'media', label: 'Media', icon: '🖼️' },
            { id: 'meta', label: 'Meta', icon: '⚙️' },
            { id: 'seo', label: 'SEO', icon: '🔍' },
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
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Title *</label>
                <input
                  type="text"
                  maxLength={255}
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="E.g., Why Bihar Makhana is the Best"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/255</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary for preview..."
                  maxLength={300}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog content here..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">HTML and Markdown supported</p>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Featured Image</label>
                {formData.image ? (
                  <div className="relative w-64 h-40">
                    <img src={formData.image} alt="Featured" className="w-full h-full object-cover rounded-lg" />
                    <button
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">Click to upload image</span>
                        <span className="text-xs text-gray-500">Recommended: 1200x630px</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="Katihar Region">Katihar Region</option>
                  <option value="Purnea Region">Purnea Region</option>
                  <option value="Bihar Statewide">Bihar Statewide</option>
                  <option value="General">General</option>
                </select>
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
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Meta Tab */}
          {activeTab === 'meta' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
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
                    <option value="private">Private</option>
                    <option value="members">Members Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="font-medium text-gray-900">
                  Feature this post (show in featured section)
                </label>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">SEO Title (60 chars)</label>
                <input
                  type="text"
                  maxLength={60}
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Optimized title for search engines"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Meta Description (160 chars)</label>
                <textarea
                  maxLength={160}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Brief description for search engines"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160</p>
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
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            {isEditing ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
