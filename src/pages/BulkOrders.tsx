import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Target, Globe, Shield, Award, CheckCircle, Users, Scale, MessageCircle, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const BulkOrders = () => {
  const PHONE = "+91 9953240031";
  const EMAIL = "info@makario.in";
  const WHATSAPP_URL = "https://wa.me/919953240031?text=Hi%20Makario!%20I%20am%20interested%20in%20bulk%20makhana%20orders.%20Can%20you%20provide%20me%20with%20a%20quote?";

  const bulkCategories = [
    {
      title: "Premium Grade A+",
      price: "₹800-1200/kg",
      minOrder: "100kg",
      features: [
        "Largest size makhana",
        "Export quality",
        "Premium packaging",
        "International certifications"
      ],
      icon: Award,
      color: "golden"
    },
    {
      title: "Commercial Grade A",
      price: "₹600-900/kg",
      minOrder: "500kg",
      features: [
        "Standard size",
        "Retail quality",
        "Bulk packaging",
        "Quality certified"
      ],
      icon: Shield,
      color: "nature"
    },
    {
      title: "Industrial Grade",
      price: "₹400-700/kg",
      minOrder: "1000kg",
      features: [
        "Processing grade",
        "Bulk quantities",
        "Industrial packaging",
        "Cost-effective"
      ],
      icon: Package,
      color: "heritage"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Direct from Source",
      description: "Get makhana directly from Bihar's premium producers"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every batch tested for quality and consistency"
    },
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Reliable shipping to all major markets worldwide"
    },
    {
      icon: Scale,
      title: "Competitive Pricing",
      description: "Best rates for bulk quantities with transparent pricing"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Makario Makhana Bulk Orders – Wholesale Fox Nuts Supplier"
        description="Get wholesale makhana at best prices. Makario supplies premium, export-grade fox nuts pan-India. Custom packaging & bulk delivery available."
        keywords="makhana wholesale, bulk makhana supplier, makario bulk orders, fox nuts wholesale"
        canonical="https://makario.in/bulk-order"
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
                Bulk <span className="text-nature">Makhana</span> Supply
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Premium quality fox nuts in bulk quantities for retailers, distributors, and exporters. 
                Direct from Bihar's finest producers at competitive prices.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get Bulk Quote
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
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-nature/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-golden/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Bulk Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="BULK OPTIONS"
            icon={Package}
            title="Choose Your Category"
            highlightWord="Category"
            highlightColor="green"
            description="Select from our range of bulk categories tailored to different business needs"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bulkCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-t-4 border-t-nature/60">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${category.color} to-${category.color}/30 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-heritage mb-4 text-center">{category.title}</h3>
                    <div className="text-xl font-semibold text-nature mb-2 text-center">{category.price}</div>
                    <div className="text-sm text-muted-foreground mb-6 text-center">Min Order: {category.minOrder}</div>
                    <ul className="space-y-3">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
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

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="WHY CHOOSE US"
            icon={Shield}
            title="Bulk Order Benefits"
            highlightWord="Benefits"
            highlightColor="green"
            description="Experience the advantages of ordering in bulk from Bihar's leading makhana exporter"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-heritage mb-2 text-center">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            icon={Target}
            title="Bulk Order Process"
            highlightWord="Process"
            highlightColor="green"
            description="Simple and streamlined process for bulk orders"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-nature/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-nature">1</span>
                </div>
                <h3 className="text-xl font-semibold text-heritage mb-4">Submit Inquiry</h3>
                <p className="text-muted-foreground">Fill our bulk order form with your requirements and specifications</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-nature/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-nature">2</span>
                </div>
                <h3 className="text-xl font-semibold text-heritage mb-4">Get Quote</h3>
                <p className="text-muted-foreground">Receive detailed quote with pricing, delivery timeline, and terms</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-nature/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-nature">3</span>
                </div>
                <h3 className="text-xl font-semibold text-heritage mb-4">Order Fulfillment</h3>
                <p className="text-muted-foreground">Confirm order and track shipment through our logistics network</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heritage mb-6">
              Ready to Order in Bulk?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch with our bulk sales team for personalized quotes and special offers
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="hero"
                  size="lg"
                  className="group"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Request Bulk Quote
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
                  Contact Sales Team
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BulkOrders;