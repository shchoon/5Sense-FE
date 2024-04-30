import { atom } from 'recoil'

interface DurationScheduleType {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  repeatDate: string
  roomId: number
  lessonTime: number
}

export const durationClassScheduleState = atom<DurationScheduleType[]>({
  key: 'durationScheduleState',
  default: []
})
