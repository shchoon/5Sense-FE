import { atom } from 'recoil'

interface RoomDetailsProps {
  id: number
  name: string
  capacity: number
}

export const RoomDetailsState = atom<RoomDetailsProps>({
  key: 'roomDetails',
  default: {
    id: 0,
    name: '',
    capacity: 0
  }
})
