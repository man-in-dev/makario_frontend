import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Gift, Clock3 } from 'lucide-react';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after a small delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`relative max-w-md w-full transform transition-all duration-500 ${isClosing ? 'scale-95' : 'scale-100'}`}>
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-black transition-all hover:scale-110 z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Top Design Element */}
          <div className="h-1 sm:h-2 bg-gradient-to-r from-golden via-heritage to-golden" />

          {/* Header Image */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-golden/20 to-heritage/20 overflow-hidden">
            <img 
              src="/src/assets/Product Front.jpg" 
              alt="Makhana Special Offer"
              className="w-full h-full object-cover mix-blend-overlay opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-heritage mb-1 sm:mb-2 drop-shadow-lg">
                  Special Offer
                </div>
                <div className="text-base sm:text-xl text-heritage/90 font-medium drop-shadow">
                  Limited Time Deal
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Offer Details */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl font-bold text-heritage mb-1 sm:mb-2">20% OFF</div>
              <div className="text-sm sm:text-base text-gray-600">On Your First Order Above ₹999</div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full bg-golden/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-golden" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Premium Quality</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full bg-golden/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-golden" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Free Shipping</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full bg-golden/10 flex items-center justify-center">
                  <Clock3 className="w-5 h-5 sm:w-6 sm:h-6 text-golden" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Fast Delivery</div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-gradient-to-r from-golden/10 to-heritage/10 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center mb-4 sm:mb-6">
              <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Use Code</div>
              <div className="text-xl sm:text-2xl font-bold text-heritage tracking-wider">WELCOME20</div>
            </div>

            {/* Validity */}
            <div className="text-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Clock3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Valid until October 31, 2025</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-golden to-heritage text-white text-sm sm:text-base rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              Shop Now & Save
            </button>

            {/* Terms */}
            <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
              *Terms and conditions apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;