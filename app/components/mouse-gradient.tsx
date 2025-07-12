"use client";
import { useEffect, useRef, useState } from 'react';

export default function MouseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Client-side only
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current || typeof window === "undefined") return;
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let width: number, height: number;
      const resize = () => {
        if (!canvas) return;
        try {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        } catch (error) {
          console.warn("Canvas resize failed:", error);
        }
      };
      window.addEventListener('resize', resize);
      resize();
      // Gradient blobs
      const blobs = [
        { hue: 290, radius: 400, offsetX: 0.3, offsetY: 0.2, speed: 0.00012, angle: 0 },
        { hue: 210, radius: 500, offsetX: -0.25, offsetY: 0.25, speed: 0.00009, angle: 1 },
        { hue: 40, radius: 350, offsetX: 0.1, offsetY: -0.3, speed: 0.0001, angle: 2 }
      ];
      // Animasyon fonksiyonu
      const animate = (t: number) => {
        if (!ctx || !canvas) return;
        try {
          ctx.clearRect(0, 0, width, height);
          blobs.forEach((blob, i) => {
            let x = width / 2 + Math.sin(t * blob.speed + blob.angle) * width * blob.offsetX;
            let y = height / 2 + Math.cos(t * blob.speed + blob.angle) * height * blob.offsetY;
            // Clamp final x/y so blob always stays visible
            x = Math.max(blob.radius + 10, Math.min(width - blob.radius - 10, x));
            y = Math.max(blob.radius + 10, Math.min(height - blob.radius - 10, y));
            const hueShift = (blob.hue + t * 0.01 + i * 60) % 360;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
            gradient.addColorStop(0, `hsla(${hueShift}, 100%, 65%, 0.35)`);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, blob.radius, 0, Math.PI * 2);
            ctx.fill();
          });
          animationRef.current = requestAnimationFrame(animate);
        } catch (error) {
          console.warn("MouseGradient animation failed:", error);
        }
      };
      const timer = setTimeout(() => {
        animate(0);
      }, 300);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', resize);
      };
    } catch (error) {
      console.warn("MouseGradient initialization failed:", error);
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
      style={{
        filter: 'blur(90px)',
        mixBlendMode: 'screen',
          opacity: 1
      }}
    />
  );
} 