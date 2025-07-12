"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from './locales/en.json';
import trTranslations from './locales/tr.json';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTurkishUrl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  tr: trTranslations,
};

// Turkish URL mappings
const turkishUrls = ['/hakkimda', '/deneyim', '/projeler', '/yetenekler', '/iletisim'];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isTurkishUrl, setIsTurkishUrl] = useState(false);

  useEffect(() => {
    // URL'den dil tespiti
    const pathname = window.location.pathname;
    // Remove trailing slash for matching
    const cleanPathname = pathname.replace(/\/$/, '');
    const isTurkishPath = turkishUrls.includes(cleanPathname);
    setIsTurkishUrl(isTurkishPath);
    
    // URL'den dil tespiti yap
    if (isTurkishPath) {
      setLanguageState('tr');
      localStorage.setItem('language', 'tr');
    } else {
      // Local storage'dan dil tercihini al
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTurkishUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 