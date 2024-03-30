import { atom } from 'recoil'

export interface filterStateType {
  classType: string
  teacherId: string[]
  mainCategoryId: string
  subCategoryId: string
  teacherName: string[]
}

export const filterState = atom<filterStateType>({
  key: 'filterState',
  default: {
    classType: '',
    teacherId: [],
    mainCategoryId: '',
    subCategoryId: '',
    teacherName: []
  }
})
