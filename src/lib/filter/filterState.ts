import { atom } from 'recoil'

export interface filterStateType {
  classType: string
  teachers: string[]
  mainCategory: string
  subCategory: string
}

export const filterState = atom<filterStateType>({
  key: 'filterState',
  default: {
    classType: '',
    teachers: [],
    mainCategory: '',
    subCategory: ''
  }
})
