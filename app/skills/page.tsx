"use client";

import React, { useState, Suspense, lazy, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Card } from "../components/card";
import { Typewriter } from "../components/typewriter";
import { motion } from "framer-motion";

// Lazy load components
const MouseGradient = lazy(() => import("../components/mouse-gradient"));
const Particles = lazy(() => import("../components/particles"));

const skillCategories = [
  {
    title: "Adobe Creative Suite",
    description: "Professional design and production tools",
    skills: [
      { name: "Adobe Photoshop", level: "Expert" },
      { name: "Adobe Illustrator", level: "Expert" },
      { name: "Adobe InDesign", level: "Advanced" },
      { name: "Adobe After Effects", level: "Expert" },
      { name: "Adobe Premiere Pro", level: "Advanced" },
      { name: "Adobe Substance 3D Painter", level: "Intermediate" },
      { name: "Adobe Substance 3D Designer", level: "Intermediate" }
    ]
  },
  {
    title: "3D & Visualization",
    description: "3D modeling, animation and visualization tools",
    skills: [
      { name: "Cinema 4D", level: "Expert" },
      { name: "Blender", level: "Advanced" },
      { name: "Adobe Substance", level: "Intermediate" },
      { name: "Adobe Dimension", level: "Intermediate" }
    ]
  },
  {
    title: "UI/UX & Prototyping",
    description: "User interface design and prototyping tools",
    skills: [
      { name: "Figma", level: "Expert" },
      { name: "Adobe XD", level: "Advanced" },
      { name: "Zeplin", level: "Intermediate" }
    ]
  },
  {
    title: "AI-Powered Tools",
    description: "Artificial intelligence tools for creative workflows",
    skills: [
      { name: "Midjourney", level: "Expert" },
      { name: "ChatGPT", level: "Expert" },
      { name: "Stable Diffusion", level: "Advanced" },
      { name: "ComfyUI", level: "Advanced" },
      { name: "KlingAI", level: "Intermediate" },
      { name: "Runway ML", level: "Intermediate" }
    ]
  },
  {
    title: "Other Tools",
    description: "Additional tools and platforms",
    skills: [
      { name: "WordPress", level: "Advanced" },
      { name: "Notion", level: "Advanced" },
      { name: "Miro/FigJam", level: "Intermediate" }
    ]
  },
  {
    title: "Design Disciplines",
    description: "Core design skills and expertise areas",
    skills: [
      { name: "Brand Identity Design", level: "Expert" },
      { name: "Motion Graphics", level: "Expert" },
      { name: "Digital Campaigns", level: "Expert" },
      { name: "Social Media Design", level: "Expert" },
      { name: "Print Design", level: "Advanced" },
      { name: "UI/UX Design", level: "Advanced" },
      { name: "3D Product Visualization", level: "Advanced" },
      { name: "Video Editing", level: "Advanced" },
      { name: "Web Design", level: "Advanced" },
      { name: "Packaging Design", level: "Intermediate" }
    ]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg";
    case "Advanced":
      return "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg";
    case "Intermediate":
      return "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg";
    default:
      return "bg-gradient-to-r from-zinc-600 to-zinc-500 text-white shadow-lg";
  }
};

export default function SkillsPage() {
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
              <Typewriter text="Skills" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "Skills"
            )}
          </h1>
          <p className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}>A comprehensive overview of my technical skills, tools, and design expertise across various disciplines.</p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0">
              {skillCategories.map((category, index) => (
                <Card key={index}>
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-zinc-100 mb-3">{category.title}</h3>
                    <p className="text-zinc-400 font-medium mb-8 text-lg">{category.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center justify-between p-4 bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300">
                          <span className="text-zinc-200 font-medium text-lg">{skill.name}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
              <h3 className="text-2xl font-bold text-zinc-100 mb-6">Design Philosophy</h3>
              <p className="text-zinc-300 font-medium mb-8 text-lg leading-relaxed">
                I believe design is not merely a tool of aesthetics—it's a way to interpret, communicate, and reshape ideas into visual language. 
                My approach focuses on creating designs that are not just visually appealing but also strategically sound.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Minimalist</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Clean, focused design with purposeful elements</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Expressive</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Emotional resonance through visual storytelling</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Future-Focused</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Innovative approaches with emerging technologies</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      {/* Footer is now handled by the layout */}
    </div>
  );
} 