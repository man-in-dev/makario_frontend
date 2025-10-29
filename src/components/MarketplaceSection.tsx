import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import amazonLogo from "@/assets/homepage/png-clipart-logo-amazon-com-brand-flipkart-others-text-orange.png";
import flipkartLogo from "@/assets/homepage/logo-flipkart-png-flipkart-logo-5000.png";
import meeshoLogo from "@/assets/homepage/meesho.jpg";
import makarioLogo from "@/assets/Makario png Logo.png";
import blinkitLogo from "@/assets/homepage/outlook-blinkit-1_6232fc15c6315.jpg";
import zeptoLogo from "@/assets/homepage/Zepto-Logo-Vector.svg-.png";
import dmartLogo from "@/assets/homepage/dmart_logo_avenue_super_markets.png";
import relianceLogo from "@/assets/homepage/Logo-RelianceMall.d3f6af1b.webp";

export const MarketplaceSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-golden bg-golden/10 px-4 py-2 rounded-full border border-golden/20">
              🛍️ AVAILABLE ON MAJOR PLATFORMS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heritage">
            Also Available On
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Shop Makario premium makhana on your favorite e-commerce platforms
          </p>
        </div>

        {/* Marketplaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Amazon */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-golden/50">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow p-2">
                  <img src={amazonLogo} alt="Amazon" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heritage mb-2">Amazon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Shop on India's largest e-commerce platform
              </p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                ✓ Available Now
              </Badge>
            </CardContent>
          </Card>

          {/* Flipkart */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-golden/50">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow p-2">
                  <img src={flipkartLogo} alt="Flipkart" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heritage mb-2">Flipkart</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover deals on India's favorite marketplace
              </p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                ✓ Available Now
              </Badge>
            </CardContent>
          </Card>

          {/* Meesho */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-golden/50">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow p-2">
                  <img src={meeshoLogo} alt="Meesho" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heritage mb-2">Meesho</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Shop and resell premium makhana
              </p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                ✓ Available Now
              </Badge>
            </CardContent>
          </Card>

          {/* Makario.in */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-golden/50">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow p-2">
                  <img src={makarioLogo} alt="Makario" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heritage mb-2">Makario.in</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Direct from our official store
              </p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                ✓ Available Now
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-heritage mb-2">
              🚀 Coming Soon
            </h3>
            <p className="text-muted-foreground">
              Expanding to more platforms to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blinkit */}
            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <div className="mb-3 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2">
                  <img src={blinkitLogo} alt="Blinkit" className="w-full h-full object-contain" />
                </div>
              </div>
              <h4 className="font-bold text-heritage mb-1">Blinkit</h4>
              <p className="text-xs text-muted-foreground mb-3">
                10-minute delivery
              </p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Coming Soon
              </Badge>
            </div>

            {/* Zepto */}
            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
              <div className="mb-3 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2">
                  <img src={zeptoLogo} alt="Zepto" className="w-full h-full object-contain" />
                </div>
              </div>
              <h4 className="font-bold text-heritage mb-1">Zepto</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Quick commerce
              </p>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Coming Soon
              </Badge>
            </div>

            {/* Local D-Mart */}
            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-red-200 hover:border-red-400 transition-colors">
              <div className="mb-3 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2">
                  <img src={dmartLogo} alt="D-Mart" className="w-full h-full object-contain" />
                </div>
              </div>
              <h4 className="font-bold text-heritage mb-1">Local D-Mart</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Neighborhood stores
              </p>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Coming Soon
              </Badge>
            </div>

            {/* Reliance Mall */}
            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <div className="mb-3 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2">
                  <img src={relianceLogo} alt="Reliance Mall" className="w-full h-full object-contain" />
                </div>
              </div>
              <h4 className="font-bold text-heritage mb-1">Reliance Mall</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Premium retail
              </p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            🌟 Shop on your preferred platform and enjoy the same premium quality Makario makhana
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;

