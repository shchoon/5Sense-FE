import { atom, selector } from 'recoil'

export const modalState = atom({
  key: 'modal',
  default: {
    id: '',
    active: false,
    type: ''
  }
})
