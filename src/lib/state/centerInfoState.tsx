import { atom } from 'recoil'
import { CenterInfo } from '@/components/layout/CenterInfo/AcademyInfo'

export const centerInfoState = atom<CenterInfo>({
  key: 'centerInfo',
  default: {
    status: '',
    name: '',
    address: '',
    mainPhone: '',
    open: '',
    close: '',
    profile: ''
  }
})
