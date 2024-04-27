import { atom } from 'recoil'

export const studentForClass = atom<{ name: string; phone: string; particular: string; id: string }>({
  key: 'studentForClass',
  default: {
    name: '',
    phone: '',
    particular: '',
    id: ''
  }
})
