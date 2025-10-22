import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import QuoteForm from "@/components/QuoteForm";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ProductList } from "../components/product/ProductList";
import { FeaturedProductsSection } from "../components/product/FeaturedProductsSection";
import BlogSection from "@/components/BlogSection";
import { getFeaturedProducts } from "../data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Shield, Truck, Users, Sprout, Award, Leaf, Target, CheckCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import biharFieldsImage from "@/assets/bihar-fields.jpg";
import globalExportImage from "@/assets/global-export.jpg";
import farmersWorkingImage from "@/assets/farmers-working.jpg";
import cultivationProcessImage from "@/assets/cultivation-process.jpg";
import biharAgricultureImage from "@/assets/bihar-agriculture.jpg";
import brandStoryImage from "@/assets/brand-story.jpg";

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  
  // Structured Data for Homepage
  const homePageStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bihar Makhana",
      "alternateName": "Makari Brand",
      "description": "Leading makhana exporter from Bihar, India. Premium quality foxnuts supplier globally with 100% organic lotus seeds.",
      "url": "https://makario.in",
      "logo": "https://makario.in/logo.png",
      "image": "https://makario.in/images/bihar-makhana-hero.jpg",
      "telephone": "+91-9953240031",
      "email": "info@makario.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Makhana Export Hub",
        "addressLocality": "Darbhanga",
        "addressRegion": "Bihar",
        "postalCode": "846004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.1542,
        "longitude": 85.8918
      },
      "foundingDate": "2020",
      "numberOfEmployees": "50-100",
      "areaServed": [
        "India", "United States", "United Kingdom", "Canada", "Australia", 
        "Germany", "France", "Netherlands", "Singapore", "UAE"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Makhana Products",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "Premium Organic Makhana",
            "description": "100% Organic Foxnuts from Bihar"
          },
          {
            "@type": "Product", 
            "name": "Bulk Makhana",
            "description": "Wholesale quantities for retailers"
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
      },
      "sameAs": [
        "https://www.facebook.com/biharmakhana",
        "https://www.instagram.com/biharmakhana",
        "https://twitter.com/biharmakhana",
        "https://www.linkedin.com/company/biharmakhana"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bihar Makhana",
      "url": "https://makario.in",
      "description": "Premium Makhana Exporter from Bihar, India",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://makario.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];
  const features = [
    {
      icon: Heart,
      title: "Pure & Natural",
      description: "100% organic makhana grown in the pristine wetlands of Bihar"
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Traditional methods ensuring the highest quality standards"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Exporting to 50+ countries across the world"
    },
    {
      icon: Truck,
      title: "Bulk Orders",
      description: "Competitive pricing for wholesale and bulk purchases"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Buy Premium Bihar Makhana Online India | #1 Fox Nuts Delivery | Makario"
        description="� India's #1 Premium Bihar Makhana! ✅ 100% Organic Fox Nuts ✅ Free Delivery Mumbai, Gujarat, South India ✅ COD Available ✅ Same Day Delivery. Order Fresh Healthy Snacks Now!"
        keywords="buy premium makhana online india, fox nuts delivery mumbai gujarat bangalore chennai, bihar makhana online shopping, organic lotus seeds home delivery, healthy snacks online india, fresh makhana bulk order, premium fox nuts brand, makhana online store india, fox nuts ecommerce, bihar agriculture products online"
        canonical="https://makario.in/"
        region="india"
        ogImage="https://makario.in/images/makario-premium-makhana-india.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Makario",
          "alternateName": ["Makario Premium Makhana", "Bihar Makhana Pride"],
          "description": "India's leading premium Bihar makhana delivery service. Fresh fox nuts delivered across Mumbai, Gujarat, Bangalore, Chennai, Hyderabad with same day delivery options.",
          "url": "https://makario.in",
          "logo": "https://makario.in/logo.png",
          "image": [
            "https://makario.in/images/makario-premium-makhana.jpg",
            "https://makario.in/images/bihar-makhana-collection.jpg",
            "https://makario.in/images/organic-fox-nuts-india.jpg"
          ],
          "telephone": "+91-9953240031",
          "email": "orders@makario.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Makhana Export Hub, Agriculture Complex",
            "addressLocality": "Darbhanga",
            "addressRegion": "Bihar",
            "postalCode": "846004", 
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "26.1542",
            "longitude": "85.8918"
          },
          "areaServed": [
            {
              "@type": "City", 
              "name": "Mumbai",
              "containedInPlace": {"@type": "State", "name": "Maharashtra"}
            },
            {
              "@type": "State", 
              "name": "Gujarat",
              "containedInPlace": {"@type": "Country", "name": "India"}
            }, 
            {
              "@type": "City", 
              "name": "Bangalore",
              "containedInPlace": {"@type": "State", "name": "Karnataka"}
            },
            {
              "@type": "City", 
              "name": "Chennai",
              "containedInPlace": {"@type": "State", "name": "Tamil Nadu"}
            },
            {
              "@type": "City", 
              "name": "Hyderabad",
              "containedInPlace": {"@type": "State", "name": "Telangana"}
            }
          ],
          "serviceType": "Premium Makhana Delivery Service",
          "priceRange": "₹₹",
          "paymentAccepted": ["Cash", "UPI", "Card", "PhonePe", "GPay", "Online Banking"],
          "deliveryLeadTime": "P1D",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Premium Makhana Products",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Premium Grade A+ Makhana",
                  "category": "Healthy Snacks"
                },
                "price": "₹299-899",
                "priceCurrency": "INR"
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Organic Fox Nuts",
                  "category": "Organic Food"
                },
                "price": "₹399-1199",
                "priceCurrency": "INR"
              }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/makario",
            "https://www.instagram.com/makario_official",
            "https://twitter.com/makario_india"
          ]
        }}
      />
      <Header />
      <Hero />
      
      {/* Featured Products Section - Season's Top Picks */}
      <FeaturedProductsSection 
        products={getFeaturedProducts()}
        title="SEASON'S TOP PICKS"
      />
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Why Choose Bihar Makhana?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the exceptional quality that makes our makhana the preferred choice worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-light to-nature/30 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-heritage" />
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Bihar Heritage Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">The Pride of Bihar</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                For generations, Bihar has been the heartland of makhana cultivation. Our fertile wetlands 
                and traditional farming techniques have made us the world's largest producer of this 
                superfood, accounting for over 85% of global production.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From the sacred ponds of Mithila to international markets, our makhana carries 
                the essence of Bihar's agricultural heritage and commitment to quality.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">Learn About Our Heritage</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={biharFieldsImage}
                alt="Bihar Makhana Fields"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-golden-light to-nature/20 p-6 rounded-lg shadow-lg border border-nature/30">
                <div className="text-2xl font-bold text-heritage">85%</div>
                <div className="text-sm text-nature font-medium">Global Production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section 
        className="relative py-16 text-white"
        style={{
          backgroundImage: `url(${globalExportImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={globalExportImage}
                alt="Global Export"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">From Bihar to the World</h2>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Our premium makhana reaches tables across North America, Europe, Australia, 
                and Asia. We've built a global supply chain that maintains freshness and 
                quality while connecting Bihar's farmers to international markets.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-white/80">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-sm text-white/80">Tons Annually</div>
                </div>
              </div>
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-heritage" onClick={() => setShowContactForm(true)}>
                Contact for Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={farmersWorkingImage}
                alt="Makhana Farmers Working in Bihar Fields"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-golden to-nature p-4 rounded-full shadow-lg border border-nature/40">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">The Heart of Our Success</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Behind every premium makhana lies the dedication of Bihar's skilled farmers. 
                Working in the traditional wetlands, they continue centuries-old cultivation 
                practices passed down through generations.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">5000+ Family Farmers Connected</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Traditional Handpicked Methods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Fair Trade & Direct Support</span>
                </div>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/farmers">Meet Our Farmers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultivation Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Traditional Cultivation Process</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover the ancient art of makhana cultivation that has been perfected over centuries in Bihar's wetlands
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden to-golden-dark flex items-center justify-center text-white font-bold shadow-md">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">Pond Preparation</h3>
                    <p className="text-muted-foreground">Sacred ponds are prepared with organic fertilizers and traditional methods</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/80 flex items-center justify-center text-white font-bold shadow-md">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">Seed Planting</h3>
                    <p className="text-muted-foreground">Lotus seeds are carefully planted in the muddy pond beds during monsoon</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden to-golden-dark flex items-center justify-center text-white font-bold shadow-md">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">Natural Growth</h3>
                    <p className="text-muted-foreground">Plants grow naturally for 4-5 months with minimal intervention</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/80 flex items-center justify-center text-white font-bold shadow-md">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">Handpicked Harvest</h3>
                    <p className="text-muted-foreground">Farmers dive to collect seeds by hand, ensuring premium quality</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={cultivationProcessImage}
                alt="Traditional Makhana Cultivation Process"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-heritage p-6 rounded-lg shadow-lg text-white">
                <div className="text-2xl font-bold">4-5</div>
                <div className="text-sm opacity-90">Months Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bihar Agriculture Section */}
      <section 
        className="relative py-16 text-heritage"
        style={{
          backgroundImage: `url(${biharAgricultureImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">Bihar: The Agricultural Powerhouse</h2>
              <p className="text-heritage/80 text-lg mb-6 leading-relaxed">
                Bihar's fertile Gangetic plains and abundant water resources create the perfect 
                ecosystem for makhana cultivation. The state's agricultural heritage spans millennia, 
                making it India's agricultural heartland.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-heritage mb-1">60%</div>
                  <div className="text-sm text-heritage/70">of India's Makhana</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-heritage mb-1">15,000</div>
                  <div className="text-sm text-heritage/70">Hectares Under Cultivation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-heritage mb-1">80%</div>
                  <div className="text-sm text-heritage/70">Rural Employment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-heritage mb-1">₹500Cr</div>
                  <div className="text-sm text-heritage/70">Annual Revenue</div>
                </div>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/agriculture">Explore Agriculture</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={biharAgricultureImage}
                alt="Bihar Agriculture Landscape"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm p-4 rounded-full shadow-lg border border-white/20">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={brandStoryImage}
                alt="Our Brand Story"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-golden-light to-nature/20 p-6 rounded-lg shadow-lg border border-nature/30">
                <div className="text-2xl font-bold text-heritage">25+</div>
                <div className="text-sm text-nature font-medium">Years Legacy</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">Our Brand Story</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Born from the vision to showcase Bihar's agricultural excellence to the world, 
                our brand represents the perfect blend of traditional farming wisdom and modern 
                quality standards. We are not just exporters; we are custodians of Bihar's rich heritage.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">ISO 22000 Certified Quality</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Direct Farmer Partnership Model</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Global Quality Standards</span>
                </div>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">Discover Our Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">From Farm to Global Markets</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our comprehensive quality process ensures that every makhana meets international standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sprout,
                title: "Organic Cultivation",
                description: "Chemical-free farming in pristine wetlands"
              },
              {
                icon: Users,
                title: "Expert Harvesting",
                description: "Skilled farmers using traditional methods"
              },
              {
                icon: Shield,
                title: "Quality Processing",
                description: "Modern facilities with traditional care"
              },
              {
                icon: Globe,
                title: "Global Distribution",
                description: "Worldwide delivery maintaining freshness"
              }
            ].map((process, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden-light to-nature/30' : 'from-nature to-nature/80'} mx-auto mb-4 flex items-center justify-center`}>
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3 text-heritage text-lg">{process.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Delivery Section */}
      <section className="py-16 bg-heritage text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">We Deliver Across India</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Fresh Bihar makhana delivered to your doorstep across India's major cities. 
              Same day delivery available in select areas!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link to="/mumbai" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
                <CardContent className="pt-8 pb-6">
                  <MapPin className="h-12 w-12 text-golden mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Mumbai</h3>
                  <p className="text-white/80 mb-4">Same day delivery across Mumbai, Thane & Navi Mumbai</p>
                  <div className="bg-golden text-heritage px-4 py-2 rounded-full font-semibold">
                    Free Delivery Above ₹500
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/gujarat" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
                <CardContent className="pt-8 pb-6">
                  <MapPin className="h-12 w-12 text-golden mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Gujarat</h3>
                  <p className="text-white/80 mb-4">Ahmedabad, Surat, Vadodara, Rajkot & more</p>
                  <div className="bg-golden text-heritage px-4 py-2 rounded-full font-semibold">
                    Next Day Delivery
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/south-india" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
                <CardContent className="pt-8 pb-6">
                  <MapPin className="h-12 w-12 text-golden mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">South India</h3>
                  <p className="text-white/80 mb-4">Bangalore, Chennai, Hyderabad, Kochi</p>
                  <div className="bg-golden text-heritage px-4 py-2 rounded-full font-semibold">
                    Express Delivery
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" className="bg-golden hover:bg-golden/90 text-heritage font-semibold">
              Order Now - Call +91-9953240031
            </Button>
          </div>
        </div>
      </section>

      {/* Bulk Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Bulk Products & Wholesale</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Supply premium quality makhana in bulk quantities for retailers, distributors, 
              and businesses worldwide with competitive pricing and reliable delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-golden/60">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-golden to-golden-dark mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2 text-heritage text-xl">Premium Grade A+</h3>
                <p className="text-muted-foreground mb-4">
                  Largest size, premium quality for international markets
                </p>
                <div className="text-2xl font-bold text-golden mb-2">₹800-1200/kg</div>
                <p className="text-sm text-muted-foreground">Minimum Order: 100kg</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nature to-nature/80 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2 text-heritage text-xl">Commercial Grade A</h3>
                <p className="text-muted-foreground mb-4">
                  Standard size, perfect for retail and food processing
                </p>
                <div className="text-2xl font-bold text-golden mb-2">₹600-900/kg</div>
                <p className="text-sm text-muted-foreground">Minimum Order: 500kg</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-earth/60">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-earth to-earth-light mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2 text-heritage text-xl">Industrial Grade</h3>
                <p className="text-muted-foreground mb-4">
                  Bulk quantities for food manufacturing and processing
                </p>
                <div className="text-2xl font-bold text-golden mb-2">₹400-700/kg</div>
                <p className="text-sm text-muted-foreground">Minimum Order: 1000kg</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" onClick={() => setShowBulkForm(true)}>
              Get Bulk Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Global Presence & SEO Section - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-golden/5 to-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-golden/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-heritage/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-golden bg-golden/10 px-4 py-2 rounded-full border border-golden/20">
                🏆 BIHAR'S LEGACY
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-heritage bg-gradient-to-r from-heritage to-heritage/80 bg-clip-text text-transparent">
              Bihar Makhana: India's Pride, World's Choice
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed">
              Leading makhana exporter from Bihar, India. Premium quality fox nuts, lotus seeds 
              supplier for global markets. Organic, natural, healthy snacks from Bihar wetlands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-golden/20">
              <div className="text-3xl font-bold text-golden mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-heritage font-semibold">Countries</div>
              <div className="text-sm text-muted-foreground">Global Export</div>
              <div className="w-full h-1 bg-gradient-to-r from-golden/20 to-golden rounded-full mt-3"></div>
            </div>
            <div className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-golden/20">
              <div className="text-3xl font-bold text-golden mb-2 group-hover:scale-110 transition-transform duration-300">5000+</div>
              <div className="text-heritage font-semibold">Farmers</div>
              <div className="text-sm text-muted-foreground">Connected Network</div>
              <div className="w-full h-1 bg-gradient-to-r from-golden/20 to-golden rounded-full mt-3"></div>
            </div>
            <div className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-golden/20">
              <div className="text-3xl font-bold text-golden mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-heritage font-semibold">Organic</div>
              <div className="text-sm text-muted-foreground">Natural Process</div>
              <div className="w-full h-1 bg-gradient-to-r from-golden/20 to-golden rounded-full mt-3"></div>
            </div>
            <div className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-golden/20">
              <div className="text-3xl font-bold text-golden mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
              <div className="text-heritage font-semibold">Years</div>
              <div className="text-sm text-muted-foreground">Export Experience</div>
              <div className="w-full h-1 bg-gradient-to-r from-golden/20 to-golden rounded-full mt-3"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50">
              <h3 className="text-2xl font-bold text-heritage flex items-center gap-2">
                <span className="text-2xl">🌾</span>
                Why Bihar Makhana is Best in World
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-muted-foreground">Bihar's unique climate and soil conditions</span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-muted-foreground">Traditional cultivation methods for 1000+ years</span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-muted-foreground">Highest protein content and nutritional value</span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-muted-foreground">Premium size and superior taste quality</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50">
              <h3 className="text-2xl font-bold text-heritage flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Global Market Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fox Nuts", "Lotus Seeds", "Makhana Export", "Bihar Makhana",
                  "Premium Makhana", "Organic Fox Nuts", "Indian Superfoods",
                  "Healthy Snacks", "Natural Makhana", "Wholesale Makhana"
                ].map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-golden/10 text-heritage rounded-full text-sm border border-golden/20 hover:bg-golden/20 transition-colors duration-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Markets Section - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-white via-golden/5 to-heritage/5 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-16 h-16 bg-golden/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-heritage/30 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-heritage bg-heritage/10 px-4 py-2 rounded-full border border-heritage/20">
                🌍 GLOBAL PRESENCE
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-heritage bg-gradient-to-r from-heritage via-golden/80 to-heritage bg-clip-text text-transparent">
              Serving Global Markets
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              From Bihar to the world - we export premium makhana to major international markets 
              including USA, Europe, Middle East, and Asia Pacific regions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {[
              { country: "🇺🇸 USA", market: "Premium Health Food", region: "North America" },
              { country: "🇬🇧 UK", market: "Organic Snacks", region: "Europe" },
              { country: "🇩🇪 Germany", market: "Natural Foods", region: "Europe" },
              { country: "🇦🇺 Australia", market: "Superfoods", region: "Oceania" },
              { country: "🇨🇦 Canada", market: "Healthy Snacks", region: "North America" },
              { country: "🇦🇪 UAE", market: "Premium Import", region: "Middle East" },
              { country: "🇸🇬 Singapore", market: "Asian Delicacies", region: "Asia" },
              { country: "🇯🇵 Japan", market: "Health Foods", region: "Asia" },
              { country: "🇰🇷 South Korea", market: "Natural Snacks", region: "Asia" },
              { country: "🇳🇱 Netherlands", market: "Organic Products", region: "Europe" },
              { country: "🇫🇷 France", market: "Gourmet Foods", region: "Europe" },
              { country: "🇮🇹 Italy", market: "Premium Ingredients", region: "Europe" }
            ].map((item, index) => (
              <div key={index} className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-golden/30 hover:-translate-y-1">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.country.split(' ')[0]}</div>
                <div className="font-semibold text-heritage text-sm mb-1">{item.country.split(' ')[1]}</div>
                <div className="text-xs text-muted-foreground mb-2">{item.market}</div>
                <div className="text-xs bg-golden/10 text-golden px-2 py-1 rounded-full border border-golden/20">
                  {item.region}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Global Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-golden">50+</div>
                <div className="text-sm text-heritage">Countries</div>
              </div>
              <div className="w-px h-8 bg-heritage/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-golden">6</div>
                <div className="text-sm text-heritage">Continents</div>
              </div>
              <div className="w-px h-8 bg-heritage/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-golden">1000+</div>
                <div className="text-sm text-heritage">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-heritage/10 via-golden/10 to-muted/30 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-10 w-32 h-32 bg-golden/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-heritage/30 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-golden/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-golden bg-golden/10 px-6 py-3 rounded-full border border-golden/20 flex items-center gap-2">
                ✨ PREMIUM EXPERIENCE
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-heritage bg-gradient-to-r from-heritage via-golden to-heritage bg-clip-text text-transparent leading-tight">
              Ready to Experience Bihar's Finest?
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking for retail quantities or bulk orders, 
              we're here to serve you with the finest quality makhana from Bihar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setShowQuoteForm(true)}
                className="group bg-heritage hover:bg-heritage/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Request Quote
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="group border-2 border-heritage text-heritage hover:bg-heritage hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Link to="/products">
                  View Products
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowBulkForm(true)}
                className="group border-2 border-golden text-golden hover:bg-golden hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
              >
                Get Bulk Quote
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                <Shield className="w-8 h-8 text-heritage mb-2" />
                <span className="text-sm font-semibold text-heritage">Quality Assured</span>
                <span className="text-xs text-muted-foreground">100% Tested</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                <Truck className="w-8 h-8 text-golden mb-2" />
                <span className="text-sm font-semibold text-heritage">Fast Delivery</span>
                <span className="text-xs text-muted-foreground">Worldwide</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <span className="text-sm font-semibold text-heritage">Customer Love</span>
                <span className="text-xs text-muted-foreground">5000+ Happy</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                <Award className="w-8 h-8 text-heritage mb-2" />
                <span className="text-sm font-semibold text-heritage">Certified</span>
                <span className="text-xs text-muted-foreground">Export Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Popups */}
      {showContactForm && (
        <ContactForm 
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          title="Export Inquiry"
          formType="contact"
        />
      )}
      
      {showBulkForm && (
        <ContactForm 
          isOpen={showBulkForm}
          onClose={() => setShowBulkForm(false)}
          title="Bulk Order Quote"
          formType="bulk"
        />
      )}

      {/* Quote Form Popup */}
      {showQuoteForm && (
        <QuoteForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
        />
      )}

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
