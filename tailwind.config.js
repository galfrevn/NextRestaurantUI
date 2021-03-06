module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      accent: "#fecb54",
      customDark: "#707070",
      customLight: "#fff6dd",
      customGreen: "#8dd471",
      white: "#fff",
      secondary: "#fffcf9",
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
