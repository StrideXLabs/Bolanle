/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#F1592A',
        'dark-blue': '#334155',
        'off-white-1': '#F7F6F0',
        'off-white-2': '#C9C9C9',
        'off-white-3': '#E8E8E8',
        'off-white-4': '#E3E3E3',
      },
      fontFamily: ['Roboto-Bold', 'Roboto-Medium', 'Roboto-Regular'],
    },
  },
  plugins: [],
};
