module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'padding': 'padding'
      },
      colors: {
        'primary': {
          50: '#EAF5F6',
          100:"#D2EBEE",
          200:"#B5E0E5",
          300:"#8ACDD6",
          400:"#6DC1CB",
          500:"#50B4C1",
          600:"#32A8B6",
          700:"#159BAC",
          800:"#0C8C9C",
          900:"#087E8C",
        }, 
        'neutral': {
          50: '#F2FBFC',
          100: '#D8E8EA',
          200: '#B2D4D8',
          300: '#92B7BC',
          400: '#7BA4A9',
          500: '#659096',
          600: '#4F777B',
          700: '#406165',
          800: '#2C4346',
          900: '#243436'
        }
      },
      screens: {
        'xs': '440px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}