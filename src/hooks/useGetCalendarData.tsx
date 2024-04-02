import { dateDataType } from '@/components/datePicker/dayDatePicker'
import useGetHolidayData from './useGetHolidayData'

export function useGetCalendarData(dateData: dateDataType, type?: string) {
  const getHoliData = useGetHolidayData(dateData.year)
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)
  const firstDateOfCurrentMonthData = new Date(dateData.year, dateData.month)
  const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month + 1, 0)
  const firstDateOfNextMonthData = new Date(dateData.year, dateData.month + 1)

  const currnetDate = new Date()

  const currentdateData = {
    year: currnetDate.getFullYear(),
    month: currnetDate.getMonth(),
    date: currnetDate.getDate()
  }

  console.log(dateData, currentdateData)

  let list = []
  /* 이전 월 정보 */
  if (firstDateOfCurrentMonthData.getDay() !== 0) {
    for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
      list.push({
        date: undefined,
        textColor: '',
        clickable: false
      })
    }
  }

  /* 해당 월이 현재 월과 같을 때 */
  if (type === 'addClass' && dateData.year === currentdateData.year && dateData.month === currentdateData.month) {
    let startDate: number

    if (currentdateData.date === 1) {
      startDate = 1
    } else {
      for (var i = 1; i <= currentdateData.date - 1; i++) {
        list.push({
          date: i,
          textColor: 'font-semibold text-gray-500',
          clickable: false
        })
      }
      startDate = Number(list[list.length - 1].date) + 1
    }
    console.log(startDate)
    if (getHoliData[dateData.month + 1]) {
      const monthHoliData = getHoliData[dateData.month + 1].date
      for (var i = startDate; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
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
      for (var i = startDate; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
        list.push({
          date: i,
          textColor: 'gray-900-bold',
          clickable: true
        })
      }
    }
  } else {
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
  }

  /* 해당 월에 공휴일이 유무 확인 */
  /* if (dateData.year !== currentdateData.year && dateData.month !== currentdateData.month) {
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
  } */

  /* 월의 마지막 주 */
  /* if (lastDateOfCurrnetMonthData.getDay() !== 6) {
    for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
      list.push({
        date: undefined,
        textColor: '',
        clickable: false
      })
    }
  } */

  let result = []
  for (var i = 0; i < list.length; i += 7) {
    result.push(list.slice(i, i + 7))
  }
  console.log(result)
  return result
}