import { Globe, MapPin, Truck, Ship, Plane, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import globalExportImage from "@/assets/global-export.jpg";

const Global = () => {
  const markets = [
    {
      region: "North America",
      countries: ["USA", "Canada"],
      volume: "30%",
      icon: "🇺🇸"
    },
    {
      region: "Europe", 
      countries: ["UK", "Germany", "Netherlands", "France"],
      volume: "25%",
      icon: "🇪🇺"
    },
    {
      region: "Asia Pacific",
      countries: ["Australia", "Singapore", "Japan", "South Korea"],
      volume: "20%",
      icon: "🌏"
    },
    {
      region: "Middle East",
      countries: ["UAE", "Saudi Arabia", "Qatar"],
      volume: "15%",
      icon: "🕌"
    },
    {
      region: "Others",
      countries: ["Various emerging markets"],
      volume: "10%",
      icon: "🌍"
    }
  ];

  const logistics = [
    {
      icon: Truck,
      title: "Road Transport",
      description: "Efficient land transportation across India",
      color: "from-golden to-golden-dark"
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping worldwide",
      color: "from-nature to-nature/80"
    },
    {
      icon: Plane,
      title: "Air Cargo",
      description: "Fast delivery for urgent orders",
      color: "from-golden to-golden-dark"
    }
  ];

  const certifications = [
    {
      title: "FSSAI Certified",
      description: "Food Safety Standards Authority of India approval"
    },
    {
      title: "Organic Certified",
      description: "100% organic farming certification"
    },
    {
      title: "Export License",
      description: "Authorized for international trade"
    },
    {
      title: "ISO Compliance",
      description: "International quality standards"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 text-heritage"
        style={{
          backgroundImage: `url(${globalExportImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-heritage">Global Reach</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              From Bihar's wetlands to tables worldwide - discover how we connect 
              local farmers to global markets.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              Explore Our Network
            </Button>
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Our Global Markets</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We export premium Bihar makhana to over 50+ countries across 5 continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{market.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">{market.region}</h3>
                    <p className="text-3xl font-bold text-golden mb-3">{market.volume}</p>
                    <p className="text-sm text-muted-foreground">
                      {market.countries.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Network */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Logistics Network</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our comprehensive logistics network ensures fresh, quality makhana reaches 
              customers worldwide efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logistics.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} mx-auto mb-4 flex items-center justify-center`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Stats */}
      <section 
        className="relative py-16 text-heritage"
        style={{
          backgroundImage: `url(${globalExportImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Global Impact</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Numbers that showcase our international presence and commitment to quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">50+</div>
              <div className="text-heritage/70">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">1000+</div>
              <div className="text-heritage/70">Tons Exported Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">24/7</div>
              <div className="text-heritage/70">Global Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">99%</div>
              <div className="text-heritage/70">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">International Certifications</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our quality standards meet international requirements for global trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-golden-light to-nature/30 mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-heritage" />
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heritage">Ready to Go Global?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join our global network and bring Bihar's finest makhana to your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/bulk-order">Start Bulk Order</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Global;
