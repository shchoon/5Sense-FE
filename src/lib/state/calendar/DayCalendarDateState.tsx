import { atom } from 'recoil'
import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'

const date = new Date()

export const DayCalendarDateState = atom<dateDataType>({
  key: 'dayCalendarDate',
  default: {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }
})
