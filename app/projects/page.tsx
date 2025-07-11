"use client";
import { useEffect, useState, Suspense, lazy, useRef } from "react";
import Navigation from "../components/nav";
import { motion } from "framer-motion";
import { Card } from "../components/card";
import { Typewriter } from "../components/typewriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

// Lazy load components
const MouseGradient = lazy(() => import("../components/mouse-gradient"));
const Particles = lazy(() => import("../components/particles"));

export default function ProjectsPage() {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasRedirectedRef = useRef(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showBodyCopy, setShowBodyCopy] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const scrollHandled = useRef(false);
  // Fade-in bodycopy after Typewriter
  const handleTypewriterDone = () => {
    setTypewriterDone(true);
    setShowBodyCopy(true);
    setTimeout(() => setShowContent(true), 700);
  };
  // Scroll-adaptive: if user scrolls, show everything immediately
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollHandled.current && (!typewriterDone || !showBodyCopy || !showContent)) {
        setTypewriterDone(true);
        setShowBodyCopy(true);
        setShowContent(true);
        scrollHandled.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [typewriterDone, showBodyCopy, showContent]);
  // Only run Typewriter on first mount
  const [typewriterMounted, setTypewriterMounted] = useState(false);
  useEffect(() => { setTypewriterMounted(true); }, []);

  useEffect(() => {
    if (showContent && !hasRedirectedRef.current) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (!hasRedirectedRef.current) {
              hasRedirectedRef.current = true;
              setIsRedirecting(true);
              // Behance'i yeni sekmede aç
              window.open("https://www.behance.net/cemkarabulut", "_blank");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showContent]);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Particles - Background effect */}
      <Suspense fallback={null}>
        <Particles className="absolute inset-0 z-10 animate-fade-in" quantity={100} />
      </Suspense>
      
      {/* MouseGradient - Load with delay for better performance */}
      <Suspense fallback={null}>
        <MouseGradient />
      </Suspense>
      
      <Navigation />
      
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-6xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text="Portfolio" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "Portfolio"
            )}
          </h1>
          <p className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}>Explore my latest work and creative projects on Behance. A showcase of brand identity, digital campaigns, motion graphics, and innovative design solutions.</p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-12"
          >
            <Card className="p-12">
              <div className="space-y-8">
                {/* Başlık */}
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
                    Behance Portfolio
                  </h2>
                  <p className="text-lg text-zinc-300 leading-relaxed">
                    Cem's Behance portfolio is opening in a new tab. You'll be redirected automatically in a few seconds.
                  </p>
                </div>

                {/* Geri Sayım */}
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-white mb-4 text-center">
                    {countdown}
                  </div>
                  <p className="text-zinc-400 text-center">
                    Redirecting to Behance...
                  </p>
                </div>

                {/* Manuel Link */}
                <div className="pt-6 border-t border-zinc-700/50">
                  <p className="text-zinc-400 mb-4 text-center">
                    If you're not redirected automatically, click the button below:
                  </p>
                  <div className="flex justify-center">
                    <motion.a
                      href="https://www.behance.net/cemkarabulut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white font-semibold hover:bg-zinc-700/50 transition-all duration-300 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4" />
                      View Portfolio on Behance
                    </motion.a>
                  </div>
                </div>

                {/* Yönlendirme Durumu */}
                {isRedirecting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 text-center"
                  >
                    <p className="text-green-400 font-medium">
                      ✓ Redirecting to Behance...
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
      
    </div>
  );
}
