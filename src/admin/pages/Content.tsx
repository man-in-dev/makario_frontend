import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
}

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  updated: string;
}

export default function Content() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'blog' | 'pages'>('blog');
  const [searchQuery, setSearchQuery] = useState('');

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'The Health Benefits of Makhana',
      category: 'Health',
      author: 'Admin',
      date: 'Nov 20, 2024',
      status: 'published',
      views: 1245,
    },
    {
      id: 2,
      title: '5 Easy Makhana Recipes for Beginners',
      category: 'Recipes',
      author: 'Priya',
      date: 'Nov 15, 2024',
      status: 'published',
      views: 892,
    },
  ]);

  const [pages, setPages] = useState<Page[]>([
    {
      id: 1,
      title: 'About Us',
      slug: '/about',
      status: 'published',
      updated: 'Nov 18, 2024',
    },
    {
      id: 2,
      title: 'Quality & Standards',
      slug: '/quality',
      status: 'published',
      updated: 'Nov 15, 2024',
    },
  ]);



  const filteredBlogPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateBlog = () => {
    navigate('/admin/blog/create');
  };

  const openEditBlog = (post: BlogPost) => {
    navigate(`/admin/blog/edit/${post.id}`);
  };



  const deleteBlogPost = (id: number) => {
    if (confirm('Delete this blog post?')) {
      setBlogPosts(blogPosts.filter((p) => p.id !== id));
    }
  };

  const openCreatePage = () => {
    navigate('/admin/content/create');
  };

  const openEditPage = (page: Page) => {
    navigate(`/admin/content/edit/${page.id}`);
  };

  const deletePage = (id: number) => {
    if (confirm('Delete this page?')) {
      setPages(pages.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog & Content</h1>
          <p className="text-gray-600 text-sm mt-1">Manage blog posts and static pages.</p>
        </div>
        <button
          onClick={activeTab === 'blog' ? openCreateBlog : openCreatePage}
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-gray-800 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus size={18} />
          {activeTab === 'blog' ? 'New Post' : 'New Page'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('blog')}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === 'blog' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Blog Posts
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === 'pages' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pages
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      {activeTab === 'blog' && (
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
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
                        <span className="text-sm font-medium text-gray-900">{post.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{post.date}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-gray-900">{post.views}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditBlog(post)}
                            className="text-[#d4af37] hover:text-[#f4d03f] text-sm"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteBlogPost(post.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
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
                      No blog posts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pages Table */}
      {activeTab === 'pages' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{page.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 font-mono">{page.slug}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{page.updated}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                            page.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditPage(page)}
                            className="text-[#d4af37] hover:text-[#f4d03f] text-sm"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No pages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}


    </div>
  );
}
