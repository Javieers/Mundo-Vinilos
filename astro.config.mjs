import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    fs: {
      allow: ['src']
    }
  },

  site: 'https://lexingtonthemes.com',

  // Elimina db() de aquí
  integrations: [sitemap()],

  // Asegúrate de que esto esté configurado como 'server' o 'hybrid'
  output: 'server',

  adapter: vercel(),
});