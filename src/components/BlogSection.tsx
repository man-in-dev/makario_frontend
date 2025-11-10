import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import SectionHeader from './SectionHeader';
// Using direct image URLs instead of imports
import makhanaHeritageBlog from '../assets/blog/makhana-feature.jpg';
import makhanaHealthBlog from '../assets/blog/Makhana-The-Healthy-Indian-Snack.jpg';
import makhanaProcessBlog from '../assets/blog/Roasted-Makhana-Recipe.webp';
import makhanaRecipesBlog from '../assets/blog/recipie.webp';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

const sampleBlogs: BlogPost[] = [
  {
    id: 'katihar-premium-makhana-production-hub',
    title: 'Why Katihar is Emerging as Bihar\'s Hub for Premium Makhana Production',
    excerpt: 'Katihar has emerged as the epicenter of India\'s premium makhana production. Discover the geographical advantages, climate benefits, and agricultural innovation that make Katihar special.',
    image: makhanaHealthBlog,
    date: 'November 10, 2025',
    author: 'Makario Team',
    category: 'Katihar Region',
    readTime: '8 min read'
  },
  {
    id: 'makario-katihar-bihar-handpicked-makhana',
    title: 'Makario: The Pride of Katihar – Bringing Bihar\'s Handpicked Makhana to India',
    excerpt: 'Makario represents a new era in Bihar\'s makhana industry. Learn how direct farmer partnerships and handpicking traditions ensure premium quality.',
    image: makhanaHeritageBlog,
    date: 'November 9, 2025',
    author: 'Makario Team',
    category: 'Katihar Region',
    readTime: '9 min read'
  },
  {
    id: 'katihar-farmers-makhana-revolution-bihar',
    title: 'How Katihar Farmers Are Powering the Makhana Revolution in Bihar',
    excerpt: 'The true heroes of Bihar\'s makhana revolution are the farmers of Katihar. Discover how they\'re transforming traditional practices into modern, sustainable enterprise.',
    image: makhanaProcessBlog,
    date: 'November 8, 2025',
    author: 'Makario Team',
    category: 'Katihar Region',
    readTime: '10 min read'
  },
  {
    id: 'katihar-makhana-bulk-buyers-top-reasons',
    title: 'Top 5 Reasons Katihar Makhana is the Best in India for Bulk Buyers',
    excerpt: 'If you\'re a wholesaler or distributor, Katihar makhana offers superior quality, competitive pricing, and reliable supply. Here\'s why leading bulk buyers prefer Katihar.',
    image: makhanaRecipesBlog,
    date: 'November 7, 2025',
    author: 'Makario Team',
    category: 'Katihar Region',
    readTime: '10 min read'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="OUR BLOG"
          title="Latest from Our Blog"
          highlightWord="Blog"
          highlightColor="green"
          description="Stay updated with the latest news, recipes, and stories about Bihar's finest Makhana"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleBlogs.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`} 
              key={blog.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://source.unsplash.com/800x600?makhana,foxnuts&${blog.id}`;
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-heritage rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-heritage mb-2 line-clamp-2 group-hover:text-golden transition-colors duration-300">
                  {blog.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                  <span className="inline-flex items-center text-heritage font-medium text-sm group-hover:text-golden transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-heritage text-white rounded-full font-semibold hover:bg-golden transition-colors duration-300"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;