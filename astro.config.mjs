import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://landing-page-six-gray-46.vercel.app',
  // Astro 5: 'static' é o padrão e suporta endpoints SSR individuais via
  // `export const prerender = false`. Não precisa setar 'hybrid' nem 'server'.
  adapter: vercel(),
  integrations: [
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto'
  }
});
