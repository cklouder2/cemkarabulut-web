"use client";
import { useEffect, useRef, useState } from 'react';

export default function MouseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const animationRef = useRef<number | null>(null);
  // Only used on mobile
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Device orientation for mobile
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        // gamma: left/right [-90,90], beta: front/back [-180,180]
        // Normalize to [-0.5,0.5]
        const x = Math.max(-0.5, Math.min(0.5, (e.gamma ?? 0) / 90));
        const y = Math.max(-0.5, Math.min(0.5, (e.beta ?? 0) / 180));
        setParallax({ x, y });
      };
      window.addEventListener('deviceorientation', handleOrientation);
      // iOS permission
      // @ts-ignore
      if (typeof window.DeviceOrientationEvent !== 'undefined' && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        // @ts-ignore
        window.DeviceOrientationEvent.requestPermission().catch(()=>{});
      }
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

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
        { hue: 290, radius: 400, offsetX: 0.3, offsetY: 0.2, speed: 0.00012, angle: 0, parallax: 10 },
        { hue: 210, radius: 500, offsetX: -0.25, offsetY: 0.25, speed: 0.00009, angle: 1, parallax: 15 },
        { hue: 40, radius: 350, offsetX: 0.1, offsetY: -0.3, speed: 0.0001, angle: 2, parallax: 8 }
      ];
      // Animasyon fonksiyonu
      const animate = (t: number) => {
        if (!ctx || !canvas) return;
        try {
          ctx.clearRect(0, 0, width, height);
          blobs.forEach((blob, i) => {
            // Sadece mobilde parallax uygula, desktop'ta px/py = 0
            let px = 0, py = 0;
            if (window.matchMedia('(pointer: coarse)').matches) {
              const maxOffset = 30;
              px = Math.max(-maxOffset, Math.min(maxOffset, parallax.x * blob.parallax));
              py = Math.max(-maxOffset, Math.min(maxOffset, parallax.y * blob.parallax));
            }
            let x = width / 2 + Math.sin(t * blob.speed + blob.angle) * width * blob.offsetX + px;
            let y = height / 2 + Math.cos(t * blob.speed + blob.angle) * height * blob.offsetY + py;
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
  }, [shouldRender, parallax]);

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