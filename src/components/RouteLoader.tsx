import React, { Suspense, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './LoadingSpinner';
import { useLoading } from '@/contexts/LoadingContext';
import useRouteTransition from '@/hooks/useRouteTransition';

interface RouteLoaderProps {
  children: React.ReactNode;
}

const RouteLoader: React.FC<RouteLoaderProps> = ({ children }) => {
  const location = useLocation();
  const { isLoading, loadingMessage, showProgress, progress } = useLoading();
  const hasInitialLoadRef = useRef(false);
  
  // Handle route transitions
  useRouteTransition();

  useEffect(() => {
    hasInitialLoadRef.current = true;
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {hasInitialLoadRef.current && isLoading && (
          <LoadingScreen 
            key="loading"
            message={loadingMessage}
            showProgress={showProgress}
            progress={progress}
          />
        )}
      </AnimatePresence>
      
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <AnimatePresence mode="wait" initial={false}>
          <div key={location.pathname}>
            {children}
          </div>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

export default RouteLoader;