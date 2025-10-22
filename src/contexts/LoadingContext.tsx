import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  showProgress: boolean;
  progress: number;
  setLoading: (loading: boolean, message?: string) => void;
  setProgress: (progress: number) => void;
  setProgressMode: (showProgress: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgressValue] = useState(0);

  const setLoading = useCallback((loading: boolean, message = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  }, []);

  const setProgress = useCallback((progress: number) => {
    setProgressValue(Math.min(100, Math.max(0, progress)));
  }, []);

  const setProgressMode = useCallback((show: boolean) => {
    setShowProgress(show);
    if (!show) setProgressValue(0);
  }, []);

  const value: LoadingContextType = {
    isLoading,
    loadingMessage,
    showProgress,
    progress,
    setLoading,
    setProgress,
    setProgressMode,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Hook for route-based loading
export const useRouteLoading = () => {
  const { setLoading, setProgress, setProgressMode } = useLoading();
  
  const startRouteLoading = useCallback((message = 'Loading page...') => {
    setProgressMode(true);
    setProgress(0);
    setLoading(true, message);
    
    // Simulate progressive loading
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 90) {
        setProgress(90);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgressMode(false);
      }, 200);
    };
  }, [setLoading, setProgress, setProgressMode]);

  return { startRouteLoading };
};