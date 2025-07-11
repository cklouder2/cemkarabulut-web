"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-zinc-100">
          <div className="text-center space-y-6 max-w-md mx-auto px-6">
            <h2 className="text-2xl font-bold text-zinc-100">Something went wrong!</h2>
            <p className="text-zinc-400">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors duration-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 