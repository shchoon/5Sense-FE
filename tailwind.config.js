/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn-purple': {
          boxSizing: 'border-box',
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#563AC0'
          }
        },
        '.btn-line-purple': {
          boxSizing: 'border-box',
          background: 'white',
          borderRadius: 8,
          textAlign: 'center',
          border: '1px #7354E8 solid',
          color: '#7354E8',
          fontWeight: '600',
          cursor: 'pointer',
          '&:hover': {
            background: '#563AC0',
            color: 'white'
          }
        },
        '.input-line-gray': {
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 14,
          paddingBottom: 14,
          boxSizing: 'border-box',
          background: 'white',
          borderRadius: 8,
          border: '1px #D1D5DB solid',
          boxSizing: 'border-box',
          cursor: 'pointer',
          '&:placeholder': {
            color: '#9CA3AF',
            fontWeight: '400'
          },
          '&:focus': {
            outline: 'none',
            border: '1px #5539C0 solid',
            boxShadow: 'none' //textarea default로 shadow 존재
          }
        }
      })
    })
  ],
  theme: {
    extend: {
      screens: {
        md: '769px',
        '2md': '817px',
        lg: '1025px',
        xl: '1281px',
        '2xl': '1441px',
        '3xl': '1921px'
      },
      colors: {
        current: 'currentColor',
        white: '#ffffff',
        primary: {
          50: '#F0EFFF',
          200: '#D3C4F9',
          300: '#B6A3EF',
          400: '#907AE5',
          500: '#917AE5',
          600: '#7354E8',
          700: '#5539C0'
        },
        gray: {
          50: '#F8FAFD',
          200: '#E5E7EB',
          400: '#9CA3AF',
          500: '#6B7280'
        }
      },
      boxShadow: {
        mainPage: '-3px 0px 20px 0px rgba(139, 140, 165, 0.03)'
      }
    }
  }
}
