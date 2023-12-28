import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      colors: {
        primary: {
          50: "#DFE4F6",
          100: "#BFC8ED",
          200: "#8092DB",
          300: "#405BC9",
          400: "#283D8F",
          500: "#172352",
          600: "#121B40",
          700: "#0D1430",
          800: "#090E20",
          900: "#040710",
          950: "#020308",
        },
        secondary: {
          50: "#E5E5FF",
          100: "#CCCCFF",
          200: "#9E9EFF",
          300: "#6B6BFF",
          400: "#3D3DFF",
          500: "#0A0AFF",
          600: "#0000D6",
          700: "#00009E",
          800: "#00006B",
          900: "#000033",
          950: "#000019",
        },
        tertiary: {
          50: "#E5FFFB",
          100: "#CCFFF7",
          200: "#99FFEE",
          300: "#66FFE6",
          400: "#33FFDD",
          500: "#00FED3",
          600: "#00CCAA",
          700: "#009980",
          800: "#006655",
          900: "#00332B",
          950: "#001915",
        },
        accent1: {
          50: "#FFF2EB",
          100: "#FFE8DB",
          200: "#FFCDB3",
          300: "#FFB68F",
          400: "#FF9F6B",
          500: "#FF8644",
          600: "#FF5D05",
          700: "#C24400",
          800: "#802D00",
          900: "#421700",
          950: "#1F0B00",
        },
        accent2: {
          50: "#FFFEF5",
          100: "#FFFDEB",
          200: "#FFFAD1",
          300: "#FFF7BD",
          400: "#FFF4A3",
          500: "#FFF18E",
          600: "#FFE83D",
          700: "#F0D400",
          800: "#9E8C00",
          900: "#524800",
          950: "#292400",
        },
        //   "primary": {
        //     50: "#F1E5FB",
        //     100: "#E3CAF6",
        //     200: "#C896EE",
        //     300: "#AC61E5",
        //     400: "#902DDC",
        //     500: "#711DB0",
        //     600: "#59178C",
        //     700: "#431169",
        //     800: "#2D0C46",
        //     900: "#160623",
        //     950: "#0B0312"
        //   },
        //   "secondary": {
        // 50: "#FCE3F6",
        // 100: "#FAC7EC",
        // 200: "#F594DB",
        // 300: "#F05CC8",
        // 400: "#EB24B6",
        // 500: "#C21292",
        // 600: "#9A0E75",
        // 700: "#750B58",
        // 800: "#4F073C",
        // 900: "#25031C",
        // 950: "#13020E"
        //   },
        //   "tertiary": {
        // 50: "#FDECEC",
        // 100: "#FCD9D9",
        // 200: "#F9B4B4",
        // 300: "#F68E8E",
        // 400: "#F26868",
        // 500: "#EF4040",
        // 600: "#E21313",
        // 700: "#A90E0E",
        // 800: "#710909",
        // 900: "#380505",
        // 950: "#1C0202"
        //   },
        //   "quaternary": {
        //     50: "#FFF6EB",
        // 100: "#FFEDD6",
        // 200: "#FFDCAD",
        // 300: "#FFCA85",
        // 400: "#FFB85C",
        // 500: "#FFA732",
        // 600: "#F58B00",
        // 700: "#B86800",
        // 800: "#7A4500",
        // 900: "#3D2300",
        // 950: "#1F1100"
        //   }
      },
    },
  },
  plugins:  [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
          'text-shadow': (value) => ({
            textShadow: value,
          }),   
        },
        { values: theme('translate'), supportsNegativeValues: true }
      )
    })
  ],
};
export default config;
