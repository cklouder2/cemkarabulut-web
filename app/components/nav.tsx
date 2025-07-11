"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBriefcase, 
  faCode, 
  faFolderOpen, 
  faEnvelope, 
  faHome 
} from "@fortawesome/free-solid-svg-icons";
import { trackNavigationClick } from "../lib/analytics";

function Navigation() {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const navigation = [
    { name: "About", href: "/about", icon: faUser },
    { name: "Experience", href: "/experience", icon: faBriefcase },
    { name: "Skills", href: "/skills", icon: faCode },
    { name: "Projects", href: "/projects", icon: faFolderOpen },
    { name: "Contact", href: "/contact", icon: faEnvelope },
  ];

  return (
    <header ref={ref} className="hidden sm:block">
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-lg duration-300 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/80 border-zinc-800/50 shadow-lg"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          {/* Sol: Ana sayfa logo */}
          <Link
            href="/"
            onClick={() => trackNavigationClick('home', 'navigation_header')}
            className="flex items-center gap-2 text-white hover:text-gray-400 font-bold text-lg duration-300 transition-all hover:scale-110"
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          </Link>

          {/* Sağ: Menü */}
          <div className="flex justify-between gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => trackNavigationClick(item.name.toLowerCase(), 'navigation_header')}
                className="flex items-center gap-2 duration-300 text-white hover:text-gray-300 font-semibold transition-all hover:scale-105"
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
