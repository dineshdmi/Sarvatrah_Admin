/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': { min: '425px', max: '639px' },
        'xxs':{ min: '320px', max: '424px'}
      },
    },
  },
  plugins: [],
};
