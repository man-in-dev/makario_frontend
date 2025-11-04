import React from 'react';
import { motion } from 'framer-motion';
import makLogo from '../assets/mak.webp';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <img 
          src={makLogo}
          alt="Loading..." 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ showProgress = false, progress = 0 }) => (
  <motion.div 
    className="fixed inset-0 bg-gradient-to-br from-heritage via-heritage/95 to-heritage flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-col items-center justify-center space-y-6 px-4">
      <motion.div
        className="relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img 
            src={makLogo}
            alt="Makario Logo" 
            className="w-48 h-48 object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 border-4 border-golden/30 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -inset-4 border-2 border-golden/20 rounded-full"
          animate={{ 
            rotate: [0, -360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {showProgress && (
        <div className="w-64 bg-white/10 rounded-full h-1 overflow-hidden">
          <motion.div
            className="bg-golden h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  </motion.div>
);

export default LoadingSpinner;