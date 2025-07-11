"use client";

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log to console for debugging
        console.log(`${entry.name}: ${(entry as any).value}`);
        
        // Send to analytics if needed
        if (entry.name === 'LCP' && (entry as any).value > 2500) {
          console.warn('LCP is too slow:', (entry as any).value);
        }
        
        if (entry.name === 'FID' && (entry as any).value > 100) {
          console.warn('FID is too slow:', (entry as any).value);
        }
        
        if (entry.name === 'CLS' && (entry as any).value > 0.1) {
          console.warn('CLS is too high:', (entry as any).value);
        }
      }
    });

    // Observe Core Web Vitals
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Monitor navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      console.log('Page Load Time:', navigationEntry.loadEventEnd - navigationEntry.loadEventStart);
      console.log('DOM Content Loaded:', navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 