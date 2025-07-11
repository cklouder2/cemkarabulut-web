"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faUser, faBriefcase, faCode, faFolderOpen, faEnvelope, faSun, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand,
  faBehance as faBehanceBrand,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

const navigation = [
  { name: "Home", href: "/", icon: faHome },
  { name: "About", href: "/about", icon: faUser },
  { name: "Experience", href: "/experience", icon: faBriefcase },
  { name: "Skills", href: "/skills", icon: faCode },
  { name: "Projects", href: "/projects", icon: faFolderOpen },
  { name: "Contact", href: "/contact", icon: faEnvelope },
];

const socials = [
  {
    href: "https://linkedin.com/in/cemkarabulut",
    icon: faLinkedinBrand,
    label: "LinkedIn"
  },
  {
    href: "https://instagram.com/ceemkarabulut",
    icon: faInstagramBrand,
    label: "Instagram"
  },
  {
    href: "https://behance.net/cemkarabulut",
    icon: faBehanceBrand,
    label: "Behance"
  },
  {
    href: "https://wa.me/905446806176",
    icon: faWhatsapp,
    label: "WhatsApp"
  },
  {
    href: "mailto:info@cemkarabulut.com",
    icon: faEnvelope,
    label: "E-mail"
  },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger Icon ve sağ üst butonlar */}
      <div className="fixed top-4 left-4 z-40 flex flex-row items-center gap-2 sm:hidden">
        <button
          className="flex flex-row items-center gap-2 justify-center w-auto h-12 p-0 bg-transparent border-none shadow-none rounded-none hover:bg-transparent focus:bg-transparent"
          onClick={() => setOpen(true)}
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
          <span className="ml-2 font-bold text-zinc-200 text-base select-none">Menu</span>
        </button>
      </div>
      <div className="fixed top-4 right-4 z-40 flex flex-row items-center gap-2 sm:hidden">
        {/* Language Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800/70 hover:bg-zinc-700 border border-zinc-700 shadow transition-colors" aria-label="Change language">
          <FontAwesomeIcon icon={faGlobe} className="text-zinc-200 text-lg" />
        </button>
        {/* Theme Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800/70 hover:bg-zinc-700 border border-zinc-700 shadow transition-colors" aria-label="Toggle theme">
          <FontAwesomeIcon icon={faSun} className="text-zinc-200 text-lg" />
        </button>
      </div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar Menu */}
      <nav
        className={`fixed top-0 left-0 h-screen w-screen max-w-none flex items-center justify-center z-50 sm:hidden
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}
        aria-label="Mobile menu"
        style={{ backdropFilter: 'blur(16px)' }}
      >
        <div className="relative w-full max-w-xs mx-auto bg-zinc-900/80 rounded-xl shadow-xl border border-zinc-800 flex flex-col items-center py-8 px-4">
          {/* Close Icon */}
          <button
            className="absolute top-4 right-4 flex flex-row items-center gap-2 w-auto h-12 p-0 bg-transparent border-none shadow-none rounded-none hover:bg-transparent focus:bg-transparent"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} className="text-zinc-400 text-2xl transition-colors" />
          </button>
          {/* Profile */}
          <div className="flex flex-col items-center mt-2 mb-8 text-center">
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-700 mb-3 flex items-center justify-center overflow-hidden shadow-lg">
              {/* Profil fotoğrafı eklenebilir */}
              <FontAwesomeIcon icon={faUser} className="text-zinc-300 text-5xl" />
            </div>
            <div className="text-white font-bold text-xl tracking-wide">Cem Karabulut</div>
            <div className="text-zinc-400 text-xs tracking-wide">Webpixels</div>
          </div>
          {/* Navigation */}
          <ul className="flex flex-col gap-1 w-full mb-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 py-2 px-4 rounded-lg text-zinc-200 border-l-4 border-l-transparent hover:border-l-zinc-700 hover:bg-zinc-800 transition-colors text-base font-semibold tracking-wide shadow-sm group w-full"
                  onClick={() => setOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Social Icons */}
          <div className="flex gap-3 justify-center w-full">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800/70 hover:bg-zinc-700 transition-colors text-zinc-200 text-lg shadow border border-zinc-700"
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
} 