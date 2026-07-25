import type { PluginOption } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    minify: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false
      },
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'react'
          }
          if (id.includes('node_modules/motion/')) {
            return 'motion'
          }
          if (id.includes('node_modules/react-switch/')) {
            return 'ui_misc'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/src/shared',
      '@features': '/src/features',
      '@features/about': '/src/features/about',
      '@features/about/components': '/src/features/about/components',
      '@app': '/app',
      '@service': '/src/service'
    }
  },
  plugins: [react(), tailwindcss() as PluginOption],
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "font-src 'self'; " +
        "img-src 'self' data: https://i.ibb.co https://cdn.jsdelivr.net https://capybara.cx.ua https://www.google.com https://www.google.com.ua https://googleads.g.doubleclick.net https://www.gstatic.com https://ssl.gstatic.com; " +
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.capybara.cx.ua http://localhost:3001; " +
        "object-src 'none'; " +
        "base-uri 'self'",
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy':
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    }
  }
})
