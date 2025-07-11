import Link from "next/link";
import Navigation from "./components/nav";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-zinc-100">
      <Navigation />
      <div className="text-center space-y-8 max-w-md mx-auto px-6 pt-32">
        <h1 className="text-6xl font-bold text-zinc-100">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-100">Page Not Found</h2>
        <p className="text-zinc-400 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-zinc-400 hover:text-zinc-100 transition-colors duration-300"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
} 