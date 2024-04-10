import { atom } from 'recoil'
import Schedule from '../../app/(nav)/room/schedule/page'

interface DurationScheduleType {
  schedules: {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    repeatDate: string
    roomId: number
    lessonTime: number
  }
}

export const durationScheduleState = atom<DurationScheduleType[]>({
  key: 'durationScheduleState',
  default: []
})
