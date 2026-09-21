// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static site deployed to GitHub Pages (project site).
// The repo is named CMDR_SEBASS83, so project Pages serves it at
// https://sebass83.github.io/CMDR_SEBASS83/.
export default defineConfig({
  site: 'https://sebass83.github.io',
  base: '/CMDR_SEBASS83/',
  output: 'static',
  integrations: [mdx()],
});