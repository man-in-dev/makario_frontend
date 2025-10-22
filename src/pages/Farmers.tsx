import { Users, Heart, HandHeart, Sprout, Award, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import biharFieldsImage from "@/assets/bihar-fields.jpg";

const Farmers = () => {
  const stories = [
    {
      name: "Ramesh Kumar",
      village: "Madhubani",
      experience: "25 years",
      story: "My family has been cultivating makhana for generations. Working with Makari has transformed our lives.",
      achievement: "Increased income by 200%"
    },
    {
      name: "Sunita Devi",
      village: "Darbhanga", 
      experience: "15 years",
      story: "As a woman farmer, Makari has given me the support and fair prices I needed to succeed.",
      achievement: "Leader of women's farmer group"
    },
    {
      name: "Bijoy Singh",
      village: "Sitamarhi",
      experience: "30 years",
      story: "The traditional knowledge passed down from my grandfather now feeds families worldwide.",
      achievement: "Top quality producer 2023"
    }
  ];

  const support = [
    {
      icon: HandHeart,
      title: "Fair Trade Pricing",
      description: "Guaranteed fair prices above market rates",
      details: "We ensure our farmers receive 15-20% above market prices for their premium quality makhana."
    },
    {
      icon: Sprout,
      title: "Training & Development",
      description: "Modern techniques combined with traditional wisdom",
      details: "Regular workshops on sustainable farming, quality improvement, and new cultivation methods."
    },
    {
      icon: TrendingUp,
      title: "Financial Support",
      description: "Access to credit and advance payments",
      details: "We provide advance payments during sowing season and connect farmers with financial institutions."
    },
    {
      icon: Award,
      title: "Quality Incentives",
      description: "Bonus payments for premium quality produce",
      details: "Extra incentives for farmers who consistently deliver superior quality makhana."
    }
  ];

  const impact = [
    {
      metric: "5000+",
      label: "Farmer Families",
      description: "Connected to our network"
    },
    {
      metric: "50+",
      label: "Villages",
      description: "Across Bihar districts"
    },
    {
      metric: "₹50Cr+",
      label: "Farmer Income",
      description: "Generated annually"
    },
    {
      metric: "100%",
      label: "Payment Guarantee",
      description: "On-time payments assured"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 text-heritage"
        style={{
          backgroundImage: `url(${biharFieldsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-heritage">Our Farmers</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              Meet the dedicated farmers who are the heart of our success. Their traditional 
              wisdom and hard work bring you the finest makhana from Bihar.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              Join Our Farmer Network
            </Button>
          </div>
        </div>
      </section>

      {/* Farmer Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Farmer Stories</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Real stories from real farmers who have transformed their lives through 
              sustainable makhana cultivation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-golden-light to-nature/30 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-heritage" />
                    </div>
                    <h3 className="text-xl font-semibold text-heritage">{story.name}</h3>
                    <p className="text-sm text-nature">{story.village} • {story.experience}</p>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{story.story}"</p>
                  <div className="bg-golden-light/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-heritage">{story.achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Programs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">How We Support Our Farmers</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our comprehensive support system ensures that farmers have everything they need 
              to succeed and prosper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {support.map((program, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} flex items-center justify-center flex-shrink-0`}>
                      <program.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-heritage">{program.title}</h3>
                      <p className="text-muted-foreground mb-3">{program.description}</p>
                      <p className="text-sm text-nature">{program.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section 
        className="relative py-16 text-heritage"
        style={{
          backgroundImage: `url(${biharFieldsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Our Impact</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Together, we're building a sustainable future for Bihar's farming communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-heritage mb-2">{stat.metric}</div>
                <div className="text-lg font-medium text-heritage mb-1">{stat.label}</div>
                <div className="text-sm text-heritage/70">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">Community Development</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Beyond farming, we invest in community development programs that improve 
                education, healthcare, and infrastructure in farming villages.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Healthcare camps and medical support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Children's education scholarships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Infrastructure development projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-nature flex-shrink-0" />
                  <span className="text-muted-foreground">Women's empowerment initiatives</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-golden-light/20 to-nature/10">
                <CardContent className="pt-6 text-center">
                  <Users className="w-16 h-16 text-heritage mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-heritage mb-4">Join Our Family</h3>
                  <p className="text-muted-foreground mb-6">
                    Become part of our growing network of successful farmers.
                  </p>
                  <Button variant="hero" size="lg" className="w-full">
                    Register as Farmer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Farmers;
