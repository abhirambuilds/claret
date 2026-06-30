import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'oglr78sr',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-06-18',
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: false, // Set to false to ensure fresh data for admin operations
});
