import { Truck, Ship, Plane, MapPin, Clock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import globalExportImage from "@/assets/global-export.jpg";

const Logistics = () => {
  const services = [
    {
      icon: Truck,
      title: "Ground Transportation",
      description: "Reliable land transport across India and neighboring countries",
      features: ["Pan-India delivery", "Temperature-controlled vehicles", "Real-time tracking", "Express delivery options"],
      coverage: "All major cities & towns"
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping for international orders",
      features: ["Container loading", "Port handling", "Customs clearance", "Documentation support"],
      coverage: "50+ international ports"
    },
    {
      icon: Plane,
      title: "Air Cargo",
      description: "Fast air freight for urgent and premium deliveries",
      features: ["24-48 hour delivery", "Airport handling", "Priority shipping", "Express customs"],
      coverage: "Global destinations"
    }
  ];

  const warehouses = [
    {
      location: "Bihar (Main Hub)",
      capacity: "5000 MT",
      features: ["Temperature controlled", "Quality testing lab", "Direct farm access"]
    },
    {
      location: "Delhi NCR",
      capacity: "1000 MT", 
      features: ["Strategic location", "Quick dispatch", "Export documentation"]
    },
    {
      location: "Mumbai",
      capacity: "800 MT",
      features: ["Port connectivity", "International shipping", "Customs bonded"]
    },
    {
      location: "Chennai",
      capacity: "600 MT",
      features: ["South India coverage", "Port operations", "Regional distribution"]
    }
  ];

  const tracking = [
    {
      stage: "Order Confirmation",
      description: "Order received and confirmed with tracking number"
    },
    {
      stage: "Warehouse Processing",
      description: "Order picked, packed and ready for dispatch"
    },
    {
      stage: "In Transit",
      description: "Shipment on the way with real-time location updates"
    },
    {
      stage: "Out for Delivery", 
      description: "Final mile delivery in progress"
    },
    {
      stage: "Delivered",
      description: "Successfully delivered with delivery confirmation"
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
            <h1 className="text-5xl font-bold mb-6 text-heritage">Logistics Solutions</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              Comprehensive logistics network ensuring fresh, quality makhana reaches 
              you safely and on time, anywhere in the world.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              Track Your Shipment
            </Button>
          </div>
        </div>
      </section>

      {/* Transportation Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Transportation Services</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Multi-modal transportation solutions to meet every delivery requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${index === 0 ? 'from-golden to-golden-dark' : index === 1 ? 'from-nature to-nature/80' : 'from-golden-light to-nature/30'} mx-auto mb-4 flex items-center justify-center`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="bg-golden-light/20 px-3 py-1 rounded-full text-sm font-medium text-heritage mb-4">
                      {service.coverage}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-nature rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse Network */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Warehouse Network</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Strategic warehouse locations ensuring efficient distribution and fresh deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {warehouses.map((warehouse, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-light to-nature/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-heritage" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-heritage">{warehouse.location}</h3>
                      <p className="text-2xl font-bold text-golden mb-3">{warehouse.capacity}</p>
                      <ul className="space-y-1">
                        {warehouse.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground">• {feature}</li>
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

      {/* Tracking System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Real-Time Tracking</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Track your order every step of the way with our advanced tracking system.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {tracking.map((stage, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage text-sm">{stage.stage}</h3>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logistics Stats */}
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
            <h2 className="text-4xl font-bold mb-6 text-heritage">Logistics Performance</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Our commitment to excellence reflected in our logistics performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">99.5%</div>
              <div className="text-heritage/70">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">24/7</div>
              <div className="text-heritage/70">Tracking Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">4</div>
              <div className="text-heritage/70">Warehouse Locations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">72hrs</div>
              <div className="text-heritage/70">Max Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">Insurance & Security</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Every shipment is fully insured and secured with advanced tracking and 
                monitoring systems for complete peace of mind.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Full cargo insurance coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">GPS tracking and monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Temperature-controlled transport</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Professional handling protocols</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8 bg-gradient-to-br from-golden-light/20 to-nature/10">
                <CardContent className="pt-6 text-center">
                  <Clock className="w-16 h-16 text-heritage mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-heritage mb-4">Express Delivery</h3>
                  <p className="text-muted-foreground mb-6">
                    Need it fast? Our express delivery service ensures your order 
                    reaches you within 24-48 hours.
                  </p>
                  <Button variant="hero" size="lg" className="w-full">
                    Request Express Delivery
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heritage">Ready to Ship?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Get your logistics solution tailored to your specific delivery requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/bulk-order">Get Shipping Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Logistics Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Logistics;
