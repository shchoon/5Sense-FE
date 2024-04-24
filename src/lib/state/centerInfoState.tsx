import { atom } from 'recoil'
import { centerDataType } from '@/app/myCenter/rigister/page'

export const centerInfoState = atom<centerDataType>({
  key: 'centerInfo',
  default: {
    name: '',
    address: '',
    mainPhone: '',
    open: '',
    close: '',
    profile: ''
  }
})
