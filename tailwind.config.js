 const flowbite = require('flowbite-react/tailwind')
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
    
    
  ],
  theme: {
    extend: {
      boxShadow:{
          'custom-shadow': '0 4px 6px rgba(255, 0, 0, 0.5)',
        'custom-shadow-lg': '0 10px 15px rgba(0, 0, 255, 0.5)'
      },
      
    },
  },
  plugins: [
   flowbite.plugin()
  ],
}