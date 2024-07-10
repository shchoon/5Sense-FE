import { CustomFlowbiteTheme } from 'flowbite-react'

const customTheme: CustomFlowbiteTheme = {
  button: {
    base: 'rounded-lg cursor-pointer font-pretendard flex items-center justify-center align-middle',
    fullSized: 'w-full',
    color: {
      primary: 'text-white bg-[#7253E7] hover:bg-[#5539C0] focus:ring-2 focus:ring-purple-300',
      outline:
        'bg-white border border-[#7253E7] text-[#7253E7] hover:text-white hover:bg-[#5539C0] focus:ring-2 focus:ring-purple-300'
    },

    size: {
      sm: 'px-5 py-2.5 text-sm font-semibold leading-[21px]',
      md: 'px-5 py-3 text-base font-medium',
      lg: 'px-6 py-3.5 text-base font-semibold'
    }
  },
  modal: {
    root: {
      base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden'
      },
      sizes: {
        sm: 'w-[424px]',
        md: 'w-[640px]'
      }
    },
    content: {
      base: 'relative h-full w-full  md:h-auto',
      inner: 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700'
    },
    body: {
      base: 'overflow-auto p-6'
    },
    header: {
      base: 'flex items-start justify-between p-4',
      title: 'absolute top-10 left-6 text-[22px] font-bold text-[#111928]',
      close: {
        base: 'ml-auto inline-flex items-center bg-[#F0EFFF] rounded-full p-1.5 text-sm text-[#7253E7]',
        icon: 'h-5 w-5'
      }
    }
    // footer: {
    //   base: 'flex items-center p-6 border-t-0'
    // }
  },
  badge: {
    root: {
      base: 'flex h-fit items-center px-2 py-1 rounded',
      color: {}
    }
  },
  drawer: {
    root: {
      base: 'fixed z-40 overflow-y-hidden bg-white px-6 transition-transform dark:bg-gray-800',
      backdrop: 'fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80',
      edge: 'bottom-16',
      position: {
        left: {
          on: 'left-0 top-0 h-screen w-[480px] rounded-tr-[32px] transform-none',
          off: 'hidden'
        }
      }
    },
    header: {
      inner: {
        closeButton:
          'absolute end-6 top-6 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#F0EFFF] text-sm text-[#7354E8] ',
        closeIcon: 'h-5 w-5',
        titleIcon: 'hidden'
      },
      collapsed: {
        on: 'hidden',
        off: 'block'
      }
    },
    items: {
      base: 'mt-12 overflow-y-auto h-screen-minus-72'
    }
  }
}

export default customTheme
