/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
  animation: {
    "zoom-slow": "zoom 20s ease-in-out infinite",
  },
  keyframes: {
    zoom: {
      "0%, 100%": { transform: "scale(1.05)" },
      "50%": { transform: "scale(1.1)" },
    },
  },
}

    },
  },
  plugins: [],
};
