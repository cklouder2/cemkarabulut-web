"use client";

import React, { useState, Suspense, lazy, useEffect, useRef } from "react";
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
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { 
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand,
  faBehance as faBehanceBrand
} from "@fortawesome/free-brands-svg-icons";

// Lazy load components
const MouseGradient = lazy(() => import("../components/mouse-gradient"));
const Particles = lazy(() => import("../components/particles"));

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
        <Card className="p-4 text-center hover:bg-zinc-800/20">
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
      description: "Started in advertising agencies, learning the fundamentals of visual communication and brand design."
    },
    {
      year: "2012-2016",
      title: "Growth Period",
      description: "Expanded into digital media, motion graphics, and began working with major brands."
    },
    {
      year: "2016-2020",
      title: "Art Direction",
      description: "Transitioned to Art Director role, leading creative teams and developing comprehensive brand strategies."
    },
    {
      year: "2020-Present",
      title: "Innovation Era",
      description: "Embracing AI tools, 3D design, and cutting-edge technologies while maintaining creative excellence."
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
    "Türk Nippon Sigorta", "Baymak", "Electrolux", "Vialand", "Greenlog"
  ];

  const socialLinks = [
    { icon: faLinkedinBrand, href: "https://linkedin.com/in/cemkarabulut", label: "LinkedIn" },
    { icon: faInstagramBrand, href: "https://instagram.com/cemkarabulut", label: "Instagram" },
    { icon: faBehanceBrand, href: "https://behance.net/cemkarabulut", label: "Behance" }
  ];
  
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
              <Typewriter text="About Cem Karabulut" speed={40} onDone={handleTypewriterDone} />
            ) : (
              "About Cem Karabulut"
            )}
          </h1>
          <p className={`mt-6 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 ${showBodyCopy ? "opacity-100" : "opacity-0"}`}>Creative Art Director with over 15 years of experience in visual communication and digital media design. Specialized in brand identity development, campaign design, and multimedia storytelling.</p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            {/* Hero Section */}
            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-zinc-800 text-xl" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Creative Vision</h2>
                  <p className="text-zinc-300 font-medium leading-relaxed">
                    Cem Karabulut is a Creative Art Director from Turkey, known for his multidisciplinary approach to visual communication, storytelling, and digital media design. His career spans collaborations with leading agencies and brands, delivering impactful solutions in branding, motion graphics, UI/UX, and digital campaigns.
                  </p>
                </div>
              </div>
            </Card>

            {/* Philosophy Section */}
            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faPalette} className="text-zinc-800 text-xl" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Design Philosophy</h2>
                  <p className="text-zinc-300 font-medium leading-relaxed">
                    Cem believes design is not just about aesthetics, but a way to interpret, communicate, and reshape ideas into visual language. He values a minimalist yet expressive style, focusing on balance, emotional resonance, and clarity. He integrates technology and narrative thinking to create future-focused, detail-oriented solutions.
                  </p>
                </div>
              </div>
            </Card>

            {/* Timeline Section */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Career Journey</h2>
              <Card className="p-8">
                <Timeline items={timelineData} />
              </Card>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Tools & Technologies</h2>
              <SkillsGrid skills={skillsData} />
            </div>

            {/* Brands Section */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Featured Brands & Productions</h2>
              <Card className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">Major Brands</h3>
                  <BrandsShowcase brands={featuredBrands.slice(0, 12)} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">TV Productions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-zinc-300 font-medium">Exatlon, Survivor, The Voice Turkey, MasterChef Turkey</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-zinc-300 font-medium">TV8, Kanal D Europe, TRT, TV Azteca, Telemundo, Netflix</div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Section */}
            <Card className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Let's Connect</h2>
                <p className="text-zinc-300 font-medium mb-6">
                  For collaborations, project inquiries, or just to say hello, feel free to reach out.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  <a 
                    href="mailto:cem@cemkarabulut.com" 
                    className="flex items-center space-x-2 px-6 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:bg-zinc-700/50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-zinc-300" />
                    <span className="text-zinc-100 font-medium">cem@cemkarabulut.com</span>
                  </a>
                </div>

                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-zinc-800/50 border border-zinc-700/50 rounded-lg flex items-center justify-center hover:bg-zinc-700/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={social.icon} className="text-zinc-300 text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
      
      {/* Footer - Moved to layout */}
    </div>
  );
} 