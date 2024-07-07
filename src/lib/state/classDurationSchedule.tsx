import { atom } from 'recoil'
import Schedule from '../../app/(service)/(nav)/room/schedule/page'

export interface DurationScheduleType {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  repeatDate: string
  roomId: number
  lessonTime: number
}

export const durationClassScheduleState = atom<DurationScheduleType[]>({
  key: 'durationClassScheduleState',
  default: []
})
