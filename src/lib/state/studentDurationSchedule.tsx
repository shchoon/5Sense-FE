import { atom } from 'recoil'

interface DurationScheduleType {
  className: string
  classId: number
  paymentStatus: string
  schedules: {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    room: string
    repeatDate: string
  }
}

export const studentDurationScheduleState = atom<DurationScheduleType[]>({
  key: 'studentDurationScheduleState',
  default: []
})
