/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
"./auth/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
      },
    },
    },

  plugins: [

    function ({addUtilities}){
      const newUtilities ={
        ".no-scrollbar::-webkit-scrollbar":{
          display:"none",
        },
        ".no-scrollbar":{
          "-ms-overflow-style":"none",
          "scrollbar-width":"none"
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

