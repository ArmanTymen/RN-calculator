/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/widgets/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#a9a1a1',
        card: {
          DEFAULT: '#1c1c1e',
          active: '#2c2c2e',
        },
        primary: '#ffffff',
        secondary: '#8e8e93',
        calc: {
          btn: '#333333',
          operator: '#f1a33c',
          action: '#a5a5a5',
        },
      },
      borderRadius: {
        card: '16px',
      },
      spacing: {
        main: '16px',
      },
    },
  },
  plugins: [],
  presets: [require('nativewind/preset')],
}
