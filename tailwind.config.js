/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-dark-bg-2': '#1F1D2B',
        'icon-color-primary': '#EA7C69',
        'base-dark-bg-1': '#252836',
        'form-bg-color': '#2D303E',
        'form-border-color': '#393C49',
        'bg-card-color': '#1F1D2B',
        'dark-line': '#393C49',
        'text-light': '#ABBBC2',
        'text-lighter': '#E0E6E9'
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif']
      },
      spacing: {
        'margin-payment-on': 'calc(100vw * 1/4)',
        'payment-opacity': 'calc(100vw - (100vw * 65/100))'
      },
    },
  },
  plugins: [],
}

