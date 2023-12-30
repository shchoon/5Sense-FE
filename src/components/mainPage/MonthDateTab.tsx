import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { useState } from 'react'
import DateSlideTab from './DateSlideTab'
import Calendar from '@/components/calendar'

export default function MonthDateTab() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })

  function moveForwardMonth() {
    if (dateData.month == 12) {
      setDateData({
        ...dateData,
        year: dateData.year + 1,
        month: 1
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month + 1
      })
    }
  }

  function moveBackMonth() {
    if (dateData.month == 1) {
      setDateData({
        ...dateData,
        year: dateData.year - 1,
        month: 12
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month - 1
      })
    }
  }

  return (
    <>
      <div className="mt-[80px] w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackMonth}
            >
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <button className="w-full px-3 py-2 flex justify-center gap-2 items-center group">
              <Calendar className="fill-[#6B7280] group-hover:fill-primary-600 group-focus:fill-primary-600" />
              <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal group-hover:text-primary-600 group-focus:text-primary-600">
                {dateData.year}년 {dateData.month}월
              </span>
            </button>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardMonth}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
        </div>
      </div>
    </>
  )
}
