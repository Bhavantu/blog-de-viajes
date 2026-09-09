import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogcito.com',
  trailingSlash: 'ignore', // <-- CAMBIAMOS "always" POR "ignore"
  build: {
    format: 'directory', // Mantenemos el formato de directorio para Netlify
  },
  integrations: [sitemap()],
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