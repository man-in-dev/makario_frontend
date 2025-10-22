import { Package, Palette, Shield, Recycle, Tag, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import globalExportImage from "@/assets/global-export.jpg";

const CustomPackaging = () => {
  const packagingOptions = [
    {
      icon: Package,
      title: "Retail Packaging",
      description: "Eye-catching consumer-ready packaging",
      features: ["Attractive designs", "Multiple sizes", "Shelf-ready display", "Brand customization"]
    },
    {
      icon: Shield,
      title: "Bulk Packaging",
      description: "Industrial-grade packaging for wholesale",
      features: ["High-capacity bags", "Moisture protection", "Easy handling", "Cost-effective"]
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Your brand, your packaging design",
      features: ["Logo placement", "Color schemes", "Custom messaging", "Unique designs"]
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Options",
      description: "Sustainable packaging solutions",
      features: ["Biodegradable materials", "Recyclable packaging", "Minimal waste", "Green certification"]
    }
  ];

  const sizes = [
    { size: "50g", description: "Perfect for trial packs", popular: false },
    { size: "100g", description: "Individual serving size", popular: true },
    { size: "250g", description: "Family pack", popular: true },
    { size: "500g", description: "Economy pack", popular: false },
    { size: "1kg", description: "Bulk retail pack", popular: true },
    { size: "5kg+", description: "Wholesale packaging", popular: false }
  ];

  const materials = [
    {
      name: "Food-Grade Plastic",
      description: "Moisture-resistant, clear visibility",
      benefits: ["Long shelf life", "Tamper-evident", "Lightweight"]
    },
    {
      name: "Laminated Pouches", 
      description: "Multi-layer protection with aluminum barrier",
      benefits: ["Oxygen barrier", "Extended freshness", "Professional look"]
    },
    {
      name: "Eco-Friendly Bags",
      description: "Biodegradable and compostable materials",
      benefits: ["Environment friendly", "Sustainable choice", "Natural decomposition"]
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
            <h1 className="text-5xl font-bold mb-6 text-heritage">Custom Packaging</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              Premium packaging solutions that protect freshness while showcasing 
              your brand in the best possible light.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              Design Your Package
            </Button>
          </div>
        </div>
      </section>

      {/* Packaging Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Packaging Solutions</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From retail-ready packages to bulk wholesale solutions, we offer 
              comprehensive packaging options for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packagingOptions.map((option, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} flex items-center justify-center flex-shrink-0`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-heritage">{option.title}</h3>
                      <p className="text-muted-foreground mb-4">{option.description}</p>
                      <ul className="space-y-2">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-nature flex-shrink-0" />
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

      {/* Package Sizes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Available Sizes</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Choose from our range of package sizes or request custom sizing for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizes.map((size, index) => (
              <Card key={index} className={`text-center p-6 hover:shadow-lg transition-shadow ${size.popular ? 'border-2 border-golden/50' : ''}`}>
                <CardContent className="pt-6">
                  {size.popular && (
                    <div className="bg-golden text-white px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                      Popular
                    </div>
                  )}
                  <div className="text-3xl font-bold text-heritage mb-2">{size.size}</div>
                  <p className="text-sm text-muted-foreground">{size.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Materials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Packaging Materials</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Premium materials that ensure product freshness and quality protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${index === 0 ? 'from-golden to-golden-dark' : index === 1 ? 'from-nature to-nature/80' : 'from-golden-light to-nature/30'} mx-auto mb-4 flex items-center justify-center`}>
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-heritage">{material.name}</h3>
                    <p className="text-muted-foreground mb-4">{material.description}</p>
                    <ul className="space-y-2">
                      {material.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-nature">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Branding */}
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
            <h2 className="text-4xl font-bold mb-6 text-heritage">Custom Branding Services</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Make your mark with custom branded packaging that represents your brand perfectly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Tag className="w-12 h-12 text-heritage mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">Logo Placement</h3>
              <p className="text-heritage/70 text-sm">Prominent logo positioning</p>
            </div>
            <div className="text-center">
              <Palette className="w-12 h-12 text-heritage mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">Color Matching</h3>
              <p className="text-heritage/70 text-sm">Brand color consistency</p>
            </div>
            <div className="text-center">
              <Package className="w-12 h-12 text-heritage mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">Design Creation</h3>
              <p className="text-heritage/70 text-sm">Professional design services</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-heritage mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">Premium Finish</h3>
              <p className="text-heritage/70 text-sm">High-quality printing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heritage">Ready to Create Your Package?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Work with our design team to create packaging that perfectly represents your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Start Custom Design</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/bulk-order">Get Packaging Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomPackaging;
