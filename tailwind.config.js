/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blacko: "#00000036",
        gradientOrange: "#ffc0a0",
        gradientYellow: "#ffe7a0",
        hardOrange: "#ff6b22"
      },
    },
  },
  plugins: [],
}

