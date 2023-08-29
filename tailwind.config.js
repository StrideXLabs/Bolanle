/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#134B57',
        'dark-blue': '#334155',
        'off-white-1': '#F7F6F0',
        'off-white-2': '#C9C9C9',
        'off-white-3': '#E8E8E8',
        'off-white-4': '#E3E3E3',
        'primary-blue': '#1C75BC',
        'secondary-blue': '#E8F1F8',
        black: '#000000',
        white: '#FFFFFF',
      },

      fontFamily: ['Roboto-Bold', 'Roboto-Medium', 'Roboto-Regular'],
    },
  },
  plugins: [],
};
