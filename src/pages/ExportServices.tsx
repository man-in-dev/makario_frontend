import { Ship, Globe, FileText, Shield, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import globalExportImage from "@/assets/global-export.jpg";

const ExportServices = () => {
  const services = [
    {
      icon: FileText,
      title: "Documentation Support",
      description: "Complete export documentation and customs clearance",
      features: ["Export licenses", "Certificate of origin", "Phytosanitary certificates", "Invoice preparation"]
    },
    {
      icon: Ship,
      title: "Logistics Coordination",
      description: "End-to-end shipping and delivery management", 
      features: ["Sea freight booking", "Air cargo arrangements", "Container loading", "Track & trace"]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "International quality standards compliance",
      features: ["Pre-shipment inspection", "Quality certificates", "Lab testing reports", "Organic certification"]
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Guaranteed on-time delivery worldwide",
      features: ["Scheduled shipments", "Express delivery options", "Real-time tracking", "Delivery confirmation"]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Order Confirmation",
      description: "Receive and confirm your export order requirements"
    },
    {
      step: "2", 
      title: "Quality Preparation",
      description: "Prepare premium quality makhana as per specifications"
    },
    {
      step: "3",
      title: "Documentation",
      description: "Complete all export documentation and certifications"
    },
    {
      step: "4",
      title: "Packaging & Loading",
      description: "Professional packaging and container loading"
    },
    {
      step: "5",
      title: "Shipping & Tracking",
      description: "Ship and provide real-time tracking information"
    },
    {
      step: "6",
      title: "Delivery Confirmation",
      description: "Confirm safe delivery at destination"
    }
  ];

  const countries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "France", flag: "🇫🇷" },
    { name: "UAE", flag: "🇦🇪" }
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
            <h1 className="text-5xl font-bold mb-6 text-heritage">Export Services</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              Comprehensive export solutions to bring Bihar's finest makhana to your 
              international markets with complete peace of mind.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              Get Export Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Export Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Our Export Services</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Complete export solutions handling every aspect of international trade 
              from documentation to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-heritage">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-nature flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Export Process</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our streamlined 6-step process ensures smooth and efficient export operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Export Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Export Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We export to major markets worldwide with established trade relationships.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <p className="text-sm font-medium text-heritage">{country.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Export Statistics */}
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
            <h2 className="text-4xl font-bold mb-6 text-heritage">Export Statistics</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Our export achievements and commitment to international trade excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">50+</div>
              <div className="text-heritage/70">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">1000+</div>
              <div className="text-heritage/70">Tons Exported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">99%</div>
              <div className="text-heritage/70">On-time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">24/7</div>
              <div className="text-heritage/70">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heritage">Ready to Export?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Start your export journey with our comprehensive support and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/bulk-order">Get Export Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Export Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExportServices;
