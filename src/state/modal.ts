import { atom } from 'recoil'

export const studentmodalState = atom({
  key: 'studentState',
  default: false
})

export const teachermodalState = atom({
  key: 'teacherState',
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
