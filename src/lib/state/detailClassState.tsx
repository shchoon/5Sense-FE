import { atom } from 'recoil'

export const DetailClassState = atom<{ id: number; type: string }>({
  key: 'detailClass',
  default: {
    id: 0,
    type: ''
  }
})
