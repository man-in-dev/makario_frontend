import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';

const useRouteTransition = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Don't show loading for initial page load
    if (navigationType === 'POP' && location.key === 'default') {
      return;
    }

    // Show loading for navigation
    const messages: Record<string, string> = {
      '/': 'Loading Home...',
      '/about': 'Loading About Us...',
      '/products': 'Loading Products...',
      '/shop': 'Loading Shop...',
      '/contact': 'Loading Contact...',
      '/blog': 'Loading Blog...',
      '/agriculture': 'Loading Agriculture...',
      '/global': 'Loading Global Reach...',
      '/farmers': 'Loading Our Farmers...',
      '/export-services': 'Loading Export Services...',
      '/quality-assurance': 'Loading Quality Assurance...',
      '/custom-packaging': 'Loading Custom Packaging...',
      '/logistics': 'Loading Logistics...',
      '/bulk-order': 'Loading Bulk Order...',
      '/cart': 'Loading Cart...',
      '/checkout': 'Loading Checkout...',
      '/wishlist': 'Loading Wishlist...',
      '/privacy': 'Loading Privacy Policy...',
      '/terms': 'Loading Terms of Service...',
      '/faq': 'Loading FAQ...',
    };

    const message = messages[location.pathname] || 
                   (location.pathname.startsWith('/product/') ? 'Loading Product Details...' : 'Loading Page...');

    setLoading(true, message);

    // Simulate minimum loading time for smooth UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [location.pathname, navigationType, setLoading]);
};

export default useRouteTransition;