/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        // Deep navy/charcoal — premium, professional base
        ink: {
          50: '#f5f6f8',
          100: '#e9ebf0',
          200: '#cfd3dc',
          300: '#a9b0c0',
          400: '#7c869c',
          500: '#5c6580',
          600: '#454d66',
          700: '#333A4F',
          800: '#20242F', // primary surfaces (mobile/nav/footer/hero)
          900: '#14161F',
          950: '#0A0B11'
        },
        // Violet accent — for CTAs, borders, highlights
        violet: {
          50: '#F5F1FF',
          100: '#E9E0FF',
          200: '#D6C6FF',
          300: '#B99CFF',
          400: '#9D73FF',
          500: '#7C4DFF',
          600: '#6938E6',
          700: '#4F2AB3',
          800: '#332078',
          900: '#1F1446'
        }
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(10,11,17,0.06), 0 10px 30px -10px rgba(10,11,17,0.10)',
        glow: '0 0 0 1px rgba(124,77,255,0.25), 0 10px 40px -10px rgba(124,77,255,0.45)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.06)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' }
        },
        'spin-slow': { '100%': { transform: 'rotate(360deg)' } },
        'spin-slower': { '100%': { transform: 'rotate(360deg)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.05)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        'spin-slower': 'spin-slower 120s linear infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite'
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(circle at 50% 30%, rgba(124,77,255,0.18), transparent 60%)'
      }
    }
  },
  plugins: []
}
