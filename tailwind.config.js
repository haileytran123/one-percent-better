/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        // Warm sand base
        sand: {
          50:  '#fdfaf5',
          100: '#f9f3e8',
          200: '#f2e5cc',
          300: '#e8d0a8',
          400: '#d9b880',
          500: '#c9a05a',
          600: '#a87d3a',
          700: '#86602c',
          800: '#644822',
          900: '#46321a',
        },
        // Warm stone text
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Accent — muted sage green
        sage: {
          50:  '#f4f7f2',
          100: '#e5ede0',
          200: '#c9dbbf',
          300: '#a3c293',
          400: '#78a663',
          500: '#5a8a48',
          600: '#456e37',
          700: '#37572c',
          800: '#2c4524',
          900: '#22361c',
        },
        // Accent — dusty rose
        rose: {
          50:  '#fdf4f3',
          100: '#fce8e5',
          200: '#f9d0ca',
          300: '#f4aea5',
          400: '#ec7d70',
          500: '#e05545',
          600: '#cc3a2a',
          700: '#aa2e21',
          800: '#8c291e',
          900: '#74261d',
        },
        // Accent — muted periwinkle
        periwinkle: {
          50:  '#f3f4fb',
          100: '#e8eaf7',
          200: '#d4d8f1',
          300: '#b4bce6',
          400: '#8f98d6',
          500: '#6e78c4',
          600: '#555fb0',
          700: '#474f96',
          800: '#3d437b',
          900: '#353b65',
        },
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop': {
          '0%':   { transform: 'scale(1)' },
          '45%':  { transform: 'scale(1.14)' },
          '100%': { transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-5px)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',    opacity: '0.5' },
          '100%': { transform: 'scale(1.65)', opacity: '0'   },
        },
        'checkmark': {
          '0%':   { opacity: '0', transform: 'scale(0.3) rotate(-8deg)' },
          '65%':  { transform: 'scale(1.18) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-down':  'fade-down 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in 0.4s ease both',
        'scale-up':   'scale-up 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'pop':        'pop 0.32s cubic-bezier(0.16,1,0.3,1) both',
        'float':      'float 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
        'checkmark':  'checkmark 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s both',
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(120,90,50,0.08), 0 1px 2px -1px rgba(120,90,50,0.06)',
        'warm':    '0 4px 16px -2px rgba(120,90,50,0.1), 0 2px 6px -2px rgba(120,90,50,0.07)',
        'warm-lg': '0 12px 40px -4px rgba(120,90,50,0.14), 0 4px 12px -4px rgba(120,90,50,0.08)',
      },
    },
  },
  plugins: [],
}
