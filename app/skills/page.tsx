"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Card } from "../components/card";
import { Typewriter } from "../components/typewriter";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/language-context";

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
    case "İleri Seviye":
      return "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg";
    case "Advanced":
    case "Uzman Seviye":
      return "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg";
    case "Intermediate":
    case "Orta Seviye":
      return "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg";
    case "Beginner":
    case "Başlangıç Seviye":
      return "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg";
    default:
      return "bg-gradient-to-r from-zinc-600 to-zinc-500 text-white shadow-lg";
  }
};

export default function SkillsPage() {
  const { t, language } = useLanguage();
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
  
  // Kategorileri çeviriyle doldur
  const skillCategories = [
    {
      title: t("skills.categories.adobe_creative_suite.title"),
      description: t("skills.categories.adobe_creative_suite.description"),
      skills: [
        { name: "Adobe Photoshop", level: t("skills.levels.advanced") },
        { name: "Adobe Illustrator", level: t("skills.levels.advanced") },
        { name: "Adobe After Effects", level: t("skills.levels.advanced") },
        { name: "Adobe InDesign", level: t("skills.levels.advanced") },
        { name: "Adobe Premiere Pro", level: t("skills.levels.advanced") },
        { name: "Adobe Audition", level: t("skills.levels.expert") }
      ]
    },
    {
      title: t("skills.categories.3d_visualization.title"),
      description: t("skills.categories.3d_visualization.description"),
      skills: [
        { name: "Cinema 4D", level: t("skills.levels.advanced") },
        { name: "Blender", level: t("skills.levels.beginner") },
        { name: "Octane", level: t("skills.levels.advanced") },
        { name: "Adobe Substance 3D Painter", level: t("skills.levels.intermediate") },
        { name: "Adobe Substance 3D Designer", level: t("skills.levels.intermediate") },
        { name: "Unreal Engine", level: t("skills.levels.beginner") }
      ]
    },
    {
      title: t("skills.categories.ui_ux_prototyping.title"),
      description: t("skills.categories.ui_ux_prototyping.description"),
      skills: [
        { name: "Figma", level: t("skills.levels.advanced") },
        { name: "Adobe XD", level: t("skills.levels.intermediate") }
      ]
    },
    {
      title: t("skills.categories.ai_powered_tools.title"),
      description: t("skills.categories.ai_powered_tools.description"),
      skills: [
        { name: "Midjourney", level: t("skills.levels.advanced") },
        { name: "ChatGPT", level: t("skills.levels.advanced") },
        { name: "Stable Diffusion", level: t("skills.levels.advanced") },
        { name: "ComfyUI", level: t("skills.levels.advanced") },
        { name: "KlingAI", level: t("skills.levels.advanced") },
        { name: "Runway ML", level: t("skills.levels.beginner") },
        { name: "Google Veo 3", level: t("skills.levels.beginner") },
        { name: "Gemini", level: t("skills.levels.beginner") }
      ]
    },
    {
      title: t("skills.categories.other_tools.title"),
      description: t("skills.categories.other_tools.description"),
      skills: [
        { name: "WordPress", level: t("skills.levels.advanced") },
        { name: "Notion", level: t("skills.levels.advanced") }
      ]
    },
    {
      title: t("skills.categories.design_disciplines.title"),
      description: t("skills.categories.design_disciplines.description"),
      skills: [
        { name: "Brand Identity Design", level: t("skills.levels.expert") },
        { name: "Motion Graphics", level: t("skills.levels.advanced") },
        { name: "Digital Campaigns", level: t("skills.levels.advanced") },
        { name: "Social Media Design", level: t("skills.levels.advanced") },
        { name: "Print Design", level: t("skills.levels.advanced") },
        { name: "UI/UX Design", level: t("skills.levels.advanced") },
        { name: "3D Product Visualization", level: t("skills.levels.advanced") },
        { name: "Video Editing", level: t("skills.levels.advanced") },
        { name: "Web Design", level: t("skills.levels.advanced") },
        { name: "Packaging Design", level: t("skills.levels.beginner") }
      ]
    }
  ];

  // Sort skills in each category: Expert (İleri Seviye) first, then Advanced (Uzman Seviye), then Intermediate (Orta Seviye), then Beginner (Başlangıç Seviye)
  skillCategories.forEach(cat => {
    cat.skills.sort((a, b) => {
      const order: { [key: string]: number } = { 
        'Expert': 0, 'İleri Seviye': 0,
        'Advanced': 1, 'Uzman Seviye': 1, 
        'Intermediate': 2, 'Orta Seviye': 2, 
        'Beginner': 3, 'Başlangıç Seviye': 3 
      };
      return order[a.level as string] - order[b.level as string];
    });
  });

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      
      <Navigation />
      <div className="px-5 sm:px-8 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-12 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-full mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-6">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text={t("skills.title")} speed={40} onDone={handleTypewriterDone} />
            ) : (
              t("skills.title")
            )}
          </h1>
          <p className={`mt-6 mb-12 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 min-h-auto w-full md:w-full md:col-span-12 md:text-left mx-auto md:mx-0 opacity-100`}>{t("skills.description")}
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
              <h3 className="text-2xl font-bold text-zinc-100 mb-6">{t("skills.design_philosophy")}</h3>
              <p className="text-zinc-300 font-medium mb-8 text-lg leading-relaxed">
                {t("skills.philosophy_description")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">{t("skills.philosophy_points.minimalist.title")}</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">{t("skills.philosophy_points.minimalist.description")}</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">{t("skills.philosophy_points.expressive.title")}</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">{t("skills.philosophy_points.expressive.description")}</p>
                </div>
                <div className="text-center p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <h4 className="text-zinc-100 font-bold text-xl mb-3">{t("skills.philosophy_points.future_focused.title")}</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">{t("skills.philosophy_points.future_focused.description")}</p>
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