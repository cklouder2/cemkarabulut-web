import "../global.css";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { VercelSpeedInsights } from "./components/speed-insights";
import { PerformanceMonitor } from "./components/performance-monitor";
import { FooterWrapper } from "./components/footer-wrapper";
import SocialIcons from "./components/social-icons";
import MobileMenu from "./components/mobile-menu";
import BackgroundEffect from "./components/background-effect";
import { headers } from "next/headers";
import { LanguageProvider } from "./i18n/language-context";
import { DynamicMetadata } from "./components/dynamic-metadata";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import React, { Suspense, lazy } from "react";

// Prevent FontAwesome from adding its CSS since we did it manually above
config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL('https://cemkarabulut.com'),
  title: {
    default: "Cem Karabulut - Creative Art Director",
    template: "%s | Cem Karabulut",
  },
  description: "Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication, storytelling, and digital media design. Specializes in brand identity, motion graphics, and digital campaigns for global brands.",
  keywords: ["Creative Art Director", "Visual Communication", "Digital Media Design", "Brand Identity", "Motion Graphics", "UI/UX Design", "Turkey", "Creative Director", "Brand Strategy", "Digital Campaigns", "Visual Storytelling"],
  authors: [{ name: "Cem Karabulut" }],
  creator: "Cem Karabulut",
  publisher: "Cem Karabulut",
  category: "Portfolio",
  classification: "Creative Portfolio",
  openGraph: {
    title: "Cem Karabulut - Creative Art Director",
    description:
      "Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication, storytelling, and digital media design. Specializes in brand identity, motion graphics, and digital campaigns for global brands.",
    url: "https://cemkarabulut.com",
    siteName: "Cem Karabulut",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cemkarabulut.com/og.png",
        width: 1920,
        height: 1080,
        alt: "Cem Karabulut - Creative Art Director",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Cem Karabulut - Creative Art Director",
    description: "Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication and digital media design.",
    images: ["https://cemkarabulut.com/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: "G-R8E7RMJW7K",
  },
  alternates: {
    canonical: "https://cemkarabulut.com",
  },
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  const isHomepage = pathname === "/" || pathname === "";

  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        {/* Critical CSS and preloads */}
        <link rel="preload" href="/fonts/CalSans-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//beamanalytics.b-cdn.net" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Analytics - Load with low priority */}
        <Analytics />
        
        {/* Performance Monitor */}
        <PerformanceMonitor />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Cem Karabulut",
              "jobTitle": "Creative Art Director",
              "description": "Cem Karabulut is a Creative Art Director from Turkey with over 15 years of experience in visual communication, storytelling, and digital media design.",
              "url": "https://cemkarabulut.com",
              "sameAs": [
                "https://www.behance.net/cemkarabulut"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "knowsAbout": [
                "Visual Communication",
                "Digital Media Design",
                "Brand Identity",
                "Motion Graphics",
                "UI/UX Design"
              ]
            })
          }}
        />
      </head>
      <body
        className={`bg-black antialiased overflow-x-hidden ${montserrat.className}`}
      >
        <LanguageProvider>
          {/* Dynamic Metadata for SEO */}
          <DynamicMetadata />
          
          {/* Global Background Effect - TÜM SAYFALARDA GÖRÜNÜR */}
          <BackgroundEffect visible={true} />

          {/* Mobile hamburger menu - tüm sayfalarda */}
          <div className="block sm:hidden">
            <MobileMenu />
          </div>
          
          {/* Main content wrapper - background effects behind content */}
          <div className="flex flex-col min-h-screen bg-transparent relative z-10">
            <main className="flex-1 relative z-10 min-h-screen bg-transparent">
              {children}
            </main>
            <FooterWrapper />
          </div>
          
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-R8E7RMJW7K"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R8E7RMJW7K');
            `}
          </Script>
          
          {/* FontAwesome Kit - Placeholder for now */}
          <Script
            src="https://kit.fontawesome.com/your-kit-code.js"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
          
          {/* Vercel Speed Insights */}
          <VercelSpeedInsights />
          
          {/* Clean up unwanted classes from extensions */}
          <Script id="cleanup-classes" strategy="afterInteractive">
            {`
              // Remove unwanted classes from Chrome extensions
              document.addEventListener('DOMContentLoaded', function() {
                const body = document.body;
                if (body) {
                  // Remove Chrome extension classes
                  body.classList.remove('clickup-chrome-ext_installed');
                  body.classList.remove('clickup-chrome-ext_installed');
                  
                  // Ensure proper font class
                  if (!body.classList.contains('${montserrat.className}')) {
                    body.classList.add('${montserrat.className}');
                  }
                }
              });
            `}
          </Script>
        </LanguageProvider>
      </body>
    </html>
  );
}
