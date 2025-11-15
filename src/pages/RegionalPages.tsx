import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin } from "lucide-react";

const RegionalPages = () => {
    const [searchParams] = useSearchParams();
    const region = searchParams.get("region") || "katihar";

    const regionData: Record<string, any> = {
        katihar: {
            title: "Katihar Makhana Market",
            description: "Explore Katihar's thriving makhana market and premium production.",
            fullDescription: "Katihar is the heart of Bihar's makhana industry, producing some of the world's finest fox nuts. Our operations in Falka, Katihar, connect directly with 500+ farming families.",
            keywords: "katihar makhana market, katihar makhana supplier, katihar fox nuts"
        },
        purnea: {
            title: "Purnea Makhana Market",
            description: "Discover Purnea's growing role in Bihar's makhana supply chain.",
            fullDescription: "Purnea is an emerging hub for makhana supply and distribution, with growing demand for wholesale quality foxnuts.",
            keywords: "purnea makhana market, purnea makhana supplier, purnea fox nuts"
        },
        bihar: {
            title: "Bihar Makhana Industry Growth",
            description: "Bihar's makhana production and global expansion story.",
            fullDescription: "Bihar produces 85% of the world's makhana, making it the global center of this superfood. The state's unique agro-climatic conditions and farming expertise make it unmatched.",
            keywords: "bihar makhana industry, bihar fox nuts production, bihar agriculture"
        }
    };

    const data = regionData[region] || regionData.katihar;

    return (
        <div className="min-h-screen">
            <SEO
                title={`${data.title} | Makario`}
                description={data.description}
                keywords={data.keywords}
                canonical={`https://makario.in/blog/regional/${region}`}
            />
            <Header />

            <section className="py-16 bg-gradient-to-br from-heritage/3 to-white">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="REGIONAL"
                        icon={MapPin}
                        title={data.title}
                        highlightWord="Market"
                        highlightColor="green"
                        description={data.description}
                        className="mb-12"
                    />
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-2xl font-bold text-heritage mb-4">Overview</h2>
                                <p className="text-gray-600 leading-relaxed">{data.fullDescription}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-2xl font-bold text-heritage mb-4">Why Choose Makario?</h2>
                                <ul className="space-y-2 text-gray-600">
                                    <li>✓ Direct farmer partnerships</li>
                                    <li>✓ Fair prices for farmers and consumers</li>
                                    <li>✓ Rigorous quality testing</li>
                                    <li>✓ Transparent supply chain</li>
                                    <li>✓ Export-grade standards</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <Button asChild size="lg" className="bg-heritage hover:bg-heritage/90">
                            <Link to="/bulk-orders">Bulk Order Inquiry</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default RegionalPages;
