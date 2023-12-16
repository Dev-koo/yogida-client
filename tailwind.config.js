import { HEADER_HEIGHT, MOBILE_MIN_WIDTH, NAVBAR_HEIGHT } from './src/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#589BF7',
        secondary: '#FFDB5F',
        black: '#111111',
        darkgray: '#606060',
        gray: '#AFAFAF',

        danger: '#FB6363',
        input: '#F2F4F8',
        kakaoyellow: '#F2E42D',
      },
      width: {
        mobile: `${MOBILE_MIN_WIDTH}px`,
      },
      height: {
        header: HEADER_HEIGHT,
        navbar: NAVBAR_HEIGHT,
      },
      margin: {
        header: HEADER_HEIGHT,
      },
    },
  },
  plugins: [],
};
