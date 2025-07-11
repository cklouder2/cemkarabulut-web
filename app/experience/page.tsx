"use client";

import React, { useState, Suspense, lazy, useEffect } from "react";
import Navigation from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { Typewriter } from "../components/typewriter";
import { cemkarabulutText } from "./cemkarabulut-data";
import { useRef } from "react";

// Lazy load components
const MouseGradient = lazy(() => import("../components/mouse-gradient"));
const Particles = lazy(() => import("../components/particles"));

// Parse English work experience section from cemkarabulutText
const engExpSection = cemkarabulutText.split("🇬🇧 Work Experience – From Present to Past")[1]?.split("🇹🇷 İş Deneyimleri")[0] || "";
const jobBlocks = engExpSection
  .split(/\n(?=\d+\.)/)
  .map(block => block.trim())
  .filter(Boolean);

const jobs = jobBlocks.map(block => {
  // 1. kreatiFabrika – Senior Art Director\nSep 2023 – Present | Istanbul, Turkey (Hybrid)\nLeads ...
  const [header, ...rest] = block.split("\n");
  const [companyAndRole, ...rest2] = header.split("–");
  const company = companyAndRole?.replace(/^\d+\.\s*/, "").trim();
  const role = rest2.join("–").trim();
  const periodLoc = rest[0]?.split("|") || [];
  const period = periodLoc[0]?.trim() || "";
  const location = periodLoc[1]?.trim() || "";
  const description = rest.slice(1).join(" ").trim();
  return { company, role, period, location, description };
});

// Update highlights to be short and clear: main role and a key tool/skill
const highlights = [
  "Art Direction, Motion Graphics, AI Tools, Digital Media",
  "Art Direction, Figma, Cinema 4D, Octane, Branding, Marketing, AI Tools",
  "Broadcast Graphics, Motion Design, Team Leading, Adobe Substance, Octane",
  "Art Direction, Digital Campaigns, Project Management, Motion Graphics",
  "Art Direction, UI/UX, Branding, Motion Graphics",
  "Freelance, Branding, Animation",
  "Freelance, Logo Design, Social Media",
  "UI/UX Design, Mobile App",
  "Junior Art Director, Campaign Support",
  "Graphic Design, Corporate Identity",
  "Graphic Design, Print",
  "Internship, Prepress"
];

// Only actual software/tools in this array, remove 'Adobe Suite' from all
const tools = [
  ["Cinema 4D", "AI Tools", "Figma"], // kreatiFabrika
  ["Figma", "Cinema 4D", "Octane", "AI Tools"], // Esistenze Digital
  ["Cinema 4D", "Adobe Substance", "Octane"], // Acun Medya Global
  [], // Reklamania
  ["Cinema 4D"], // Creaturk Interactive
  [], // Nigra Design
  [], // Eventmania
  [], // Apslify
  [], // Aktüel Media Group
  [], // Ilpen Promotion
  [], // Soyut Reklam
  [], // System Offset
];

// Helper to render period with Present highlighted
function renderPeriod(period: string) {
  if (period.includes("Present")) {
    const [start, end] = period.split("Present");
    return (
      <span>
        {start}
        <span className="inline-block align-middle ml-1 px-2 py-0.5 rounded-full bg-green-700/30 text-green-300 font-bold text-xs tracking-wide border border-green-700/40">Present</span>
      </span>
    );
  }
  return period;
}

export default function ExperiencePage() {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showBodyCopy, setShowBodyCopy] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHandled = useRef(false);

  // Fade-in bodycopy after Typewriter
  const handleTypewriterDone = () => {
    setTypewriterDone(true);
    setShowBodyCopy(true);
    setTimeout(() => setShowContent(true), 700); // Wait for fade-in
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

  // Lazy-load cards on scroll (Intersection Observer)
  useEffect(() => {
    if (!showContent) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [showContent]);

  // Only run Typewriter on first mount
  const [typewriterMounted, setTypewriterMounted] = useState(false);
  useEffect(() => { setTypewriterMounted(true); }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-visible">
      {/* Particles - Background effect */}
      <Suspense fallback={null}>
        <Particles className="absolute inset-0 z-10 animate-fade-in" quantity={100} />
      </Suspense>
      {/* MouseGradient - Load with delay for better performance */}
      <Suspense fallback={null}>
        <MouseGradient />
      </Suspense>
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-6xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative overflow-visible">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text="Experience" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "Experience"
            )}
          </h1>
          <p
            className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}
          >
            A comprehensive overview of my professional journey, from early career to senior leadership roles. Over 15 years of experience in creative direction, brand development, and digital media design.
          </p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        {showContent && (
          <motion.div
            className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{overflow: 'visible'}}
          >
            {jobs.map((job, index) => {
              // Merge tools and highlights, remove duplicates
              const highlightArr = highlights[index]?.split(",").map(h => h.trim()) || [];
              // Only show gray for actual tools, blue for all other highlights
              const allBadges = Array.from(new Set([...(tools[index] || []), ...highlightArr]));
              return (
                <motion.div
                  key={index}
                  ref={el => { cardRefs.current[index] = el; }}
                  data-index={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={visibleCards.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: index * 0.08, type: "spring" }}
                  style={{overflow: 'visible'}}
                  className="overflow-visible"
                >
                  <Card className="p-8 md:p-10 z-30 relative overflow-visible">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-zinc-100">{job.role}</h3>
                        <p className="text-xl text-zinc-300 font-medium">{job.company}</p>
                      </div>
                      <div className="text-right space-y-1 min-w-[160px] flex flex-col items-end">
                        <p className="text-sm font-medium flex items-center gap-2 text-zinc-200">
                          {renderPeriod(job.period)}
                        </p>
                        <p className="text-sm text-zinc-500">{job.location}</p>
                      </div>
                    </div>
                    <p className="text-zinc-300 font-medium leading-relaxed mb-6 text-lg">{job.description}</p>
                    {/* Program/Tool ve Öne Çıkanlar Kutucukları (tekrarsız) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {allBadges.map((badge) => (
                        <span
                          key={badge}
                          className={
                            tools[index]?.includes(badge)
                              ? "bg-zinc-800/50 backdrop-blur-sm text-zinc-200 px-4 py-2 rounded-full text-xs font-medium border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300"
                              : "bg-blue-900/40 text-blue-200 px-4 py-2 rounded-full text-xs font-medium border border-blue-700/40 hover:border-blue-500 hover:bg-blue-900 transition-all duration-300"
                          }
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      {/* Footer */}
      {/* Footer is now handled by the layout */}
    </div>
  );
}

// Tailwind için yanıp sönen imleç animasyonu
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `.animate-blink { animation: blink 1s step-end infinite; } @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
  document.head.appendChild(style);
} 