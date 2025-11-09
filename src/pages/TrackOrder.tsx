import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Package, Clock, ArrowLeft } from "lucide-react";

const TrackOrder = () => {
  return (
    <>
      <SEO 
        title="Track Your Order - Coming Soon | Makario"
        description="Track your makhana order. This feature is coming soon. Contact us for order updates."
        keywords="track order, order status, makhana delivery tracking"
        canonical="https://makario.in/track-order"
        noindex={true}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-heritage/5 via-golden/5 to-muted/20 flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-heritage to-heritage/90 p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Track Your Order</h1>
              <p className="text-white/90 text-lg">Feature Coming Soon</p>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-golden/10 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-golden" />
                </div>
                <h2 className="text-2xl font-bold text-heritage mb-4">
                  We're Working On It!
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Our order tracking system is currently under development. We're building 
                  an amazing experience to help you track your makhana orders in real-time.
                </p>
                <div className="bg-golden/10 border-2 border-golden/20 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-heritage mb-3">In the meantime...</h3>
                  <p className="text-muted-foreground mb-4">
                    For order updates and delivery status, please contact us directly:
                  </p>
                  <div className="space-y-2">
                    <p className="text-heritage font-semibold">
                      📞 Phone: <a href="tel:+919953240031" className="text-golden hover:underline">+91 9953240031</a>
                    </p>
                    <p className="text-heritage font-semibold">
                      ✉️ Email: <a href="mailto:info@makario.in" className="text-golden hover:underline">info@makario.in</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  asChild
                  className="bg-heritage hover:bg-heritage/90"
                >
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="border-2 border-golden text-golden hover:bg-golden hover:text-white"
                >
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-gradient-to-br from-heritage/5 to-golden/5 p-8 border-t border-heritage/10">
              <h3 className="text-center font-semibold text-heritage mb-6">Coming Soon Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <p className="text-sm font-semibold text-heritage">Real-time Tracking</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-sm font-semibold text-heritage">SMS Updates</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <p className="text-sm font-semibold text-heritage">Push Notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default TrackOrder;
