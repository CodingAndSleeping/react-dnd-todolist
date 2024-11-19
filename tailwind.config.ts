import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      spacing: {
        10: '10px',
        20: '20px',
        30: '30px',
        40: '40px',
        50: '50px',
        60: '60px',
        70: '70px',
        80: '80px',
        90: '90px',
        100: '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      flex: {
        2: '2',
      },
      lineHeight: {
        100: '100px',
        200: '200px',
      },
    },
  },
  plugins: [],
} satisfies Config
