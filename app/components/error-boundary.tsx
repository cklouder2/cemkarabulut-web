"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLanguage } from '../i18n/language-context';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Wrapper component to use hooks in class component
function ErrorBoundaryWithTranslations({ children, fallback }: Props) {
  const { t } = useLanguage();
  
  return (
    <ErrorBoundary t={t} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}

class ErrorBoundary extends Component<Props & { t: (key: string) => string }, State> {
  constructor(props: Props & { t: (key: string) => string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen bg-black text-zinc-100">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">{this.props.t("error.title")}</h2>
            <p className="text-zinc-400">{this.props.t("error.description")}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-zinc-800 text-zinc-100 rounded hover:bg-zinc-700 transition-colors"
            >
              {this.props.t("error.refresh_page")}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundaryWithTranslations as ErrorBoundary }; 