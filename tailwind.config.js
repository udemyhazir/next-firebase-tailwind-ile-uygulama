/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        teko:'Teko'
      }
    },
    borderRadius:{
      'aos':'3rem',
      'md':'0.375rem',
      'lg':'0.5rem',
      'full':'9999px'
    }
  },
  plugins: [],
}
