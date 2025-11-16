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

        {/* CTA Section - Premium Design */}
        <div className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl" style={{
            backgroundImage: `url('${makariaMakhanaImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}>
            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70 rounded-2xl md:rounded-3xl"></div>

            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute -top-20 -right-20 w-64 h-64 bg-golden/10 rounded-full blur-3xl z-0"></div>
            <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-heritage/10 rounded-full blur-2xl z-0"></div>

            <Card className="relative border-0 bg-transparent shadow-2xl overflow-hidden z-10">
              <CardContent className="p-6 md:p-12 lg:p-16 relative z-10 text-center">
                {/* Premium badge */}
                <div className="inline-block mb-4 md:mb-6 px-3 md:px-4 py-1 md:py-1.5 bg-golden/40 rounded-full border border-golden/60 backdrop-blur-sm">
                  <span className="text-xs md:text-xs font-bold text-white tracking-widest">✨ PREMIUM QUALITY</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                  Ready to Experience <span className="text-golden drop-shadow-md">Premium Quality</span>?
                </h3>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                  Join thousands of customers enjoying the freshest, most delicious makhana straight from Bihar's heritage farms.
                </p>

                {/* CTA Buttons - Enhanced */}
                <div className="flex flex-col gap-3 md:gap-4 md:flex-row justify-center mb-8 md:mb-12">
                  <Button
                    variant="hero"
                    size="lg"
                    asChild
                    className="bg-golden hover:bg-golden/95 text-heritage px-6 sm:px-8 md:px-12 py-3 md:py-5 rounded-full font-bold text-sm md:text-base group shadow-2xl hover:shadow-golden/50 transition-all hover:scale-105 md:hover:scale-110 border-2 border-golden/80"
                  >
                    <Link to="/shop" className="flex items-center justify-center">
                      🛒 Shop Premium Makhana
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-golden text-white bg-white/10 hover:bg-golden/30 px-6 sm:px-8 md:px-12 py-3 md:py-5 rounded-full font-bold text-sm md:text-base group shadow-2xl transition-all hover:border-golden backdrop-blur-sm"
                    asChild
                  >
                    <Link to="/quality-assurance" className="flex items-center justify-center">
                      ✓ Quality Promise
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:border-golden/80 transition-all group shadow-lg">
                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-golden/40 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-golden/60 transition-colors shadow-md">
                      <Award className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white">Premium Grade</span>
                    <span className="text-xs text-white/80 mt-1">Best Quality</span>
                  </div>
                  <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:border-golden/80 transition-all group shadow-lg">
                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-golden/40 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-golden/60 transition-colors shadow-md">
                      <Leaf className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white">100% Organic</span>
                    <span className="text-xs text-white/80 mt-1">Certified Pure</span>
                  </div>
                  <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:border-golden/80 transition-all group shadow-lg">
                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-golden/40 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-golden/60 transition-colors shadow-md">
                      <Zap className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white">Farm Fresh</span>
                    <span className="text-xs text-white/80 mt-1">Direct from Bihar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
