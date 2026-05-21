import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://landing-page-six-gray-46.vercel.app',
  integrations: [
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto'
  }
});
