/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#F7F8FA",
        primary: "#263238",
        secondary: "#37474f",
        accent: "#ffc107",
        success: "#3ECF8E",
        warning: "#FFB84D",
      },
    },
  },
  plugins: [typography],
});
