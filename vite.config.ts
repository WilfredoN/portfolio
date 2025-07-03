import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/src/shared',
      '@features': '/src/features',
      '@features/about': '/src/features/about',
      '@features/about/components': '/src/features/about/components',
      '@app': '/app'
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/*',
          dest: 'assets/'
        },
        {
          src: 'public/*',
          dest: 'assets/'
        },
        {
          src: 'public/_headers',
          dest: './'
        }
      ]
    })
  ],
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://i.ibb.co https://raw.githubusercontent.com https://capybara.cx.ua; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://raw.githubusercontent.com https://uadogliwalvodyyiuosi.supabase.co; frame-ancestors 'self'; object-src 'none'; base-uri 'self'",
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy':
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    }
  }
})
