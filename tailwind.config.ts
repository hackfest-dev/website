import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
      colors: {
        primary: {
          50: '#DFE4F6',
          100: '#BFC8ED',
          200: '#8092DB',
          300: '#405BC9',
          400: '#283D8F',
          500: '#172352',
          600: '#121B40',
          700: '#0D1430',
          800: '#090E20',
          900: '#040710',
          950: '#020308',
        },
        secondary: {
          50: '#E5E5FF',
          100: '#CCCCFF',
          200: '#9E9EFF',
          300: '#6B6BFF',
          400: '#3D3DFF',
          500: '#0A0AFF',
          600: '#0000D6',
          700: '#00009E',
          800: '#00006B',
          900: '#000033',
          950: '#000019',
        },
        tertiary: {
          50: '#E5FFFB',
          100: '#CCFFF7',
          200: '#99FFEE',
          300: '#66FFE6',
          400: '#33FFDD',
          500: '#00FED3',
          600: '#00CCAA',
          700: '#009980',
          800: '#006655',
          900: '#00332B',
          950: '#001915',
        },
        accent1: {
          50: '#FFF2EB',
          100: '#FFE8DB',
          200: '#FFCDB3',
          300: '#FFB68F',
          400: '#FF9F6B',
          500: '#FF8644',
          600: '#FF5D05',
          700: '#C24400',
          800: '#802D00',
          900: '#421700',
          950: '#1F0B00',
        },
        accent2: {
          50: '#FFFEF5',
          100: '#FFFDEB',
          200: '#FFFAD1',
          300: '#FFF7BD',
          400: '#FFF4A3',
          500: '#FFF18E',
          600: '#FFE83D',
          700: '#F0D400',
          800: '#9E8C00',
          900: '#524800',
          950: '#292400',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.rotate-x-20': {
          transform: 'rotateX(20deg)',
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.-rotate-z-20': {
          transform: 'rotateZ(-20deg)',
        },
      });
    }),
    plugin(function ({ matchUtilities, theme }) {
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
      );
    }),
  ],
};

export default config;
