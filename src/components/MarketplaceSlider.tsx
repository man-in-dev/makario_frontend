import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import logos
import amazonLogo from '@/assets/partners/673510.png'; // Amazon logo
import flipkartLogo from '@/assets/partners/logo-flipkart-png-flipkart-logo-5000.png';
import meeshoLogo from '@/assets/partners/meesho.jpg';
import makarioLogo from '@/assets/Makario png Logo.png';
import blinkitLogo from '@/assets/partners/outlook-blinkit-1_6232fc15c6315.jpg';
import zeptoLogo from '@/assets/partners/Zepto-Logo-Vector.svg-.png';
import dmartLogo from '@/assets/partners/dmart_logo_avenue_super_markets.png';
import relianceLogo from '@/assets/partners/Logo-RelianceMall.d3f6af1b.webp';

const marketplaceLogo = [
  { name: 'Amazon', image: amazonLogo, status: 'available' },
  { name: 'Flipkart', image: flipkartLogo, status: 'available' },
  { name: 'Meesho', image: meeshoLogo, status: 'available' },
  { name: 'Makario', image: makarioLogo, status: 'available' },
  { name: 'Blinkit', image: blinkitLogo, status: 'coming-soon' },
  { name: 'Zepto', image: zeptoLogo, status: 'coming-soon' },
  { name: 'D-Mart', image: dmartLogo, status: 'coming-soon' },
  { name: 'Reliance Mall', image: relianceLogo, status: 'coming-soon' }
];

const MarketplaceSlider = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden py-8 bg-gradient-to-r from-golden/5 to-heritage/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex gap-8"
          animate={isVisible ? {
            x: [-1200, 0],
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
          {/* Double the items for seamless loop */}
          {[...marketplaceLogo, ...marketplaceLogo].map((logo, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-40 h-32 bg-white/50 rounded-lg p-4 group
                        backdrop-blur-sm border border-golden/10 hover:border-golden/30
                        transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="w-full h-full object-contain filter brightness-95 group-hover:brightness-100
                          transition-all duration-300 transform group-hover:scale-110"
              />
              {logo.status === 'coming-soon' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-golden/20 px-3 py-1 rounded-full
                                border border-golden/30 backdrop-blur-sm">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
};

export default MarketplaceSlider;
