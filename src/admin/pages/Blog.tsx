import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  featured: boolean;
}

export default function BlogManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Why Katihar is Emerging as Bihar\'s Hub for Premium Makhana Production',
      category: 'Katihar Region',
      author: 'Makario Team',
      date: '2025-11-10',
      status: 'published',
      views: 1245,
      featured: true,
    },
    {
      id: '2',
      title: 'Makario: The Pride of Katihar – Bringing Bihar\'s Handpicked Makhana to India',
      category: 'Katihar Region',
      author: 'Makario Team',
      date: '2025-11-09',
      status: 'published',
      views: 892,
      featured: false,
    },
    {
      id: '3',
      title: 'How Katihar Farmers Are Powering the Makhana Revolution in Bihar',
      category: 'Katihar Region',
      author: 'Makario Team',
      date: '2025-11-08',
      status: 'draft',
      views: 156,
      featured: false,
    },
  ]);

  const filteredBlogPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBlog = () => {
    navigate('/admin/blog/create');
  };

  const handleEditBlog = (post: BlogPost) => {
    navigate(`/admin/blog/edit/${post.id}`);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      setBlogPosts(blogPosts.filter((post) => post.id !== id));
    }
  };



  const toggleFeatured = (id: string) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id ? { ...post, featured: !post.featured } : post
      )
    );
  };

  const toggleStatus = (id: string) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id
          ? {
            ...post,
            status: post.status === 'published' ? 'draft' : 'published',
          }
          : post
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 text-sm mt-1">Create, edit, and manage blog posts for your website.</p>
        </div>
        <button
          onClick={handleCreateBlog}
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus size={18} />
          New Blog Post
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredBlogPosts.length} posts
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogPosts.length > 0 ? (
                filteredBlogPosts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 block truncate max-w-xs">
                        {post.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-gray-900">{post.views}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleStatus(post.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded capitalize cursor-pointer transition-colors ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : post.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleFeatured(post.id)}
                        className="text-gray-600 hover:text-[#d4af37] transition-colors"
                      >
                        {post.featured ? (
                          <Eye size={18} className="text-[#d4af37]" />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEditBlog(post)}
                          className="text-[#d4af37] hover:text-[#f4d03f] font-medium text-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No blog posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
