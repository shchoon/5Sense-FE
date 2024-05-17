import { atom } from 'recoil'
import Schedule from '../../app/(service)/(nav)/room/schedule/page'

interface DurationScheduleType {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  repeatDate: string
  roomId: number
  lessonTime: number
}

export const durationScheduleState = atom<DurationScheduleType[]>({
  key: 'durationScheduleState',
  default: []
})
