import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Package, TrendingUp, Zap } from "lucide-react";

const ExportQuality = () => {
    const features = [
        {
            icon: Globe,
            title: "International Standards",
            description: "Meet and exceed global quality requirements for food export."
        },
        {
            icon: Package,
            title: "Export-Grade Packaging",
            description: "Specialized packaging designed for long-distance shipping and preservation."
        },
        {
            icon: TrendingUp,
            title: "Growing Demand",
            description: "Increasing international demand for premium Bihar makhana."
        },
        {
            icon: Zap,
            title: "Fast Certification",
            description: "Quick certifications for new export markets and partners."
        }
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="Export Quality Makhana | India Makhana Exports | Makario"
                description="Premium export-quality makhana from Bihar. Meet international standards. Direct supplier for global markets. Wholesale and bulk exports available."
                keywords="makhana export, export quality fox nuts, international makhana supplier, bulk export"
                canonical="https://makario.in/bulk/export-quality"
            />
            <Header />

            <section className="py-16 bg-gradient-to-br from-heritage/3 to-white">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="EXPORT"
                        icon={Globe}
                        title="Export Quality Makhana"
                        highlightWord="Export"
                        highlightColor="green"
                        description="Premium makhana meeting international standards for global markets."
                        className="mb-12"
                    />
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardContent className="pt-6">
                                    <feature.icon className="w-8 h-8 text-golden mb-3" />
                                    <h3 className="font-bold text-heritage mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standards */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-heritage">Global Compliance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-3">Standards Met</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>✓ EU Food Safety Standards</li>
                                    <li>✓ US FDA Compliance</li>
                                    <li>✓ Codex Alimentarius</li>
                                    <li>✓ ISO Food Safety Certification</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-3">Export Certifications</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>✓ FSSAI License</li>
                                    <li>✓ Import License</li>
                                    <li>✓ Organic Certificates</li>
                                    <li>✓ Shipping Documents</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-heritage text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Export?</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Partner with Makario for premium export-quality makhana with full compliance documentation.
                    </p>
                    <Button asChild size="lg" className="bg-golden hover:bg-golden/90">
                        <Link to="/contact">Request Export Quote</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ExportQuality;


