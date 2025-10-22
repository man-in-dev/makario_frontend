import { Leaf, Droplets, Sun, TreePine, Sprout, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import fieldImage from "@/assets/bihar-agriculture.jpg";

const Agriculture = () => {
  const practices = [
    {
      icon: Droplets,
      title: "Water Management",
      description: "Traditional pond systems for optimal makhana cultivation"
    },
    {
      icon: Leaf,
      title: "Organic Methods", 
      description: "Chemical-free farming using natural fertilizers and pest control"
    },
    {
      icon: Sun,
      title: "Seasonal Timing",
      description: "Perfect synchronization with monsoon and climate patterns"
    },
    {
      icon: TreePine,
      title: "Crop Rotation",
      description: "Sustainable practices maintaining soil health and fertility"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Bihar's Agricultural Heritage</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover the ancient wisdom and sustainable practices that make Bihar 
              the world's leading makhana producer.
            </p>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-heritage">
              Learn About Our Methods
            </Button>
          </div>
        </div>
      </section>

      {/* Traditional Practices */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Traditional Agricultural Practices</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our farming methods have been refined over generations, combining ancient wisdom 
              with sustainable modern techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practices.map((practice, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-light to-nature/30 flex items-center justify-center flex-shrink-0">
                      <practice.icon className="w-6 h-6 text-heritage" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-heritage text-xl">{practice.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{practice.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agriculture in Numbers */}
      <section 
        className="relative py-16 text-heritage"
        style={{
          backgroundImage: `url(${fieldImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Agriculture in Numbers</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Bihar's agricultural achievements in makhana production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">15,000+</div>
              <div className="text-heritage/70">Hectares Cultivated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">85%</div>
              <div className="text-heritage/70">Global Production Share</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">5000+</div>
              <div className="text-heritage/70">Farmer Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">100%</div>
              <div className="text-heritage/70">Organic Practices</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agriculture;