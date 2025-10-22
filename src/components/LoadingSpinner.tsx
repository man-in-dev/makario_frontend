import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-golden/20 border-t-golden rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.p
          className="text-sm text-heritage/70 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Enhanced Loading Screen with Logo
interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading Makario...", 
  showProgress = false,
  progress = 0
}) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-heritage via-heritage/95 to-heritage flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-4">
        {/* Logo Animation */}
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
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/be26238e-2161-40dd-afd9-e69df2853b49.png" 
              alt="Makario Logo" 
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </motion.div>
          
          {/* Glowing Ring Animation */}
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
          
          {/* Outer Ring */}
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

        {/* Brand Text */}
        <motion.div
          className="text-center space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold text-golden tracking-wide"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(212, 165, 116, 0.3)",
                "0 0 20px rgba(212, 165, 116, 0.5)",
                "0 0 10px rgba(212, 165, 116, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Makario
          </motion.h1>
          <motion.p 
            className="text-nature text-sm font-medium tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            THE PRIDE OF BIHAR
          </motion.p>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          className="text-center space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.p 
            className="text-white/80 text-sm"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {message}
          </motion.p>
          
          {/* Loading Bar */}
          {showProgress ? (
            <div className="w-64 bg-white/10 rounded-full h-1 overflow-hidden">
              <motion.div
                className="bg-golden h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ) : (
            <div className="w-64 bg-white/10 rounded-full h-1 overflow-hidden">
              <motion.div
                className="bg-golden h-full rounded-full w-1/3"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-golden/20 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + Math.sin(i) * 20}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;