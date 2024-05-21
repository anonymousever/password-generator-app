/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#fb7c58',
        red: '#f64a4a',
        yellow: '#f8cd65',
        gray: '#817d92',
        'dark-gray': '#24232c',
        'very-dark-gray': '#18171f',
        'neon-green': '#a4ffaf',
      },
      backgroundImage: {
        check: 'url("/images/icon-check.svg")',
      },
    },
  },
  plugins: [],
}
