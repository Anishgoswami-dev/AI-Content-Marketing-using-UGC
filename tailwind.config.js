/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#17162A',
          900: '#111020',
          800: '#17162A',
          700: '#23223E',
        },
        violet: {
          brand: '#7657F6',
          hover: '#6444E3',
          surface: '#EEE9FF',
          light: '#F5F2FF',
        },
        coral: {
          brand: '#FF6B6B',
          hover: '#E85858',
          light: '#FFF0F0',
        },
        offwhite: '#F8F7FC',
        textPrimary: '#202033',
        textMuted: '#77758A',
        borderColor: '#E8E5F0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(23, 22, 42, 0.05), 0 2px 6px -1px rgba(23, 22, 42, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(118, 87, 246, 0.12), 0 4px 10px -2px rgba(23, 22, 42, 0.04)',
        'glow': '0 0 25px rgba(118, 87, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
