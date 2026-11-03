// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// CJK blocks: radicals, punctuation, kana, bopomofo, ideographs (+ extensions), compatibility
// ideographs, vertical/compatibility forms and fullwidth forms. Restricting the Noto Serif faces to
// these lets them sit first in the font stack (see global.css) while Latin still falls to Crimson Pro.
const cjkUnicodeRange = /** @type {[string, ...string[]]} */ ([
  'U+2E80-33FF',
  'U+3400-4DBF',
  'U+4E00-9FFF',
  'U+F900-FAFF',
  'U+FE10-FE1F',
  'U+FE30-FE4F',
  'U+FF00-FFEF',
  'U+20000-3FFFF',
]);

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
      subsets: ['chinese-traditional'],
      unicodeRange: cjkUnicodeRange,
      // No generic fallback: a trailing `serif` here would end the stack before Crimson Pro.
      fallbacks: [],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Serif JP',
      cssVariable: '--font-noto-serif-jp',
      weights: [400, 500, 700],
      subsets: ['japanese'],
      unicodeRange: cjkUnicodeRange,
      // No generic fallback: a trailing `serif` here would end the stack before Crimson Pro.
      fallbacks: [],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});