import React from 'react';
import { Button } from './ui/button';
import whatsappIcon from '@/assets/whatsapp icon.png';

const WhatsAppButton = () => {
  // Mobile number from footer
  const phoneNumber = "+91 9953240031";
  
  // Pre-typed English message
  const message = "Hello! I'm interested in your premium Bihar Makhana products. Could you please provide more information about pricing and availability?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  
  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed right-4 z-50"
  style={{ bottom: window.innerWidth <= 768 ? '2rem' : '1rem' }}
      id="whatsapp-button-main"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 rounded-full w-14 h-14 md:w-16 md:h-16 p-0 shadow-2xl flex items-center justify-center hover:scale-110 relative overflow-hidden"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          {/* WhatsApp Icon Image */}
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="w-9 h-9 md:w-11 md:h-11"
          />
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppButton;