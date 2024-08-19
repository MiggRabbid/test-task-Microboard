/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      fontFamily: {
        siteFont: ['Roboto', 'sans-serif'],
      },
      colors: {
        siteTheme: {
          main: '#272727',
          second: '#747474',
          white: '#F7FFFF',
          light: '#F5E6CC',
          dark: '#202124',
          ascent: '#FFE400',
          firstCr: '#FF652F',
          secondCr: '#14A76C',
        },
      },
    },
  },
  plugins: [],
};
