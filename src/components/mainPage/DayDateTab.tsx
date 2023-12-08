import Image from 'next/image'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DayDateTab() {
  const currentDate = new Date()

  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })

  const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month, 0)
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month - 1, 0)
  const [date, setDate] = useState<number>(dateData.date)

  console.log(lastDateOfCurrnetMonthData.getDate())
  console.log(lastDateOfLastMonthData.getDate())

  function moveForwardDay() {
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (date == lastDateOfCurrentMonth) {
      if (dateData.month == 12) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 1
        })
        setDate(1)
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1
        })
        setDate(1)
      }
    } else {
      setDate(date + 1)
    }
  }

  function moveBackDay() {
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()

    if (date == 1) {
      if (dateData.month == 1) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 12
        })
        setDate(31)
      } else {
        setDateData({
          ...dateData,
          month: dateData.month - 1
        })
        setDate(lastDateOfLastMonth)
      }
    } else {
      setDate(date - 1)
    }
  }
  return (
    <>
      <div
        className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
        onClick={moveBackDay}
      >
        <Image src={chevronLeft} width={24} height={24} alt=" " />
      </div>
      <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
        <Image src={calender} width={18} height={18} alt=" " />
        <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">
          {dateData.year}년 {dateData.month}월 {date}일
        </span>
      </div>
      <div
        className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
        onClick={moveForwardDay}
      >
        <Image src={chevronRight} width={24} height={24} alt=" " />
      </div>
    </>
  )
}
