import { atom } from 'recoil'

interface DurationScheduleType {
  startDate: string | Date
  endDate: string | Date
  startTime: string
  endTime: string
  repeatDate: string
  roomId: number
}

export const durationScheduleState = atom<DurationScheduleType>({
  key: 'durationScheduleState',
  default: {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    repeatDate: '',
    roomId: 2
  }
})
