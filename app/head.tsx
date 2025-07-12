import { headers } from 'next/headers';

export default function Head() {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';
  const isTurkish = pathname.startsWith('/hakkimda') || pathname.startsWith('/deneyim') || pathname.startsWith('/yetenekler') || pathname.startsWith('/projeler') || pathname.startsWith('/iletisim');
  const language = isTurkish ? 'tr' : 'en';

  // Sayfa anahtarını bul
  const pageKey = pathname.replace(/^\//, '').split('/')[0];
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
  const pageName = pageTranslations[pageKey] ? (pageTranslations[pageKey][language] || pageTranslations[pageKey].en) : '';

  // Sayfa açıklamaları
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

  // Anahtar kelimeler
  const keywords = language === 'tr'
    ? 'Yaratıcı Sanat Yönetmeni, Görsel İletişim, Dijital Medya Tasarımı, Marka Kimliği, Hareketli Grafikler, UI/UX Tasarımı, Türkiye, Yaratıcı Yönetmen, Marka Stratejisi, Dijital Kampanyalar, Görsel Hikaye Anlatımı'
    : 'Creative Art Director, Visual Communication, Digital Media Design, Brand Identity, Motion Graphics, UI/UX Design, Turkey, Creative Director, Brand Strategy, Digital Campaigns, Visual Storytelling';

  // Başlık ve açıklama
  let title = '';
  let description = '';
  if (pathname === '/' || pathname === '') {
    title = language === 'tr'
      ? 'Cem Karabulut - Yaratıcı Sanat Yönetmeni'
      : 'Cem Karabulut - Creative Art Director';
    description = language === 'tr'
      ? 'Cem Karabulut, Türkiye\'den yaratıcı sanat yönetmeni. 15 yılı aşkın deneyimiyle görsel iletişim, hikaye anlatımı ve dijital medya tasarımında uzmanlaşmış. Marka kimliği, hareketli grafikler ve küresel markalar için dijital kampanyalar konusunda uzman.'
      : 'Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication, storytelling, and digital media design. Specializes in brand identity, motion graphics, and digital campaigns for global brands.';
  } else {
    title = `${pageName} | Cem Karabulut`;
    description = pageDescriptions[pageKey] ? (pageDescriptions[pageKey][language] || pageDescriptions[pageKey].en) : '';
  }

  // Structured data (schema.org)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Cem Karabulut',
    'jobTitle': language === 'tr' ? 'Yaratıcı Sanat Yönetmeni' : 'Creative Art Director',
    'url': 'https://cemkarabulut.com',
    'sameAs': [
      'https://www.behance.net/cemkarabulut',
      'https://www.linkedin.com/in/cemkarabulut/',
      'https://www.instagram.com/cemkarabulut/'
    ]
  };

  // hreflang alternates
  const alternates: { href: string; hreflang: string }[] = [
    { href: `https://cemkarabulut.com${pathname}`, hreflang: language },
    { href: `https://cemkarabulut.com${pathname.replace(/^\/(hakkimda|deneyim|yetenekler|projeler|iletisim)/, (m) => {
      const map: Record<string, string> = {
        '/hakkimda': '/about',
        '/deneyim': '/experience',
        '/yetenekler': '/skills',
        '/projeler': '/projects',
        '/iletisim': '/contact'
      };
      return map[m] || m;
    })}`, hreflang: language === 'tr' ? 'en' : 'tr' }
  ];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://cemkarabulut.com${pathname}`} />
      <meta property="og:locale" content={language === 'tr' ? 'tr_TR' : 'en_US'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cemkarabulut" />
      {/* hreflang alternates */}
      {alternates.map((alt) => (
        <link rel="alternate" href={alt.href} hrefLang={alt.hreflang} key={alt.hreflang} />
      ))}
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
} 