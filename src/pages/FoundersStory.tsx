import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Heart, Target } from "lucide-react";
import foundersImage from "@/assets/About/founder.jpg";

const FoundersStory = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Founders Story | Er. Raja Raj & Dr. Abdullah Kalam | Makario"
                description="Meet the founders of Makario – Er. Raja Raj and Dr. Abdullah Kalam. Their journey from Bihar's heart to building India's premium makhana brand."
                keywords="makario founders, raja raj, abdullah kalam, makario story, bihar makhana brand"
                canonical="https://makario.in/about/founders"
                ogImage="https://makario.in/images/founders-story.jpg"
            />
            <Header />

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-heritage/3 to-white">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="OUR FOUNDERS"
                        icon={Users}
                        title="The Visionaries Behind Makario"
                        highlightWord="Visionaries"
                        highlightColor="green"
                        description="Meet Er. Raja Raj and Dr. Abdullah Kalam – Two friends on a mission to elevate Bihar's makhana to the world."
                        className="mb-12"
                    />
                </div>
            </section>

            {/* Founders Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <img
                                src={foundersImage}
                                alt="Founders - Raja Raj and Abdullah Kalam"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-heritage">Our Journey Begins</h2>
                            <p className="text-gray-600 leading-relaxed">
                                In the small town of Falka, Katihar, two childhood friends with different expertise found a common purpose: to bring Bihar's most treasured superfood to every household in India and beyond.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                What started as a simple vision has evolved into Makario – a brand that represents authenticity, quality, and Bihar's agricultural pride.
                            </p>
                            <div className="space-y-3 mt-6">
                                <Button asChild variant="outline">
                                    <Link to="/about">Learn About Makario</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Individual Profiles */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
                        {/* Er. Raja Raj */}
                        <Card className="border-2 border-heritage/30 hover:border-heritage transition-colors">
                            <CardContent className="pt-6">
                                <h3 className="text-2xl font-bold text-heritage mb-2">Er. Raja Raj</h3>
                                <p className="text-sm text-golden font-semibold mb-4">Founder & CEO</p>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2 flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            Background
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            A software engineer who chose to return to his roots in Bihar and create something meaningful for his homeland.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2">Vision</h4>
                                        <p className="text-gray-600 text-sm">
                                            To transform Bihar's agricultural sector through technology, quality assurance, and direct farmer partnerships.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2">Expertise</h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>• Digital Technology & Innovation</li>
                                            <li>• Business Strategy & Growth</li>
                                            <li>• Supply Chain Management</li>
                                            <li>• Market Expansion</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dr. Abdullah Kalam */}
                        <Card className="border-2 border-heritage/30 hover:border-heritage transition-colors">
                            <CardContent className="pt-6">
                                <h3 className="text-2xl font-bold text-heritage mb-2">Dr. Abdullah Kalam</h3>
                                <p className="text-sm text-golden font-semibold mb-4">Co-Founder & Health Advisor</p>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2 flex items-center gap-2">
                                            <Heart className="w-4 h-4" />
                                            Background
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            A physiotherapy specialist devoted to promoting natural, healthy foods for overall wellness and nutrition.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2">Vision</h4>
                                        <p className="text-gray-600 text-sm">
                                            To make makhana a household name by educating consumers about its incredible health benefits.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heritage mb-2">Expertise</h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>• Health & Nutrition Science</li>
                                            <li>• Wellness Advocacy</li>
                                            <li>• Product Quality Standards</li>
                                            <li>• Customer Health Education</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why They Started Makario */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="MOTIVATION"
                        icon={Heart}
                        title="Why Makario Exists"
                        highlightWord="Exists"
                        highlightColor="green"
                        className="mb-12"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-3">Supporting Farmers</h3>
                                <p className="text-gray-600">
                                    Bihar's makhana farmers deserve fair prices and recognition. We built Makario to bridge the gap between farmers and consumers directly.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-3">Quality First</h3>
                                <p className="text-gray-600">
                                    We believed that quality shouldn't be compromised. Every makhana that bears the Makario name is handpicked and thoroughly tested.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-3">Health & Wellness</h3>
                                <p className="text-gray-600">
                                    Makhana's health benefits are vastly underutilized. We want every Indian to know about this superfood and its transformative power.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold text-heritage mb-3">Bihar's Pride</h3>
                                <p className="text-gray-600">
                                    Bihar produces 85% of the world's makhana. It deserves global recognition as an agricultural powerhouse.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-heritage text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Be part of the Makario movement – supporting Bihar's farmers and spreading the health benefits of premium makhana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-golden hover:bg-golden/90">
                            <Link to="/shop">Shop Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-heritage">
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FoundersStory;
