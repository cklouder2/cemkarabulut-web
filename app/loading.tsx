"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useLanguage } from "./i18n/language-context";

export default function Loading() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("https://lottie.host/07c49eab-0955-47e8-befd-d1de6b56ad5d/2QH07rgKCn.lottie");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Failed to load Lottie animation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center">
          {isLoading ? (
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-100 rounded-full animate-spin"></div>
          ) : animationData ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-100 rounded-full animate-spin"></div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">{t("loading.title")}</h2>
      </div>
    </div>
  );
} 