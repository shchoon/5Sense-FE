import { atom } from 'recoil'

interface addSessionType {
  studentId: number
  lessonId: number
  sessionDate: string
  startTime: string
  endTime: string
  roomId: number
}

export const AddSessionState = atom<addSessionType>({
  key: 'addSessionState',
  default: {
    studentId: 0,
    lessonId: 0,
    sessionDate: '',
    startTime: '',
    endTime: '',
    roomId: 0
  }
})
