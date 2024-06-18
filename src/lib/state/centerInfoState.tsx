import { CenterInfo } from '@/app/(service)/layout'
import { atom } from 'recoil'

export const centerInfoState = atom<CenterInfo>({
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
