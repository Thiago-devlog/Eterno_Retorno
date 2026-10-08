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
          DEFAULT: '#FDFBF7',
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE6DC',
          300: '#DDD5C7',
          vellum: '#F4EFE6',
          border: '#E8E3D9',
        },
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
        'aged-gold': {
          DEFAULT: '#B8860B',
          light: '#DFBD69',
          warm: '#C29B38',
          aged: '#8C6239',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        reader: ['"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 2px 10px -2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(194, 130, 81, 0.06)',
        'book-elevated': '0 12px 32px -6px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'modal': '0 20px 48px -8px rgba(15, 23, 42, 0.2)',
      },
      borderRadius: {
        editorial: '0.25rem',
      }
    },
  },
  plugins: [],
}

