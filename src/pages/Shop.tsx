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
import { Search, Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

const Shop: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [priceRange, setPriceRange] = useState<string>('all');
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Function to scroll to all products section
    const scrollToProducts = () => {
        const productsSection = document.getElementById('all-products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
        // Optionally close mobile filters after clearing
        setFiltersOpen(false);
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
                        "numberOfItems": filteredProducts.length,
                        "itemListElement": filteredProducts.slice(0, 12).map((product, index) => ({
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

            {/* Beautiful Hero Section - Shop Page */}
            <section className="relative min-h-96 md:min-h-[500px] flex items-center overflow-hidden bg-gradient-to-br from-heritage via-amber-900/80 to-golden/60">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-golden rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-2 bg-golden/20 text-golden font-semibold text-xs md:text-sm rounded-full mb-6 backdrop-blur-sm border border-golden/30">
                            ✨ Discover Our Collection
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                            Shop Premium <span className="text-golden">Makhana</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-xl">
                            Discover our carefully curated collection of premium Bihar makhana. Each product is hand-picked and processed to ensure the highest quality and taste.
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-white/20">
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-golden">100%</div>
                                <div className="text-sm text-gray-200">Organic</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-golden">Fresh</div>
                                <div className="text-sm text-gray-200">Premium Quality</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-golden">50+</div>
                                <div className="text-sm text-gray-200">Products</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 py-4 md:py-8">
                <div className="container mx-auto px-3 md:px-4">

                    {/* All Products Section - Moved to top */}
                    <div id="all-products-section" className="py-4 md:py-8">
                        {/* All Products Section Title */}
                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">All Products</h2>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Browse our complete collection of premium Bihar makhana
                            </p>
                        </div>

                        {/* Mobile Filters Toggle */}
                        <div className="md:hidden mb-4">
                            <Button
                                variant="outline"
                                onClick={() => setFiltersOpen(!filtersOpen)}
                                className="w-full flex items-center justify-center gap-2 h-12 text-base"
                            >
                                <Filter className="h-5 w-5" />
                                Filters & Search {filtersOpen ? '(Hide)' : '(Show)'}
                            </Button>
                        </div>

                        {/* Filters and Search */}
                        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 p-4 md:p-6 mb-6 md:mb-8 ${!filtersOpen ? 'hidden md:block' : 'block'}`}>
                            {/* Mobile Search - Full Width */}
                            <div className="md:hidden mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 text-base h-12"
                                    />
                                </div>
                            </div>

                            {/* Desktop Grid Layout */}
                            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                {/* Desktop Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>

                                {/* Category Filter */}
                                <Select value={selectedCategory} onValueChange={(value) => {
                                    setSelectedCategory(value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category === 'all' ? 'All Categories' : category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Price Filter */}
                                <Select value={priceRange} onValueChange={(value) => {
                                    setPriceRange(value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Prices" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Prices</SelectItem>
                                        <SelectItem value="under-200">Under ₹200</SelectItem>
                                        <SelectItem value="200-500">₹200 - ₹500</SelectItem>
                                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                                        <SelectItem value="above-1000">Above ₹1000</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Sort */}
                                <Select value={sortBy} onValueChange={(value) => {
                                    setSortBy(value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Name (A-Z)</SelectItem>
                                        <SelectItem value="price-low">Price (Low to High)</SelectItem>
                                        <SelectItem value="price-high">Price (High to Low)</SelectItem>
                                        <SelectItem value="rating">Rating (High to Low)</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View Mode & Clear */}
                                <div className="flex gap-2">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" onClick={handleClearFilters} className="text-xs">
                                        Clear
                                    </Button>
                                </div>
                            </div>

                            {/* Mobile Filters - Stack Layout */}
                            <div className="md:hidden space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Category Filter */}
                                    <Select value={selectedCategory} onValueChange={(value) => {
                                        setSelectedCategory(value);
                                    }}>
                                        <SelectTrigger className="text-sm h-12">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category === 'all' ? 'All' : category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* Price Filter */}
                                    <Select value={priceRange} onValueChange={(value) => {
                                        setPriceRange(value);
                                    }}>
                                        <SelectTrigger className="text-sm h-12">
                                            <SelectValue placeholder="Price" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Prices</SelectItem>
                                            <SelectItem value="under-200">Under ₹200</SelectItem>
                                            <SelectItem value="200-500">₹200 - ₹500</SelectItem>
                                            <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                                            <SelectItem value="above-1000">Above ₹1000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Sort */}
                                    <Select value={sortBy} onValueChange={(value) => {
                                        setSortBy(value);
                                    }}>
                                        <SelectTrigger className="text-sm h-12">
                                            <SelectValue placeholder="Sort" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="name">Name (A-Z)</SelectItem>
                                            <SelectItem value="price-low">Price ↑</SelectItem>
                                            <SelectItem value="price-high">Price ↓</SelectItem>
                                            <SelectItem value="rating">Rating ↓</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* View Mode & Clear */}
                                    <div className="flex gap-1">
                                        <Button
                                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                            className="flex-1 text-xs px-2 h-12"
                                        >
                                            <Grid3X3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={viewMode === 'list' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                            className="flex-1 text-xs px-2 h-12"
                                        >
                                            <List className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleClearFilters}
                                            size="sm"
                                            className="text-xs px-2 flex-1 h-12"
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {searchTerm && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Search: {searchTerm}
                                        <button onClick={() => setSearchTerm('')} className="ml-1 text-xs">×</button>
                                    </Badge>
                                )}
                                {selectedCategory !== 'all' && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Category: {selectedCategory}
                                        <button onClick={() => setSelectedCategory('all')} className="ml-1 text-xs">×</button>
                                    </Badge>
                                )}
                                {priceRange !== 'all' && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Price: {priceRange}
                                        <button onClick={() => setPriceRange('all')} className="ml-1 text-xs">×</button>
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                            <p className="text-sm md:text-base text-muted-foreground">
                                Showing {filteredProducts.length} of {products.length} products
                            </p>
                            {/* Mobile View Toggle */}
                            <div className="md:hidden flex gap-2">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="flex items-center gap-1"
                                >
                                    <Grid3X3 className="h-3 w-3" />
                                    Grid
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="flex items-center gap-1"
                                >
                                    <List className="h-3 w-3" />
                                    List
                                </Button>
                            </div>
                        </div>

                        {/* Products Grid - Using Featured Product Card Design */}
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
                                            className="flex gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl border border-orange-100 transition-all duration-300 hover:border-orange-300 hover:scale-102 animate-slide-up"
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
                                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">{product.category}</Badge>
                                                    <span className="text-sm text-gray-600">⭐ {product.rating} ({product.reviewCount})</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-8 md:py-12 px-4">
                                <p className="text-lg md:text-xl font-medium text-muted-foreground mb-2">No products found</p>
                                <p className="text-sm md:text-base text-muted-foreground mb-4">Try adjusting your search or filters</p>
                                <Button onClick={handleClearFilters} variant="outline" size="sm" className="md:size-default">
                                    Clear all filters
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

                    {/* Browse All Button - Updated for new layout */}
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