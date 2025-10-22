import { useState, useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

interface UseAsyncDataOptions<T> {
  initialData?: T;
  loadingMessage?: string;
  errorMessage?: string;
  deps?: React.DependencyList;
  showProgress?: boolean;
}

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
): AsyncDataState<T> {
  const {
    initialData = null,
    loadingMessage = 'Loading data...',
    errorMessage = 'Failed to load data',
    deps = [],
    showProgress = false
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { setLoading: setGlobalLoading, setProgress, setProgressMode } = useLoading();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setGlobalLoading(true, loadingMessage);
      
      if (showProgress) {
        setProgressMode(true);
        setProgress(0);
        
        // Simulate progress during fetch
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          currentProgress = Math.min(currentProgress + Math.random() * 20, 90);
          setProgress(currentProgress);
        }, 200);

        const result = await asyncFunction();
        
        clearInterval(progressInterval);
        setProgress(100);
        
        setTimeout(() => {
          setData(result);
          setLoading(false);
          setGlobalLoading(false);
          setProgressMode(false);
        }, 300);
      } else {
        const result = await asyncFunction();
        setData(result);
        setLoading(false);
        setGlobalLoading(false);
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(errorMessage);
      setError(errorObj);
      setLoading(false);
      setGlobalLoading(false);
      if (showProgress) setProgressMode(false);
      console.error('Async data fetch error:', errorObj);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Hook specifically for API calls with better error handling
export function useApiCall<T>(
  apiFunction: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
) {
  return useAsyncData(apiFunction, {
    ...options,
    showProgress: options.showProgress ?? true,
    loadingMessage: options.loadingMessage ?? 'Fetching data...'
  });
}

// Hook for simulated loading (useful for testing)
export function useSimulatedLoading(
  duration: number = 2000,
  message: string = 'Loading...'
) {
  const [loading, setLoading] = useState(true);
  const { setLoading: setGlobalLoading } = useLoading();

  useEffect(() => {
    setGlobalLoading(true, message);
    
    const timer = setTimeout(() => {
      setLoading(false);
      setGlobalLoading(false);
    }, duration);

    return () => {
      clearTimeout(timer);
      setGlobalLoading(false);
    };
  }, [duration, message, setGlobalLoading]);

  return loading;
}