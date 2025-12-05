/**
 * Utility to dynamically load Cashfree checkout script
 */

declare global {
  interface Window {
    Cashfree?: any;
  }
}

export const loadCashfreeScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Cashfree is already loaded
    if (window.Cashfree) {
      resolve();
      return;
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src*="cashfree"]');
    if (existingScript) {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.Cashfree) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.Cashfree) {
          reject(new Error('Cashfree script loading timeout'));
        }
      }, 10000);
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;

    script.onload = () => {
      // Wait a bit for Cashfree to be available
      const checkInterval = setInterval(() => {
        if (window.Cashfree) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.Cashfree) {
          reject(new Error('Cashfree object not available after script load'));
        } else {
          resolve();
        }
      }, 5000);
    };

    script.onerror = () => {
      reject(new Error('Failed to load Cashfree script'));
    };

    document.head.appendChild(script);
  });
};

export const initializeCashfree = (mode: 'sandbox' | 'production' = 'sandbox') => {
  if (!window.Cashfree) {
    throw new Error('Cashfree script not loaded. Call loadCashfreeScript() first.');
  }

  return window.Cashfree({
    mode,
  });
};

