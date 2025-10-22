import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Quote, Package, Globe } from "lucide-react";

interface QuoteFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  productName?: string;
}

const QuoteForm = ({ 
  isOpen = true, 
  onClose,
  productName = ""
}: QuoteFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    productType: productName || "",
    quantity: "",
    quantityUnit: "kg",
    deliveryLocation: "",
    urgency: "",
    budget: "",
    packagingPreference: "",
    certificationNeeds: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
          quantity: `${formData.quantity} ${formData.quantityUnit}`,
          delivery_location: formData.deliveryLocation,
          urgency: formData.urgency,
          budget_range: formData.budget,
          packaging_preference: formData.packagingPreference,
          certification_needs: formData.certificationNeeds,
          message: formData.message,
          subject: `Quote Request - ${formData.productType} from ${formData.name}`,
          from_name: "Bihar Makhana Website - Quote Request",
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent Successfully!",
          description: "We'll prepare your customized quote and get back to you within 24 hours.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          productType: "",
          quantity: "",
          quantityUnit: "kg",
          deliveryLocation: "",
          urgency: "",
          budget: "",
          packagingPreference: "",
          certificationNeeds: "",
          message: ""
        });
        
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      } else {
        throw new Error("Failed to send quote request");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again later.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-heritage rounded-full flex items-center justify-center">
                <Quote className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heritage">Request Quote</h2>
                <p className="text-gray-600">Get customized pricing for your makhana requirements</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>

            {/* Product Requirements */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select makhana type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Premium Grade A Makhana">Premium Grade A Makhana</SelectItem>
                      <SelectItem value="Commercial Grade Makhana">Commercial Grade Makhana</SelectItem>
                      <SelectItem value="Processing Grade Makhana">Processing Grade Makhana</SelectItem>
                      <SelectItem value="Organic Certified Makhana">Organic Certified Makhana</SelectItem>
                      <SelectItem value="Flavored Makhana">Flavored Makhana</SelectItem>
                      <SelectItem value="Roasted Makhana">Roasted Makhana</SelectItem>
                      <SelectItem value="Raw Makhana">Raw Makhana</SelectItem>
                      <SelectItem value="Mixed Varieties">Mixed Varieties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                      placeholder="500"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantityUnit">Unit</Label>
                    <Select value={formData.quantityUnit} onValueChange={(value) => setFormData({...formData, quantityUnit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="ton">Tons</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="packets">Packets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                  <Input
                    id="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                    required
                    placeholder="City, State, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="urgency">Delivery Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need it?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (1-3 days)</SelectItem>
                      <SelectItem value="urgent">Urgent (1 week)</SelectItem>
                      <SelectItem value="standard">Standard (2-4 weeks)</SelectItem>
                      <SelectItem value="flexible">Flexible (1-2 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="packagingPreference">Packaging Preference</Label>
                <Select value={formData.packagingPreference} onValueChange={(value) => setFormData({...formData, packagingPreference: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select packaging type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Bags</SelectItem>
                    <SelectItem value="premium">Premium Packaging</SelectItem>
                    <SelectItem value="custom">Custom Branding</SelectItem>
                    <SelectItem value="bulk">Bulk Packaging</SelectItem>
                    <SelectItem value="retail">Retail Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="certificationNeeds">Certification Requirements</Label>
                <Select value={formData.certificationNeeds} onValueChange={(value) => setFormData({...formData, certificationNeeds: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Required certifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic Certification</SelectItem>
                    <SelectItem value="fssai">FSSAI License</SelectItem>
                    <SelectItem value="export">Export Documentation</SelectItem>
                    <SelectItem value="halal">Halal Certification</SelectItem>
                    <SelectItem value="kosher">Kosher Certification</SelectItem>
                    <SelectItem value="none">No Special Requirements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                  <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="1l-5l">₹1,00,000 - ₹5,00,000</SelectItem>
                  <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                  <SelectItem value="above-10l">Above ₹10,00,000</SelectItem>
                  <SelectItem value="discuss">Prefer to Discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Additional Requirements & Message *</Label>
              <Textarea
                id="message"
                placeholder="Please describe any specific requirements, quality preferences, or additional information that would help us prepare the best quote for you..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700 mb-3">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• We'll review your requirements within 2 hours</li>
                <li>• Our team will prepare a customized quote</li>
                <li>• You'll receive detailed pricing via email within 24 hours</li>
                <li>• Free sample available for bulk orders</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              variant="hero" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Request..." : "Get My Quote Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
