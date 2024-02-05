/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      screens: {
        xs: "420px"
      },
      colors: {
        green_primary: "#10B981",
        blue_primary: "#3C50E0",
        stroke: '#E2E8F0',
        dark_light: "#767c81",
        gray_primary: "#F7F9FC"
      }
    },
  },
  plugins: [],
}