// BACKUP: Current Homepage State (Working Glow Lines + Typewriter + FontAwesome + Featured Brands)
// Date: 2025-01-27

export const currentHomepageBackup = {
  pageContent: `
"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Particles from "./components/particles";
import MouseGradient from "./components/mouse-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBriefcase, 
  faCode, 
  faFolderOpen, 
  faEnvelope 
} from "@fortawesome/free-solid-svg-icons";

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Something went wrong</h1>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Typewriter Component
function Typewriter({ text, speed = 80, className = "", onComplete }: { 
  text: string; 
  speed?: number; 
  className?: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setShowCursor(true);
    setHideCursor(false);
    let finished = false;
    
    const type = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(type, speed);
      } else {
        finished = true;
        setShowCursor(true);
        setTimeout(() => setHideCursor(true), 1000);
        if (onComplete) {
          setTimeout(onComplete, 1000);
        }
      }
    };
    
    type();
    
    const cursorInterval = setInterval(() => {
      if (!finished) setShowCursor((c) => !c);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      <span className={\`inline-block w-2 \${showCursor && !hideCursor ? "opacity-100" : "opacity-0"} animate-blink\`}>|</span>
    </span>
  );
}

// Featured Brands Component
const FeaturedBrands = React.memo(({ brands, showTitle, showBrands }: { 
  brands: string[]; 
  showTitle: boolean;
  showBrands: boolean;
}) => {
  const [visibleBrands, setVisibleBrands] = useState<number[]>([]);

  useEffect(() => {
    if (showBrands) {
      const timer = setTimeout(() => {
        brands.forEach((_, index) => {
          setTimeout(() => {
            setVisibleBrands(prev => [...prev, index]);
          }, index * 100);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [brands, showBrands]);

  return (
    <div className="text-xs text-zinc-600 animate-fade-in">
      <p className={\`mb-4 font-medium transition-opacity duration-50 \${showTitle ? 'opacity-100' : 'opacity-0'}\`}>
        Featured brands I've worked with:
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {brands.map((brand, index) => (
          <span
            key={index}
            className={\`px-3 py-1 rounded-full bg-zinc-800/50 text-zinc-400 font-medium hover:text-zinc-300 transition-all duration-500 transform \${
              visibleBrands.includes(index) 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-75'
            }\`}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
});

FeaturedBrands.displayName = 'FeaturedBrands';

// Static data
const navigation = [
  { name: "About", href: "/about", icon: faUser },
  { name: "Experience", href: "/experience", icon: faBriefcase },
  { name: "Skills", href: "/skills", icon: faCode },
  { name: "Projects", href: "/projects", icon: faFolderOpen },
  { name: "Contact", href: "/contact", icon: faEnvelope },
];

const featuredBrands = [
  "Microsoft", "Coca-Cola", "Nestlé", "Ford Otosan", "Nescafé", "Lipton", "Cif", "Avon", "Beko", "Dimes", "Obsesso", "Akbank", "Enerjisa", "Kayalar Kimya", "Düfa", "Metro İstanbul", "İBB", "İGDAŞ", "Türk Nippon Sigorta", "Baymak", "Electrolux", "Vialand", "Greenlog"
];

const longTextWords = [
  "Creative", "Art", "Director", "with", "over", "15", "years", "of", "experience", "in", "visual", "communication", "and", "digital", "media", "design.", "Specialized", "in", "brand", "identity", "development,", "campaign", "design,", "and", "multimedia", "storytelling.", "Passionate", "about", "creating", "compelling", "visual", "narratives", "that", "connect", "brands", "with", "their", "audiences", "through", "innovative", "design", "solutions", "and", "strategic", "creative", "direction."
];

// Main component
export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showFeaturedTitle, setShowFeaturedTitle] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [visibleNavItems, setVisibleNavItems] = useState<number[]>([]);
  const [isMouseGradientLoaded, setIsMouseGradientLoaded] = useState(false);
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);

  // Animation callbacks
  const startButtons = useCallback(() => {
    setShowButtons(true);
    setTimeout(() => {
      setShowFeaturedTitle(true);
      setTimeout(() => {
        setShowBrands(true);
        setTimeout(() => {
          setShowNavbar(true);
          navigation.forEach((_, index) => {
            setTimeout(() => {
              setVisibleNavItems(prev => [...prev, index]);
            }, index * 100);
          });
        }, 1100);
      }, 50);
    }, 50);
  }, []);

  const startLongText = useCallback(() => {
    longTextWords.forEach((_, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, index]);
      }, index * 25);
    });
    
    setTimeout(() => {
      startButtons();
    }, longTextWords.length * 25 + 200);
  }, [startButtons]);

  // Load components with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMouseGradientLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsParticlesLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Cursor animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = \`.animate-blink { animation: blink 1s step-end infinite; } @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }\`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black">
        {/* Particles */}
        {isParticlesLoaded && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Particles className="absolute inset-0 z-10 animate-fade-in" quantity={100} />
            </Suspense>
          </ErrorBoundary>
        )}
        
        {/* Mouse Gradient */}
        {isMouseGradientLoaded && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <MouseGradient />
            </Suspense>
          </ErrorBoundary>
        )}
        
        {/* Navigation */}
        <nav className={\`my-4 transition-opacity duration-100 z-30 \${showNavbar ? 'opacity-100' : 'opacity-0'}\`}>
          <ul className="flex items-center justify-center gap-6">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={\`flex items-center gap-2 text-sm font-bold duration-500 text-white hover:text-gray-400 transition-all \${
                  visibleNavItems.includes(index) ? 'opacity-100' : 'opacity-0'
                }\`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        
        {/* Glow Lines - Original chronark style (WORKING VERSION) */}
        <div className="hidden w-screen h-px md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        {/* Title */}
        <h1 className="py-3.5 px-0.5 z-30 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
          <Typewriter text="Cem Karabulut" speed={50} onComplete={startLongText} />
        </h1>
        
        {/* Glow Lines - Original chronark style (WORKING VERSION) */}
        <div className="hidden w-screen h-px md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        {/* Content */}
        <div className="my-4 text-center animate-fade-in z-30">
          <h2 className="text-base font-medium text-zinc-500 max-w-4xl mx-auto mb-8">
            <span className="min-h-[4rem] block">
              <span>
                {longTextWords.map((word, index) => (
                  <span
                    key={index}
                    className={\`transition-opacity duration-300 \${
                      visibleWords.includes(index) ? 'opacity-100' : 'opacity-0'
                    }\`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </span>
            </span>
          </h2>
          
          {/* Buttons */}
          <div className={\`flex items-center justify-center gap-4 mb-12 transition-all duration-50 z-30 \${showButtons ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}\`}>
            <Link
              href="/about"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-100 font-semibold hover:from-zinc-700 hover:to-zinc-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Learn more about Cem →
            </Link>
            <Link
              href="https://www.behance.net/cemkarabulut"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border-2 border-zinc-600 text-zinc-300 font-semibold hover:border-zinc-400 hover:text-zinc-100 transition-all duration-300 transform hover:scale-105"
            >
              View Portfolio →
            </Link>
          </div>
          
          {/* Featured Brands */}
          <FeaturedBrands brands={featuredBrands} showTitle={showFeaturedTitle} showBrands={showBrands} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
  `,
  description: "Working version with proper glow lines behavior - lines disappear after animation",
  features: [
    "FontAwesome ikonları ile navigation menüsü",
    "Typewriter animasyonu (50ms hız)",
    "Yanıp sönen imleç (yazı tamamlandıktan sonra kaybolur)",
    "Uzun açıklama metni (word-by-word animasyon)",
    "İki buton (About ve Portfolio)",
    "23 featured brand (staggered animasyon ile)",
    "ÇALIŞAN glow lines (3s animasyon, sonra kaybolur)",
    "Particles efekti",
    "Mouse gradient efekti",
    "Error boundary ile hata yönetimi"
  ],
  animationTiming: {
    typewriter: "50ms hız",
    glowLines: "3s süre (orjinal chronark gibi)",
    featuredBrands: "100ms arayla, 100ms gecikme",
    cursor: "500ms yanıp sönme, 1s sonra kaybolma",
    longText: "25ms arayla word animasyonu"
  },
  tailwindConfig: {
    animations: {
      "fade-in": "fade-in 3s ease-in-out forwards",
      title: "title 3s ease-out forwards",
      "fade-left": "fade-left 3s ease-in-out forwards",
      "fade-right": "fade-right 3s ease-in-out forwards"
    },
    keyframes: {
      "fade-left": {
        "0%": { transform: "translateX(100%)", opacity: "0%" },
        "30%": { transform: "translateX(0%)", opacity: "100%" },
        "100%": { opacity: "0%" }
      },
      "fade-right": {
        "0%": { transform: "translateX(-100%)", opacity: "0%" },
        "30%": { transform: "translateX(0%)", opacity: "100%" },
        "100%": { opacity: "0%" }
      }
    }
  },
  workingFeatures: [
    "Glow lines 3 saniye animasyon yapıyor",
    "Animasyon bittiğinde opacity 0% kalıyor (forwards)",
    "animate-glow sınıfı kaldırıldı (infinite alternate sorunu)",
    "Orjinal chronark davranışı ile tam uyumlu"
  ]
}; 