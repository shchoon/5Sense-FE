/** @type {import('tailwindcss').Config} */
const { color } = require('chart.js/helpers')
const plugin = require('tailwindcss/plugin')
const flowbite = require('flowbite-react/tailwind')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content()
  ],
  plugins: [
    flowbite.plugin(),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn-purple-sm': {
          // boxSizing: 'border-box',
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          padding: '8px 12px',
          margin: '3px',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#563AC0'
          },
          '&:active': {
            border: '3px solid #D3C4F9',
            margin: 'unset'
          }
        },
        '.btn-purple-md': {
          // boxSizing: 'border-box',
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          padding: '10px 20px',
          margin: '3px',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#563AC0'
          },
          '&:active': {
            border: '3px solid #D3C4F9',
            margin: 'unset'
          }
        },
        '.btn-purple-lg': {
          // boxSizing: 'border-box',
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '14px 24px',
          lineHeight: '24px',
          margin: '3px',
          '&:hover': {
            backgroundColor: '#563AC0'
          },
          '&:active': {
            border: '3px solid #D3C4F9',
            margin: 'unset'
          }
        },
        '.btn-purple': {
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#563AC0'
          },
          '&:active': {
            outline: '3px solid #D3C4F9'
          }
        },
        '.btn-white': {
          boxSizing: 'border-box',
          background: 'white',
          borderRadius: 8,
          textAlign: 'center',
          alignItems: 'center',
          color: 'black',
          fontWeight: '600',
          cursor: 'pointer',
          border: '1px solid #E5E7EB',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            color: '#7354E8'
          },
          '&:active': {
            outline: '3px solid #F3F4F6'
          }
        },
        '.btn-white-md': {
          boxSizing: 'content-box',
          padding: '10px 20px',
          background: 'white',
          borderRadius: 8,
          textAlign: 'center',
          color: '#7354E8',
          fontWeight: '600',
          cursor: 'pointer',
          border: '1px solid #7354E8',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            color: '#7354E8'
          },
          '&:active': {
            outline: '3px solid #7354E8'
          }
        },
        '.btn-purple-test': {
          boxSizing: 'content-box',
          padding: '10px 20px',
          background: '#7354E8',
          borderRadius: 8,
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#563AC0'
          },
          '&:active': {
            outline: '3px solid #D3C4F9'
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
            background: '#563AC0'
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
        },
        'input-instructor-register': {
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 20,
          paddingTop: 20,
          border: '1px #E5E7EB solid',
          borderRadius: 8,
          cursor: 'pointer',
          '&:placeholder': {
            color: '#9CA3AF',
            fontWeight: '400'
          },
          '&:focus': {
            outline: 'none',
            border: '1px #563AC0 solid',
            boxShadow: 'none' //textarea default로 shadow 존재
          }
        }
      })
    })
  ],
  theme: {
    extend: {
      screens: {
        md: { min: '769px' },
        lg: { min: '1025px' }, // ~1025
        xl: { min: '1281px' }, // ~1281
        '2xl': { min: '1441px' } // ~1441
      },
      colors: {
        current: 'currentColor',
        white: '#ffffff',
        primary: {
          50: '#F8FAFD',
          100: '#F0EFFF',
          200: '#D3C4F9',
          300: '#B6A3EF',
          400: '#907AE5',
          500: '#917AE5',
          600: '#7354E8',
          700: '#5539C0',
          DEFAULT: '#5539C0'
        },
        gray: {
          50: '#F8FAFD',
          200: '#E5E7EB',
          400: '#9CA3AF',
          500: '#6B7280'
        },
        secondary: {
          50: '#FDFCF8',
          100: '#FFF0E3',
          200: '#FCD9BD',
          400: '#FF8240',
          500: '#FF7749',
          600: '#FF5A1F'
        }
      },
      boxShadow: {
        mainPage: '-3px 0px 20px 0px rgba(139, 140, 165, 0.03)'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      }
    }
  }
}
