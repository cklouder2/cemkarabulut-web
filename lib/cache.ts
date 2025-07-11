import { cache } from 'react';

// Cache for expensive computations
export const cachedComputation = cache(async (data: any) => {
  // Simulate expensive computation
  await new Promise(resolve => setTimeout(resolve, 100));
  return data;
});

// Cache for API responses
export const cachedFetch = cache(async (url: string) => {
  const response = await fetch(url);
  return response.json();
});

// Cache for component data
export const cachedComponentData = cache(async (key: string) => {
  // Cache component-specific data
  return { key, timestamp: Date.now() };
}); 