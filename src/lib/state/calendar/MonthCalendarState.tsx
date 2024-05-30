import { atom } from 'recoil'
import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'

export interface MonthDateType {
    year: number;
    month: number;
}
const date = new Date()

export const MonthCalendarDateState = atom<MonthDateType>({
  key: 'monthCalendarDate',
  default: {
    year: date.getFullYear(),
    month: date.getMonth(),
  }
})
