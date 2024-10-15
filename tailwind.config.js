/** @type {import('tailwindcss').Config} */

// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
//
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "640px" }, // max-width: 640px
        "max-md": { max: "768px" }, // max-width: 768px
        "max-lg": { max: "1024px" }, // max-width: 1024px
        "max-xl": { max: "1280px" }, // max-width: 1280px
      },
    },
  },
  plugins: [],
};
