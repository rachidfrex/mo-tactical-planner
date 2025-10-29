/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          green: '#4A5D23',
          orange: '#FF8C42',
          dark: '#1a1a1a',
          surface: '#2a2a2a'
        }
      }
    },
  },
  plugins: [],
}
