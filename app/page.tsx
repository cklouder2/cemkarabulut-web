"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBriefcase, 
  faCode, 
  faFolderOpen, 
  faEnvelope 
} from "@fortawesome/free-solid-svg-icons";
import SocialIcons from "./components/social-icons";
import MobileMenu from "./components/mobile-menu";
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
      <span className={`inline-block w-2 ${showCursor && !hideCursor ? "opacity-100" : "opacity-0"} animate-blink`}>|</span>
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
    <div className="text-xs animate-fade-in">
      <p className={`mb-4 font-medium transition-opacity duration-50 ${showTitle ? 'opacity-100' : 'opacity-0'} text-white`}>
        Some of the brands I've had the pleasure to work with:
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {brands.map((brand, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur text-zinc-200 font-medium transition-all duration-500 transform hover:border-zinc-400/60 hover:shadow-lg ${
              visibleBrands.includes(index) 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-75'
            }`}
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
  "Microsoft", "Coca-Cola", "Nestlé", "Ford Otosan", "Nescafé", "Lipton", "Cif", "Avon", "Beko", "Dimes", "Obsesso", "Akbank", "Enerjisa", "Kayalar Kimya", "Düfa", "Metro İstanbul", "İBB", "İGDAŞ", "Türk Nippon Sigorta", "Baymak", "Electrolux", "Vialand", "Greenlog", "NoorCM", "Laurastar", "Baseus", "Babyliss", "CVK", "Air Clinic", "KKB", "Senkron", "Ingram Micro", "Burgan Bank"
];

const longTextWords = [
  "Hi,", "I'm", "Cem", "a", "Creative", "Art", "Director", "with", "15+", "years", "of", "experience", "in", "turning", "ideas", "into", "visuals", "that", "speak.", "I", "love", "building", "brand", "stories", "through", "design,", "whether", "it's", "a", "logo,", "a", "campaign,", "or", "a", "full", "digital", "experience.", "For", "me,", "design", "is", "all", "about", "connection,", "clarity,", "and", "creativity."
];

// Main component
export default function Home() {
  // Tüm state ve hook'lar en başta, koşulsuz
  const [isReady, setIsReady] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showFeaturedTitle, setShowFeaturedTitle] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [visibleNavItems, setVisibleNavItems] = useState<number[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

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



  useEffect(() => {
    const onReady = () => setIsReady(true);
    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady);
    return () => window.removeEventListener("load", onReady);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `.animate-blink { animation: blink 1s step-end infinite; } @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
      document.head.appendChild(style);
    }
  }, []);

  // Loading overlay
  if (!isReady) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]">
        <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-100 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-semibold text-zinc-100">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary>
        {/* Mobil için özel düzen */}
        <div className="flex flex-col min-h-screen sm:hidden bg-transparent">
          {/* En üstte hamburger menü */}
          <MobileMenu />
          {/* Ortada başlık ve uzun yazı */}
          <div className="flex-1 flex flex-col justify-center items-center px-4">
            <h1 className="text-5xl font-bold text-center break-words text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-pre-line bg-clip-text ">
              <Typewriter text="Cem Karabulut" speed={50} onComplete={startLongText} />
            </h1>
            <h2 className="text-base font-medium text-zinc-200 max-w-sm mx-auto mb-4 mt-6 leading-relaxed text-center ">
              <span className="min-h-[3rem] block">
                <span>
                  {longTextWords.map((word, index) => (
                    <span
                      key={index}
                      className={`transition-opacity duration-300 ${
                        visibleWords.includes(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
            {/* Butonlar */}
            <div className={`flex flex-col items-center justify-center gap-4 w-full mb-8 transition-all duration-50 ${showButtons ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <Link
                href="/about"
                className="w-full max-w-xs mx-auto px-6 py-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur text-zinc-100 text-sm font-medium hover:border-zinc-400/60 hover:bg-zinc-800/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 text-center"
              >
                Let's start here →
              </Link>
              <Link
                href="https://www.behance.net/cemkarabulut"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs mx-auto px-6 py-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur text-zinc-300 text-sm font-medium hover:border-zinc-400/60 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 text-center"
              >
                Take a look at what I've built →
              </Link>
            </div>
            {/* Brands title - daha okunur ve aşağıda */}
            <p className={`text-zinc-300 text-sm font-medium mb-3 text-center mt-4 transition-opacity duration-500 ${showFeaturedTitle ? 'opacity-100' : 'opacity-0'}`}>
              Some of the brands I've had the pleasure to work with:
            </p>
            {/* Markalar - animasyonlu ve max-width ile sınırlı */}
            <div className="flex flex-wrap justify-center gap-2 gap-y-2 mt-2 max-w-sm mx-auto">
              {(showAllBrands ? featuredBrands : featuredBrands.slice(0,8)).map((brand, i) => (
                <span 
                  key={i} 
                  className={`inline-block text-xs px-3 py-1.5 rounded-xl border border-zinc-700/50 bg-zinc-900/40 text-zinc-200 font-medium transition-all duration-500 transform hover:border-zinc-400/60 hover:shadow-lg ${
                    showBrands && i < 8 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {brand}
                </span>
              ))}
            </div>
            {!showAllBrands && featuredBrands.length > 8 && (
              <button 
                onClick={()=>setShowAllBrands(true)} 
                className={`block mx-auto mt-4 px-4 py-2 rounded-lg border border-blue-600/50 bg-blue-900/20 text-blue-300 text-xs font-medium hover:border-blue-500/60 hover:text-blue-200 hover:bg-blue-800/30 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 ${showBrands ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                Show more
              </button>
            )}
            {showAllBrands && featuredBrands.length > 8 && (
              <button 
                onClick={()=>setShowAllBrands(false)} 
                className={`block mx-auto mt-4 px-4 py-2 rounded-lg border border-blue-600/50 bg-blue-900/20 text-blue-300 text-xs font-medium hover:border-blue-500/60 hover:text-blue-200 hover:bg-blue-800/30 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 ${showBrands ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                Show less
              </button>
            )}
          </div>
          {/* En altta boş alan */}
          <div className="w-full px-1 pb-4">
          </div>
        </div>
        {/* Masaüstü için mevcut yapı */}
        <div className="hidden sm:flex flex-col items-center justify-center w-full h-screen overflow-x-hidden bg-transparent">
          <div className="container mx-auto px-4 sm:px-6 pt-6 relative z-30">
                        {showNavbar && <div className="relative z-30"><SocialIcons /></div>}
            <nav className={`mt-10 sm:mt-16 mb-3 sm:mb-4 transition-opacity duration-100 z-30 relative ${showNavbar ? 'opacity-100' : 'opacity-0'}`}>
              <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold duration-500 text-white hover:text-gray-400 transition-all px-2 py-2 sm:px-0 sm:py-0 ${
                      visibleNavItems.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {item.name}
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
          {/* Glow Lines - Original chronark style (WORKING VERSION) */}
          <div className="hidden md:hidden absolute left-0 right-0 w-full h-px animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 pointer-events-none" style={{maxWidth: '100vw'}} />
          {/* Title */}
          <h1 className="hidden sm:block px-0.5 z-20 relative text-4xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent font-bold duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-pre-line break-words bg-clip-text ">
            <Typewriter text="Cem Karabulut" speed={50} onComplete={startLongText} />
          </h1>
          {/* Glow Lines - Original chronark style (WORKING VERSION) */}
          <div className="hidden md:hidden absolute left-0 right-0 w-full h-px animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 pointer-events-none" style={{maxWidth: '100vw'}} />
          {/* Content */}
          <div className="hidden sm:block mt-0 mb-4 text-center animate-fade-in z-20 relative">
            <h2 className="hidden sm:block text-xs sm:text-base font-medium text-zinc-200 max-w-xs sm:max-w-4xl mx-auto mb-4 mt-0 leading-loose sm:leading-normal">
              <span className="min-h-[3rem] sm:min-h-[4rem] block">
                <span>
                  {longTextWords.slice(0, 18).map((word, index) => (
                    <span
                      key={index}
                      className={`transition-opacity duration-300 ${
                        visibleWords.includes(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  ))}
                  <br />
                  {longTextWords.slice(18).map((word, index) => (
                    <span
                      key={"br2-" + index}
                      className={`transition-opacity duration-300 ${
                        visibleWords.includes(index + 18) ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 mb-8 sm:mb-12 transition-all duration-50 z-20 relative ${showButtons ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <Link
                href="/about"
                className="px-6 sm:px-8 py-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur text-zinc-100 text-sm sm:text-base font-medium hover:border-zinc-400/60 hover:bg-zinc-800/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 text-center"
              >
                Let's start here →
              </Link>
              <Link
                href="https://www.behance.net/cemkarabulut"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur text-zinc-300 text-sm sm:text-base font-medium hover:border-zinc-400/60 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 text-center"
              >
                Take a look at what I've built →
              </Link>
            </div>
            {/* Featured Brands */}
            <div className="px-1 sm:px-0">
              <div className="flex flex-wrap justify-center gap-2 gap-y-2">
                <span className="hidden sm:block w-full">
                  <FeaturedBrands brands={featuredBrands} showTitle={showFeaturedTitle} showBrands={showBrands} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Glow Lines - Original chronark style (WORKING VERSION) */}
        <div className="hidden md:hidden absolute left-0 right-0 w-full h-px animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 pointer-events-none" style={{maxWidth: '100vw'}} />
        <div className="hidden md:hidden absolute left-0 right-0 w-full h-px animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 pointer-events-none" style={{maxWidth: '100vw'}} />
      </ErrorBoundary>
    </>
  );
}


