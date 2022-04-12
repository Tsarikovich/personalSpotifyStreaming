module.exports = {

  screens: {
    'sm': {'min': '640px', 'max': '767px'},
    // => @media (min-width: 640px and max-width: 767px) { ... }

    'md': {'min': '768px', 'max': '1023px'},
    // => @media (min-width: 768px and max-width: 1023px) { ... }

    'lg': {'min': '1024px', 'max': '1279px'},
    // => @media (min-width: 1024px and max-width: 1279px) { ... }

    'xl': {'min': '1280px'},
    // => @media (min-width: 1280px and max-width: 1535px) { ... }

  },

  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};