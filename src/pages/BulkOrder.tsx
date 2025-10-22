import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Package, Truck, Shield, Phone } from "lucide-react";

const BulkOrder = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    productType: "",
    quantity: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "ae7ee658-dfb2-4490-95ed-595ee9584dd2",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          country: formData.country,
          product_type: formData.productType,
          quantity: formData.quantity,
          message: formData.message,
          subject: `Bulk Order Request from ${formData.name}`,
          from_name: "Makari Bulk Orders",
        }),
      });

      if (response.ok) {
        toast({
          title: "Order Request Submitted!",
          description: "We'll contact you within 24 hours with detailed pricing and shipping information.",
        });
        
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          country: "",
          productType: "",
          quantity: "",
          message: ""
        });
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const bulkBenefits = [
    {
      icon: Package,
      title: "Competitive Pricing",
      description: "Volume-based discounts for bulk orders"
    },
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Worldwide delivery with tracking"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every batch tested and certified"
    },
    {
      icon: Phone,
      title: "Dedicated Support",
      description: "Personal account manager for large orders"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-heritage">Bulk Orders & Wholesale</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Partner with Bihar's leading makhana exporters. Get competitive pricing, 
            premium quality assurance, and reliable global shipping for your business needs.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Why Choose Our Bulk Service?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the advantages of working directly with Bihar's premium makhana producers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {bulkBenefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-card mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-heritage" />
                  </div>
                  <h3 className="font-semibold mb-2 text-heritage">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center text-heritage">Request Bulk Quote</CardTitle>
                <p className="text-center text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed quote
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        placeholder="Delivery destination"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="productType">Product Type *</Label>
                      <Select value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium-roasted">Premium Roasted Makhana</SelectItem>
                          <SelectItem value="natural-raw">Natural Raw Makhana</SelectItem>
                          <SelectItem value="flavored">Flavored Makhana</SelectItem>
                          <SelectItem value="organic">Organic Certified</SelectItem>
                          <SelectItem value="mixed">Mixed Varieties</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Required Quantity *</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 1000 kg"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about packaging preferences, delivery timeline, or any special requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="hero" size="lg">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Bulk Pricing & Terms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing and flexible terms for all business sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-heritage">Volume Discounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">500-1000 kg</span>
                  <span className="text-sm font-semibold text-green-600">5% off</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">1000-5000 kg</span>
                  <span className="text-sm font-semibold text-green-600">10% off</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">5000+ kg</span>
                  <span className="text-sm font-semibold text-green-600">15% off</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Container Load (20+ tons)</span>
                  <span className="text-sm font-semibold text-green-600">20% off</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-heritage">Minimum Order Quantities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Domestic Orders</span>
                  <span className="text-sm font-semibold">500 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">International Orders</span>
                  <span className="text-sm font-semibold">1000 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Container Load</span>
                  <span className="text-sm font-semibold">20+ tons</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-heritage">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Letter of Credit (LC)</p>
                <p className="text-sm text-muted-foreground">• Telegraphic Transfer (TT)</p>
                <p className="text-sm text-muted-foreground">• Advance Payment (for smaller orders)</p>
                <p className="text-sm text-muted-foreground">• 30-day credit terms (for established clients)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BulkOrder;