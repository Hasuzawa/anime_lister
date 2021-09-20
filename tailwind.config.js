module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "280": "70em",
        "68": "17em"    //for control panel
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
