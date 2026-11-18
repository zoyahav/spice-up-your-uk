import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const basePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'icons/brand-logo.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-maskable-512.png',
      ],
      manifest: {
        name: 'Spice Up Your UK: Life in the UK Prep',
        short_name: 'SpiceUpUK',
        description:
          'Offline-ready Life in the UK study companion with chapter study guides, 4-choice spaced repetition, 18 standard practice exams, 17 bonus mock exams, visual aids, streaks, and two-player sync.',
        theme_color: '#251B16',
        background_color: '#1E1612',
        display: 'standalone',
        orientation: 'portrait',
        start_url: basePath,
        scope: basePath,
        categories: ['education', 'games', 'productivity'],
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/questions/')) return 'exam-bank';
          if (id.includes('/src/data/flashcards/')) return 'flashcard-bank';
          if (id.includes('node_modules')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
