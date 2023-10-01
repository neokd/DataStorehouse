// /** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
 
    extend: {
      width: {
        '84':'28.5rem',
        '128': '44rem',
        '144': '54rem',
        '180':'64rem',
      },
      colors: {
        'customGray': '#070712',
        // #070712
      },
      animation: {
        'spin-slow': 'spin-slow 1s linear forwards',
        'move-up': 'move-up 1s ease-in-out',
        blob: "blob 7s infinite",
      },
      keyframes: {
        'spin-slow': {
          '0%': { opacity: 0, transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'move-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      margin: {
        '84': '24rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
// 'text': '#041008',
// 'background': '#f7fdf9',
// 'primary-button': '#9de7d9',
// 'secondary-button': '#ffffff',
// 'accent': '#9dcfe7',
