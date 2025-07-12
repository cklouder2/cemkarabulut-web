"use client";
import { useLanguage } from '../i18n/language-context';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function DynamicMetadata() {
  const { language, t, isTurkishUrl } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Update document title and meta tags based on language and page
    const updateMetadata = () => {
      const currentPathname = pathname || '';
      // Remove trailing slash for matching
      const cleanPathname = currentPathname.replace(/\/$/, '');
      const isHomepage = cleanPathname === '/' || cleanPathname === '';
      
      // Base title and description
      let title = '';
      let description = '';
      let keywords = '';
      
      if (isHomepage) {
        title = language === 'tr' 
          ? 'Cem Karabulut - Yaratıcı Sanat Yönetmeni'
          : 'Cem Karabulut - Creative Art Director';
        description = language === 'tr'
          ? 'Cem Karabulut, Türkiye\'den yaratıcı sanat yönetmeni. 15 yılı aşkın deneyimiyle görsel iletişim, hikaye anlatımı ve dijital medya tasarımında uzmanlaşmış. Marka kimliği, hareketli grafikler ve küresel markalar için dijital kampanyalar konusunda uzman.'
          : 'Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication, storytelling, and digital media design. Specializes in brand identity, motion graphics, and digital campaigns for global brands.';
        keywords = language === 'tr'
          ? 'Yaratıcı Sanat Yönetmeni, Görsel İletişim, Dijital Medya Tasarımı, Marka Kimliği, Hareketli Grafikler, UI/UX Tasarımı, Türkiye, Yaratıcı Yönetmen, Marka Stratejisi, Dijital Kampanyalar, Görsel Hikaye Anlatımı'
          : 'Creative Art Director, Visual Communication, Digital Media Design, Brand Identity, Motion Graphics, UI/UX Design, Turkey, Creative Director, Brand Strategy, Digital Campaigns, Visual Storytelling';
      } else {
        // Page-specific metadata
        const pageKey = cleanPathname.replace('/', '');
        const pageTranslations: Record<string, { tr: string; en: string }> = {
          'about': { tr: 'Hakkımda', en: 'About' },
          'hakkimda': { tr: 'Hakkımda', en: 'About' },
          'experience': { tr: 'Deneyim', en: 'Experience' },
          'deneyim': { tr: 'Deneyim', en: 'Experience' },
          'projects': { tr: 'Projeler', en: 'Projects' },
          'projeler': { tr: 'Projeler', en: 'Projects' },
          'skills': { tr: 'Yetenekler', en: 'Skills' },
          'yetenekler': { tr: 'Yetenekler', en: 'Skills' },
          'contact': { tr: 'İletişim', en: 'Contact' },
          'iletisim': { tr: 'İletişim', en: 'Contact' }
        };
        
        const pageName = pageTranslations[pageKey]?.[language] || pageTranslations[pageKey]?.en || '';
        title = language === 'tr' 
          ? `${pageName} | Cem Karabulut`
          : `${pageName} | Cem Karabulut`;
        
        // Page-specific descriptions
        const pageDescriptions: Record<string, { tr: string; en: string }> = {
          'about': {
            tr: 'Cem Karabulut\'un kariyer yolculuğu, yetenekleri ve yaratıcı vizyonu hakkında detaylı bilgi.',
            en: 'Learn about Cem Karabulut\'s career journey, skills, and creative vision.'
          },
          'hakkimda': {
            tr: 'Cem Karabulut\'un kariyer yolculuğu, yetenekleri ve yaratıcı vizyonu hakkında detaylı bilgi.',
            en: 'Learn about Cem Karabulut\'s career journey, skills, and creative vision.'
          },
          'experience': {
            tr: 'Cem Karabulut\'un 15 yılı aşkın profesyonel deneyimi ve çalıştığı projeler.',
            en: 'Cem Karabulut\'s 15+ years of professional experience and projects.'
          },
          'deneyim': {
            tr: 'Cem Karabulut\'un 15 yılı aşkın profesyonel deneyimi ve çalıştığı projeler.',
            en: 'Cem Karabulut\'s 15+ years of professional experience and projects.'
          },
          'projects': {
            tr: 'Cem Karabulut\'un yaratıcı projeleri ve portföy çalışmaları.',
            en: 'Cem Karabulut\'s creative projects and portfolio work.'
          },
          'projeler': {
            tr: 'Cem Karabulut\'un yaratıcı projeleri ve portföy çalışmaları.',
            en: 'Cem Karabulut\'s creative projects and portfolio work.'
          },
          'skills': {
            tr: 'Cem Karabulut\'un uzmanlık alanları ve teknik yetenekleri.',
            en: 'Cem Karabulut\'s areas of expertise and technical skills.'
          },
          'yetenekler': {
            tr: 'Cem Karabulut\'un uzmanlık alanları ve teknik yetenekleri.',
            en: 'Cem Karabulut\'s areas of expertise and technical skills.'
          },
          'contact': {
            tr: 'Cem Karabulut ile iletişime geçin ve projeleriniz için teklif alın.',
            en: 'Get in touch with Cem Karabulut and get a quote for your projects.'
          },
          'iletisim': {
            tr: 'Cem Karabulut ile iletişime geçin ve projeleriniz için teklif alın.',
            en: 'Get in touch with Cem Karabulut and get a quote for your projects.'
          }
        };
        
        description = pageDescriptions[pageKey]?.[language] || pageDescriptions[pageKey]?.en || '';
        keywords = language === 'tr'
          ? 'Yaratıcı Sanat Yönetmeni, Görsel İletişim, Dijital Medya Tasarımı, Marka Kimliği, Hareketli Grafikler, UI/UX Tasarımı, Türkiye'
          : 'Creative Art Director, Visual Communication, Digital Media Design, Brand Identity, Motion Graphics, UI/UX Design, Turkey';
      }
      
      // Update document title
      document.title = title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
      
      // Update Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
      
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', description);
      
      // Update Twitter tags
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);
      
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.setAttribute('content', description);
      
      // Update language attribute
      document.documentElement.lang = language === 'tr' ? 'tr' : 'en';
    };
    
    updateMetadata();
  }, [language, pathname, t, isTurkishUrl]);

  return null; // This component doesn't render anything
} 