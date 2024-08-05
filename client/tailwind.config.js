/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'slide-down': 'slide-down 0.5s ease-in-out forwards',
        },
        keyframes: {
          'slide-down': {
            '0%': { height: '0', opacity: '0' },
            '100%': { height: '200px', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }