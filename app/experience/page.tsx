"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { Typewriter } from "../components/typewriter";
import { cemkarabulutText } from "./cemkarabulut-data";

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
    <div className="relative min-h-screen bg-transparent overflow-visible">
      <Navigation />
      <div className="px-2 md:px-6 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative overflow-visible">
        <div className="max-w-full md:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
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
            Here’s a look at my creative journey so far. Over the years, I’ve had the chance to work with amazing teams, lead projects I’m proud of, and constantly learn something new. Every role has shaped how I think about design, teamwork, and what it means to build something meaningful.
          </p>
        </div>
        <div className="divider-white" />
        {showContent && (
          <motion.div
            className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{overflow: 'visible'}}
          >
            {/* Deneyim kartları */}
            <div className="space-y-8">
              {jobs.map((job, idx) => {
                // Merge tools and highlights, remove duplicates
                const highlightArr = highlights[idx]?.split(",").map(h => h.trim()) || [];
                const allBadges = Array.from(new Set([...(tools[idx] || []), ...highlightArr]));
                return (
                  <Card
                    key={idx}
                    className="p-6 md:p-8 rounded-2xl shadow-2xl bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-md border border-zinc-700/40 transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                      <div className="flex-1 flex flex-col text-center md:text-left items-center md:items-start">
                        <h2 className="text-2xl font-bold text-zinc-100 mb-1">{job.role}</h2>
                        <div className="text-lg font-medium text-zinc-300 mb-2">{job.company}</div>
                      </div>
                      <div className="flex flex-col text-center md:text-right items-center md:items-end">
                        <div className="text-sm font-medium text-zinc-300 mb-1">
                          {renderPeriod(job.period)}
                          {job.period && job.location && (
                            <span> </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-400">{job.location}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-zinc-300 text-center md:text-left">
                      {job.description}
                    </div>
                    {allBadges.length > 0 && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        {allBadges.map((badge, badgeIdx) => (
                          <span
                            key={badgeIdx}
                            className={
                              tools[idx]?.includes(badge)
                                ? "bg-zinc-800/50 backdrop-blur-sm text-zinc-200 px-4 py-2 rounded-full text-xs font-medium border border-zinc-700/50 hover:bg-zinc-900/80 hover:border-zinc-600 transition-all duration-300"
                                : "bg-blue-900/40 text-blue-200 px-4 py-2 rounded-full text-xs font-medium border border-blue-700/40 hover:bg-blue-900/80 hover:border-blue-500 transition-all duration-300"
                            }
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
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