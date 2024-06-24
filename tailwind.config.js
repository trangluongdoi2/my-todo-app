/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {},
    colors: {
      'light-blue': '#52D3D8',
      'dark-blue': '#200E3A',
      'dark-base': '#1A1A1A',
      'dark-lighter': '#242424',
      'light-green': '#42B883',
      'accent-gray': '#9FADBC',
    },
    textColor: {
      'light-blue': '#52D3D8',
      'dark-blue': '#200E3A',
      'light-green': '#42B883',
      'accent-gray': '#9FADBC',
    },
  },
  plugins: [],
}
