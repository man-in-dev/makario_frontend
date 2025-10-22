import { Shield, Award, Microscope, CheckCircle, FileText, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import biharAgricultureImage from "@/assets/bihar-agriculture.jpg";

const QualityAssurance = () => {
  const standards = [
    {
      icon: Shield,
      title: "FSSAI Certified",
      description: "Food Safety & Standards Authority of India compliance",
      details: "All our products meet stringent Indian food safety standards."
    },
    {
      icon: Award,
      title: "Organic Certification",
      description: "100% organic farming with no chemical pesticides",
      details: "Certified organic by accredited agencies for international markets."
    },
    {
      icon: Microscope,
      title: "Lab Tested",
      description: "Every batch tested for purity and quality",
      details: "Comprehensive testing for moisture, protein, and contamination."
    },
    {
      icon: FileText,
      title: "ISO Compliance",
      description: "International quality management standards",
      details: "ISO 22000 food safety management system compliance."
    }
  ];

  const process = [
    {
      title: "Farm Level Quality",
      description: "Quality control starts at the farm with proper cultivation practices",
      points: ["Organic farming methods", "Traditional harvesting", "Immediate post-harvest handling"]
    },
    {
      title: "Processing Standards", 
      description: "State-of-the-art processing facilities maintaining hygiene",
      points: ["Clean processing environment", "Temperature-controlled facilities", "Automated sorting systems"]
    },
    {
      title: "Testing & Verification",
      description: "Rigorous testing at multiple stages of production",
      points: ["Moisture content testing", "Protein analysis", "Microbiological testing"]
    },
    {
      title: "Packaging Quality",
      description: "Premium packaging to maintain freshness and quality",
      points: ["Food-grade materials", "Vacuum sealing", "Proper labeling"]
    }
  ];

  const certifications = [
    "FSSAI License",
    "Organic India Certification", 
    "Export License",
    "ISO 22000:2018",
    "HACCP Compliance",
    "Phytosanitary Certificate"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 text-heritage"
        style={{
          backgroundImage: `url(${biharAgricultureImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-heritage">Quality Assurance</h1>
            <p className="text-xl text-heritage/80 mb-8 leading-relaxed">
              Our unwavering commitment to quality ensures that every batch of makhana 
              meets the highest international standards.
            </p>
            <Button variant="outline" size="lg" className="border-heritage text-heritage hover:bg-heritage hover:text-white">
              View Certificates
            </Button>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Our Quality Standards</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We maintain the highest quality standards through rigorous certification 
              and continuous monitoring processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((standard, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-nature/60">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-golden to-golden-dark' : 'from-nature to-nature/80'} flex items-center justify-center flex-shrink-0`}>
                      <standard.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-heritage">{standard.title}</h3>
                      <p className="text-muted-foreground mb-3">{standard.description}</p>
                      <p className="text-sm text-nature">{standard.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Quality Control Process</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our comprehensive quality control process ensures excellence at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-heritage">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-nature flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Our Certifications</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Recognized certifications that validate our commitment to quality and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-golden-light to-nature/30 mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-heritage" />
                  </div>
                  <h3 className="font-semibold text-heritage">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Stats */}
      <section 
        className="relative py-16 text-heritage"
        style={{
          backgroundImage: `url(${biharAgricultureImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-heritage">Quality Metrics</h2>
            <p className="text-heritage/80 text-lg max-w-3xl mx-auto">
              Numbers that showcase our commitment to maintaining the highest quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">100%</div>
              <div className="text-heritage/70">Batch Testing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">99.9%</div>
              <div className="text-heritage/70">Quality Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">0%</div>
              <div className="text-heritage/70">Chemical Residues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-heritage mb-2">6+</div>
              <div className="text-heritage/70">International Certifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heritage">Trust Our Quality</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference that rigorous quality assurance makes in every batch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">View Products</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Request Quality Report</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityAssurance;
