import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    fs: {
      allow: ['src']
    }
  },
  site: 'https://lexingtonthemes.com',
  integrations: [sitemap()], // Elimina db() de aquí
  output: 'server' // Asegúrate de que esto esté configurado como 'server' o 'hybrid'
});
