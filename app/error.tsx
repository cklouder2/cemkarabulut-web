"use client";

import { useEffect } from "react";
import { useLanguage } from "./i18n/language-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-zinc-100">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <h2 className="text-2xl font-bold text-zinc-100">{t("error.title")}</h2>
        <p className="text-zinc-400">
          {t("error.description")}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors duration-300"
        >
          {t("error.try_again")}
        </button>
      </div>
    </div>
  );
} 