"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}

export function Typewriter({ text, speed = 40, onDone, className = "" }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Reset state when text changes
    hasStartedRef.current = false;
    setDisplayed("");
    setIsTyping(true);
    
    // Clear existing interval
    if (cursorIntervalRef.current) {
      clearInterval(cursorIntervalRef.current);
      cursorIntervalRef.current = null;
    }

    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
        if (onDone) onDone();
      }
    };
    
    type();
    
    // Cursor animation
    cursorIntervalRef.current = setInterval(() => {
      // Cursor will blink while typing
    }, 500);
    
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [text, speed, onDone]); // Add proper dependencies

  return (
    <span className={className}>
      {displayed}
      {isTyping && <span className="inline-block w-2 opacity-100 animate-blink">|</span>}
    </span>
  );
} 