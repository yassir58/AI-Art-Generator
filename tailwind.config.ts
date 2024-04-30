import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#121826",
        veryDarkGray: "#212936",
        veryLightGray: "#E4E4E7",
        lightGray: "#6C727F",
        lightPurple: "#7C71FF",
        mediumGray: "#394150",
        skyBlue: "#4E80EE",
        lightGreen: "#5EC269",
        purple: "#9D59EF",
        red: "#DD524C",
        orange: "#E87B35",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
