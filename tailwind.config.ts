import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        obscura: ["var(--font-obscura)", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        base: {
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
        supporting: {
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
        highlight1: {
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
        highlight2: {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        flicker: {
          "0%": { opacity: "0.1" },
          "1%": { opacity: "1" },
          "4%": { opacity: "0.1" },
          "4.5%": { opacity: "1" },
          "6%": { opacity: "0.1" },
          "10%": { opacity: "1" },
          "12.5%": { opacity: "0.3" },
          "15%": { opacity: "1" },
          "35%": { opacity: "0.7" },
          "36%": { opacity: "0.2" },
          "38.5%": { opacity: "0.9" },
          "50%": { opacity: "0.9" },
          "100%": { opacity: "1" },
        },
        move: {
          "0%": {
            "background-position-y": "0%",
          },

          "100%": {
            "background-position-y": "110%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "meteor-effect": "meteor 5s linear infinite",
        flicker: "flicker 20s linear infinite",
        move: "move 5s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".rotate-x-20": {
          transform: "rotateX(20deg)",
        },
        ".rotate-x-45": {
          transform: "rotateX(45deg)",
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".-rotate-z-20": {
          transform: "rotateZ(-20deg)",
        },
      });
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-z": (value) => ({
            "--tw-translate-z": value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("translate"), supportsNegativeValues: true }
      );
    }),
  ],
} satisfies Config;

export default config;
