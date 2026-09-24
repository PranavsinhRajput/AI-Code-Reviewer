/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        surface: '#FDF7F9',
        border: '#F0DDE6',
        'text-primary': '#1C1417',
        'text-secondary': '#7A6670',
        accent: '#C6296B',
        'accent-dark': '#9C1F54',
        'accent-soft': '#FBE4ED',
        critical: '#ef4444',
        warning: '#f59e0b',
        suggestion: '#3b82f6',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #E14A82 0%, #9C1F54 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}