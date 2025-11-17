import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { FeaturedProductCard } from '../components/product/FeaturedProductCard';
import { products, getFeaturedProducts } from '../data/products';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, Grid3X3, List, X } from 'lucide-react';

const Shop: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [priceRange, setPriceRange] = useState<string>('all');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map(p => p.category)));
        return ['all', ...cats];
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

            let matchesPrice = true;
            if (priceRange !== 'all') {
                const price = product.price;
                switch (priceRange) {
                    case 'under-200':
                        matchesPrice = price < 200;
                        break;
                    case '200-500':
                        matchesPrice = price >= 200 && price <= 500;
                        break;
                    case '500-1000':
                        matchesPrice = price >= 500 && price <= 1000;
                        break;
                    case 'above-1000':
                        matchesPrice = price > 1000;
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
            default:
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }, [searchTerm, selectedCategory, sortBy, priceRange]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSortBy('name');
        setPriceRange('all');
    };

    const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange !== 'all' || sortBy !== 'name';

    // Scroll to all products section
    const scrollToProducts = () => {
        const productsSection = document.getElementById('all-products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <SEO
                title="Buy Makario Makhana Online | Premium Flavoured Snacks India"
                description="Shop premium makhana snacks online at best prices. Flavoured fox nuts, combo packs & healthy snacks. Free delivery in India."
                keywords="makario snacks online, makario makhana shop, makario special products, buy flavoured makhana, healthy snacks online india, premium fox nuts rate, makhana combo packs, best makhana for weight loss, organic lotus seeds, flavoured foxnuts"
                canonical="https://makario.in/shop"
                ogImage="https://makario.in/images/makhana-online-shop.jpg"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Premium Bihar Makhana Shop - Fresh Fox Nuts Online",
                    "description": "Shop premium Bihar makhana collection online. Fresh, organic fox nuts with secure checkout and fast delivery across India.",
                    "url": "https://makario.in/shop",
                    "image": "https://makario.in/images/makhana-shop-collection.jpg",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Makario",
                        "url": "https://makario.in"
                    },
                    "mainEntity": {
                        "@type": "ItemList",
                        "name": "Premium Makhana Products",
                        "description": "Curated collection of premium Bihar makhana products",
                        "numberOfItems": products.length,
                        "itemListElement": products.slice(0, 12).map((product, index) => ({
                            "@type": "Product",
                            "position": index + 1,
                            "name": product.name,
                            "description": product.description,
                            "image": product.image,
                            "url": `https://makario.in/product/${product.id}`,
                            "offers": {
                                "@type": "Offer",
                                "price": product.price,
                                "priceCurrency": "INR",
                                "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "Makario"
                                }
                            },
                            "brand": {
                                "@type": "Brand",
                                "name": "Makario"
                            },
                            "category": product.category,
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": product.rating,
                                "ratingCount": product.reviewCount || 10
                            }
                        }))
                    },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://makario.in"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Shop",
                                "item": "https://makario.in/shop"
                            }
                        ]
                    }
                }}
                breadcrumbs={[
                    { name: "Home", url: "https://makario.in/" },
                    { name: "Shop", url: "https://makario.in/shop" }
                ]}
            />
            <Header />



            <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 py-4 md:py-8 mt-[30px]">
                <div className="container mx-auto px-3 md:px-4">

                    {/* All Products Section */}
                    <div id="all-products-section" className="py-4 md:py-8">
                        {/* Section Title */}
                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">All Products</h2>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Browse our complete collection of premium Bihar makhana
                            </p>
                        </div>



                        {/* Top Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredProducts.length} of {products.length} products
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="flex items-center gap-2"
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                    <span className="hidden sm:inline">Grid</span>
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="flex items-center gap-2"
                                >
                                    <List className="h-4 w-4" />
                                    <span className="hidden sm:inline">List</span>
                                </Button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={`max-w-7xl mx-auto ${viewMode === 'list' ? 'space-y-4' : ''}`}>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 animate-fade-in">
                                        {filteredProducts.map((product, index) => (
                                            <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                                                <FeaturedProductCard
                                                    product={product}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-fade-in">
                                        {filteredProducts.map((product, index) => (
                                            <div
                                                key={product.id}
                                                style={{ animationDelay: `${index * 50}ms` }}
                                                className="flex gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl border border-orange-100 transition-all duration-300 hover:border-orange-300 hover:scale-102 animate-slide-up cursor-pointer"
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            >
                                                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xl font-bold text-orange-600">₹{product.price}</span>
                                                        {product.originalPrice && (
                                                            <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{product.category}</span>
                                                        <span className="text-sm text-gray-600">⭐ {product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-lg font-medium text-muted-foreground mb-4">No products found</p>
                                <Button onClick={handleClearFilters} variant="outline">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-10"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 font-semibold text-xs md:text-sm rounded-full mb-4 animate-pulse">
                            ⭐ Customer Favorites
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-wide bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            FEATURED PRODUCTS
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                            Discover our premium collection of Bihar makhana products. Fresh, organic, and healthy fox nuts
                            directly from Bihar's finest cultivation areas.
                        </p>
                    </div>

                    {/* Featured Products Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                            {getFeaturedProducts().slice(0, 5).map((product) => (
                                <div
                                    key={product.id}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105">
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-3 md:p-4">
                                            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                <span className="text-lg md:text-xl font-bold text-primary">₹{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="text-xs md:text-sm text-muted-foreground line-through">
                                                        ₹{product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Browse All Button */}
                    <div className="text-center mt-16">
                        <Button
                            onClick={scrollToProducts}
                            size="lg"
                            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            ↓ View Full Collection
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export { Shop };
export default Shop;
