import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import RetailersWholesalersSection from "@/components/RetailersWholesalersSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Truck, TrendingUp, Award, Globe, CheckCircle, Handshake, MessageCircle, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const RetailersWholesalersPage = () => {
  const PHONE = "+91 9953240031";
  const EMAIL = "info@makario.in";
  const WHATSAPP_URL = "https://wa.me/919953240031?text=Hi%20Makario!%20I%20am%20interested%20in%20becoming%20a%20retailer/wholesaler%20partner.%20Can%20you%20provide%20me%20with%20more%20details?";

  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Sales Growth",
      description: "Partner with us and see your sales grow with our premium quality makhana that customers love"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every batch is certified and tested for quality, ensuring customer satisfaction and repeat orders"
    },
    {
      icon: Truck,
      title: "Reliable Logistics",
      description: "On-time delivery across India with proper packaging to maintain product quality"
    },
    {
      icon: Award,
      title: "Premium Certifications",
      description: "FSSAI certified, export-grade quality products with international standards"
    },
    {
      icon: Globe,
      title: "Market Leadership",
      description: "Join thousands of retailers and wholesalers who trust Makario for premium makhana"
    },
    {
      icon: Handshake,
      title: "Dedicated Support",
      description: "24/7 customer support and dedicated account manager for your partnership"
    }
  ];

  const categories = [
    {
      title: "Premium Grade A+",
      description: "Largest size makhana for premium retail",
      price: "₹800-1200/kg",
      minOrder: "100kg",
      features: [
        "Export quality",
        "Premium packaging",
        "International certifications",
        "Consistent quality"
      ]
    },
    {
      title: "Commercial Grade A",
      description: "Standard size for retail and restaurants",
      price: "₹600-900/kg",
      minOrder: "500kg",
      features: [
        "Retail quality",
        "Bulk packaging",
        "Quality certified",
        "Cost-effective"
      ]
    },
    {
      title: "Industrial Grade",
      description: "Processing and food industry use",
      price: "₹400-700/kg",
      minOrder: "1000kg",
      features: [
        "Processing grade",
        "Bulk quantities",
        "Industrial packaging",
        "Competitive pricing"
      ]
    }
  ];

  const process = [
    {
      number: "1",
      title: "Get in Touch",
      description: "Contact our sales team with your business details and requirements"
    },
    {
      number: "2",
      title: "Sample & Quote",
      description: "Receive free samples and customized quote for your business needs"
    },
    {
      number: "3",
      title: "Partnership Terms",
      description: "Negotiate wholesale rates, payment terms, and delivery schedules"
    },
    {
      number: "4",
      title: "Start Selling",
      description: "Begin your partnership with exclusive margins and ongoing support"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Retailers & Wholesalers – Partner with Makario Makhana"
        description="Become a Makario partner. Premium quality makhana at wholesale prices. Join 1000+ retailers and wholesalers. Dedicated support, reliable delivery, competitive margins."
        keywords="makhana retailers, wholesale partners, makario partnership, fox nuts wholesale, makhana wholesale supplier"
        canonical="https://makario.in/retailers-wholesalers"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heritage">
                Join <span className="text-nature">Makario</span> as a Partner
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Become a part of India's fastest-growing premium makhana brand. Partner with us 
                and offer your customers the finest quality fox nuts with excellent margins.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Button>
                </a>
                <a href={`tel:${PHONE}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl font-bold text-heritage">1000+</p>
                  <p className="text-sm text-muted-foreground">Active Partners</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-nature">All India</p>
                  <p className="text-sm text-muted-foreground">Pan-India Network</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-golden">4.8★</p>
                  <p className="text-sm text-muted-foreground">Partner Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-nature/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-golden/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Our Partners Gallery Section */}
      <RetailersWholesalersSection onShowBulkForm={() => window.location.href = WHATSAPP_URL} />

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="PARTNERSHIP BENEFITS"
            icon={Award}
            title="Why Partner With Makario"
            highlightWord="Makario"
            highlightColor="green"
            description="Unlock premium margins, dedicated support, and proven sales growth with Makario's partnership program"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-heritage mb-2 text-center">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="WHOLESALE PRICING"
            icon={TrendingUp}
            title="Tiered Pricing Options"
            highlightWord="Pricing"
            highlightColor="green"
            description="Choose from our range of wholesale categories tailored to different retail and wholesale needs"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-t-4 border-t-nature/60 h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-heritage mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <div className="text-2xl font-semibold text-nature mb-2">{category.price}</div>
                    <div className="text-sm text-muted-foreground mb-6 pb-6 border-b">Min Order: {category.minOrder}</div>
                    <ul className="space-y-3">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full block">
                      <Button
                        variant="hero"
                        className="w-full mt-8"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            icon={Handshake}
            title="Partnership Process"
            highlightWord="Partnership"
            highlightColor="green"
            description="Simple 4-step process to become a Makario partner"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nature to-nature/30 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-heritage mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-nature/30 bg-gradient-to-br from-nature/5 to-golden/5">
              <CardContent className="p-12">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-heritage mb-4">
                    Ready to Grow Your Business?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join 1000+ retailers and wholesalers who are already earning excellent margins with Makario. 
                    Contact our partnership team today for exclusive deals and dedicated support.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="hero"
                        size="lg"
                        className="group"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Us
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </Button>
                    </a>
                    <a href={`tel:${PHONE}`}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Sales Team
                      </Button>
                    </a>
                    <a href={`mailto:${EMAIL}`}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Us
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RetailersWholesalersPage;
