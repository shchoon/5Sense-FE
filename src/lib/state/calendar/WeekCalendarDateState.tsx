import { atom } from 'recoil'

export interface WeekDateType {
    year: number;
    month: number;
    week: number;
    date: number
}
const date = new Date()

export const WeekCalendarDateState = atom<WeekDateType>({
  key: 'weekCalendarDate',
  default: {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 0).getDay() + 1) / 7),
    date: date.getDate()
  }
})
