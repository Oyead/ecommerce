/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1560px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: '2rem',
    },
    colors: {
      'green-color':'#0aad0a',
      'light-color':'f0f3f2',
      'rating-color':'#ffc908',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode:'class'
}

