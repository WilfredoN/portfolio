/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        nav: 'var(--color-nav)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
      }
    }
  },
  plugins: []
}
