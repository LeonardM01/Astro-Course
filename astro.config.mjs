import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-bootcamp-leonardm01.netlify.com',
  redirects: {
    '/rss': '/rss.xml',
  },
  server: {
    port: 3000,
  },
  integrations: [react(), solidJs()],
  output: 'server',
  adapter: netlify(),
});
