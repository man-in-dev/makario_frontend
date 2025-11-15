import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Beaker, Users, Leaf } from "lucide-react";

const QualityProcess = () => {
    const steps = [
        {
            number: 1,
            title: "Farm Selection",
            description: "We partner with certified organic farmers in Katihar and Purnea with proven track records."
        },
        {
            number: 2,
            title: "Handpicking",
            description: "Each makhana is carefully handpicked at the right maturity stage by trained farmers."
        },
        {
            number: 3,
            title: "Cleaning Process",
            description: "Multiple rounds of water washing and sun-drying ensure purity and quality."
        },
        {
            number: 4,
            title: "Laboratory Testing",
            description: "Certified lab tests for microbial count, pesticide residues, and quality standards."
        },
        {
            number: 5,
            title: "Final Inspection",
            description: "Manual inspection for color, size, and defects before packaging."
        }
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="Makario Quality Process | 5-Step Quality Assurance | Raw Makhana"
                description="Discover Makario's rigorous 5-step quality process. Laboratory tested, handpicked, certified makhana from Bihar farms to your home."
                keywords="makhana quality check, raw makhana testing, quality assurance, farm to table, certified makhana"
                canonical="https://makario.in/quality/process"
                ogImage="https://makario.in/images/quality-process.jpg"
            />
            <Header />

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-heritage/3 to-white">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="QUALITY"
                        icon={CheckCircle}
                        title="Our 5-Step Quality Process"
                        highlightWord="Quality"
                        highlightColor="green"
                        description="From farm to your table – rigorous testing at every step ensures only the finest makhana reaches you."
                        className="mb-12"
                    />
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="space-y-6">
                        {steps.map((step) => (
                            <Card key={step.number} className="border-2 border-heritage/20 hover:border-heritage transition-colors">
                                <CardContent className="pt-6">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-golden text-white font-bold text-lg">
                                                {step.number}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-heritage mb-2">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testing & Certifications */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="CERTIFICATIONS"
                        icon={Beaker}
                        title="Laboratory Testing & Certifications"
                        highlightWord="Testing"
                        highlightColor="green"
                        className="mb-12"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-4">Safety Testing</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>✓ Microbial Count (Bacterial/Fungal)</li>
                                    <li>✓ Pesticide Residue Analysis</li>
                                    <li>✓ Heavy Metal Testing</li>
                                    <li>✓ Moisture Content Analysis</li>
                                    <li>✓ Allergen Detection</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-4">Quality Standards</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>✓ FSSAI Certified</li>
                                    <li>✓ ISO 22000 Food Safety</li>
                                    <li>✓ Organic Certification</li>
                                    <li>✓ Export Grade Standards</li>
                                    <li>✓ GMP Compliant</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Our Process Matters */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="COMMITMENT"
                        icon={Leaf}
                        title="Why Our Quality Process Matters"
                        highlightWord="Matters"
                        highlightColor="green"
                        className="mb-12"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Your Health</h3>
                                <p className="text-gray-600 text-sm">
                                    Every test ensures your family is consuming only the purest, safest makhana without any harmful residues.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Farmer Support</h3>
                                <p className="text-gray-600 text-sm">
                                    Our rigorous standards help farmers adopt better practices and receive premium prices for quality production.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Global Trust</h3>
                                <p className="text-gray-600 text-sm">
                                    Export-grade quality ensures our makhana meets international standards for markets worldwide.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-heritage text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Experience Premium Quality</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Try Makario's meticulously tested, handpicked makhana today and taste the difference quality makes.
                    </p>
                    <Button asChild size="lg" className="bg-golden hover:bg-golden/90">
                        <Link to="/shop">Shop Quality Makhana</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default QualityProcess;
