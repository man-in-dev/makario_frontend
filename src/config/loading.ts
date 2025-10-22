// Loading configuration and constants
export const LOADING_CONFIG = {
  // Minimum loading times for smooth UX (in milliseconds)
  MIN_LOADING_TIME: {
    fast: 300,      // For simple actions like adding to cart
    medium: 800,    // For page transitions  
    slow: 1500,     // For heavy data loading
  },
  
  // Loading messages for different contexts
  MESSAGES: {
    // Page loading
    HOME: 'Loading Premium Makhana...',
    PRODUCTS: 'Loading Our Products...',
    PRODUCT_DETAIL: 'Loading Product Details...',
    CART: 'Loading Your Cart...',
    CHECKOUT: 'Loading Checkout...',
    WISHLIST: 'Loading Your Wishlist...',
    ABOUT: 'Loading About Us...',
    CONTACT: 'Loading Contact Information...',
    BLOG: 'Loading Blog Posts...',
    
    // Action loading
    ADD_TO_CART: 'Adding to Cart...',
    REMOVE_FROM_CART: 'Removing from Cart...',
    UPDATE_QUANTITY: 'Updating Quantity...',
    ADD_TO_WISHLIST: 'Adding to Wishlist...',
    REMOVE_FROM_WISHLIST: 'Removing from Wishlist...',
    PLACE_ORDER: 'Placing Your Order...',
    PROCESSING_PAYMENT: 'Processing Payment...',
    
    // Data loading
    FETCHING_PRODUCTS: 'Fetching Fresh Products...',
    LOADING_RECOMMENDATIONS: 'Loading Recommendations...',
    SEARCHING: 'Searching Products...',
    FILTERING: 'Applying Filters...',
    
    // Generic
    DEFAULT: 'Loading...',
    PLEASE_WAIT: 'Please wait...',
  },
  
  // Animation durations
  ANIMATION: {
    fadeIn: 300,
    fadeOut: 200,
    slideIn: 400,
    bounce: 600,
  },
  
  // Progress bar settings
  PROGRESS: {
    smoothIncrement: 15,
    maxBeforeComplete: 90,
    completionDelay: 300,
  }
};

// Loading state types
export type LoadingState = 
  | 'idle' 
  | 'loading' 
  | 'success' 
  | 'error';

// Loading context types
export interface LoadingContextConfig {
  showLoader: boolean;
  message: string;
  showProgress: boolean;
  progress: number;
  state: LoadingState;
}

// Helper functions
export const createLoadingMessage = (action: string, item?: string): string => {
  if (item) {
    return `${action} ${item}...`;
  }
  return `${action}...`;
};

export const getMinLoadingTime = (type: keyof typeof LOADING_CONFIG.MIN_LOADING_TIME): number => {
  return LOADING_CONFIG.MIN_LOADING_TIME[type];
};

export const simulateProgress = (
  setProgress: (progress: number) => void,
  duration: number = 2000
): () => void => {
  let currentProgress = 0;
  const increment = LOADING_CONFIG.PROGRESS.smoothIncrement;
  const maxProgress = LOADING_CONFIG.PROGRESS.maxBeforeComplete;
  const intervalTime = duration / (maxProgress / increment);
  
  const interval = setInterval(() => {
    if (currentProgress >= maxProgress) {
      clearInterval(interval);
      return;
    }
    
    currentProgress += increment + Math.random() * 10;
    setProgress(Math.min(currentProgress, maxProgress));
  }, intervalTime);
  
  return () => clearInterval(interval);
};

// Route-specific loading configurations
export const ROUTE_LOADING_CONFIG = {
  '/': {
    message: LOADING_CONFIG.MESSAGES.HOME,
    minTime: LOADING_CONFIG.MIN_LOADING_TIME.medium,
    showProgress: true,
  },
  '/products': {
    message: LOADING_CONFIG.MESSAGES.PRODUCTS,
    minTime: LOADING_CONFIG.MIN_LOADING_TIME.medium,
    showProgress: true,
  },
  '/product/:id': {
    message: LOADING_CONFIG.MESSAGES.PRODUCT_DETAIL,
    minTime: LOADING_CONFIG.MIN_LOADING_TIME.fast,
    showProgress: false,
  },
  '/cart': {
    message: LOADING_CONFIG.MESSAGES.CART,
    minTime: LOADING_CONFIG.MIN_LOADING_TIME.fast,
    showProgress: false,
  },
  '/checkout': {
    message: LOADING_CONFIG.MESSAGES.CHECKOUT,
    minTime: LOADING_CONFIG.MIN_LOADING_TIME.medium,
    showProgress: true,
  },
} as const;