import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in the src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // You can extend or override colors here if needed
        // For now, we ensure the default Tailwind colors are available, including all gray shades
        gray: colors.gray, // Includes 50-950 shades
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.purple,
        amber: colors.amber,
        // Add other default colors you might be using or want available
      },
    },
  },
  plugins: [],
} 