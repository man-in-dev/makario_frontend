import { Users, Heart, HandHeart, Sprout, Award, TrendingUp, ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import biharFieldsImage from "@/assets/blog/Makhana-The-Healthy-Indian-Snack.jpg";
import farmersWorkingImage from "@/assets/homepage/WhatsApp-Image-2025-04-07-at-08.38.17_0b1146ba-1024x683.webp";
import cultivationProcessImage from "@/assets/homepage/makhana process.png";
import makhanaFieldsImage from "@/assets/homepage/makhana khet farming.jpg";

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
          <SectionHeader
            eyebrow="FARMER STORIES"
            icon={Users}
            title="Farmer Stories"
            highlightWord="Farmer Stories"
            highlightColor="green"
            description="Real stories from real farmers who have transformed their lives through sustainable makhana cultivation."
            className="mb-12"
          />

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

      {/* Farmers Gallery Section */}
      <section className="py-16 bg-gradient-to-br from-golden/5 via-nature/5 to-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="FARMERS IN ACTION"
            icon={ImageIcon}
            title="Meet Our Farmers Gallery"
            highlightWord="Farmers Gallery"
            highlightColor="green"
            description="See our dedicated farmers working in the fields, cultivating premium makhana with traditional methods and modern care."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Gallery Image 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={farmersWorkingImage}
                alt="Farmers Working in Makhana Fields"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1">Field Work</h3>
                  <p className="text-sm text-gray-200">Harvesting premium makhana</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={makhanaFieldsImage}
                alt="Makhana Cultivation Fields in Bihar"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1">Cultivation Fields</h3>
                  <p className="text-sm text-gray-200">Pristine wetlands of Bihar</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={cultivationProcessImage}
                alt="Makhana Processing & Preparation"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1">Processing</h3>
                  <p className="text-sm text-gray-200">Traditional preparation methods</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Description */}
          <Card className="bg-white/80 backdrop-blur-sm border border-nature/20 p-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-heritage mb-4">Our Farmers' Excellence</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Every image tells a story of dedication and hard work. Our farmers wake up before dawn to tend their fields, 
                    employing generations-old wisdom combined with modern sustainable practices.
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    From cultivation to harvesting, each step is carefully managed to ensure the highest quality makhana reaches 
                    tables across the globe. Their passion for excellence is reflected in every grain.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-nature"></div>
                      <span className="text-heritage font-medium">Sustainable farming practices</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-golden"></div>
                      <span className="text-heritage font-medium">Generation-old cultivation expertise</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-nature"></div>
                      <span className="text-heritage font-medium">Quality-focused harvest methods</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-golden-light/30 to-nature/20 p-6 rounded-xl">
                  <Users className="w-12 h-12 text-heritage mb-4" />
                  <h4 className="text-lg font-semibold text-heritage mb-3">Farmer Statistics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-golden">5000+</div>
                      <p className="text-sm text-muted-foreground">Family Farmers</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-heritage">15,000</div>
                      <p className="text-sm text-muted-foreground">Hectares Cultivated</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-nature">25+</div>
                      <p className="text-sm text-muted-foreground">Average Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Programs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="FARMER SUPPORT"
            icon={HandHeart}
            title="How We Support Our Farmers"
            highlightWord="Support Our Farmers"
            highlightColor="green"
            description="Our comprehensive support system ensures that farmers have everything they need to succeed and prosper."
            className="mb-12"
          />

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
          <SectionHeader
            eyebrow="OUR IMPACT"
            icon={TrendingUp}
            title="Our Impact"
            highlightWord="Impact"
            highlightColor="green"
            description="Together, we're building a sustainable future for Bihar's farming communities."
            className="mb-12"
          />

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
              <SectionHeader
                eyebrow="COMMUNITY"
                icon={Users}
                title="Community Development"
                highlightWord="Community Development"
                highlightColor="green"
                className="mb-6"
                align="left"
              />
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
