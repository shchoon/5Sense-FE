import { atom } from 'recoil'

export const lessonTimeState = atom<number>({
  key: 'lessonTime',
  default: 0
})
