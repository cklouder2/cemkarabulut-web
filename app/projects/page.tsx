"use client";
import { useEffect, useState, useRef } from "react";
import Navigation from "../components/nav";
import { motion } from "framer-motion";
import { Card } from "../components/card";
import { Typewriter } from "../components/typewriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      
      <Navigation />
      
      <div className="px-2 md:px-6 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-full md:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text="Portfolio" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "Portfolio"
            )}
          </h1>
          <p className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}>I share my projects and latest work on Behance. From branding to digital campaigns, motion graphics to innovative design solutions—if you want to see what I've been working on, I'd love to invite you there!
          </p>
        </div>
        <div className="divider-white" />

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
                    My Behance portfolio will open in a new tab. I'll redirect you there in a few seconds. If the automatic redirect doesn't work, you can click the button below.
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
                    If you're not redirected automatically, you can click the button below:
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
