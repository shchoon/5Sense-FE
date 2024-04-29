import { atom } from 'recoil'

interface DurationScheduleType {
  name: string
  studentId: number
  lessonId: number
  paymentStatus: string
  startTime: string
  endTime: string
  startDate: string
  endDate: string
  roomName: string
  repeatDate: string
}

export const durationScheduleState = atom<DurationScheduleType[]>({
  key: 'durationScheduleState',
  default: []
})