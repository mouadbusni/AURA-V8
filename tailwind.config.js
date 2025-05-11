/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'neoza': ['Neoza', 'sans-serif'],
        'bongita': ['Bongita', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'lexend': ['Lexend Deca', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif']
      },
      colors: {
        aura: {
          black: '#000000',
          white: '#FFFFFF',
          gold: '#D4AF37',
          gray: {
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};