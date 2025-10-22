import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingScreen } from './LoadingSpinner';

interface PageLoaderProps {
  children: React.ReactNode;
  loadingMessage?: string;
  minLoadTime?: number;
  showProgress?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  children, 
  loadingMessage = 'Loading page...',
  minLoadTime = 800,
  showProgress = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 100);
    }

    const timer = setTimeout(() => {
      if (showProgress) {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } else {
        setIsLoading(false);
      }
    }, minLoadTime);

    return () => {
      clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [minLoadTime, showProgress]);

  if (isLoading) {
    return (
      <LoadingScreen 
        message={loadingMessage}
        showProgress={showProgress}
        progress={progress}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageLoader;