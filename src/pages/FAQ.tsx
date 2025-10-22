import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Product Quality & Specifications",
      icon: "🌟",
      faqs: [
        {
          question: "What makes Bihar makhana superior to other foxnuts in the market?",
          answer: "Bihar makhana is superior due to its unique growing conditions in the state's wetlands, traditional processing methods passed down through generations, larger size, better texture, and higher nutritional value. The specific climate and soil conditions of Bihar create the perfect environment for premium quality lotus seed cultivation."
        },
        {
          question: "What are the different grades of makhana you offer and their specifications?",
          answer: "We offer three main grades: Premium Grade A (20-25mm, <2% breakage, export quality), Commercial Grade B (15-20mm, <5% breakage, food grade), and Processing Grade (mixed sizes, <10% breakage, industrial use). Each grade is carefully sorted and quality-tested to meet specific industry requirements."
        },
        {
          question: "How do you ensure the quality and purity of your makhana products?",
          answer: "Our quality assurance includes multi-stage sorting, moisture content testing, cleanliness verification, size grading, chemical residue testing, and packaging in controlled environments. We follow ISO standards and conduct regular third-party quality audits to maintain consistency."
        },
        {
          question: "What is the shelf life of Bihar makhana and how should it be stored?",
          answer: "Bihar makhana has a shelf life of 12-18 months when stored properly in a cool, dry place away from direct sunlight. We recommend storing in airtight containers with moisture levels below 8%. Our packaging includes moisture-proof materials to maintain freshness during transportation and storage."
        }
      ]
    },
    {
      category: "Health & Nutrition Benefits",
      icon: "💚",
      faqs: [
        {
          question: "What are the proven health benefits of consuming Bihar makhana regularly?",
          answer: "Bihar makhana offers numerous health benefits: high protein content (9.7g per 100g), rich in antioxidants, low in calories, supports heart health, aids in weight management, improves kidney function, strengthens bones with calcium and phosphorus, and provides essential amino acids. It's also gluten-free and suitable for diabetics."
        },
        {
          question: "Is makhana suitable for people with diabetes and weight management goals?",
          answer: "Yes, makhana is excellent for diabetics and weight management. It has a low glycemic index, helps regulate blood sugar, is low in calories (347 per 100g), high in fiber for satiety, and provides sustained energy. The high protein content helps maintain muscle mass during weight loss."
        },
        {
          question: "How does the nutritional profile of Bihar makhana compare to other nuts and seeds?",
          answer: "Bihar makhana surpasses many nuts and seeds in several aspects: lower in fat than almonds and cashews, higher in protein than most seeds, rich in magnesium (more than walnuts), contains more calcium than pistachios, and provides unique antioxidants not found in traditional nuts."
        },
        {
          question: "Can pregnant women and children safely consume makhana products?",
          answer: "Yes, makhana is safe and beneficial for pregnant women and children. It provides essential nutrients like folate, calcium, and iron for pregnancy. For children, it's an excellent calcium source for bone development, easy to digest, and a healthy alternative to processed snacks. Always consult healthcare providers for specific dietary requirements."
        }
      ]
    },
    {
      category: "Cultivation & Farming Practices",
      icon: "🌱",
      faqs: [
        {
          question: "What sustainable farming practices do you follow in makhana cultivation?",
          answer: "We practice organic cultivation without harmful pesticides, maintain traditional crop rotation, preserve natural wetland ecosystems, use biological pest control methods, maintain soil health through natural fertilizers, and support biodiversity conservation. Our farming methods are environmentally sustainable and support local ecosystems."
        },
        {
          question: "How do seasonal variations affect makhana quality and availability?",
          answer: "Makhana cultivation follows seasonal patterns: planting in March-April, harvesting from August-December. Peak quality is achieved during October-November harvest. Seasonal variations affect size, moisture content, and nutritional density. We maintain year-round supply through proper storage and inventory management."
        },
        {
          question: "What support do you provide to local farmers in Bihar?",
          answer: "We provide comprehensive farmer support including: fair pricing guarantees, technical training on best practices, quality seed supply, agricultural equipment access, organic certification assistance, crop insurance guidance, and direct market linkages. We work with over 500+ farmers across Bihar to ensure sustainable livelihoods."
        }
      ]
    },
    {
      category: "Export & International Trade",
      icon: "🌍",
      faqs: [
        {
          question: "Which countries do you export Bihar makhana to and what are the requirements?",
          answer: "We export to 50+ countries including USA, UK, Canada, Australia, Germany, UAE, Singapore, and more. Each country has specific requirements for phytosanitary certificates, organic certifications, packaging standards, and labeling. We handle all export documentation and compliance requirements."
        },
        {
          question: "What certifications do you have for international export of makhana?",
          answer: "Our certifications include: FSSAI (Food Safety), Organic India Certification, APEDA registration, ISO 22000 (Food Safety Management), HACCP compliance, and country-specific certifications like USDA Organic for US exports. We maintain all necessary documentation for seamless international trade."
        },
        {
          question: "How do you ensure product quality during international shipping?",
          answer: "We use specialized packaging with moisture barriers, temperature-controlled containers for sensitive shipments, GPS tracking for real-time monitoring, multiple quality checkpoints, and partnerships with reliable logistics providers. Our packaging maintains product integrity for 45+ day shipping periods."
        },
        {
          question: "What are your minimum order quantities for international buyers?",
          answer: "Minimum order quantities vary by destination: For container shipments (FCL): 10-15 tons, LCL shipments: 1-2 tons minimum, Air freight: 100kg minimum, Sample orders: 5-10kg. We offer flexible terms for new buyers and provide sample quantities for quality evaluation."
        }
      ]
    },
    {
      category: "Pricing & Commercial Terms",
      icon: "💰",
      faqs: [
        {
          question: "How do you determine pricing for different grades and quantities of makhana?",
          answer: "Pricing factors include: grade and size specifications, order volume (bulk discounts available), seasonal variations, packaging requirements, destination location, and current market conditions. We offer competitive pricing with volume discounts starting from 1-ton orders and special rates for annual contracts."
        },
        {
          question: "What payment terms and methods do you accept for bulk orders?",
          answer: "We accept various payment methods: Bank transfers (T/T), Letters of Credit (L/C), Trade financing, Documentary collections, and for domestic orders - UPI, NEFT, RTGS. Payment terms range from advance payment for new buyers to 30-60 day credit terms for established customers."
        },
        {
          question: "Do you offer price guarantees and contract farming arrangements?",
          answer: "Yes, we offer annual price contracts with volume commitments, seasonal price guarantees for advance bookings, contract farming arrangements with guaranteed buyback, and price protection against market volatility. These arrangements benefit both buyers and farmers with price stability."
        }
      ]
    }
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Bihar Makhana FAQ - Frequently Asked Questions",
    "description": "Get answers to frequently asked questions about Bihar makhana, foxnuts quality, health benefits, export procedures, and farming practices.",
    "url": "https://biharmakhana.com/faq",
    "mainEntity": faqCategories.flatMap(category => 
      category.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Bihar Makhana FAQ | Frequently Asked Questions About Premium Foxnuts Export"
        description="Get expert answers to frequently asked questions about Bihar makhana - quality specifications, health benefits, export procedures, farming practices, pricing, and more. Complete guide for buyers and importers."
        keywords="bihar makhana faq, foxnuts frequently asked questions, makhana export queries, lotus seeds questions answers, bihar makhana quality, foxnuts health benefits faq, makhana export procedures, organic foxnuts questions, bihar lotus seeds specifications, makhana farming practices faq"
        canonical="https://biharmakhana.com/faq"
        ogImage="https://biharmakhana.com/images/faq-og.jpg"
        structuredData={faqStructuredData}
        breadcrumbs={[
          { name: "Home", url: "https://biharmakhana.com/" },
          { name: "FAQ", url: "https://biharmakhana.com/faq" }
        ]}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-golden" />
            <h1 className="text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get expert answers to all your questions about Bihar makhana, quality, export procedures, and more
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-heritage">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers organized by topics to help you quickly locate the information you need
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="flex items-center gap-3 text-2xl text-heritage">
                    <span className="text-3xl">{category.icon}</span>
                    {category.category}
                    <Badge variant="secondary" className="ml-auto">
                      {category.faqs.length} Questions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/20 text-lg font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6 text-heritage">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Can't find the answer you're looking for? Our expert team is here to help you with any specific queries about Bihar makhana.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-heritage" />
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our experts in real-time
                </p>
                <Button size="sm" variant="outline">Start Chat</Button>
              </Card>
              
              <Card className="text-center p-6">
                <Phone className="w-12 h-12 mx-auto mb-4 text-heritage" />
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with our team
                </p>
                <Button size="sm" variant="outline">+91-9953240031</Button>
              </Card>
              
              <Card className="text-center p-6">
                <Mail className="w-12 h-12 mx-auto mb-4 text-heritage" />
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get detailed answers via email
                </p>
                <Link to="/contact">
                  <Button size="sm" variant="outline">Send Email</Button>
                </Link>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-heritage hover:bg-heritage/90">
                  Contact Our Experts
                </Button>
              </Link>
              <Link to="/bulk-order">
                <Button size="lg" variant="outline">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
