"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/nav";
import { Typewriter } from "../components/typewriter";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faClock,
  faUser,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { 
  faLinkedin as faLinkedinBrand,
  faInstagram as faInstagramBrand,
  faBehance as faBehanceBrand,
  faTwitter as faTwitterBrand,
  faGithub as faGithubBrand
} from "@fortawesome/free-brands-svg-icons";
import { ScrollHandler } from "../components/scroll-handler";
import { useLanguage } from "../i18n/language-context";

// X (Twitter) için resmi SVG logo
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

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showBodyCopy, setShowBodyCopy] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Fade-in bodycopy after Typewriter
  const handleTypewriterDone = () => {
    setTypewriterDone(true);
    setShowBodyCopy(true);
    setTimeout(() => setShowContent(true), 700);
  };

  // Scroll handler callback
  const handleScroll = () => {
    if (!typewriterDone || !showBodyCopy || !showContent) {
      setTypewriterDone(true);
      setShowBodyCopy(true);
      setShowContent(true);
    }
  };

  // Only run Typewriter on first mount
  const [typewriterMounted, setTypewriterMounted] = useState(false);
  useEffect(() => { setTypewriterMounted(true); }, []);

  // Contact methods, social links, services çeviriyle doldurulacak
  const contactMethods = [
    {
      icon: faEnvelope,
      title: t("contact.methods.email.title"),
      value: "info@cemkarabulut.com",
      href: "mailto:info@cemkarabulut.com",
      description: t("contact.methods.email.description"),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: faPhone,
      title: t("contact.methods.phone.title"),
      value: "+90 (544) 680 61 76",
      href: "tel:+905446806176",
      description: t("contact.methods.phone.description"),
      color: "from-green-500 to-green-600"
    },
    {
      icon: faMapMarkerAlt,
      title: t("contact.methods.location.title"),
      value: "Istanbul, Turkey",
      href: "#",
      description: t("contact.methods.location.description"),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: faClock,
      title: t("contact.methods.availability.title"),
      value: t("contact.availability"),
      href: "#",
      description: t("contact.methods.availability.description"),
      color: "from-orange-500 to-orange-600"
    }
  ];
  const socialLinks = [
    {
      icon: faLinkedinBrand,
      title: "LinkedIn",
      handle: "cemkarabulut",
      href: "https://linkedin.com/in/cemkarabulut",
      description: t("contact.methods.email.description"),
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: faInstagramBrand,
      title: "Instagram",
      handle: "@ceemkarabulut",
      href: "https://instagram.com/ceemkarabulut",
      description: t("contact.methods.email.description"),
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: faBehanceBrand,
      title: "Behance",
      handle: "cemkarabulut",
      href: "https://behance.net/cemkarabulut",
      description: t("contact.methods.email.description"),
      color: "from-cyan-500 to-blue-600"
    }
  ];
  const services = [
    {
      title: t("contact.services.brand_identity.title"),
      description: t("contact.services.brand_identity.description"),
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: t("contact.services.motion_graphics.title"),
      description: t("contact.services.motion_graphics.description"),
      color: "from-pink-500 to-rose-600"
    },
    {
      title: t("contact.services.ui_ux.title"),
      description: t("contact.services.ui_ux.description"),
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: t("contact.services.digital_campaigns.title"),
      description: t("contact.services.digital_campaigns.description"),
      color: "from-orange-500 to-red-600"
    },
    {
      title: t("contact.services.3d_visualization.title"),
      description: t("contact.services.3d_visualization.description"),
      color: "from-violet-500 to-purple-600"
    },
    {
      title: t("contact.services.creative_direction.title"),
      description: t("contact.services.creative_direction.description"),
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">
      
      <Navigation />
      
      {/* Optimized scroll handler */}
      <ScrollHandler onScroll={handleScroll} />
      
      <div className="px-5 sm:px-8 pt-20 mx-auto space-y-10 max-w-full md:max-w-6xl lg:px-12 md:space-y-16 md:pt-24 lg:pt-32 z-30 relative">
        <div className="max-w-full mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-zinc-100 mb-6">
            {typewriterMounted && !typewriterDone ? (
              <Typewriter text={t("contact.title")} speed={40} onDone={handleTypewriterDone} />
            ) : (
              t("contact.title")
            )}
          </h1>
          <p className="mt-6 mb-12 text-lg text-zinc-400 font-medium leading-relaxed transition-opacity duration-700 min-h-auto w-full md:w-full md:col-span-12 md:text-left mx-auto md:mx-0 opacity-100">{t("contact.description")}
          </p>
        </div>
        <div className="divider-white" />
        
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            {/* Contact Methods Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <a
                      href={method.href}
                      className="p-6 block hover:bg-zinc-800/20 transition-all duration-300"
                    >
                                           <div className="flex items-center gap-4">
                       <div className="flex-shrink-0">
                         <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center shadow-lg`}>
                           <FontAwesomeIcon icon={method.icon} className="text-white text-lg" />
                         </div>
                       </div>
                        <div className="flex-1 flex flex-col justify-center min-h-[48px]">
                          <h3 className="text-base font-semibold text-zinc-100 mb-1 leading-tight">{method.title}</h3>
                          <p className="text-zinc-300 font-medium text-sm mb-1 leading-tight">{method.value}</p>
                          <p className="text-zinc-400 text-xs leading-tight">{method.description}</p>
                        </div>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links Section */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-zinc-100 mb-3">{t("contact.lets_connect")}</h2>
              <p className="text-zinc-400 font-medium text-lg">{t("contact.lets_connect_desc")}</p>
            </div>
            <div className="flex justify-center w-full mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-fit mx-auto justify-center items-center text-center">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 text-center"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {social.icon ? <FontAwesomeIcon icon={social.icon} className="text-white text-2xl" /> : null}
                    </div>
                    <h3 className="text-zinc-100 font-semibold text-lg mb-2">{social.title}</h3>
                    <p className="text-zinc-300 font-medium mb-2">{social.handle}</p>
                    <p className="text-zinc-400 text-sm">{social.description}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-12">
              <div className="text-center mb-6">
                          <h2 className="text-3xl font-bold text-zinc-100 mb-3">{t("contact.services_title")}</h2>
          <p className="text-zinc-400 font-medium text-lg">{t("contact.services_desc")}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                                     <motion.div
                     key={index}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className={`p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/30 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-300 relative`}
                   >
                     <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} opacity-80`}></div>
                     <h3 className="text-zinc-100 font-semibold text-lg mb-3">{service.title}</h3>
                     <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
                   </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FontAwesomeIcon icon={faComments} className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-100 mb-3">{t("contact.cta_title")}</h2>
              <p className="text-zinc-400 font-medium text-lg mb-6 leading-relaxed">
                {t("contact.cta_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="mailto:info@cemkarabulut.com"
                  className="flex items-center gap-2 px-5 py-3 text-base bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                  <span>{t("contact.cta_email")}</span>
                </a>
                <a
                  href="tel:+905446806176"
                  className="flex items-center gap-2 px-5 py-3 text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-lg" />
                  <span>{t("contact.cta_call")}</span>
                </a>
                <a
                  href="https://wa.me/905446806176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 text-base bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                  <span>{t("contact.cta_whatsapp")}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
