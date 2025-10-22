// Performance optimization utilities

// Lazy loading utility
export const lazyLoad = (callback: () => void, delay: number = 0) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: delay });
  } else {
    setTimeout(callback, delay);
  }
};

// Image lazy loading
export const setupImageLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/assets/hero-makhana.jpg',
    '/lovable-uploads/be26238e-2161-40dd-afd9-e69df2853b49.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Image optimization utilities
export const initImageOptimization = () => {
  // Setup lazy loading
  setupImageLazyLoading();
  
  // Optimize existing images
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach((img, index) => {
      if (index > 2) { // Skip first 3 images (likely above fold)
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });
  });
};

// Web Vitals monitoring
export const initWebVitals = () => {
  // CLS monitoring
  let clsValue = 0;
  let clsEntries: any[] = [];

  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as any;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
          clsEntries.push(entry);
        }
      }
    });

    try {
      observer.observe({type: 'layout-shift', buffered: true});
    } catch (e) {
      console.log('Layout shift observer not supported');
    }

    // Report CLS when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.log('CLS:', clsValue);
      }
    });
  }
};

// Optimize font loading
export const optimizeFontLoading = () => {
  if ('fonts' in document) {
    // Preload critical fonts
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
    });
  }
};

// Service worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};
