/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Include all React components
  ],
 
    theme: {
    extend: {
      screens: {
        'xs': '320px', // Add custom breakpoint for 320px
      },
    },
  },
  plugins: [],
}

