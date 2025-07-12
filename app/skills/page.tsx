"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Card } from "../components/card";
import { Typewriter } from "../components/typewriter";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Adobe Creative Suite",
    description: "Professional design and production tools",
    skills: [
      { name: "Adobe Photoshop", level: "Advanced" },
      { name: "Adobe Illustrator", level: "Advanced" },
      { name: "Adobe After Effects", level: "Advanced" },
      { name: "Adobe InDesign", level: "Advanced" },
      { name: "Adobe Premiere Pro", level: "Advanced" },
      { name: "Adobe Audition", level: "Expert" }
    ]
  },
  {
    title: "3D & Visualization",
    description: "3D modeling, animation and visualization tools",
    skills: [
      { name: "Cinema 4D", level: "Advanced" },
      { name: "Blender", level: "Intermediate" },
      { name: "Octane", level: "Advanced" },
      { name: "Adobe Substance 3D Painter", level: "Intermediate" },
      { name: "Adobe Substance 3D Designer", level: "Intermediate" },
      { name: "Unreal Engine", level: "Intermediate" }
    ]
  },
  {
    title: "UI/UX & Prototyping",
    description: "User interface design and prototyping tools",
    skills: [
      { name: "Figma", level: "Advanced" },
      { name: "Adobe XD", level: "Intermediate" }
    ]
  },
  {
    title: "AI-Powered Tools",
    description: "Artificial intelligence tools for creative workflows",
    skills: [
      { name: "Midjourney", level: "Advanced" },
      { name: "ChatGPT", level: "Advanced" },
      { name: "Stable Diffusion", level: "Advanced" },
      { name: "ComfyUI", level: "Advanced" },
      { name: "KlingAI", level: "Advanced" },
      { name: "Runway ML", level: "Intermediate" },
      { name: "Google Veo 3", level: "Intermediate" },
      { name: "Gemini", level: "Intermediate" }
    ]
  },
  {
    title: "Other Tools",
    description: "Additional tools and platforms",
    skills: [
      { name: "WordPress", level: "Advanced" },
      { name: "Notion", level: "Advanced" }
    ]
  },
  {
    title: "Design Disciplines",
    description: "Core design skills and expertise areas",
    skills: [
      { name: "Brand Identity Design", level: "Expert" },
      { name: "Motion Graphics", level: "Advanced" },
      { name: "Digital Campaigns", level: "Advanced" },
      { name: "Social Media Design", level: "Advanced" },
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
  
  // Sort skills in each category: Advanced first, then Expert, then Intermediate
  skillCategories.forEach(cat => {
    cat.skills.sort((a, b) => {
      const order: { [key: string]: number } = { 'Advanced': 0, 'Expert': 1, 'Intermediate': 2 };
      return order[a.level as string] - order[b.level as string];
    });
  });

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      
      <Navigation />
      <div className="px-5 sm:px-8 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-12 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-full md:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text="Skills" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "Skills"
            )}
          </h1>
          <p className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}>Here's a peek at the tools, platforms, and design disciplines I love working with most. Over the years, everything I've learned and used has given me a fresh perspective on every project. If you're curious about anything, feel free to ask me anytime!
          </p>
        </div>
        <div className="divider-white" />
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
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(skill.level)}`}>{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-zinc-100 mb-6">My Design Philosophy</h3>
              <p className="text-zinc-300 font-medium mb-8 text-lg leading-relaxed">
                For me, design isn't just about aesthetics-it's about how things make people feel and what they help people understand. I'm drawn to a style that's both simple and expressive, always aiming for balance, clarity, and a bit of surprise. I love using technology and storytelling together to create work that's both meaningful and memorable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Minimalist</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Clean, purposeful designs without unnecessary details</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Expressive</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Visual storytelling enhanced with emotion and narrative</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">Future-Focused</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">Forward-thinking solutions with innovative technologies</p>
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