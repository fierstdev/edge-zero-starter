// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // 'server' output tells Astro to render pages on-demand at the edge, 
  // which is required for our dynamic [...slug].astro catch-all router.
  output: 'server',
  devToolbar: {
    enabled: false,
  },
  
  // The Cloudflare adapter optimizes the build for the Cloudflare Edge network
  adapter: cloudflare({
    imageService: 'cloudflare', // Uses Cloudflare's native image resizing API
    platformProxy: {
      enabled: true // Allows you to test Cloudflare specific bindings (like D1/KV) locally
    }
  }),
  
  // Tailwind v4 uses Vite for lightning-fast compilation
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
});
