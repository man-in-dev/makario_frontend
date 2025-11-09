import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Import partner logos
import dmartLogo from '../assets/partners/dmart_logo_avenue_super_markets.png';
import flipkartLogo from '../assets/partners/logo-flipkart-png-flipkart-logo-5000.png';
import relianceLogo from '../assets/partners/Logo-RelianceMall.d3f6af1b.webp';
import meeshoLogo from '../assets/partners/meesho.jpg';
import blinkitLogo from '../assets/partners/outlook-blinkit-1_6232fc15c6315.jpg';
import zeptoLogo from '../assets/partners/Zepto-Logo-Vector.svg-.png';

const partnerLogos = [
  {
    name: 'D-Mart',
    image: dmartLogo,
    status: 'available'
  },
  {
    name: 'Flipkart',
    image: flipkartLogo,
    status: 'available'
  },
  {
    name: 'Reliance Mall',
    image: relianceLogo,
    status: 'available'
  },
  {
    name: 'Meesho',
    image: meeshoLogo,
    status: 'coming-soon'
  },
  {
    name: 'Blinkit',
    image: blinkitLogo,
    status: 'coming-soon'
  },
  {
    name: 'Zepto',
    image: zeptoLogo,
    status: 'coming-soon'
  }
];

const PartnersInFlavor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set visible after a short delay to ensure smooth mounting
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-heritage/95 opacity-95">
        <div className="absolute inset-0 bg-[url('/patterns/grain.png')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with elegant design */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-golden/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-light via-golden to-golden-light">
              Partners in Flavor
            </span>
            {/* Decorative underline */}
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-golden/50 to-transparent"></div>
            {/* Floating particles */}
            <div className="absolute -left-8 -top-8 w-16 h-16 bg-golden/5 rounded-full blur-xl animate-float"></div>
            <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-golden/10 rounded-full blur-xl animate-float-delayed"></div>
          </h2>
        </div>

        {/* Auto-scrolling carousel with improved design */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="flex gap-8 py-8"
            animate={isVisible ? {
              x: [0, -1920],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }
            } : {}}
          >
            {/* Double the items to create seamless loop */}
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-48 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden group
                          backdrop-blur-sm border border-white/10 hover:border-golden/30 transition-all duration-500
                          hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-golden/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-contain p-6 filter brightness-90 group-hover:brightness-110 transition-all duration-500 transform group-hover:scale-110"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                </div>
                {/* Coming Soon Overlay */}
                {partner.status === 'coming-soon' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-lg bg-golden/20 px-4 py-2 rounded-full border border-golden/30 backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Enhanced gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-heritage via-heritage/95 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-heritage via-heritage/95 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersInFlavor;