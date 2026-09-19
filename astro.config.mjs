// @ts-check
import { defineConfig } from 'astro/config';

// Static site deployed to GitHub Pages (project site).
export default defineConfig({
  site: 'https://sebass83.github.io',
  base: '/raxxla-web/',
  output: 'static',
});