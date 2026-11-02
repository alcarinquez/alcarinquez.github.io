// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alcarinquez.github.io',

  // Fonts are downloaded at build time and served from our own site (no runtime CDN).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Crimson Pro',
      cssVariable: '--font-crimson-pro',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Serif TC',
      cssVariable: '--font-noto-serif-tc',
      weights: [400, 500, 700],
      subsets: ['latin', 'latin-ext', 'chinese-traditional'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Serif JP',
      cssVariable: '--font-noto-serif-jp',
      weights: [400, 500, 700],
      subsets: ['latin', 'latin-ext', 'japanese'],
      fallbacks: ['serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});