/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C81',
          light: '#1d609b',
          dark: '#0a355c',
        },
        secondary: {
          DEFAULT: '#F4B400',
          light: '#ffc83b',
          dark: '#c49000',
        },
        neutral: {
          dark: '#1e293b',
          light: '#f8fafc',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(15, 76, 129, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(15, 76, 129, 0.25)',
        'glow': '0 0 25px rgba(15, 76, 129, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
