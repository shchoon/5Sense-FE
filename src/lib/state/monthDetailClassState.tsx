import { atom } from 'recoil'

export const MonthDetailClassState = atom<{ day: string; classData: any[] }>({
  key: 'monthDetailClass',
  default: {
    day: '',
    classData: []
  }
})
