import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, CreditCard, Shield, MapPin, Phone, Star, Heart } from 'lucide-react';

const SouthIndiaPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Makario South India - Premium Makhana Delivery",
    "image": "https://makario.in/images/south-india-makhana-delivery.jpg",
    "description": "Premium Bihar Makhana delivery across South India. Fresh fox nuts delivered to Bangalore, Chennai, Hyderabad, Kochi. Healthy snacks for South Indian families.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "South India Wide Delivery",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "telephone": "+91-9953240031",
    "url": "https://makario.in/south-india",
    "areaServed": ["Bangalore", "Chennai", "Hyderabad", "Kochi", "Coimbatore", "Mysore", "Visakhapatnam"],
    "serviceArea": {
      "@type": "Place",
      "name": "South India"
    },
    "priceRange": "₹₹",
    "paymentAccepted": ["Cash", "UPI", "Card", "PhonePe", "GPay", "Paytm"],
    "openingHours": "Mo-Su 08:00-20:00"
  };

  return (
    <>
      <SEO
        title="Buy Premium Makhana South India | Fox Nuts Delivery Bangalore Chennai Hyderabad | Makario"
        description="🌴 Premium Bihar Makhana delivery across South India! Free delivery in Bangalore, Chennai, Hyderabad, Kochi. Fresh fox nuts for healthy South Indian lifestyle!"
        keywords="makhana delivery south india, fox nuts bangalore, premium makhana chennai, hyderabad healthy snacks, kochi makhana delivery, south india fox nuts online, lotus seeds bangalore, organic makhana chennai, healthy snacks south india, premium fox nuts hyderabad"
        canonical="https://makario.in/south-india"
        region="south-india"
        localBusinessSchema={localBusinessSchema}
        ogImage="https://makario.in/images/south-india-makhana-delivery.jpg"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-heritage to-heritage/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Premium Makhana for <span className="text-golden">South India</span>
                </h1>
                <p className="text-xl mb-6 text-white/90">
                  Fresh Bihar Makhana delivered across South India. Perfect healthy snacks for 
                  Bangalore IT professionals, Chennai families, and Hyderabad health enthusiasts!
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
                  <Heart className="h-5 w-5 fill-golden text-golden" />
                  <span className="text-sm">Loved by 15,000+ South Indian families</span>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/hero-makhana.jpg" 
                  alt="Premium Makhana Delivery South India"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-golden text-heritage px-4 py-2 rounded-lg font-bold">
                  Healthy South India Choice!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Cities */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              We Deliver Across South India
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  city: "Bangalore", 
                  local: "ಬೆಂಗಳೂರು",
                  state: "Karnataka",
                  areas: "Koramangala, HSR, Whitefield, Electronic City",
                  delivery: "Same Day",
                  speciality: "IT Hub Favorite"
                },
                { 
                  city: "Chennai", 
                  local: "சென்னை",
                  state: "Tamil Nadu", 
                  areas: "T.Nagar, Velachery, OMR, Anna Nagar",
                  delivery: "Next Day",
                  speciality: "Traditional Choice"
                },
                { 
                  city: "Hyderabad", 
                  local: "హైదరాబాద్",
                  state: "Telangana",
                  areas: "Banjara Hills, Gachibowli, Jubilee Hills, Kondapur",
                  delivery: "Next Day",
                  speciality: "Tech City Premium"
                },
                { 
                  city: "Kochi", 
                  local: "കൊച്ചി",
                  state: "Kerala",
                  areas: "Marine Drive, Edapally, Kakkanad, Fort Kochi",
                  delivery: "2-3 Days",
                  speciality: "Health Conscious"
                }
              ].map((city, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-golden mx-auto mb-2" />
                    <CardTitle className="text-lg">
                      {city.city} ({city.local})
                    </CardTitle>
                    <p className="text-sm text-gray-600">{city.state}</p>
                    <div className="bg-golden text-heritage px-3 py-1 rounded-full text-sm font-semibold">
                      {city.delivery} Delivery
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{city.areas}</p>
                    <div className="bg-heritage/10 text-heritage px-2 py-1 rounded text-xs font-medium">
                      {city.speciality}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why South India Loves Makhana */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Why South India Loves Makario Makhana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-golden" />,
                  title: "Premium Quality",
                  description: "Handpicked Grade A+ makhana from Bihar's best farms",
                  southBenefit: "Perfect for South Indian health-conscious lifestyle"
                },
                {
                  icon: <Heart className="h-8 w-8 text-golden" />,
                  title: "Health Benefits",
                  description: "Low sodium, high protein, perfect for fitness enthusiasts",
                  southBenefit: "Ideal for Bangalore IT professionals & Chennai fitness lovers"
                },
                {
                  icon: <Truck className="h-8 w-8 text-golden" />,
                  title: "Fast Delivery",
                  description: "Same day delivery in Bangalore, next day across South India",
                  southBenefit: "Fresh delivery to your tech parks & residential areas"
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-golden" />,
                  title: "Easy Payment",
                  description: "COD, UPI, PhonePe, GPay, Paytm - all methods accepted",
                  southBenefit: "Convenient for digital-savvy South Indian customers"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <div className="bg-golden/10 text-heritage p-2 rounded text-xs">
                      {feature.southBenefit}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* City-wise Preferences */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Popular Choices Across South Indian Cities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  city: "Bangalore Choice",
                  product: "Premium Grade A+",
                  price: "₹899/kg",
                  features: ["Perfect for IT professionals", "Quick energy boost", "Office snacking"],
                  popular: "Most ordered in HSR & Koramangala",
                  customers: "Tech professionals love it!"
                },
                {
                  city: "Chennai Favorite", 
                  product: "Family Pack Special",
                  price: "₹749/kg",
                  features: ["Traditional family choice", "Value for money", "Kids love it"],
                  popular: "T.Nagar & Anna Nagar bestseller",
                  customers: "Traditional families prefer this"
                },
                {
                  city: "Hyderabad Premium",
                  product: "Organic Health Special",
                  price: "₹999/kg",
                  features: ["100% organic", "Health conscious choice", "Chemical free"],
                  popular: "Banjara Hills & Gachibowli favorite",
                  customers: "Health enthusiasts choose this"
                }
              ].map((choice, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-heritage text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {choice.city}
                    </div>
                    <CardTitle className="text-lg">{choice.product}</CardTitle>
                    <div className="text-2xl font-bold text-golden">{choice.price}</div>
                    <p className="text-sm text-gray-600 italic">{choice.popular}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {choice.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-golden rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-golden/20 text-heritage p-2 rounded text-sm mb-4">
                      💬 "{choice.customers}"
                    </div>
                    <Button className="w-full bg-heritage hover:bg-heritage/90">
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Benefits */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-heritage">
              Perfect for South Indian Lifestyle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-golden/20 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-heritage" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Perfect for IT Professionals</h3>
                    <p className="text-gray-600">Long hours in Bangalore & Hyderabad tech parks? Makhana provides sustained energy without the crash.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-golden/20 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-heritage" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Health-Conscious Choice</h3>
                    <p className="text-gray-600">South Indians are increasingly health-conscious. Makhana fits perfectly into your wellness journey.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-golden/20 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-heritage" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Climate Friendly</h3>
                    <p className="text-gray-600">Unlike heavy snacks, makhana is light and perfect for South India's warm climate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-golden/20 p-3 rounded-full">
                    <Star className="h-6 w-6 text-heritage" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Family Approved</h3>
                    <p className="text-gray-600">From kids to grandparents, everyone in South Indian families loves the taste and health benefits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-heritage text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Order in South India?</h2>
            <p className="text-xl mb-2">Experience the finest Bihar Makhana delivered to your doorstep!</p>
            <p className="mb-8">Same day delivery in Bangalore • Next day across South India</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">+91-9953240031</span>
              </div>
              <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
                WhatsApp Order Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SouthIndiaPage;