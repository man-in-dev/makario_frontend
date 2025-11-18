import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Globe, Users, MessageSquare, Building, Truck, Package } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Makario - The Pride Of Bihar", "By ARS GROUP", "Falka, Katihar, Bihar, India - 854114"],
      description: "Heart of makhana cultivation region"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+91 9953240031", "+91 8877092400"],
      description: "Available 24/7 for urgent inquiries"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@makario.in", "export@makario.in"],
      description: "We respond within 4 hours"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      description: "Indian Standard Time (IST)"
    },
    {
      icon: Globe,
      title: "Export Desk",
      details: ["Available worldwide", "Multi-language support"],
      description: "Dedicated international team"
    },
    {
      icon: Users,
      title: "Bulk Orders",
      details: ["Minimum 500kg", "Custom packaging available"],
      description: "Special rates for large quantities"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Makario – Bulk Orders, Support & Business Inquiry"
        description="Reach Makario for support, distributor partnership, bulk orders & customer queries. Bihar-based premium makhana company."
        keywords="contact makario, makhana support, makhana business inquiry"
        canonical="https://makario.in/contact"
        region="india"
        ogImage="https://makario.in/images/contact-makario-makhana.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Makario",
            "telephone": "+91-9953240031",
            "email": "orders@makario.in",
            "address": {
              "@type": "PostalAddress",
              "name": "Makario - The Pride Of Bihar, By ARS GROUP",
              "addressLocality": "Falka, Katihar",
              "addressRegion": "Bihar", 
              "addressCountry": "IN",
              "postalCode": "854114"
            },
            "areaServed": ["Mumbai", "Gujarat", "South India", "Maharashtra", "Karnataka", "Tamil Nadu"],
            "openingHours": "Mo-Su 08:00-20:00",
            "paymentAccepted": ["Cash", "UPI", "Card", "PhonePe", "GPay"],
            "priceRange": "₹₹"
          }
        }}
        breadcrumbs={[
          { name: "Home", url: "https://makario.in/" },
          { name: "Contact", url: "https://makario.in/contact" }
        ]}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heritage">
                Let's <span className="text-nature">Connect</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Ready to bring Bihar's finest makhana to your market? Let's discuss your requirements 
                and create a partnership that benefits both of us.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                    variant="hero"
                    size="lg"
                    className="group"
                    onClick={() => window.location.href = 'tel:+919953240031'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +91 9953240031
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2"
                    onClick={() => window.open('https://wa.me/919953240031', '_blank')}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </Button>
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

      {/* Quick Contact Options */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-nature">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-nature/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-6 h-6 text-nature" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heritage">Corporate Office</h3>
                    <p className="text-sm text-muted-foreground">Quick business inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-golden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-golden/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heritage">Shipping Support</h3>
                    <p className="text-sm text-muted-foreground">Track your order status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-heritage">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-heritage/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-6 h-6 text-heritage" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heritage">Bulk Orders</h3>
                    <p className="text-sm text-muted-foreground">Volume pricing available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 shadow-lg">
                <CardContent>
                  <ContactForm title="Send Us a Message" formType="contact" />
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Information Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionHeader
                eyebrow="CONTACT INFO"
                icon={Phone}
                title="Get in Touch"
                highlightWord="Touch"
                highlightColor="green"
                className="mb-8"
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-nature/60">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-heritage mb-2">{info.title}</h3>
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-sm text-muted-foreground mb-1">{detail}</p>
                            ))}
                            <p className="text-xs text-nature mt-2">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="OUR LOCATION"
            icon={MapPin}
            title="Visit Our Facility"
            highlightWord="Facility"
            highlightColor="green"
            description="Located in the heart of Bihar's makhana cultivation region"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden shadow-lg">
                  <CardContent className="p-0">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.175762453114!2d87.27512247522633!3d25.632291477433427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f01fd73d41dc43%3A0xd88071293759ad87!2sMakario%20-%20The%20Pride%20Of%20Bihar%2C%20By%20ARS%20GROUP!5e0!3m2!1sen!2sin!4v1759741530421!5m2!1sen!2sin"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heritage mb-2">Factory Location</h3>
                      <p className="text-muted-foreground">
                        Makario - The Pride Of Bihar<br />
                        By ARS GROUP<br />
                        Falka, Katihar<br />
                        Bihar, India - 854114
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heritage mb-2">Visiting Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heritage mb-2">Get Directions</h3>
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                        onClick={() => window.open('https://www.google.com/maps/search/Makario+The+Pride+Of+Bihar+Falka+Katihar/@25.632291,87.275122', '_blank')}
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        Open in Google Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heritage mb-6">
              Need Additional Support?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here to help you with any questions or concerns
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => window.open('https://wa.me/919953240031', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2"
                onClick={() => window.location.href = 'mailto:info@makario.in'}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
