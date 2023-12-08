import Image from 'next/image'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function MonthDateTab() {
  const currentDate = new Date()
  const pathName = usePathname().split('/')[2]

  const dateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  }

  const [date, setDate] = useState<number>(dateData.date)
  console.log(pathName)
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1)
  const lastDateOfMonth = new Date(2023, 2, 0)
  console.log(lastDateOfMonth.getDate())
  //console.log(currentDate, firstDayOfYear)
  //const days = Math.floor((currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000));
  //const week = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);

  function moveForwardDay() {
    setDate(date + 1)
  }
  //console.log(dateData)
  return (
    <>
      <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
        <Image src={chevronLeft} width={24} height={24} alt=" " />
      </div>
      <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
        <Image src={calender} width={18} height={18} alt=" " />
        <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">
          {dateData.year}년 {dateData.month}월
        </span>
      </div>
      <div
        className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center"
        onClick={moveForwardDay}
      >
        <Image src={chevronRight} width={24} height={24} alt=" " />
      </div>
    </>
  )
}
