export default function GetWeekList(year: number, month: number) {
  const lastDateOfLastMonthData = new Date(year, month, 0)
  const firstDateOfCurrentMonthData = new Date(year, month)

  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const lastDateOfCurrnetMonthData = new Date(nextYear, nextMonth, 0)
  const firstDateOfNextMonthData = new Date(nextYear, nextMonth)

  let list = []
  if (firstDateOfCurrentMonthData.getDay() !== 0) {
    for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
      list.push({
        date: `${lastDateOfLastMonthData.getDate() - i}`,
        textColor: 'font-semibold text-gray-500',
        clickable: false
      })
    }
  }

  for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
    list.push({ date: `${i}`, textColor: 'gray-900-bold', clickable: true })
  }

  if (lastDateOfCurrnetMonthData.getDay() !== 6) {
    for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
      list.push({
        date: `${i}`,
        textColor: 'font-semibold text-gray-500',
        clickable: false
      })
    }
  }

  let result = []
  let weekNumber = 1
  for (var i = 0; i < list.length; i += 7) {
    result.push({ date: list.slice(i, i + 7), week: weekNumber })
    weekNumber++
  }

  return result
}
