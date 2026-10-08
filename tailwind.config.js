/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FBF9F5',
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE6DC',
          300: '#DDD5C7',
          vellum: '#F4EFE6',
          border: '#E8E3D9',
        },
        charcoal: {
          DEFAULT: '#1E1E1E',
          soft: '#2D2D2D',
          muted: '#6B6864',
          subtle: '#9A958E',
        },
        ochre: {
          DEFAULT: '#B8860B',
          warm: '#C29B38',
          aged: '#8C6239',
          light: '#DFBD69',
        },
        surface: '#fbf9f5',
        'surface-dim': '#dbdad6',
        'surface-bright': '#fbf9f5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3ef',
        'surface-container': '#efeeea',
        'surface-container-high': '#eae8e4',
        'surface-container-highest': '#e4e2de',
        'on-surface': '#1b1c1a',
        'on-surface-variant': '#45464d',
        'slate-ink': {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
          muted: '#475569',
          subtle: '#64748B',
        },
        terracotta: {
          DEFAULT: '#C28251',
          hover: '#9A5B32',
          soft: '#E7BA94',
          subtle: '#F7EDE4',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        reader: ['"Merriweather"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card-soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'dark-hero': '0 24px 50px -12px rgba(10, 15, 30, 0.35)',
        'book-elevated': '0 25px 35px -10px rgba(60, 45, 30, 0.22), 0 10px 18px -6px rgba(60, 45, 30, 0.12)',
        'modal': '0 20px 48px -8px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
}
