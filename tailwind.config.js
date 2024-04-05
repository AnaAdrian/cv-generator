/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-50px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease-out',
        fadeInUp: 'fadeInUp 0.15s ease-out',
        fadeOut: 'fadeOut 0.07s ease-out forwards',
      },
      fontFamily: {
        'sans': ['Ubuntu', 'sans-serif'],
        "inter": ["Inter", "serif"],
      },
      boxShadow: {
        "menu": 'rgba(16, 56, 112, 0.32) 0px 0px 1px, rgba(16, 56, 112, 0.08) 0px 2px 4px -1px, rgba(16, 56, 112, 0.12) 0px 8px 20px -4px',
        "even": "rgba(16, 56, 112, 0.2) 0px 0px 1px, rgba(16, 56, 112, 0.15) 0px 2px 14px"
      }
    },
  },
  plugins: [],
};
