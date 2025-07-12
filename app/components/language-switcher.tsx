"use client";
import { useLanguage } from "../i18n/language-context";

export default function LanguageSwitcher({ 
  className = "",
  size = "default" 
}: { 
  className?: string;
  size?: "small" | "default" | "large";
}) {
  const { language, setLanguage } = useLanguage();

  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    default: "w-10 h-10 text-xs", 
    large: "w-12 h-12 text-sm"
  };

  // Toggle language on click
  const handleToggle = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center rounded-full bg-zinc-800/70 hover:bg-zinc-700 border border-zinc-700 shadow transition-colors ${sizeClasses[size]} ${className}`}
      aria-label="Change language"
      type="button"
    >
      <span className="text-white font-semibold select-none" style={{letterSpacing: '0.04em'}}>
        {language === "tr" ? "TR" : "EN"}
      </span>
    </button>
  );
} 