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
          50: "#DCEEFB",
          100: "#B6E0FE",
          200: "#84C5F4",
          300: "#62B0E8",
          400: "#4098D7",
          500: "#2680C2",
          600: "#186FAF",
          700: "#0F609B",
          800: "#0A558C",
          900: "#003E6B",
        },
        'neutral': {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#243B53",
          900: "#102A43",
        },
        'aqua': {
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
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}