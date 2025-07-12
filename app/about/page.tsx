"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Typewriter } from "../components/typewriter";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPalette, 
  faLightbulb, 
  faTools, 
  faStar, 
  faEnvelope,
  faHeart,
  faRocket,
  faUsers,
  faBrain,
  faMagicWandSparkles,
  faEye,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";
import { 
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand,
  faBehance as faBehanceBrand
} from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../i18n/language-context";

// Timeline component
const Timeline = ({ items }: { items: Array<{ year: string; title: string; description: string }> }) => (
  <div className="relative">
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700"></div>
    {items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
        className="relative mb-8 ml-8"
      >
        <div className="absolute left-[-1.5rem] top-2 w-3 h-3 bg-zinc-400 rounded-full"></div>
        <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/50">
          <div className="text-zinc-400 text-sm font-medium">{item.year}</div>
          <div className="text-zinc-100 font-semibold mt-1">{item.title}</div>
          <div className="text-zinc-300 text-sm mt-2">{item.description}</div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Skills Grid component
const SkillsGrid = ({ skills }: { skills: Array<{ category: string; items: string[] }> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {skills.map((skillGroup, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="p-6 h-full">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon 
              icon={skillGroup.category === "Design" ? faPalette : 
                    skillGroup.category === "3D" ? faStar : faTools} 
              className="text-zinc-400 mr-3 text-lg"
            />
            <h3 className="text-zinc-100 font-semibold">{skillGroup.category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
);

// Brands showcase component
const BrandsShowcase = ({ brands }: { brands: string[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {brands.map((brand, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="p-4 text-center">
          <div className="text-zinc-300 font-medium text-sm">{brand}</div>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default function AboutPage() {
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

  // Timeline data from translations
  const timelineData = [
    {
      year: t("about.timeline.early_career.year"),
      title: t("about.timeline.early_career.title"),
      description: t("about.timeline.early_career.description")
    },
    {
      year: t("about.timeline.growth_period.year"),
      title: t("about.timeline.growth_period.title"),
      description: t("about.timeline.growth_period.description")
    },
    {
      year: t("about.timeline.art_direction.year"),
      title: t("about.timeline.art_direction.title"),
      description: t("about.timeline.art_direction.description")
    },
    {
      year: t("about.timeline.innovation_era.year"),
      title: t("about.timeline.innovation_era.title"),
      description: t("about.timeline.innovation_era.description")
    }
  ];

  // Modern, sade ve profesyonel Skills bölümü için yeni yapı
  const skillsData = [
    {
      icon: faPalette,
      category: language === "tr" ? "Tasarım" : "Design",
      items: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro"]
    },
    {
      icon: faStar,
      category: "3D",
      items: ["Cinema 4D", "Blender", "Substance 3D", language === "tr" ? "3D Modelleme" : "3D Modeling"]
    },
    {
      icon: faTools,
      category: "UI/UX",
      items: ["Figma", "Adobe XD", language === "tr" ? "Prototipleme" : "Prototyping", language === "tr" ? "Kullanıcı Araştırması" : "User Research", "Wireframing"]
    },
    {
      icon: faMagicWandSparkles,
      category: language === "tr" ? "Yapay Zeka Araçları" : "AI Tools",
      items: ["Midjourney", "ChatGPT", "Stable Diffusion", "ComfyUI", "Runway ML"]
    },
    {
      icon: faRocket,
      category: language === "tr" ? "Üretim ve Planlama" : "Production & Planning",
      items: ["WordPress", "Notion", "Miro", language === "tr" ? "Proje Yönetimi" : "Project Management", language === "tr" ? "Takım Liderliği" : "Team Leadership"]
    },
    {
      icon: faUsers,
      category: language === "tr" ? "Uzmanlık Alanları" : "Specialties",
      items: [language === "tr" ? "Marka Kimliği" : "Brand Identity", "Motion Design", language === "tr" ? "Dijital Kampanyalar" : "Digital Campaigns", language === "tr" ? "Yaratıcı Yönetim" : "Creative Direction"]
    }
  ];

  // Modern Skills Grid
  const ModernSkillsGrid = ({ skills }: { skills: typeof skillsData }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((group, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="pt-5 pb-5 px-6 h-full min-h-[260px] flex flex-col items-center justify-start">
            <div className="flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={group.icon} className="text-zinc-400 text-lg mr-2" />
              <h3 className="text-zinc-100 font-semibold text-base mt-0.5">{group.category}</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {group.items.map((skill: string, skillIdx: number) => (
                <span
                  key={skillIdx}
                  className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700/50 hover:border-zinc-600/50 transition-colors whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  // Featured Brands - Yerel ve Global olarak ayır
  const localBrands = [
    "Ford Otosan", "Beko", "Dimes", "Obsesso", "Akbank", "Enerjisa", "Kayalar Kimya", "Düfa", "Metro İstanbul", "İBB", "İGDAŞ", "Türk Nippon Sigorta", "Baymak", "Vialand", "Greenlog", "Acun Medya",
    "NoorCM", "KKB", "Senkron", "Burgan Bank", "CVK", "Air Clinic"
  ];
  const globalBrands = [
    "Microsoft", "Coca-Cola", "Nestlé", "Nescafé", "Lipton", "Cif", "Avon", "Electrolux",
    "Laurastar", "Baseus", "Babyliss", "Ingram Micro"
  ];
  // TV yapımları ve kanallar/platformlar ayrı listeler
  const tvShows = [
    language === "tr" ? "Exatlon Meksika" : "Exatlon Mexico",
    language === "tr" ? "Exatlon Türkiye" : "Exatlon Turkey",
    language === "tr" ? "Exatlon ABD" : "Exatlon USA",
    language === "tr" ? "Exatlon Macaristan" : "Exatlon Hungary",
    language === "tr" ? "Exatlon Romanya" : "Exatlon Romania",
    language === "tr" ? "Survivor Türkiye (2020)" : "Survivor Turkey (2020)",
    t("contact.the_voice"),
    t("contact.masterchef"),
    language === "tr" ? "O Ses Meksika" : "La Voz Mexico"
  ];
  const tvChannels = [
    "TV8",
    language === "tr" ? "Kanal D Avrupa" : "Kanal D Europe",
    language === "tr" ? "TRT Müzik" : "TRT Music",
    "TV Azteca",
    "Telemundo",
    "Netflix"
  ];

  const socialLinks = [
    { icon: faLinkedinBrand, href: "https://linkedin.com/in/cemkarabulut", label: "LinkedIn" },
    { icon: faInstagramBrand, href: "https://instagram.com/ceemkarabulut", label: "Instagram" },
    { icon: faBehanceBrand, href: "https://behance.net/cemkarabulut", label: "Behance" }
  ];
  
  return (
    <div className="relative min-h-screen bg-transparent overflow-visible">
      
      <Navigation />
      
      <div className="px-5 sm:px-8 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-12 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative overflow-visible">
        <div className="max-w-full mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-6">
            {t("about.title")}
          </h1>
          <p className="mt-6 mb-12 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 min-h-auto w-full md:w-full md:col-span-12 md:text-left mx-auto md:mx-0 opacity-100">
            {t("about.main_description")}
          </p>
        </div>
        <div className="divider-white" />
        <div className="space-y-10 md:space-y-14">
          <Card className="p-8 md:p-12 mb-8 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-2 text-white text-center md:text-left">{t("about.my_approach")}</h2>
            <p className="text-zinc-200 text-center md:text-left">
              {t("about.approach_description")}
            </p>
          </Card>
          {/* Creative Vision Section */}
          <Card className="p-8 md:p-12 mb-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4 text-center md:text-left">{t("about.creative_vision")}</h2>
            <p className="text-zinc-300 font-medium leading-relaxed text-center md:text-left">
              {t("about.vision_description")}
            </p>
          </Card>
          {/* My Process Section */}
          <Card className="p-8 md:p-12 mb-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4 text-center md:text-left">{t("about.my_process")}</h2>
            <p className="text-zinc-300 font-medium leading-relaxed text-center md:text-left">
              {t("about.process_description")}
            </p>
          </Card>
          {/* What I Love Section */}
          <Card className="p-8 md:p-12 mb-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4 text-center md:text-left">{t("about.what_i_love")}</h2>
            <p className="text-zinc-300 font-medium leading-relaxed text-center md:text-left">
              {t("about.what_i_love_description")}
            </p>
          </Card>
          {/* Timeline Section */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">{t("about.timeline_title")}</h2>
            <Timeline items={timelineData} />
          </div>
          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">{t("about.skills_title")}</h2>
            <ModernSkillsGrid skills={skillsData} />
          </div>
          {/* Brands & TV Productions */}
          <div className="px-2 md:px-0">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6 text-center md:text-left">{t("about.brands")} & {t("about.tv_productions")}</h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 text-center md:text-left">
                {language === "tr" ? "Global Markalar" : "Global Brands"}
                <span className="ml-2 text-xs text-zinc-400 font-normal align-middle">({globalBrands.length})</span>
              </h3>
              <BrandsShowcase brands={globalBrands} />
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 mt-8 text-center md:text-left">
                {language === "tr" ? "Yerel Markalar" : "Local Brands"}
                <span className="ml-2 text-xs text-zinc-400 font-normal align-middle">({localBrands.length})</span>
              </h3>
              <BrandsShowcase brands={localBrands} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 text-center md:text-left">
                {t("about.tv_productions")}
                <span className="ml-2 text-xs text-zinc-400 font-normal align-middle">({tvShows.length})</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {tvShows.map((prod, idx) => (
                  <Card key={idx} className="p-4 text-center">
                    <div className="text-zinc-300 font-medium text-sm">{prod}</div>
                  </Card>
                ))}
              </div>
              <h4 className="text-base font-semibold text-zinc-100 mb-3 text-center md:text-left">
                {language === "tr" ? "TV Kanalları & Platformlar" : "TV Channels & Platforms"}
                <span className="ml-2 text-xs text-zinc-400 font-normal align-middle">({tvChannels.length})</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tvChannels.map((ch, idx) => (
                  <Card key={idx} className="p-4 text-center">
                    <div className="text-zinc-300 font-medium text-sm">{ch}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer - Moved to layout */}
    </div>
  );
} 