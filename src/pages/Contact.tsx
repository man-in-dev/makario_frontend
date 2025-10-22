import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Globe, Users } from "lucide-react";

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
        title="Contact Makario | Order Makhana Mumbai Gujarat South India | Fox Nuts Delivery | +91-9953240031"
        description="📞 Contact Makario for premium Bihar makhana delivery! Mumbai, Gujarat, South India. Call +91-9953240031 for orders. WhatsApp available. Same day delivery in select cities!"
        keywords="contact makario makhana, order fox nuts mumbai, gujarat makhana delivery contact, south india lotus seeds order, makhana phone number, fox nuts whatsapp order, premium makhana contact bihar, healthy snacks order india"
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
      <section className="bg-gradient-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-heritage">Get In Touch</h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-3xl mx-auto">
            Ready to bring Bihar's finest makhana to your market? Let's discuss your requirements 
            and create a partnership that benefits both of us.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm title="Send Us a Message" formType="contact" />
            
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-heritage mb-8">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-card flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-heritage" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-heritage mb-1">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-muted-foreground">{detail}</p>
                          ))}
                          <p className="text-xs text-nature mt-1">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heritage mb-4">Find Us on Map</h2>
            <p className="text-muted-foreground">
              Located in the heart of Bihar's makhana cultivation region
            </p>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.175762453114!2d87.27512247522633!3d25.632291477433427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f01fd73d41dc43%3A0xd88071293759ad87!2sMakario%20-%20The%20Pride%20Of%20Bihar%2C%20By%20ARS%20GROUP!5e0!3m2!1sen!2sin!4v1759741530421!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
