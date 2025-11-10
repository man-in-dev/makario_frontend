import { useState } from "react";
import { CheckCircle, X, Award, Leaf, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import makariaMakhanaImage from "@/assets/homepage/makhana process.png";

const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState<"comparison" | "why">("comparison");

  const comparisonData = [
    {
      category: "Quality",
      mereMakhana: "Premium Grade A+ 100%",
      otherMakhana: "Mixed grades"
    },
    {
      category: "Freshness",
      mereMakhana: "Fresh within 7 days",
      otherMakhana: "6+ months old"
    },
    {
      category: "Organic Certified",
      mereMakhana: "FSSAI Certified",
      otherMakhana: "No certification"
    },
    {
      category: "Processing",
      mereMakhana: "Traditional hand-roasted",
      otherMakhana: "Industrial chemicals"
    },
    {
      category: "Taste",
      mereMakhana: "Crispy & delicious",
      otherMakhana: "Stale & bland"
    },
    {
      category: "Delivery",
      mereMakhana: "Same/Next day",
      otherMakhana: "Slow & unreliable"
    }
  ];

  const whyChoose = [
    { icon: Leaf, title: "100% Organic", subtitle: "No chemicals added" },
    { icon: Zap, title: "Fresh Roasted", subtitle: "Small batch quality" },
    { icon: Award, title: "Certified Quality", subtitle: "FSSAI approved" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-golden/3 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-golden/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nature/3 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <SectionHeader
          eyebrow="QUALITY COMPARISON"
          icon={Award}
          title="Why Choose Mere Makhana?"
          highlightWord="Mere Makhana"
          highlightColor="green"
          description="Experience the premium quality that sets us apart"
          className="mb-12"
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "comparison"
                ? "bg-heritage text-white shadow-lg scale-105"
                : "bg-white text-heritage border-2 border-heritage hover:bg-heritage/5"
            }`}
          >
            Comparison
          </button>
          <button
            onClick={() => setActiveTab("why")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "why"
                ? "bg-heritage text-white shadow-lg scale-105"
                : "bg-white text-heritage border-2 border-heritage hover:bg-heritage/5"
            }`}
          >
            Why Us
          </button>
        </div>

        {/* COMPARISON TAB */}
        {activeTab === "comparison" && (
          <div className="space-y-6">
            {/* Product Card */}
            <div className="lg:hidden">
              <Card className="border-2 border-golden/40 bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <img
                      src={makariaMakhanaImage}
                      alt="Mere Makhana"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute -bottom-3 left-4 right-4 bg-heritage text-white px-4 py-2 rounded-lg text-center font-bold text-sm shadow-lg">
                      ⭐ Premium Pick
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-heritage mb-2">Mere Makhana</h3>
                    <p className="text-sm text-muted-foreground mb-4">Hand-roasted premium quality from Bihar</p>
                    <div className="space-y-2">
                      {["100% Organic", "Fresh", "Certified", "Best Taste"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-nature flex-shrink-0" />
                          <span className="text-heritage font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Product Card - Left */}
              <div className="lg:col-span-4 flex items-start">
                <Card className="w-full border-2 border-golden/40 bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={makariaMakhanaImage}
                        alt="Mere Makhana"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute -bottom-3 left-4 right-4 bg-heritage text-white px-4 py-2 rounded-lg text-center font-bold text-sm shadow-lg">
                        ⭐ Premium Pick
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-heritage mb-2">Mere Makhana</h3>
                      <p className="text-sm text-muted-foreground mb-4">Hand-roasted premium quality from Bihar</p>
                      <div className="space-y-2">
                        {["100% Organic", "Fresh", "Certified", "Best Taste"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-nature flex-shrink-0" />
                            <span className="text-heritage font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Comparison Table - Right */}
              <div className="lg:col-span-8">
                <div className="space-y-3">
                  {comparisonData.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-3 items-stretch hover:scale-102 transition-transform duration-300"
                    >
                      {/* Category */}
                      <div className="bg-heritage text-white p-4 rounded-lg font-semibold text-sm flex items-center">
                        {item.category}
                      </div>

                      {/* Mere Makhana */}
                      <div className="bg-green-50 border-2 border-nature/30 p-4 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-nature flex-shrink-0" />
                        <span className="text-sm font-medium text-heritage">{item.mereMakhana}</span>
                      </div>

                      {/* Other Brands */}
                      <div className="bg-red-50 border-2 border-red-200/30 p-4 rounded-lg flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-red-700">{item.otherMakhana}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Stack Layout */}
            <div className="lg:hidden space-y-4">
              {comparisonData.map((item, idx) => (
                <Card key={idx} className="border-2 border-golden/20 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Category Header */}
                    <div className="bg-heritage text-white p-4 font-semibold text-center">
                      {item.category}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4 p-4">
                      {/* Mere Makhana */}
                      <div>
                        <h4 className="font-bold text-heritage mb-2 text-sm">Mere Makhana</h4>
                        <div className="bg-green-50 border-2 border-nature/30 p-3 rounded-lg flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-nature flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-heritage">{item.mereMakhana}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-200"></div>

                      {/* Other Brands */}
                      <div>
                        <h4 className="font-bold text-red-700 mb-2 text-sm">Other Brands</h4>
                        <div className="bg-red-50 border-2 border-red-200/30 p-3 rounded-lg flex items-start gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-red-700">{item.otherMakhana}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* WHY CHOOSE TAB */}
        {activeTab === "why" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <Card
                key={idx}
                className="border-0 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-golden to-heritage mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-heritage mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.subtitle}</p>

                  <div className="mt-6 h-1 w-12 bg-gradient-to-r from-golden to-nature rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-br from-heritage/5 to-golden/5 shadow-lg">
            <CardContent className="p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-heritage mb-4">
                Ready to Experience Premium Quality?
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of customers enjoying the freshest, most delicious makhana from Bihar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="lg"
                  asChild
                  className="bg-heritage hover:bg-heritage/90 text-white px-8 py-3 rounded-full font-semibold text-base group"
                >
                  <Link to="/products">
                    Shop Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-golden text-golden hover:bg-golden hover:text-white px-8 py-3 rounded-full font-semibold text-base group"
                >
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
                <div className="flex flex-col items-center">
                  <Award className="w-6 h-6 text-heritage mb-2" />
                  <span className="text-xs font-semibold text-heritage">Premium</span>
                </div>
                <div className="flex flex-col items-center">
                  <Leaf className="w-6 h-6 text-nature mb-2" />
                  <span className="text-xs font-semibold text-heritage">Organic</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-6 h-6 text-golden mb-2" />
                  <span className="text-xs font-semibold text-heritage">Fresh</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
