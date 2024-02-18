import { atom } from 'recoil'

export const modalState = atom({
  key: 'modal',
  default: {
    id: '',
    active: false,
    type: ''
  }
})
