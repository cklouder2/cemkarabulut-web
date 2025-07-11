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
  
  const timelineData = [
    {
      year: "2008-2012",
      title: "Early Career",
      description: "I started out in advertising agencies, learning the basics of visual communication and brand design. Those early years taught me the value of teamwork and the power of a good idea."
    },
    {
      year: "2012-2016",
      title: "Growth Period",
      description: "During this time, I dove into digital media and motion graphics, and had the chance to work with some amazing brands. Every project pushed me to try new things and expand my creative toolkit."
    },
    {
      year: "2016-2020",
      title: "Art Direction",
      description: "I stepped into the role of Art Director, leading creative teams and helping shape brand strategies from the ground up. It was a time of big ideas, late nights, and a lot of learning."
    },
    {
      year: "2020-Present",
      title: "Innovation Era",
      description: "Lately, I’ve been embracing AI tools, 3D design, and new technologies, always looking for ways to keep my work fresh and exciting. But no matter how much things change, my focus on creativity and connection stays the same."
    }
  ];

  const skillsData = [
    {
      category: "Design",
      items: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro"]
    },
    {
      category: "3D",
      items: ["Cinema 4D", "Blender", "Substance 3D", "3D Modeling", "Animation"]
    },
    {
      category: "UI/UX",
      items: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"]
    },
    {
      category: "AI Tools",
      items: ["Midjourney", "ChatGPT", "Stable Diffusion", "ComfyUI", "Runway ML"]
    },
    {
      category: "Production",
      items: ["WordPress", "Notion", "Miro", "Project Management", "Team Leadership"]
    },
    {
      category: "Specialties",
      items: ["Brand Identity", "Motion Graphics", "Digital Campaigns", "Creative Direction"]
    }
  ];

  const featuredBrands = [
    "Microsoft", "Coca-Cola", "Nestlé", "Ford Otosan", "Nescafé", "Lipton", 
    "Cif", "Avon", "Beko", "Dimes", "Obsesso", "Akbank", "Enerjisa", 
    "Kayalar Kimya", "Düfa", "Metro İstanbul", "İBB", "İGDAŞ", 
    "Türk Nippon Sigorta", "Baymak", "Electrolux", "Vialand", "Greenlog",
    "Acun Medya"
  ];

  const tvProductions = [
    "Exatlon",
    "Survivor",
    "The Voice Turkey",
    "MasterChef Turkey",
    "TV8",
    "Kanal D Europe",
    "TRT",
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
    <div className="relative min-h-screen bg-transparent overflow-x-hidden z-20">
      
      <Navigation />
      
      <div className="px-2 md:px-6 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-full md:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">
            About Me
          </h1>
          <p className="mt-6 text-lg text-zinc-400 font-medium leading-relaxed">
            Cem Karabulut is a creative art director with 15+ years of experience in turning ideas into visuals that speak. He specializes in building brand stories through design, whether it's a logo, a campaign, or a full digital experience. His approach to design focuses on connection, clarity, and creativity. Every brand has a unique story, and Cem excels at bringing those stories to life in a way that feels authentic and memorable.
          </p>
        </div>
        <div className="divider-white" />
        <div className="space-y-10 md:space-y-14">
          <Card className="p-8 md:p-12 mb-8">
            <h2 className="text-xl font-semibold mb-2 text-white">My Approach</h2>
            <p className="text-zinc-200">
              Cem's approach is all about blending strategy, creativity, and technology to create work that really means something. He excels at getting to know the people and stories behind every project. For him, every collaboration is a chance to learn, grow, and make something that truly connects.
            </p>
          </Card>
          {/* Creative Vision Section */}
          <Card className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Creative Vision</h2>
            <p className="text-zinc-300 font-medium leading-relaxed">
              Cem's creative vision is all about curiosity and storytelling. He excels at exploring new ways to turn ideas into visuals that spark emotion and inspire action. Whether working on a brand, a motion graphic, or a digital campaign, he ensures every project feels fresh, thoughtful, and true to its purpose. His design philosophy focuses on connection, clarity, and creativity—helping people see and feel something new.
            </p>
          </Card>

          {/* My Process Section */}
          <Card className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">My Process</h2>
            <p className="text-zinc-300 font-medium leading-relaxed">
              Cem starts by listening—really listening—to understand not just what a client wants, but why they want it. He dives deep into research, sketches, experiments, and iterates until that sweet spot where strategy meets creativity is found. He believes in honesty, transparency, and treating every project like it’s the most important one he’ll ever work on. Cem values deep thinking, quality, and building real relationships along the way.
            </p>
          </Card>

          {/* What I Love Section */}
          <Card className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">What I Love</h2>
            <p className="text-zinc-300 font-medium leading-relaxed">
              Cem loves the moment when everything clicks—when a design feels so right that it almost creates itself. He enjoys collaborating with passionate people, learning new things, and creating work that makes a real difference. The best part of his job is seeing an idea come to life and knowing it means something to someone else.
            </p>
          </Card>

          {/* Timeline Section */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Career Journey</h2>
            <Timeline items={[
              {
                year: "2008-2012",
                title: "Early Career",
                description: "I started out in advertising agencies, learning the basics of visual communication and brand design. Those early years taught me the value of teamwork and the power of a good idea."
              },
              {
                year: "2012-2016",
                title: "Growth Period",
                description: "During this time, I dove into digital media and motion graphics, and had the chance to work with some amazing brands. Every project pushed me to try new things and expand my creative toolkit."
              },
              {
                year: "2016-2020",
                title: "Art Direction",
                description: "I stepped into the role of Art Director, leading creative teams and helping shape brand strategies from the ground up. It was a time of big ideas, late nights, and a lot of learning."
              },
              {
                year: "2020-Present",
                title: "Innovation Era",
                description: "Lately, I’ve been embracing AI tools, 3D design, and new technologies, always looking for ways to keep my work fresh and exciting. But no matter how much things change, my focus on creativity and connection stays the same."
              }
            ]} />
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Tools & Technologies</h2>
            <div className="space-y-8">
              <SkillsGrid skills={skillsData} />
            </div>
          </div>

          {/* Brands Section */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Featured Brands & Productions</h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Major Brands</h3>
              <BrandsShowcase brands={featuredBrands} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">TV Productions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tvProductions.map((prod, idx) => (
                  <Card key={idx} className="p-4 text-center">
                    <div className="text-zinc-300 font-medium text-sm">{prod}</div>
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