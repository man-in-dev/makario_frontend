import React, { Suspense } from 'react';
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
  
  // Handle route transitions
  useRouteTransition();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loading"
            message={loadingMessage}
            showProgress={showProgress}
            progress={progress}
          />
        )}
      </AnimatePresence>
      
      <Suspense 
        fallback={
          <LoadingScreen 
            message="Loading components..."
            showProgress={false}
          />
        }
      >
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