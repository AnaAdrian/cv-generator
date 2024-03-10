/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Ubuntu', 'sans-serif'],
        "inter": ["Inter", "serif"],
      },
      boxShadow: {
        "custom": 'rgba(16, 56, 112, 0.32) 0px 0px 1px, rgba(16, 56, 112, 0.08) 0px 2px 4px -1px, rgba(16, 56, 112, 0.12) 0px 8px 20px -4px',
      },
      inset: {
        "left-calc": "calc(100% + 2px)",
      },
    },
  },

  plugins: [],
};