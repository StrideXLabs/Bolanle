/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'linear-gradient-1':
          'linear-gradient(89.28deg, #F1592A 8.97%, #F1633C 28%, #ED744E 50.12%, #F1633C 71.2%, #F1592A 88.69%)',
        'linear-gradient-2':
          'linear-gradient(180deg, #38251F 8.33%, #7A2F17 35.94%, #9A3314 49.48%, #C1390F 65.62%, #F94108 89.06%)',
      },
    },
  },
  plugins: [],
};
