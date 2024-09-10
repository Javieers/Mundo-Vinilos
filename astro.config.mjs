import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
export default defineConfig({
vite: {
    plugins: [tailwindcss()],
  },
  server: {
    fs: {
      allow: ['src']
    }
  },
    // add yur domain name here
   site: 'https://lexingtonthemes.com',
  integrations: [sitemap(), db()]
});