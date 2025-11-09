import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import all partner logos
import dmartLogo from '../assets/partners/dmart.png';
import amazonLogo from '../assets/partners/amazon.png';
import naturesBasketLogo from '../assets/partners/natures-basket.png';
import relianceLogo from '../assets/partners/reliance.png';
import bigbasketLogo from '../assets/partners/bigbasket.png';
import relianceMarketLogo from '../assets/partners/reliance-market.png';

const PartnersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    { image: dmartLogo, name: 'DMart', status: 'available' },
    { image: amazonLogo, name: 'Amazon', status: 'available' },
    { image: naturesBasketLogo, name: "Nature's Basket", status: 'coming-soon' },
    { image: relianceLogo, name: 'Reliance Retail', status: 'available' },
    { image: bigbasketLogo, name: 'BigBasket', status: 'coming-soon' },
    { image: relianceMarketLogo, name: 'Reliance Market', status: 'coming-soon' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === partners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-heritage/10 to-heritage/5">
      <div className="container mx-auto px-4">
        {/* Title with heritage design */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-heritage mb-4 relative inline-block">
            Partners in Flavor
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-golden"></div>
          </h2>
        </div>

        {/* Auto-sliding carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="flex justify-center items-center">
            <motion.div
              className="flex items-center gap-8"
              animate={{
                x: [-currentIndex * 280, -(currentIndex + 1) * 280],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="relative w-64 h-32 flex-shrink-0 group"
                >
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                    />
                    {partner.status === 'coming-soon' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 gap-2">
            {partners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-golden' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;