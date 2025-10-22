import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import makhanaHealthBlog from '../assets/blog/Makhana-The-Healthy-Indian-Snack.jpg';
import makhanaHeritageBlog from '../assets/blog/makhana-feature.jpg';
import makhanaProcessBlog from '../assets/blog/Roasted-Makhana-Recipe.webp';
import makhanaRecipesBlog from '../assets/blog/recipie.webp';
import heroBg from '../assets/blog/makhana-feature.jpg';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Health Benefits of Bihar Makhana: The Ultimate Superfood Guide",
      excerpt: "Discover why makhana is considered a superfood and how Bihar's premium quality foxnuts can boost your health and wellness journey.",
      image: makhanaHealthBlog,
      author: "Dr. Nutrition Expert",
      date: "2025-09-10",
      category: "Health & Nutrition",
      tags: ["health", "nutrition", "superfood", "wellness"],
      slug: "health-benefits-bihar-makhana-superfood-guide"
    },
    {
      id: 2,
      title: "Sustainable Makhana Farming in Bihar: Traditional Methods Meet Modern Technology",
      excerpt: "Learn about the sustainable farming practices used in Bihar's makhana cultivation and how traditional methods are preserved while embracing innovation.",
      image: makhanaHeritageBlog,
      author: "Agricultural Expert",
      date: "2025-09-08",
      category: "Agriculture",
      tags: ["farming", "sustainability", "bihar", "agriculture"],
      slug: "sustainable-makhana-farming-bihar-traditional-methods"
    },
    {
      id: 3,
      title: "Global Export Trends: Why Bihar Makhana is Conquering International Markets",
      excerpt: "Explore the growing international demand for Bihar makhana and how this superfood is making its mark in global health food markets.",
      image: makhanaProcessBlog,
      author: "Export Analyst",
      date: "2025-09-05",
      category: "Export & Trade",
      tags: ["export", "global", "market", "international"],
      slug: "global-export-trends-bihar-makhana-international-markets"
    },
    {
      id: 4,
      title: "From Farm to Fork: The Complete Journey of Bihar Makhana Processing",
      excerpt: "Take a detailed look at the entire process of makhana cultivation, harvesting, processing, and packaging that ensures premium quality.",
      image: makhanaRecipesBlog,
      author: "Processing Expert",
      date: "2025-09-03",
      category: "Processing",
      tags: ["processing", "quality", "journey", "production"],
      slug: "farm-to-fork-bihar-makhana-processing-journey"
    },
    {
      id: 5,
      title: "Makhana Recipes: Creative Ways to Enjoy Bihar's Premium Foxnuts",
      excerpt: "Discover delicious and healthy recipes using premium Bihar makhana that will transform your snacking and cooking experience.",
      image: makhanaHealthBlog,
      author: "Chef Expert",
      date: "2025-09-01",
      category: "Recipes",
      tags: ["recipes", "cooking", "snacks", "healthy"],
      slug: "makhana-recipes-creative-ways-bihar-premium-foxnuts"
    },
    {
      id: 6,
      title: "Bihar Makhana vs. World: Quality Comparison and Why Bihar Leads",
      excerpt: "A comprehensive comparison of makhana quality across different regions and why Bihar makhana stands superior in the global market.",
      image: makhanaHeritageBlog,
      author: "Quality Analyst",
      date: "2025-08-28",
      category: "Quality",
      tags: ["quality", "comparison", "bihar", "premium"],
      slug: "bihar-makhana-vs-world-quality-comparison-why-bihar-leads"
    }
  ];

  const categories = ["All", "Health & Nutrition", "Agriculture", "Export & Trade", "Processing", "Recipes", "Quality"];

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Bihar Makhana Blog",
    "description": "Expert insights on Bihar makhana, foxnuts cultivation, health benefits, export trends, and sustainable farming practices.",
    "url": "https://biharmakhana.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Bihar Makhana",
      "logo": "https://biharmakhana.com/logo.png"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": `https://biharmakhana.com${post.image}`,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bihar Makhana"
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "url": `https://biharmakhana.com/blog/${post.slug}`,
      "keywords": post.tags.join(", "),
      "articleSection": post.category
    }))
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Bihar Makhana Blog | Expert Insights on Foxnuts, Health Benefits & Farming"
        description="Expert blog on Bihar makhana - health benefits, sustainable farming, export trends, recipes, and quality insights. Latest news on premium foxnuts industry and organic lotus seeds cultivation."
        keywords="bihar makhana blog, foxnuts health benefits, makhana farming techniques, lotus seeds nutrition, sustainable agriculture bihar, makhana export trends, foxnuts recipes, organic farming blog, agriculture news bihar, makhana industry insights"
        canonical="https://biharmakhana.com/blog"
        ogImage="https://biharmakhana.com/images/blog-og.jpg"
        structuredData={blogStructuredData}
        breadcrumbs={[
          { name: "Home", url: "https://biharmakhana.com/" },
          { name: "Blog", url: "https://biharmakhana.com/blog" }
        ]}
      />
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-32 text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-golden/20 text-golden rounded-full text-sm font-semibold mb-6">
              LATEST INSIGHTS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Bihar Makhana Blog
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Expert insights on premium foxnuts, sustainable farming, health benefits, and industry trends
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="default" className="bg-golden hover:bg-golden/90">
                Latest Articles
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-heritage">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl group-hover:text-heritage transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm" className="group/btn">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-heritage text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Bihar Makhana</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest insights on makhana farming, health benefits, and industry trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
