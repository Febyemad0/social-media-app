
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [],
  },
  theme: {
    colors:{
      'text-dark' :'#17153B',
      'text-light':'#EEEEEE',  //white
      'light-bg': '#F6E5E5',
      'dark-bg' :'#371B58',
      'hover-color':'#C4B7B7',
    },
    extend: {},
    fontFamily:{
      roboto : ['Roboto','sans-serif']
    },
  },
  plugins: [ 
    require('daisyui'),
  ],
}
