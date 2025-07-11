"use client";

import React from "react";
import Link from "next/link";
import { Mail, Linkedin, Instagram, Github, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    icon: <Linkedin size={20} strokeWidth={1.5} />,
    href: "https://linkedin.com/in/cemkarabulut",
    label: "LinkedIn",
  },
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    href: "mailto:info@cemkarabulut.com",
    label: "Email",
  },
  {
    icon: <Instagram size={20} strokeWidth={1.5} />,
    href: "https://instagram.com/ceemkarabulut",
    label: "Instagram",
  },
  {
    icon: <Github size={20} strokeWidth={1.5} />,
    href: "https://github.com/cemkarabulut",
    label: "Github",
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-zinc-800/50 bg-gradient-to-t from-zinc-900/50 to-transparent backdrop-blur-sm z-60">
      <div className="px-8 py-16 mx-auto max-w-7xl lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Sol: Hakkında */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-100">Cem Karabulut</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I’m Cem Karabulut, a creative art director and designer based in Istanbul. I love turning ideas into visuals and helping brands tell their stories in unique ways.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
              <span>Made with</span>
              <Heart size={12} className="text-red-500 fill-current" />
              <span>in Istanbul</span>
            </div>
          </div>

          {/* Orta: Hızlı Linkler */}
          <div className="space-y-6 hidden md:block">
            <h3 className="text-lg font-semibold text-zinc-100">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/about" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
              >
                About
              </Link>
              <Link 
                href="/experience" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
              >
                Experience
              </Link>
              <Link 
                href="/skills" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
              >
                Skills
              </Link>
              <Link 
                href="/projects" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
              >
                Projects
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Sağ: Sosyal Medya */}
          <div className="space-y-6 hidden md:block">
            <h3 className="text-lg font-semibold text-zinc-100">Connect</h3>
            <div className="flex flex-col space-y-3">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                  <span>{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Behance Banner */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-100">Portfolio</h3>
            <Link
              href="https://www.behance.net/cemkarabulut"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100 mb-2">View Portfolio</h4>
                    <p className="text-xs text-zinc-400">Check out my latest work on Behance</p>
                  </div>
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7H16V14H22V7Z"/>
                      <path d="M14 5H8V12H14V5Z"/>
                      <path d="M6 3H0V10H6V3Z"/>
                      <path d="M22 15H16V22H22V15Z"/>
                      <path d="M14 13H8V20H14V13Z"/>
                      <path d="M6 11H0V18H6V11Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="flex flex-col items-center justify-between pt-12 mt-12 border-t border-zinc-800/30 md:flex-row">
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>© 2025 Cem Karabulut. All rights reserved.</span>
            <span>•</span>
            <span>Built with Next.js, React, TypeScript & Tailwind CSS</span>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-3 mt-6 text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300 md:mt-0 group relative z-70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
} 