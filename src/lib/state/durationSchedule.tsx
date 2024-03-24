import { atom } from 'recoil'

interface DurationScheduleType {
  startDate: string | Date
  endDate: string | Date
  startTime: string
  endTime: string
  repeatDate: string
  LessonRoomId: number
}

export const durationScheduleState = atom<DurationScheduleType>({
  key: 'durationScheduleState',
  default: {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    repeatDate: '',
    LessonRoomId: 0
  }
})
