// Google Analytics Event Tracking Utility
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Predefined tracking functions for common interactions
export const trackPageView = (page: string) => {
  trackEvent('page_view', 'navigation', page);
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName}_${location}`);
};

export const trackLinkClick = (linkName: string, destination: string, isExternal: boolean = false) => {
  trackEvent('click', 'link', `${linkName}_${destination}`, isExternal ? 1 : 0);
};

export const trackNavigationClick = (pageName: string, fromPage: string) => {
  trackEvent('click', 'navigation', `${pageName}_from_${fromPage}`);
};

export const trackSocialClick = (platform: string, fromPage: string) => {
  trackEvent('click', 'social', `${platform}_from_${fromPage}`);
};

export const trackProjectView = (projectName: string) => {
  trackEvent('view', 'project', projectName);
};

export const trackFormInteraction = (formName: string, action: string) => {
  trackEvent(action, 'form', `${formName}_${action}`);
}; 