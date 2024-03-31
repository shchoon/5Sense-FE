import { atom } from 'recoil'
import Schedule from '../../app/(nav)/room/schedule/page'

interface DurationScheduleType {
  schedules: {
    startDate: string | Date
    endDate: string | Date
    startTime: string
    endTime: string
    repeatDate: string
    roomId: number
  }
  lessonTime: number
}

export const durationScheduleState = atom<DurationScheduleType>({
  key: 'durationScheduleState',
  default: {
    schedules: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      repeatDate: '',
      roomId: 2
    },
    lessonTime: 0
  }
})
