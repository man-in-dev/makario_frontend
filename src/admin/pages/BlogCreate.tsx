import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

export default function BlogCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BlogFormData>({
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
  });

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo' | 'settings'>('content');

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
    console.log('Blog Data:', formData);
    alert('Blog post created successfully!');
    navigate('/admin/blog');
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (confirm('Discard changes? This cannot be undone.')) {
        navigate('/admin/blog');
      }
    } else {
      navigate('/admin/blog');
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
              <h1 className="text-3xl font-bold text-gray-900">✨ Create New Blog Post</h1>
              <p className="text-sm text-gray-500 mt-1">Write engaging content for your audience</p>
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
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={255}
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="E.g., Why Bihar Makhana is the Best Quality in India"
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
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Excerpt / Summary</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A brief summary of your blog post"
                  maxLength={300}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.excerpt.length}/300 characters</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Blog Content <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-[#d4af37]">
                  <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    theme="snow"
                    placeholder="Write your engaging blog content here..."
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
                <label className="block text-lg font-bold text-gray-900 mb-4">Featured Image</label>
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
                    <p className="text-lg font-medium text-gray-900 mb-2">Click to upload featured image</p>
                    <p className="text-sm text-gray-500 mb-4">Recommended: 1200x630px | PNG, JPG, WebP</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Katihar Region">Katihar Region</option>
                  <option value="Purnea Region">Purnea Region</option>
                  <option value="Bihar Statewide">Bihar Statewide</option>
                  <option value="General">General</option>
                  <option value="Health">Health Benefits</option>
                  <option value="Recipes">Recipes</option>
                  <option value="Farming">Farming</option>
                  <option value="News">News</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Tags</label>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    onClick={addTag}
                    className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-xl hover:shadow-lg font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-blue-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <strong>💡 Pro Tip:</strong> Optimize your SEO settings to improve search engine visibility
                </p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">SEO Title (60 chars)</label>
                <input
                  type="text"
                  maxLength={60}
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Optimized title for search engines"
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.seoTitle.length}/60 characters</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Meta Description (160 chars)</label>
                <textarea
                  maxLength={160}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Brief description for search engines"
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.seoDescription.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.metaKeywords}
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Publish Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="draft">🔒 Draft</option>
                    <option value="published">✅ Published</option>
                    <option value="scheduled">⏱️ Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Visibility</label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="public">🌐 Public</option>
                    <option value="private">🔐 Private</option>
                    <option value="members">👥 Members Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-6 h-6 text-[#d4af37] rounded"
                />
                <div>
                  <label htmlFor="featured" className="text-lg font-bold text-gray-900">
                    ⭐ Feature This Post
                  </label>
                  <p className="text-sm text-gray-600">Show this post in featured section on homepage</p>
                </div>
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
            💾 Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
