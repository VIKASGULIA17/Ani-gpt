/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#9ed7ff',
        'light-blue': '#9fd7ff',
      },
      backgroundSize: {
        'custom-size': '800px 50px',
      },
      keyframes: {
        loader: {
          '0%': { 'background-position': '-800px 0px' },
          '100%': { 'background-position': '800px 0px' },
        },
      },
      animation: {
        loader: 'loader 3s linear infinite', // Define the animation with 3s duration, linear timing, and infinite looping
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for WebKit-based browsers */
          '::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE and Edge */
          '-ms-overflow-style': 'none',
          /* Hide scrollbar for Firefox */
          'scrollbar-width': 'none',
        },
      });
    },
  ],
}