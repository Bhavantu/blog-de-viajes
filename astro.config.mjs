import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeLinksAfiliados from './src/plugins/rehype-links-afiliados.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogcito.com',
  trailingSlash: 'ignore', 
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    // rel="sponsored" en los links a comercios (afiliados de Stay22, Airalo y Amazon)
    rehypePlugins: [rehypeLinksAfiliados],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false 
    }
  }
});