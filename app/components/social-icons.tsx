"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand,
  faBehance as faBehanceBrand,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope as faEnvelopeSolid, faPhone as faPhoneSolid } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { trackSocialClick } from "../lib/analytics";

// X için SVG
const XSvgIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_901_2)">
      <rect width="1200" height="1227" fill="white" fillOpacity="0"/>
      <path d="M727.684 522.765L1142.4 60.5H1040.13L687.684 466.765L410.684 60.5H57.6841L495.684 693.5L57.6841 1166.5H160.684L535.684 736.5L827.684 1166.5H1180.68L727.684 522.765ZM583.684 678.5L541.684 619.5L202.684 143.5H366.684L646.684 552.5L687.684 611.5L1047.68 1083.5H883.684L583.684 678.5Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_901_2">
        <rect width="1200" height="1227" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const socials = [
  {
    href: "https://linkedin.com/in/cemkarabulut",
    icon: faLinkedinBrand,
    bg: "from-blue-600 to-blue-700",
    label: "LinkedIn"
  },
  {
    href: "https://instagram.com/ceemkarabulut",
    icon: faInstagramBrand,
    bg: "from-pink-500 to-purple-600",
    label: "Instagram"
  },
  {
    href: "https://behance.net/cemkarabulut",
    icon: faBehanceBrand,
    bg: "from-cyan-500 to-blue-600",
    label: "Behance"
  },
  {
    href: "https://x.com/ceemkarabulut",
    icon: "x",
    bg: "from-zinc-900 to-zinc-800",
    label: "X"
  },
  {
    href: "mailto:info@cemkarabulut.com",
    icon: faEnvelopeSolid,
    bg: "from-emerald-600 to-teal-600",
    label: "E-mail"
  },
  {
    href: "tel:+905446806176",
    icon: faPhoneSolid,
    bg: "from-blue-500 to-green-500",
    label: "Telefon"
  },
  {
    href: "https://wa.me/905446806176",
    icon: faWhatsapp,
    bg: "from-green-600 to-green-500",
    label: "WhatsApp"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const iconVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 24 } }
};

export default function SocialIcons() {
  return (
    <motion.div
      className="flex justify-center gap-1.5 sm:gap-3 mb-2 mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          onClick={() => trackSocialClick(s.label.toLowerCase(), 'social_icons')}
          variants={iconVariants}
          className={
            [
              "w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center",
              "rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur",
              "shadow-md transition-transform duration-200 hover:scale-105 hover:border-zinc-400/60 hover:shadow-lg active:scale-95"
            ].join(" ")
          }
        >
          {s.icon === "x" ? (
            <XSvgIcon className="w-4 h-4" />
          ) : (
            typeof s.icon !== 'string' ? <FontAwesomeIcon icon={s.icon} className="text-white text-base" /> : null
          )}
        </motion.a>
      ))}
    </motion.div>
  );
} 