import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, CreditCard, Shield, MapPin, Phone } from 'lucide-react';

const MumbaiPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Makario Mumbai - Premium Makhana Delivery",
    "image": "https://makario.in/images/mumbai-makhana-delivery.jpg",
    "description": "Premium Bihar Makhana delivery service in Mumbai. Fresh fox nuts delivered to your doorstep across Mumbai, Thane, and Navi Mumbai.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Delivery Service Available",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "telephone": "+91-9953240031",
    "url": "https://makario.in/mumbai",
    "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Pune"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 19.0760,
        "longitude": 72.8777
      },
      "geoRadius": "50000"
    },
    "priceRange": "₹₹",
    "paymentAccepted": ["Cash", "UPI", "Card"],
    "openingHours": "Mo-Su 09:00-21:00"
  };

  return (
    <>
      <SEO
        title="Buy Premium Makhana Online Mumbai | Fox Nuts Home Delivery Maharashtra | Makario"
        description="🏙️ Premium Bihar Makhana delivery in Mumbai! Free home delivery across Mumbai, Thane, Navi Mumbai. Same day delivery available. Order fresh fox nuts now! COD available."
        keywords="makhana delivery mumbai, fox nuts mumbai, premium makhana maharashtra, mumbai healthy snacks, fox nuts home delivery mumbai, makhana online mumbai, lotus seeds delivery mumbai, organic makhana mumbai, healthy snacks delivery mumbai, premium fox nuts maharashtra"
        canonical="https://makario.in/mumbai"
        region="mumbai"
        localBusinessSchema={localBusinessSchema}
        ogImage="https://makario.in/images/mumbai-makhana-delivery.jpg"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-heritage to-heritage/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Premium Makhana Delivery in <span className="text-golden">Mumbai</span>
                </h1>
                <p className="text-xl mb-6 text-white/90">
                  Fresh Bihar Makhana delivered to your doorstep across Mumbai, Thane & Navi Mumbai. 
                  Same day delivery available!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
                    Order Now - Free Delivery
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-heritage">
                    Call +91-9953240031
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/hero-makhana.jpg" 
                  alt="Premium Makhana Delivery Mumbai"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-golden text-heritage px-4 py-2 rounded-lg font-bold">
                  FREE Delivery in Mumbai!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Areas */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              We Deliver Across Mumbai Metropolitan Area
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { area: "South Mumbai", locations: "Colaba, Fort, Marine Lines, Churchgate" },
                { area: "Central Mumbai", locations: "Dadar, Parel, Lower Parel, Worli" },
                { area: "Western Suburbs", locations: "Bandra, Andheri, Juhu, Borivali" },
                { area: "Eastern Suburbs", locations: "Kurla, Ghatkopar, Powai, Vikhroli" }
              ].map((zone, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-golden mx-auto mb-2" />
                    <CardTitle className="text-lg">{zone.area}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{zone.locations}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mumbai Special Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Why Mumbai Loves Our Makhana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Truck className="h-8 w-8 text-golden" />,
                  title: "Same Day Delivery",
                  description: "Order before 2 PM for same day delivery across Mumbai"
                },
                {
                  icon: <Clock className="h-8 w-8 text-golden" />,
                  title: "2-Hour Express",
                  description: "Express delivery in South Mumbai & Bandra in just 2 hours"
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-golden" />,
                  title: "COD Available",
                  description: "Cash on Delivery, UPI, Cards - pay as you prefer"
                },
                {
                  icon: <Shield className="h-8 w-8 text-golden" />,
                  title: "Quality Assured",
                  description: "Fresh from Bihar farms, quality checked in Mumbai"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-heritage text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Order in Mumbai?</h2>
            <p className="text-xl mb-8">Call us now for instant ordering and same-day delivery!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">+91-9953240031</span>
              </div>
              <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
                WhatsApp Order
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default MumbaiPage;