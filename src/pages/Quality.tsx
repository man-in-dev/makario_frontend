import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, CheckCircle, Microscope, Flask, FileCheck, ClipboardCheck, Beaker, Scale, Target } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Quality = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const certifications = [
    {
      title: "ISO 22000:2018",
      description: "Food Safety Management System",
      icon: Shield,
      color: "nature"
    },
    {
      title: "FSSAI Certified",
      description: "Food Safety Standards Authority of India",
      icon: CheckCircle,
      color: "heritage"
    },
    {
      title: "HACCP",
      description: "Hazard Analysis Critical Control Point",
      icon: ClipboardCheck,
      color: "golden"
    },
    {
      title: "GMP Certified",
      description: "Good Manufacturing Practices",
      icon: Award,
      color: "nature"
    }
  ];

  const testingParameters = [
    {
      icon: Microscope,
      title: "Physical Analysis",
      tests: [
        "Size grading",
        "Color assessment",
        "Moisture content",
        "Foreign matter"
      ]
    },
    {
      icon: Flask,
      title: "Chemical Analysis",
      tests: [
        "Protein content",
        "Carbohydrates",
        "Dietary fiber",
        "Mineral content"
      ]
    },
    {
      icon: Beaker,
      title: "Microbiological",
      tests: [
        "Total plate count",
        "Yeast and mold",
        "E. coli",
        "Salmonella"
      ]
    },
    {
      icon: Scale,
      title: "Quality Metrics",
      tests: [
        "Pop percentage",
        "Texture analysis",
        "Shelf life study",
        "Packaging integrity"
      ]
    }
  ];

  const qualityProcess = [
    {
      title: "Raw Material Selection",
      description: "Careful selection of premium makhana seeds from certified farms",
      icon: Target
    },
    {
      title: "Processing Control",
      description: "Strict monitoring of processing parameters and conditions",
      icon: Scale
    },
    {
      title: "Quality Testing",
      description: "Comprehensive testing at our state-of-the-art laboratory",
      icon: Microscope
    },
    {
      title: "Documentation",
      description: "Complete traceability and quality documentation",
      icon: FileCheck
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Makario Quality Standards – 5-Step Makhana Quality Check"
        description="Makario ensures premium makhana through 5-step checks — sorting, roasting, grading, cleaning & freshness sealing. Lab-tested & certified."
        keywords="makhana quality check, makario quality, premium makhana standards, best fox nuts quality"
        canonical="https://makario.in/quality"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heritage">
                Quality <span className="text-nature">Standards</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Our commitment to excellence through rigorous quality control, testing, and certification 
                ensures the finest makhana for our customers worldwide.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setShowContactForm(true)}
                  className="group"
                >
                  Quality Certificates
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  Download Lab Reports
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-nature/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-golden/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="CERTIFICATIONS"
            icon={Award}
            title="Quality Certifications"
            highlightWord="Certifications"
            highlightColor="green"
            description="Internationally recognized certifications that validate our commitment to quality"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-t-4 border-t-nature/60">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${cert.color} to-${cert.color}/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-heritage mb-2 text-center">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Parameters Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="TESTING"
            icon={Microscope}
            title="Quality Testing Parameters"
            highlightWord="Testing"
            highlightColor="green"
            description="Comprehensive testing to ensure the highest quality standards"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testingParameters.map((param, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nature to-nature/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <param.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-heritage mb-4 text-center">{param.title}</h3>
                    <ul className="space-y-2">
                      {param.tests.map((test, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-nature flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="PROCESS"
            icon={Shield}
            title="Quality Control Process"
            highlightWord="Process"
            highlightColor="green"
            description="Our comprehensive quality control process ensures excellence at every step"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-heritage to-heritage/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-heritage mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-nature/10 rounded-full flex items-center justify-center -mt-2 -mr-2">
                      <span className="text-nature font-semibold">{index + 1}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Facilities Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="FACILITIES"
            icon={Flask}
            title="State-of-the-Art Lab Facilities"
            highlightWord="Lab Facilities"
            highlightColor="green"
            description="Modern testing facilities ensuring the highest quality standards"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-heritage mb-6">Testing Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Advanced Equipment</p>
                      <p className="text-sm text-muted-foreground">Latest technology for precise quality analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Expert Team</p>
                      <p className="text-sm text-muted-foreground">Qualified technicians and food scientists</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Regular Calibration</p>
                      <p className="text-sm text-muted-foreground">Ensuring accuracy and reliability of results</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-heritage mb-6">Quality Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Batch Testing</p>
                      <p className="text-sm text-muted-foreground">100% testing of all production batches</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Documentation</p>
                      <p className="text-sm text-muted-foreground">Detailed reports for every quality check</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-heritage">Quality Tracking</p>
                      <p className="text-sm text-muted-foreground">Digital system for real-time quality monitoring</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heritage mb-6">
              Experience Our Quality Standards
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch with our quality assurance team for detailed information about our testing processes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setShowContactForm(true)}
                className="group"
              >
                Request Quality Certificates
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2"
              >
                Download Quality Manual
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Popup */}
      {showContactForm && (
        <ContactForm 
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          title="Quality Information Request"
          formType="contact"
        />
      )}

      <Footer />
    </div>
  );
};

export default Quality;