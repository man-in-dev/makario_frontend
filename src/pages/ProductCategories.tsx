import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

const ProductCategories = () => {
    const categories = [
        {
            id: 1,
            name: "Raw Makhana 100g",
            description: "Pure, unprocessed makhana perfect for individual consumers and health enthusiasts.",
            link: "/shop?category=100g",
            features: ["100% Raw", "Handpicked", "No Additives"]
        },
        {
            id: 2,
            name: "Raw Makhana 200g",
            description: "Family-friendly pack for regular makhana lovers with better value.",
            link: "/shop?category=200g",
            features: ["200g Pack", "Premium Quality", "Value Pack"]
        },
        {
            id: 3,
            name: "Raw Makhana 500g",
            description: "Bulk friendly pack for weekly consumers and small businesses.",
            link: "/shop?category=500g",
            features: ["500g Pack", "Bulk Discount", "Fresh"]
        },
        {
            id: 4,
            name: "Raw Makhana 1kg",
            description: "Wholesale quantity for retailers, restaurants, and corporate orders.",
            link: "/shop?category=1kg",
            features: ["1kg Pack", "Best Value", "Bulk Available"]
        },
        {
            id: 5,
            name: "Family Packs",
            description: "Curated combo packs with multiple makhana varieties for families.",
            link: "/shop?category=family-packs",
            features: ["Multiple Varieties", "Family Bundle", "Gift Ready"]
        },
        {
            id: 6,
            name: "Combo Packs",
            description: "Special combination offers with complementary healthy snacks.",
            link: "/shop?category=combo-packs",
            features: ["Special Offers", "Combo Benefits", "Limited Edition"]
        }
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="Buy Premium Makhana Online | Raw Makhana Packages | Makario"
                description="Shop premium raw makhana in 100g, 200g, 500g, and 1kg packs. Direct from Bihar farmers. Pure, handpicked fox nuts for health-conscious families."
                keywords="raw makhana price, buy makhana online india, makhana 1kg price, premium fox nuts, raw makhana 500g"
                canonical="https://makario.in/shop/products"
                ogImage="https://makario.in/images/makhana-products.jpg"
            />
            <Header />

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-heritage/3 to-white">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="SHOP"
                        icon={Package}
                        title="Premium Makhana Products"
                        highlightWord="Products"
                        highlightColor="green"
                        description="Choose from our range of pure, raw makhana packs – from individual servings to bulk wholesale."
                        className="mb-12"
                    />
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Card key={category.id} className="group hover:shadow-lg transition-all">
                                <CardHeader>
                                    <CardTitle className="text-xl text-heritage group-hover:text-golden transition-colors">
                                        {category.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600">{category.description}</p>
                                    <div className="space-y-2">
                                        {category.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-golden"></div>
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button asChild className="w-full bg-heritage hover:bg-heritage/90">
                                        <Link to={category.link} className="flex items-center gap-2">
                                            Shop Now
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal Links */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-heritage">Learn More</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Quality Assurance</h3>
                                <p className="text-sm text-gray-600 mb-4">Learn about our 5-step quality process.</p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/quality-assurance">Learn More</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Makhana Benefits</h3>
                                <p className="text-sm text-gray-600 mb-4">Read about health benefits and nutrition.</p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/blog">Read Blog</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Bulk Orders</h3>
                                <p className="text-sm text-gray-600 mb-4">Get wholesale prices for large quantities.</p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/bulk-orders">Inquire Now</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductCategories;


