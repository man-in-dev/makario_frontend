import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, CreditCard, Shield, MapPin, Phone, Star } from 'lucide-react';

const GujaratPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Makario Gujarat - Premium Makhana Delivery Service",
    "image": "https://makario.in/images/gujarat-makhana-delivery.jpg",
    "description": "Premium Bihar Makhana delivery across Gujarat. Fresh fox nuts delivered to Ahmedabad, Surat, Vadodara, Rajkot. Best quality makhana in Gujarat.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gujarat Wide Delivery",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0225,
      "longitude": 72.5714
    },
    "telephone": "+91-9953240031",
    "url": "https://makario.in/gujarat",
    "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
    "serviceArea": {
      "@type": "State",
      "name": "Gujarat"
    },
    "priceRange": "₹₹",
    "paymentAccepted": ["Cash", "UPI", "Card", "PhonePe", "GPay"],
    "openingHours": "Mo-Su 08:00-20:00"
  };

  return (
    <>
      <SEO
        title="Buy Premium Makhana Gujarat | Fox Nuts Delivery Ahmedabad Surat Vadodara | Makario"
        description="🌾 Premium Bihar Makhana delivery across Gujarat! Free delivery in Ahmedabad, Surat, Vadodara, Rajkot. Fresh fox nuts from Bihar farms. Order online now!"
        keywords="makhana delivery gujarat, fox nuts ahmedabad, premium makhana surat, vadodara healthy snacks, rajkot makhana delivery, gujarat fox nuts online, lotus seeds gujarat, organic makhana ahmedabad, healthy snacks gujarat, premium fox nuts surat"
        canonical="https://makario.in/gujarat"
        region="gujarat"
        localBusinessSchema={localBusinessSchema}
        ogImage="https://makario.in/images/gujarat-makhana-delivery.jpg"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-heritage to-heritage/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Premium Makhana Delivery in <span className="text-golden">Gujarat</span>
                </h1>
                <p className="text-xl mb-6 text-white/90">
                  પ્રીમિયમ બિહાર મખાણા - Gujarat's trusted source for fresh fox nuts. 
                  Free delivery across Ahmedabad, Surat, Vadodara & Rajkot!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
                    Order Now - Free Delivery
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-heritage">
                    Call +91-9953240031
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-golden text-golden" />
                    ))}
                  </div>
                  <span className="text-sm">Trusted by 10,000+ Gujarat families</span>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/hero-makhana.jpg" 
                  alt="Premium Makhana Delivery Gujarat"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-golden text-heritage px-4 py-2 rounded-lg font-bold">
                  Gujarat વિશેષ ઓફર!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Cities */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              We Deliver Across Gujarat (ગુજરાત વ્યાપી ડિલિવરી)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  city: "Ahmedabad", 
                  gujarati: "અમદાવાદ",
                  areas: "SG Highway, Bopal, Vastrapur, CG Road",
                  delivery: "Same Day"
                },
                { 
                  city: "Surat", 
                  gujarati: "સુરત",
                  areas: "Vesu, Adajan, Ghod Dod Road, City Light",
                  delivery: "Next Day"
                },
                { 
                  city: "Vadodara", 
                  gujarati: "વડોદરા",
                  areas: "Alkapuri, Fatehgunj, Manjalpur, Sayajigunj",
                  delivery: "Next Day"
                },
                { 
                  city: "Rajkot", 
                  gujarati: "રાજકોટ",
                  areas: "University Road, Kalawad Road, Bhaktinagar",
                  delivery: "2-3 Days"
                },
                { 
                  city: "Gandhinagar", 
                  gujarati: "ગાંધીનગર",
                  areas: "Sector 1-30, Infocity, GIFT City",
                  delivery: "Same Day"
                },
                { 
                  city: "Bhavnagar", 
                  gujarati: "ભાવનગર",
                  areas: "Gaurishankar Lake, Nilambag, Crescent Circle",
                  delivery: "2-3 Days"
                }
              ].map((city, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-golden mx-auto mb-2" />
                    <CardTitle className="text-lg">
                      {city.city} ({city.gujarati})
                    </CardTitle>
                    <div className="bg-golden text-heritage px-3 py-1 rounded-full text-sm font-semibold">
                      {city.delivery} Delivery
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{city.areas}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gujarat Special Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Why Gujarat Chooses Makario (મકારિયો કેમ પસંદ કરે છે)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Truck className="h-8 w-8 text-golden" />,
                  title: "Free Delivery",
                  gujarati: "મફત ડિલિવરી",
                  description: "Free delivery on orders above ₹500 across Gujarat"
                },
                {
                  icon: <Shield className="h-8 w-8 text-golden" />,
                  title: "Premium Quality",
                  gujarati: "પ્રીમિયમ ગુણવત્તા",
                  description: "Direct from Bihar farms, handpicked for Gujarat families"
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-golden" />,
                  title: "Easy Payment",
                  gujarati: "સરળ પેમેન્ટ",
                  description: "COD, UPI, PhonePe, GPay - all payment methods accepted"
                },
                {
                  icon: <Clock className="h-8 w-8 text-golden" />,
                  title: "Quick Delivery",
                  gujarati: "ઝડપી ડિલિવરી",
                  description: "Same day delivery in Ahmedabad & Gandhinagar"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-golden font-medium mb-2">{feature.gujarati}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular in Gujarat */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Popular Makhana Varieties in Gujarat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Premium Grade A+",
                  price: "₹899/kg",
                  features: ["Extra Large Size", "Crispy Texture", "Perfect for Gifting"],
                  popular: "Most Popular in Ahmedabad"
                },
                {
                  name: "Family Pack Special",
                  price: "₹749/kg",
                  features: ["Good Size", "Family Friendly", "Best Value"],
                  popular: "Surat Family Favorite"
                },
                {
                  name: "Organic Premium",
                  price: "₹999/kg",
                  features: ["100% Organic", "Chemical Free", "Health Conscious"],
                  popular: "Vadodara Health Choice"
                }
              ].map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="text-2xl font-bold text-golden">{product.price}</div>
                    <p className="text-sm text-gray-600 italic">{product.popular}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-golden rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 bg-heritage hover:bg-heritage/90">
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-heritage text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Order in Gujarat?</h2>
            <p className="text-xl mb-2">આજે જ ઓર્ડર કરો અને તાજા મખાણાનો સ્વાદ લો!</p>
            <p className="mb-8">Call us now for instant ordering across Gujarat!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">+91-9953240031</span>
              </div>
              <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
                WhatsApp Order (વોટ્સએપ ઓર્ડર)
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default GujaratPage;