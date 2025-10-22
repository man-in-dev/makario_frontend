import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
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
    id: '1',
    title: 'Buy Makhana Online: Complete Guide to Fox Nuts Benefits and Price',
    excerpt: 'Ultimate guide to buying premium Bihar Makhana (Fox Nuts) online. Compare prices, health benefits, and quality grades of makhana.',
    image: makhanaHeritageBlog,
    date: 'October 19, 2025',
    author: 'Team Makario',
    category: 'Buying Guide',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Makhana Benefits: 15 Proven Health Benefits of Fox Nuts (Research-Based)',
    excerpt: 'Scientific research reveals makhana\'s benefits for weight loss, diabetes, heart health, and more. Learn why fox nuts are India\'s top superfood.',
    image: makhanaHealthBlog,
    date: 'October 18, 2025',
    author: 'Team Makario',
    category: 'Health',
    readTime: '10 min read'
  },
  {
    id: '3',
    title: 'Makhana Price List 2025: Wholesale Fox Nuts Rates in India',
    excerpt: 'Compare makhana prices across different grades and quantities. Find best wholesale rates for premium quality Bihar fox nuts.',
    image: makhanaProcessBlog,
    date: 'October 17, 2025',
    author: 'Team Makario',
    category: 'Price Guide',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Makhana Recipes: 10 Healthy Fox Nuts Snacks for Weight Loss',
    excerpt: 'Easy and delicious makhana recipes for weight loss. Healthy roasted fox nuts snacks with detailed nutritional information.',
    image: makhanaRecipesBlog,
    date: 'October 16, 2025',
    author: 'Team Makario',
    category: 'Recipes',
    readTime: '7 min read'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-heritage/10 text-heritage rounded-full text-sm font-semibold mb-4">
            OUR BLOG
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-heritage mb-4">Latest from Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest news, recipes, and stories about Bihar's finest Makhana
          </p>
        </div>
        
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