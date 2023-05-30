/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customGray': '#1a1b22',
      },
      margin: {
        '84': '22rem',
      },
    },
  },
  plugins: [],
}