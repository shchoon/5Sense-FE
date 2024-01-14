import { atom } from 'recoil'

export const modalState = atom({
  key: 'modalState',
  default: false
})

export const idState = atom({
  key: 'idState',
  default: ''
})

export const instructorRegisterModal = atom({
  key: 'instructorRegisterModal',
  default: false
})
