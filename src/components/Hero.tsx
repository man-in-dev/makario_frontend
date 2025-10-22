import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import heroImage from "@/assets/hero-makhana.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src={heroImage}
          alt="Premium Bihar Makhana"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-heritage/80 via-heritage/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-golden text-golden" />
              ))}
            </div>
            <span className="text-golden font-medium">Premium Quality</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Bihar's Pride
            <span className="block text-golden">Global Makhana</span>
          </h1>

          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            From the fertile fields of Bihar to tables worldwide. Experience the finest
            quality makhana, traditionally grown and sustainably harvested.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6 group bg-golden hover:bg-golden/90" asChild>
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 group border-white text-white hover:bg-white hover:text-heritage" asChild>
              <Link to="/products">
                <span className="text-golden">Explore Products</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-golden" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-heritage" asChild>
              <Link to="/bulk-order">Bulk Orders</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">50+</div>
              <div className="text-sm text-gray-200">Countries Export</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">100%</div>
              <div className="text-sm text-gray-200">Natural & Organic</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">25+</div>
              <div className="text-sm text-gray-200">Years Heritage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;