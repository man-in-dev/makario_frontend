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
import foundersImage from "@/assets/founder.jpg";
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
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-heritage/10 via-white to-golden/5 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-golden/5 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-heritage/5 rounded-full -ml-36 -mb-36"></div>
            
            <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
            >
            {/* Section Header */}
            <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 mb-4">
              <Leaf className="w-6 h-6 text-golden" />
              <span className="text-sm font-semibold text-golden uppercase tracking-widest">Our Heritage</span>
              <Leaf className="w-6 h-6 text-golden" />
            </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-heritage">
            The Story Behind <span className="text-golden">Makario</span>
            </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            "From the heart of Bihar to every corner of India."
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
            >
            <p className="text-gray-700 text-lg leading-relaxed">
            <span className="text-2xl font-bold text-heritage">Makario</span> is not just a brand — it's a vision born in the small town of <span className="font-semibold text-heritage">Falka, Katihar (Bihar)</span>, where purity, hard work, and tradition still define quality.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
            The journey began when <span className="font-bold text-heritage">two friends</span> decided to bring Bihar's most loved superfood — <span className="font-semibold">Makhana</span> — to the national and global stage.
            </p>

            {/* Founders Cards */}
            <div className="space-y-4 mt-8 mb-8">
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-heritage/5 to-golden/5 p-6 rounded-xl border-2 border-heritage/20 hover:border-golden/40 hover:shadow-lg transition-all"
            >
            <div className="flex gap-4 items-start">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-heritage to-heritage/60 flex-shrink-0">
                <Leaf className="h-7 w-7 text-white" />
                </div>
                  <div className="flex-1">
                        <h3 className="font-bold text-heritage text-lg mb-1">Er. Raja Raj</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    A software engineer who worked in a reputed Bangalore-based tech company, dreamt of returning to his roots and creating something meaningful from his homeland.
                    </p>
                      </div>
                </div>
            </motion.div>
              
                  <motion.div
                initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-golden/5 to-heritage/5 p-6 rounded-xl border-2 border-golden/30 hover:border-heritage/40 hover:shadow-lg transition-all"
            >
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-golden to-golden/60 flex-shrink-0">
              <Heart className="h-7 w-7 text-white" />
              </div>
                <div className="flex-1">
                  <h3 className="font-bold text-golden text-lg mb-1">Dr. Abdullah Kalam</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                A physiotherapy specialist at Max Hospital, believed in promoting healthy, natural foods that support wellness and better living.
              </p>
              </div>
            </div>
            </motion.div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed font-medium pt-4 border-t-2 border-golden/20">
                  Together, they combined their <span className="text-heritage">technical expertise</span>, <span className="text-golden">health knowledge</span>, and <span className="text-heritage">love for Bihar</span> to create <span className="font-bold text-lg text-heritage">Makario</span> — a brand that represents <span className="font-semibold">purity, authenticity, and the pride of Bihar's handpicked makhana</span>.
            </p>

            <div className="bg-white p-6 rounded-xl border-2 border-heritage/30 shadow-md">
            <p className="text-gray-700 text-base leading-relaxed mb-4">
            Every grain of <span className="font-bold text-heritage">Makario makhana</span> is <span className="font-semibold text-golden">hand-selected</span>, sourced directly from local farmers in Katihar, ensuring <span className="font-bold text-heritage">100% raw, natural, and chemical-free</span> quality.
            </p>
            </div>

                {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-heritage/10 to-heritage/5 p-5 rounded-xl border-2 border-heritage/30 hover:shadow-lg transition-all"
                >
                <h4 className="font-bold text-heritage mb-3 flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-golden" />
                Our Mission
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                To make Bihar's makhana a symbol of <span className="font-semibold text-heritage">purity and pride</span> across India and the world.
            </p>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-golden/10 to-golden/5 p-5 rounded-xl border-2 border-golden/30 hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-heritage mb-3 flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-golden" />
                Our Vision
                </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                      Empower local farmers, deliver <span className="font-semibold">authentic makhana globally</span>, make Makario the trusted premium brand.
                      </p>
                      </motion.div>
                      </div>

                {/* Identity Statement */}
                <div className="bg-gradient-to-r from-heritage to-golden/20 p-6 rounded-xl text-white shadow-lg border border-golden/30 pt-6">
                  <p className="text-sm md:text-base leading-relaxed space-y-3">
                    <span className="font-bold text-lg block mb-3">📍 Makario – The Pride of Bihar</span>
                    <span className="block">🌾 Founded by <span className="font-semibold">Er. Raja Raj</span> & <span className="font-semibold">Dr. Abdullah Kalam</span>, from Falka, Katihar</span>
                    <span className="block font-semibold">💚 Pure | Handpicked | Farm Fresh | 100% Natural</span>
                  </p>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center items-center order-1 lg:order-2"
              >
                <div className="relative w-full max-w-md">
                  {/* Animated background circle */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-golden/30 rounded-2xl"
                  ></motion.div>

                  {/* Main image container with multiple borders */}
                  <div className="relative p-1 bg-gradient-to-br from-golden via-golden/50 to-heritage rounded-3xl shadow-2xl">
                    <div className="bg-white p-4 rounded-3xl">
                      <img
                        src={foundersImage}
                        alt="Founders - Er. Raja Raj and Dr. Abdullah Kalam - Makario Founders from Bihar"
                        className="rounded-2xl w-full h-auto aspect-square object-cover shadow-lg"
                      />
                    </div>

                    {/* Corner accent elements */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-6 -right-6 w-20 h-20 border-4 border-golden rounded-full opacity-40"
                    ></motion.div>
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-heritage/20 rounded-3xl opacity-40"></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-transparent to-transparent opacity-20 pointer-events-none"></div>
                  </div>

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-heritage to-golden text-white px-6 py-3 rounded-full font-bold shadow-lg border-4 border-white"
                  >
                    🌾 Founders of Makario
                  </motion.div>
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