/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: 'rgb(69, 69, 69)',
        darkerGray: 'rgb(31, 31, 31)',
      },
    },
  },
  plugins: [],
}
