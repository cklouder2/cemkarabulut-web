"use client";

import { useEffect, useRef } from 'react';

interface ScrollHandlerProps {
  onScroll?: () => void;
  enabled?: boolean;
}

export function ScrollHandler({ onScroll, enabled = true }: ScrollHandlerProps) {
  const scrollHandled = useRef(false);
  const lastScrollTime = useRef(0);
  const throttleDelay = 16; // ~60fps

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle scroll events for better performance
      if (now - lastScrollTime.current < throttleDelay) {
        return;
      }
      
      lastScrollTime.current = now;
      
      if (!scrollHandled.current && onScroll) {
        onScroll();
        scrollHandled.current = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, onScroll]);

  return null;
} 