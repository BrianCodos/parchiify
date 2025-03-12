/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      colors: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          accent: '#3d3d3d',
          text: '#ffffff',
          'text-secondary': '#a0aec0',
        },
        accent: {
          primary: '#6d28d9', // purple-700
          hover: '#7c3aed', // purple-600
        },
        dashboard: {
          primary: '#4f46e5', // indigo-600
          secondary: '#4338ca', // indigo-700
          accent: '#3730a3', // indigo-800
          hover: '#6366f1', // indigo-500
          light: '#818cf8', // indigo-400
        }
      }
    },
  },
  plugins: [],
}

