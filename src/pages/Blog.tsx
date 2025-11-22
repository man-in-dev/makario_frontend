import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import makhanaHealthBlog from '../assets/blog/Makhana-The-Healthy-Indian-Snack.jpg';
import makhanaHeritageBlog from '../assets/blog/makhana-feature.jpg';
import makhanaProcessBlog from '../assets/blog/Roasted-Makhana-Recipe.webp';
import makhanaRecipesBlog from '../assets/blog/recipie.webp';
import heroBg from '../assets/blog/Makhana-The-Healthy-Indian-Snack.jpg';

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
    const [displayedPosts, setDisplayedPosts] = React.useState(22);

    const blogPosts = [
        // Katihar Region Posts
        {
            id: 1,
            title: "Why Katihar is Emerging as Bihar's Hub for Premium Makhana Production",
            excerpt: "Discover why Katihar has become the epicenter of Bihar's makhana revolution, producing some of India's finest foxnuts with superior quality and sustainable farming practices.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-11-10",
            category: "Katihar Region",
            tags: ["katihar", "makhana", "bihar", "agriculture"],
            slug: "katihar-premium-makhana-production-hub"
        },
        {
            id: 2,
            title: "Makario: The Pride of Katihar – Bringing Bihar's Handpicked Makhana to India",
            excerpt: "Meet Makario by ARS Group - the brand that's redefining Bihar's makhana identity by directly sourcing pure, raw, handpicked foxnuts from the fields of Katihar.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-11-09",
            category: "Katihar Region",
            tags: ["makario", "katihar", "premium", "sourcing"],
            slug: "makario-katihar-bihar-handpicked-makhana"
        },
        {
            id: 3,
            title: "How Katihar Farmers Are Powering the Makhana Revolution in Bihar",
            excerpt: "Explore the dedicated farmers of Katihar who are transforming Bihar's makhana industry through innovation, sustainability, and commitment to quality.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-11-08",
            category: "Katihar Region",
            tags: ["farmers", "katihar", "makhana", "revolution"],
            slug: "katihar-farmers-makhana-revolution-bihar"
        },
        {
            id: 4,
            title: "Top 5 Reasons Katihar Makhana is the Best in India for Bulk Buyers",
            excerpt: "Why wholesalers and bulk buyers across India prefer Katihar makhana - from superior quality to competitive pricing and direct farmer connections.",
            image: makhanaRecipesBlog,
            author: "Makario Team",
            date: "2025-11-07",
            category: "Katihar Region",
            tags: ["bulk", "wholesale", "quality", "katihar"],
            slug: "katihar-makhana-bulk-buyers-top-reasons"
        },
        {
            id: 5,
            title: "Behind the Scenes: How Makario Sources Pure Raw Makhana from Katihar Fields",
            excerpt: "Get an insider's look at Makario's sourcing process - from field selection to quality testing - ensuring only the finest raw makhana reaches your hands.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-11-06",
            category: "Katihar Region",
            tags: ["sourcing", "raw", "quality", "process"],
            slug: "makario-sourcing-raw-makhana-katihar"
        },
        {
            id: 6,
            title: "From Katihar to the Nation – The Journey of Bihar's Finest Makhana",
            excerpt: "Track the remarkable journey of Katihar's premium makhana from traditional farming methods to reaching kitchens across India and beyond.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-11-05",
            category: "Katihar Region",
            tags: ["journey", "distribution", "national", "katihar"],
            slug: "katihar-bihar-makhana-journey-nation"
        },
        {
            id: 7,
            title: "Raw Handpicked Makhana: Katihar's Secret to Quality and Purity",
            excerpt: "Understand why Katihar's traditional handpicking method produces the purest, highest-quality raw makhana preferred by health-conscious consumers nationwide.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-11-04",
            category: "Katihar Region",
            tags: ["raw", "handpicked", "purity", "quality"],
            slug: "katihar-raw-handpicked-makhana-quality"
        },
        // Purnea Region Posts
        {
            id: 8,
            title: "Purnea's Contribution to Bihar's Growing Makhana Trade",
            excerpt: "Discover how Purnea has become a crucial player in Bihar's makhana supply chain, contributing significantly to India's foxnut market growth.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-11-03",
            category: "Purnea Region",
            tags: ["purnea", "makhana", "supply", "trade"],
            slug: "purnea-bihar-makhana-trade-growth"
        },
        {
            id: 9,
            title: "Makhana Wholesalers in Purnea – Supplying the Heart of India",
            excerpt: "Meet the wholesale makhana suppliers of Purnea who are keeping India's makhana market vibrant and ensuring consistent quality supply.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-11-02",
            category: "Purnea Region",
            tags: ["wholesalers", "purnea", "supply", "distribution"],
            slug: "purnea-makhana-wholesalers-india-supply"
        },
        {
            id: 10,
            title: "Makario and Purnea: Building Bihar's Trusted Makhana Network",
            excerpt: "Learn how Makario partners with Purnea's finest farmers and suppliers to build a trusted, transparent, and quality-assured makhana network.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-11-01",
            category: "Purnea Region",
            tags: ["makario", "purnea", "network", "partnership"],
            slug: "makario-purnea-bihar-makhana-network"
        },
        {
            id: 11,
            title: "Why Purnea is Becoming a Key Distribution Point for Makhana in Bihar",
            excerpt: "Strategic advantages that make Purnea an increasingly important hub for makhana distribution across India and international markets.",
            image: makhanaRecipesBlog,
            author: "Makario Team",
            date: "2025-10-31",
            category: "Purnea Region",
            tags: ["distribution", "purnea", "logistics", "hub"],
            slug: "purnea-makhana-distribution-hub"
        },
        {
            id: 12,
            title: "Farmers of Purnea: The Backbone of Bihar's Makhana Supply Chain",
            excerpt: "Celebrate the hardworking farmers of Purnea whose dedication and expertise form the backbone of Bihar's thriving makhana supply chain.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-10-30",
            category: "Purnea Region",
            tags: ["farmers", "purnea", "supply", "backbone"],
            slug: "purnea-farmers-makhana-supply-chain"
        },
        // Bihar Statewide Posts
        {
            id: 13,
            title: "Bihar – The Birthplace of India's Best Makhana",
            excerpt: "Explore why Bihar has been the makhana capital of India for centuries, producing premium foxnuts that define quality standards globally.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-10-29",
            category: "Bihar Statewide",
            tags: ["bihar", "makhana", "heritage", "quality"],
            slug: "bihar-birthplace-india-best-makhana"
        },
        {
            id: 14,
            title: "Why Bihar Makhana is Gaining Global Popularity in 2025",
            excerpt: "Discover the factors driving Bihar makhana's unprecedented global growth - from health consciousness to export quality standards.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-10-28",
            category: "Bihar Statewide",
            tags: ["global", "export", "popularity", "2025"],
            slug: "bihar-makhana-global-popularity-2025"
        },
        {
            id: 15,
            title: "Top Makhana Producing Districts in Bihar: Katihar, Purnea & Beyond",
            excerpt: "A comprehensive guide to Bihar's major makhana-producing districts and their unique contributions to India's foxnut industry.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-10-27",
            category: "Bihar Statewide",
            tags: ["districts", "production", "bihar", "guide"],
            slug: "bihar-makhana-producing-districts-guide"
        },
        {
            id: 16,
            title: "Bihar's Handpicked Makhana: From Tradition to Modern Trade",
            excerpt: "How Bihar's ancient handpicking traditions are evolving with modern logistics, marketing, and quality assurance to serve global markets.",
            image: makhanaRecipesBlog,
            author: "Makario Team",
            date: "2025-10-26",
            category: "Bihar Statewide",
            tags: ["tradition", "modern", "trade", "evolution"],
            slug: "bihar-makhana-tradition-modern-trade"
        },
        {
            id: 17,
            title: "How Bihar's Climate Makes Its Makhana Unique in Quality and Taste",
            excerpt: "The science behind Bihar's ideal climate conditions that produce makhana with unmatched quality, taste, and nutritional profile.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-10-25",
            category: "Bihar Statewide",
            tags: ["climate", "quality", "taste", "science"],
            slug: "bihar-climate-makhana-quality-taste"
        },
        {
            id: 18,
            title: "Top 10 Makhana Wholesalers and Exporters in Bihar",
            excerpt: "Meet Bihar's leading makhana wholesalers and exporters who are bringing the state's finest foxnuts to domestic and international markets.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-10-24",
            category: "Bihar Statewide",
            tags: ["wholesalers", "exporters", "top", "bihar"],
            slug: "bihar-top-makhana-wholesalers-exporters"
        },
        {
            id: 19,
            title: "How Bihar's Farmers Are Keeping India's Makhana Heritage Alive",
            excerpt: "The stories of Bihar's makhana farmers who preserve centuries-old traditions while embracing innovation for a sustainable future.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-10-23",
            category: "Bihar Statewide",
            tags: ["heritage", "farmers", "tradition", "sustainable"],
            slug: "bihar-farmers-makhana-heritage-alive"
        },
        {
            id: 20,
            title: "Raw vs Roasted: Why Bihar's Raw Makhana is Preferred for Export",
            excerpt: "Understand the differences, benefits, and market preferences between raw and roasted makhana, and why exports favor Bihar's premium raw varieties.",
            image: makhanaHealthBlog,
            author: "Makario Team",
            date: "2025-10-22",
            category: "Bihar Statewide",
            tags: ["raw", "roasted", "export", "preference"],
            slug: "bihar-raw-roasted-makhana-export"
        },
        {
            id: 21,
            title: "The Economic Impact of Makhana Farming in Bihar",
            excerpt: "Explore how makhana farming has transformed Bihar's economy, creating employment and driving rural development across the state.",
            image: makhanaHeritageBlog,
            author: "Makario Team",
            date: "2025-10-21",
            category: "Bihar Statewide",
            tags: ["economic", "impact", "rural", "development"],
            slug: "bihar-makhana-economic-impact-farming"
        },
        {
            id: 22,
            title: "Makario by ARS Group – Redefining Bihar's Makhana Identity",
            excerpt: "How Makario is revolutionizing Bihar's makhana sector through direct farmer partnerships, quality assurance, and modern market access.",
            image: makhanaProcessBlog,
            author: "Makario Team",
            date: "2025-10-20",
            category: "Bihar Statewide",
            tags: ["makario", "ars", "identity", "revolution"],
            slug: "makario-ars-bihar-makhana-identity"
        }
    ];

    const categories = ["All", "Katihar Region", "Purnea Region", "Bihar Statewide"];

    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Makario Blog",
        "description": "Expert insights on Bihar makhana, foxnuts cultivation, health benefits, export trends, and sustainable farming practices.",
        "url": "https://www.makario.in/blog",
        "publisher": {
            "@type": "Organization",
            "name": "Makario",
            "logo": "https://www.makario.in/logo.png"
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
                title="Makario Blog | Makhana Health Benefits & Food Tips"
                description="Read Makario's blog about makhana health benefits, nutrition facts, recipes & healthy living tips. Expert food insights."
                keywords="makario blog, makario healthy food tips, makario knowledge hub, makhana benefits, fox nuts nutrition, healthy eating blog india, organic snacks information, food health tips, makhana recipes"
                canonical="https://www.makario.in/blog"
                ogImage="https://biharmakhana.com/images/blog-og.jpg"
                structuredData={blogStructuredData}
                breadcrumbs={[
                    { name: "Home", url: "https://www.makario.in/" },
                    { name: "Blog", url: "https://www.makario.in/blog" }
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
                                variant={category === selectedCategory ? "default" : "outline"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setSelectedCategory(category)}
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
                        {blogPosts
                            .filter(post => selectedCategory === "All" || post.category === selectedCategory)
                            .slice(0, displayedPosts)
                            .map((post) => (
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
                        {displayedPosts < blogPosts.filter(p => selectedCategory === "All" || p.category === selectedCategory).length && (
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => setDisplayedPosts(displayedPosts + 6)}
                            >
                                Load More Articles
                            </Button>
                        )}
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
