import { atom } from 'recoil'

interface SessionScheduleType {
  name: string
  totalSessions: string
  studentId?: number
  lessonId: number
  paymentStatus: string
  sessionDate: string
  startTime: string
  endTime: string
  roomId: number
}

export const sessionScheduleState = atom<SessionScheduleType[]>({
  key: 'sessionScheduleState',
  default: []
})
