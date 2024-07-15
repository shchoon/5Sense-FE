import { atom } from 'recoil'

interface SessionScheduleType {
  name: string
  totalSessions: number
  studentId?: number
  lessonId: number
  paymentStatus: string
  sessionDate: string
  startTime: string
  endTime: string
  roomId: number
  roomName: string
  restOfSessions: number
}

export const sessionScheduleState = atom<SessionScheduleType[]>({
  key: 'sessionScheduleState',
  default: []
})
