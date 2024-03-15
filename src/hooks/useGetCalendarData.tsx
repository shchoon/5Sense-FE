import { dateDataType } from '@/components/datePicker/dayDatePicker'
import useGetHolidayData from './useGetHolidayData'

export function useGetCalendarData(dateData: dateDataType) {
  const getHoliData = useGetHolidayData(dateData.year)
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)
  const firstDateOfCurrentMonthData = new Date(dateData.year, dateData.month)
  const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month + 1, 0)
  const firstDateOfNextMonthData = new Date(dateData.year, dateData.month + 1)

  let list = []
  /* 이전 월 정보 */
  if (firstDateOfCurrentMonthData.getDay() !== 0) {
    for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
      list.push({
        date: undefined,
        textColor: '',
        clickable: false
        /* date: lastDateOfLastMonthData.getDate() - i,
        textColor: 'font-semibold text-gray-500',
        clickable: false */
      })
    }
  }

  /* 해당 월에 공휴일이 유무 확인 */
  if (getHoliData[dateData.month + 1]) {
    const monthHoliData = getHoliData[dateData.month + 1].date
    for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
      if (monthHoliData.includes(i)) {
        list.push({
          date: i,
          textColor: 'font-bold text-red-600',
          clickable: true
        })
      } else {
        list.push({
          date: i,
          textColor: 'gray-900-bold',
          clickable: true
        })
      }
    }
  } else {
    for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
      list.push({
        date: i,
        textColor: 'gray-900-bold',
        clickable: true
      })
    }
  }
  /* 월의 마지막 주 */
  if (lastDateOfCurrnetMonthData.getDay() !== 6) {
    for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
      list.push({
        date: undefined,
        textColor: '',
        clickable: false
      })
    }
  }

  let result = []
  for (var i = 0; i < list.length; i += 7) {
    result.push(list.slice(i, i + 7))
  }

  return result
}
