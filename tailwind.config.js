/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [],
  theme: {
    screens: {
      xs: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    extend: {
      container: {
        screens: {
          lg: '1024px',
          xl: '1440px',
          sxl: '1800px',
          '2xl': '1920px',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#163455',
          medium: '#14b3d9',
          light: '#e1ecf3',
        },
        secondary: {
          DEFAULT: '#d12616',
          light: '#fce8e6',
        },
        ecology: {
          DEFAULT: '#34b6b3',
          light: '#d9f8fe',
        },
        society: {
          DEFAULT: '#dd6f10',
          light: '#fce8d9',
        },
        economy: {
          DEFAULT: '#5a3089',
          light: '#f2e6fa',
        },
        mobility: {
          DEFAULT: '#bc914d',
          light: '#e3d3b7',
        },
        live: {
          DEFAULT: '#005096',
          light: '#dbeeff',
        },
        green: {
          DEFAULT: '#34c17b',
          light: '#d5f4e5',
          dark: '#1a7f4d',
        },
        blue: {
          DEFAULT: '#14b3d9',
          light: '#e1ecf3',
        },
        brown: {
          DEFAULT: '#644117',
          light: '#f2e6d9',
        },
        pink: {
          DEFAULT: '#d998a0',
          light: '#fff0f5',
        },
        yellow: {
          DEFAULT: '#f3e03b',
          light: '#fff8e1',
        },
      },
      fontSize: {
        headline: '4rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontFamily: {
        sans: ['Verdana', 'sans-serif'],
      },
    },
  },
}
