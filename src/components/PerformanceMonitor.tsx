import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enable in both development and production for real user monitoring
    setIsVisible(true);
    
    interface WebVitalMetric {
      name: string;
      value: number;
      id?: string;
      delta?: number;
    }

    // Send metrics to Google Analytics
    const sendToAnalytics = (metric: WebVitalMetric) => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.value),
          metric_id: metric.id || '',
          metric_value: metric.value,
          metric_delta: metric.delta || 0,
        });
      }
    };
    
    // Monitor performance metrics
    const measureMetrics = () => {
        // First Contentful Paint
        const fcpEntry = performance.getEntriesByType('paint').find(
          entry => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: Math.round(fcpEntry.startTime) }));
        }

        // Time to First Byte
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry) {
          setMetrics(prev => ({ 
            ...prev, 
            ttfb: Math.round(navEntry.responseStart - navEntry.requestStart) 
          }));
        }
      };

      // LCP Observer
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = Math.round(lastEntry.startTime);
          setMetrics(prev => ({ ...prev, lcp }));
          sendToAnalytics({
            name: 'LCP',
            value: lcp,
            delta: lastEntry.startTime,
          });
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP observer not supported');
        }

        // FID Observer  
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            const eventEntry = entry as any;
            if (eventEntry.processingStart && eventEntry.startTime) {
              setMetrics(prev => ({ ...prev, fid: Math.round(eventEntry.processingStart - eventEntry.startTime) }));
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.log('FID observer not supported');
        }

        // CLS Observer
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const layoutShift = entry as any;
            if (!layoutShift.hadRecentInput) {
              clsValue += layoutShift.value;
              setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }));
            }
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS observer not supported');
        }

        // Initial measurement
        setTimeout(measureMetrics, 1000);

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    }
  }, []);

  const getScoreColor = (metric: string, value: number | null) => {
    if (value === null) return 'text-gray-400';
    
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-400';

    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border z-50 max-w-xs">
      <div className="text-sm font-semibold mb-2 text-gray-700">Performance Metrics</div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getScoreColor('lcp', metrics.lcp)}>
            {metrics.lcp ? `${metrics.lcp}ms` : 'measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getScoreColor('fid', metrics.fid)}>
            {metrics.fid ? `${metrics.fid}ms` : 'waiting...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getScoreColor('cls', metrics.cls)}>
            {metrics.cls !== null ? metrics.cls.toFixed(3) : 'measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getScoreColor('fcp', metrics.fcp)}>
            {metrics.fcp ? `${metrics.fcp}ms` : 'measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getScoreColor('ttfb', metrics.ttfb)}>
            {metrics.ttfb ? `${metrics.ttfb}ms` : 'measuring...'}
          </span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        <div>Good: Green | Needs Work: Yellow | Poor: Red</div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
