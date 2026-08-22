import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://twpmeetup.com',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/intro-slides/') &&
        !page.endsWith('/become-a-sponsor/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
