/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        "second-text": "var(--second-text)",
        white: "var(--white)",
      },
      fontFamily: {
        "16-PX-normal-text": "var(--16-PX-normal-text-font-family)",
        title: "var(--title-font-family)",
      },
    },
  },
  plugins: [],
};
