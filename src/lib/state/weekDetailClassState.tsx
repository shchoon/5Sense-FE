import { atom } from 'recoil'

export const WeekDetailClassState = atom<{ id: number; type: string }>({
  key: 'weekDetailClass',
  default: {
    id: 0,
    type: ''
  }
})
