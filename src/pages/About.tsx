import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import { useState } from "react";
import biharFieldsImage from "@/assets/bihar-fields.jpg";

const About = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const milestones = [
    {
      year: "1990s",
      title: "Heritage Begins",
      description: "Started traditional makhana cultivation in Bihar's wetlands"
    },
    {
      year: "2000s",
      title: "Quality Focus",
      description: "Implemented organic farming and quality control processes"
    },
    {
      year: "2010s",
      title: "Global Expansion",
      description: "Began exports to international markets"
    },
    {
      year: "2020s",
      title: "Market Leader",
      description: "Became one of Bihar's leading makhana exporters"
    }
  ];

  const stats = [
    {
      icon: MapPin,
      number: "5000+",
      label: "Acres of Cultivation"
    },
    {
      icon: Users,
      number: "500+",
      label: "Farming Families"
    },
    {
      icon: Trophy,
      number: "50+",
      label: "Export Countries"
    },
    {
      icon: Calendar,
      number: "25+",
      label: "Years of Excellence"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="About Makario | Premium Bihar Makhana Company Mumbai Gujarat South India | Fox Nuts Story"
        description="🌾 Discover Makario's journey from Bihar wetlands to India's premium makhana brand. Serving Mumbai, Gujarat, South India with authentic fox nuts. 25+ years of excellence!"
        keywords="makario about us, bihar makhana company, fox nuts company mumbai, premium makhana brand gujarat, south india makhana supplier, authentic bihar lotus seeds, family business makhana, organic fox nuts bihar, heritage makhana brand"
        canonical="https://makario.in/about"
        region="india"
        ogImage="https://makario.in/images/makario-about-bihar-heritage.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Makario",
            "description": "Premium Bihar Makhana company serving Mumbai, Gujarat, and South India with authentic fox nuts since 25+ years",
            "url": "https://makario.in",
            "foundingDate": "1990",
            "foundingLocation": {
              "@type": "Place",
              "name": "Bihar, India"
            },
            "areaServed": ["Mumbai", "Gujarat", "South India", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Kerala"],
            "knowsAbout": ["Makhana Cultivation", "Fox Nuts Processing", "Organic Farming", "Export Quality"],
            "slogan": "From Bihar's Heritage to Your Health"
          }
        }}
        breadcrumbs={[
          { name: "Home", url: "https://makario.in/" },
          { name: "About Us", url: "https://makario.in/about" }
        ]}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">The Pride of Bihar</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From the ancient wetlands of Bihar comes a story of tradition, quality, and global success. 
              Discover how we've transformed local farming into a worldwide phenomenon.
            </p>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-heritage" onClick={() => setShowContactForm(true)}>
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-heritage">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Bihar has been the cradle of makhana cultivation for over a millennium. The state's unique 
                agro-climatic conditions, with its seasonal floods and fertile alluvial soil, create the 
                perfect environment for growing the world's finest makhana.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Our journey began with a simple mission: to bring the authentic taste and nutritional 
                benefits of Bihar's makhana to the world while supporting local farming communities 
                and preserving traditional cultivation methods.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Today, Bihar produces over 85% of the world's makhana, making it not just a regional 
                specialty but a global superfood that represents the agricultural prowess of our state.
              </p>
            </div>
            <div className="relative">
              <img
                src={biharFieldsImage}
                alt="Bihar Makhana Fields"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that showcase our commitment to excellence and community development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-card mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-heritage" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones that mark our evolution from local farmers to global exporters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                  <h3 className="font-semibold mb-3 text-heritage">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-heritage">Our Mission</h2>
              <p className="text-heritage/80 text-lg leading-relaxed">
                To be the global ambassador of Bihar's makhana, promoting sustainable agriculture, 
                supporting farming communities, and delivering premium quality products that showcase 
                the rich agricultural heritage of our state to the world.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-heritage">Our Vision</h2>
              <p className="text-heritage/80 text-lg leading-relaxed">
                To establish Bihar as the undisputed global hub for premium makhana production, 
                while fostering innovation in traditional farming practices and creating sustainable 
                livelihoods for thousands of farming families across the state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Popup */}
      {showContactForm && (
        <ContactForm 
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          title="Partnership Inquiry"
          formType="contact"
        />
      )}

      <Footer />
    </div>
  );
};

export default About;