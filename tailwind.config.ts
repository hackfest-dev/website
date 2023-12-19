import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors:{
        "primary": {
          50: "#F1E5FB",
          100: "#E3CAF6",
          200: "#C896EE",
          300: "#AC61E5",
          400: "#902DDC",
          500: "#711DB0",
          600: "#59178C",
          700: "#431169",
          800: "#2D0C46",
          900: "#160623",
          950: "#0B0312"
        },
        "secondary": {
      50: "#FCE3F6",
      100: "#FAC7EC",
      200: "#F594DB",
      300: "#F05CC8",
      400: "#EB24B6",
      500: "#C21292",
      600: "#9A0E75",
      700: "#750B58",
      800: "#4F073C",
      900: "#25031C",
      950: "#13020E"
        },
        "tertiary": {
      50: "#FDECEC",
      100: "#FCD9D9",
      200: "#F9B4B4",
      300: "#F68E8E",
      400: "#F26868",
      500: "#EF4040",
      600: "#E21313",
      700: "#A90E0E",
      800: "#710909",
      900: "#380505",
      950: "#1C0202"
        },
        "quaternary": {
          50: "#FFF6EB",
      100: "#FFEDD6",
      200: "#FFDCAD",
      300: "#FFCA85",
      400: "#FFB85C",
      500: "#FFA732",
      600: "#F58B00",
      700: "#B86800",
      800: "#7A4500",
      900: "#3D2300",
      950: "#1F1100"
        }
      }
    },
  },
  plugins: [],
};
export default config;
