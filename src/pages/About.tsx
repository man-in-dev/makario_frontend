import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Trophy, Heart, Globe, Target, Shield, Sprout, Award, CheckCircle, Leaf } from "lucide-react";
import { useState } from "react";
import biharFieldsImage from "@/assets/blog/Makhana-The-Healthy-Indian-Snack.jpg";
import foundersImage from "@/assets/About/founder.jpg";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const About = () => {
    const [showContactForm, setShowContactForm] = useState(false);
    const { displayedText: typewriterText } = useTypewriter({
        text: "The Story Behind Makario",
        speed: 80,
        delay: 300
    });

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
                title="About Makario – Bihar's Trusted Makhana Brand"
                description="Know Makario – founded by Raja Raj & Dr. Abdullah Kalam. A Bihar-based brand delivering premium, organic makhana sourced directly from local farmers."
                keywords="about makario, bihar makhana brand, makhana founders, makhana company india"
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
            <section className="relative py-10 bg-gradient-to-br from-heritage/3 via-golden/5 to-white overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-golden/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-heritage/20 rounded-full blur-2xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-heritage min-h-[60px] md:min-h-[70px] flex items-center justify-center">
                                {typewriterText}
                                <span className={`ml-1 inline-block w-1 h-12 md:h-14 bg-heritage ${typewriterText.length === 24 ? '' : 'animate-pulse'}`}></span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                                From the heart of Bihar to every corner of India.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-4"
                            >
                                <p className="text-gray-700 text-base leading-relaxed">
                                    Makario is not just a brand — it's a vision born in the small town of <span className="font-semibold text-heritage">Falka, Katihar (Bihar)</span>, where purity, hard work, and tradition still define quality.
                                </p>

                                <p className="text-gray-700 text-base leading-relaxed">
                                    The journey began when two friends decided to bring Bihar's most loved superfood — Makhana — to the national and global stage.
                                </p>

                                <div className="space-y-3 bg-gradient-to-br from-heritage/8 to-heritage/4 p-5 rounded-xl border border-heritage/30 shadow-sm">
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-golden/40 to-heritage/30 shadow-md">
                                                <Leaf className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-heritage mb-0.5 text-sm">Er. Raja Raj</h3>
                                            <p className="text-xs text-gray-600 leading-snug">
                                                A software engineer who returned to his roots to create something meaningful from his homeland.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-golden/40 to-heritage/30 shadow-md">
                                                <Heart className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-heritage mb-0.5 text-sm">Dr. Abdullah Kalam</h3>
                                            <p className="text-xs text-gray-600 leading-snug">
                                                A physiotherapy specialist devoted to promoting healthy, natural foods for wellness.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-base leading-relaxed">
                                    Together, they combined their technical expertise, health knowledge, and love for Bihar to create <span className="font-bold text-heritage">Makario</span> — a brand representing purity and Bihar's pride.
                                </p>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                     <div className="bg-gradient-to-br from-golden/15 to-golden/5 p-3 rounded-lg border border-golden/30 shadow-sm">
                                         <h4 className="font-bold text-heritage text-xs mb-1 flex items-center gap-1.5">
                                             <Target className="w-3.5 h-3.5" />
                                             Our Mission
                                         </h4>
                                         <p className="text-xs text-gray-600 leading-snug">
                                             Make Bihar's makhana a symbol of purity worldwide.
                                         </p>
                                     </div>
                                     <div className="bg-gradient-to-br from-golden/15 to-golden/5 p-3 rounded-lg border border-golden/30 shadow-sm">
                                         <h4 className="font-bold text-heritage text-xs mb-1 flex items-center gap-1.5">
                                             <Globe className="w-3.5 h-3.5" />
                                             Our Vision
                                         </h4>
                                         <p className="text-xs text-gray-600 leading-snug">
                                             Global leader in premium authentic makhana.
                                         </p>
                                     </div>
                                 </div>

                                 <div className="pt-4 flex gap-2">
                                     <Button asChild size="sm" variant="outline" className="text-xs">
                                         <Link to="/about/founders">Founders Story</Link>
                                     </Button>
                                 </div>

                                <div className="pt-2 border-t border-gray-200">
                                    <p className="text-gray-700 text-xs leading-relaxed">
                                        <span className="font-bold block mb-1">📍 The Pride of Bihar</span>
                                        <span className="block mb-0.5">🌾 Founded by Er. Raja Raj & Dr. Abdullah Kalam</span>
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
                                <div className="relative w-full max-w-sm">
                                    {/* Outer border decoration */}
                                    <div className="absolute inset-0 border-4 border-golden/30 rounded-2xl transform -rotate-2 scale-105 shadow-lg"></div>

                                    {/* Main image container */}
                                    <div className="relative bg-white p-3 rounded-2xl shadow-2xl border-2 border-heritage/20 backdrop-blur-sm">
                                        <img
                                            src={foundersImage}
                                            alt="Founders - Er. Raja Raj and Dr. Abdullah Kalam"
                                            className="rounded-xl w-full h-auto aspect-square object-cover shadow-md"
                                        />

                                        {/* Golden accent circle */}
                                        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-golden/40 to-golden/10 border-3 border-golden/50 rounded-full shadow-lg"></div>
                                        
                                        {/* Top left accent */}
                                        <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-heritage/30 to-heritage/10 border-2 border-heritage/40 rounded-full shadow-md"></div>
                                    </div>
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

            {/* Internal Links Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-heritage">Explore More</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="hover:shadow-lg transition-all">
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Quality Assurance</h3>
                                <p className="text-sm text-gray-600 mb-4">Learn about our rigorous 5-step quality process.</p>
                                <Button asChild size="sm" variant="outline">
                                    <Link to="/quality-assurance">Learn More</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-all">
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Our Farmers</h3>
                                <p className="text-sm text-gray-600 mb-4">Meet the farmers who power our mission.</p>
                                <Button asChild size="sm" variant="outline">
                                    <Link to="/farmers">Discover</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-all">
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-heritage mb-2">Shop Now</h3>
                                <p className="text-sm text-gray-600 mb-4">Buy premium raw makhana online.</p>
                                <Button asChild size="sm" className="bg-heritage hover:bg-heritage/90">
                                    <Link to="/shop">Shop</Link>
                                </Button>
                            </CardContent>
                        </Card>
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