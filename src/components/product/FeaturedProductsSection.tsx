import React, { useState } from 'react';
import { Product } from '../../data/products';
import { FeaturedProductCard } from './FeaturedProductCard';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedProductsSectionProps {
  products: Product[];
  title?: string;
  className?: string;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ 
  products, 
  title = "SEASON'S TOP PICKS",
  className = "" 
}) => {
  // Mobile carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Mobile: Show 2 products per slide in a single row
  const productsPerSlide = 2;
  const maxIndex = Math.ceil(products.length / productsPerSlide) - 1;

  const handlePrevious = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsScrolling(false), 500);
  };

  const handleNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsScrolling(false), 500);
  };

  if (!products || products.length === 0) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No featured products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-wide">{title}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our premium collection of Bihar makhana products. Fresh, organic, and healthy fox nuts directly from Bihar's finest cultivation areas.
          </p>
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop View - Grid Layout */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {products.slice(0, 10).map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Tablet View - 3 products in a row */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-3 gap-4">
              {products.slice(0, 10).map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Mobile View - Single Row Carousel */}
          <div className="block md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {/* Show 2 products per slide */}
                {Array.from({ length: Math.ceil(products.length / 2) }).map((_, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0 px-2">
                    <div className="grid grid-cols-2 gap-4">
                      {products.slice(groupIndex * 2, (groupIndex + 1) * 2).map((product) => (
                        <div key={product.id} className="mb-3">
                          <FeaturedProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-white hover:border-gray-300"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isScrolling}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-white hover:border-gray-300"
              onClick={handleNext}
              disabled={currentIndex === maxIndex || isScrolling}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Mobile Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                    ${currentIndex === index ? 'bg-gray-900 w-5' : 'bg-gray-300 hover:bg-gray-400'}`}
                  onClick={() => !isScrolling && setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
            <Link to="/shop" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}