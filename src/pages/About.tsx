import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Trophy, Heart, Globe, Target, Shield, Sprout, Award, CheckCircle, Leaf } from "lucide-react";
import { useState } from "react";
import biharFieldsImage from "@/assets/blog/Makhana-The-Healthy-Indian-Snack.jpg";
import foundersImage from "@/assets/brand-story.jpg";
import { motion } from "framer-motion";

const About = () => {
    const [showContactForm, setShowContactForm] = useState(false);

    const milestones = [
        {
            year: "1990s",
            title: "Heritage Begins",
            description: "Started traditional makhana cultivation in Bihar's wetlands"
        },
        {
            year: "2000s",
            title: "Quality Focus",
            description: "Implemented organic farming and quality control processes"
        },
        {
            year: "2010s",
            title: "Global Expansion",
            description: "Began exports to international markets"
        },
        {
            year: "2020s",
            title: "Market Leader",
            description: "Became one of Bihar's leading makhana exporters"
        }
    ];

    const stats = [
        {
            icon: MapPin,
            number: "5000+",
            label: "Acres of Cultivation"
        },
        {
            icon: Users,
            number: "500+",
            label: "Farming Families"
        },
        {
            icon: Trophy,
            number: "50+",
            label: "Export Countries"
        },
        {
            icon: Calendar,
            number: "25+",
            label: "Years of Excellence"
        }
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="About Makario | Premium Bihar Makhana Company Mumbai Gujarat South India | Fox Nuts Story"
                description="🌾 Discover Makario's journey from Bihar wetlands to India's premium makhana brand. Serving Mumbai, Gujarat, South India with authentic fox nuts. 25+ years of excellence!"
                keywords="makario about us, bihar makhana company, fox nuts company mumbai, premium makhana brand gujarat, south india makhana supplier, authentic bihar lotus seeds, family business makhana, organic fox nuts bihar, heritage makhana brand"
                canonical="https://makario.in/about"
                region="india"
                ogImage="https://makario.in/images/makario-about-bihar-heritage.jpg"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Makario",
                        "description": "Premium Bihar Makhana company serving Mumbai, Gujarat, and South India with authentic fox nuts since 25+ years",
                        "url": "https://makario.in",
                        "foundingDate": "1990",
                        "foundingLocation": {
                            "@type": "Place",
                            "name": "Bihar, India"
                        },
                        "areaServed": ["Mumbai", "Gujarat", "South India", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Kerala"],
                        "knowsAbout": ["Makhana Cultivation", "Fox Nuts Processing", "Organic Farming", "Export Quality"],
                        "slogan": "From Bihar's Heritage to Your Health"
                    }
                }}
                breadcrumbs={[
                    { name: "Home", url: "https://makario.in/" },
                    { name: "About Us", url: "https://makario.in/about" }
                ]}
            />
            <Header />

            {/* Founders Section - Replaces Hero */}
            <section className="relative py-20 bg-gradient-to-b from-heritage/5 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heritage">
                                The Story Behind Makario
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                From the heart of Bihar to every corner of India.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Makario is not just a brand — it's a vision born in the small town of <span className="font-semibold text-heritage">Falka, Katihar (Bihar)</span>, where purity, hard work, and tradition still define quality.
                                </p>

                                <p className="text-gray-700 text-lg leading-relaxed">
                                    The journey began when two friends decided to bring Bihar's most loved superfood — Makhana — to the national and global stage.
                                </p>

                                <div className="space-y-4 bg-heritage/5 p-6 rounded-lg border border-heritage/20">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-heritage/10">
                                                <Leaf className="h-6 w-6 text-heritage" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-heritage mb-1">Er. Raja Raj</h3>
                                            <p className="text-sm text-gray-600">
                                                A software engineer who worked in a reputed Bangalore-based tech company, dreamt of returning to his roots and creating something meaningful from his homeland.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-heritage/10">
                                                <Heart className="h-6 w-6 text-heritage" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-heritage mb-1">Dr. Abdullah Kalam</h3>
                                            <p className="text-sm text-gray-600">
                                                A physiotherapy specialist at Max Hospital, believed in promoting healthy, natural foods that support wellness and better living.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Together, they combined their technical expertise, health knowledge, and love for Bihar to create <span className="font-semibold text-heritage">Makario</span> — a brand that represents purity, authenticity, and the pride of Bihar's handpicked makhana.
                                </p>

                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Every grain of Makario makhana is <span className="font-semibold">hand-selected</span>, sourced directly from local farmers in Katihar, ensuring <span className="font-semibold">100% raw, natural, and chemical-free</span> quality.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-golden/10 p-4 rounded-lg border border-golden/20">
                                        <h4 className="font-semibold text-heritage mb-2 flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            Our Mission
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            To make Bihar's makhana a symbol of purity and pride across India and the world.
                                        </p>
                                    </div>
                                    <div className="bg-golden/10 p-4 rounded-lg border border-golden/20">
                                        <h4 className="font-semibold text-heritage mb-2 flex items-center gap-2">
                                            <Globe className="w-4 h-4" />
                                            Our Vision
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Empower local farmers, deliver authentic makhana globally, and make Makario the trusted name for premium quality.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        <span className="font-semibold block mb-2">📍 Makario – The Pride of Bihar</span>
                                        <span className="block mb-1">🌾 Founded by Er. Raja Raj & Dr. Abdullah Kalam, from Falka, Katihar</span>
                                        <span className="block">💚 Pure | Handpicked | Farm Fresh | 100% Natural</span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* Image Section */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    {/* Outer border decoration */}
                                    <div className="absolute inset-0 border-4 border-heritage/20 rounded-lg transform -rotate-3 scale-105"></div>

                                    {/* Main image container */}
                                    <div className="relative bg-white p-2 rounded-lg shadow-2xl border-4 border-heritage/10">
                                        <img
                                        src={foundersImage}
                                        alt="Founders - Er. Raja Raj and Dr. Abdullah Kalam - Makario Founders"
                                        className="rounded-md w-full h-auto aspect-square object-cover"
                                        />

                                        {/* Golden accent border */}
                                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-golden rounded-full opacity-30"></div>
                                    </div>

                                    {/* Bottom accent element */}
                                    <div className="absolute -bottom-3 -right-3 w-32 h-32 border-4 border-golden/20 rounded-lg"></div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="OUR STORY"
                        icon={Trophy}
                        title="Our Story"
                        highlightWord="Story"
                        highlightColor="green"
                        description="Bihar has been the cradle of makhana cultivation for over a millennium, creating the world's finest makhana through unique agro-climatic conditions and fertile alluvial soil."
                        className="mb-12"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                Bihar has been the cradle of makhana cultivation for over a millennium. The state's unique
                                agro-climatic conditions, with its seasonal floods and fertile alluvial soil, create the
                                perfect environment for growing the world's finest makhana.
                            </p>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                Our journey began with a simple mission: to bring the authentic taste and nutritional
                                benefits of Bihar's makhana to the world while supporting local farming communities
                                and preserving traditional cultivation methods.
                            </p>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                Today, Bihar produces over 85% of the world's makhana, making it not just a regional
                                specialty but a global superfood that represents the agricultural prowess of our state.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src={biharFieldsImage}
                                alt="Bihar Makhana Fields"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="OUR IMPACT"
                        icon={Trophy}
                        title="Our Impact"
                        highlightWord="Impact"
                        highlightColor="green"
                        description="Numbers that showcase our commitment to excellence and community development"
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center p-6">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-card mx-auto mb-4 flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-heritage" />
                                    </div>
                                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        eyebrow="OUR JOURNEY"
                        icon={Calendar}
                        title="Our Journey"
                        highlightWord="Journey"
                        highlightColor="green"
                        description="Milestones that mark our evolution from local farmers to global exporters"
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {milestones.map((milestone, index) => (
                            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                                    <h3 className="font-semibold mb-3 text-heritage">{milestone.title}</h3>
                                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section
                className="relative py-16 text-heritage"
                style={{
                    backgroundImage: `url(${biharFieldsImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-white/85"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-heritage">Our Mission</h2>
                            <p className="text-heritage/80 text-lg leading-relaxed">
                                To be the global ambassador of Bihar's makhana, promoting sustainable agriculture,
                                supporting farming communities, and delivering premium quality products that showcase
                                the rich agricultural heritage of our state to the world.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-heritage">Our Vision</h2>
                            <p className="text-heritage/80 text-lg leading-relaxed">
                                To establish Bihar as the undisputed global hub for premium makhana production,
                                while fostering innovation in traditional farming practices and creating sustainable
                                livelihoods for thousands of farming families across the state.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Popup */}
            {showContactForm && (
                <ContactForm
                    isOpen={showContactForm}
                    onClose={() => setShowContactForm(false)}
                    title="Partnership Inquiry"
                    formType="contact"
                />
            )}

            <Footer />
        </div>
    );
};

export default About;