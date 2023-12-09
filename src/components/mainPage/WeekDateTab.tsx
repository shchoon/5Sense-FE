import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { useState } from 'react'
import DateSlideTab from './DateSlideTab'

export default function WeekDateTab() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const dateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  }

  const [week, setWeek] = useState<number>(1)
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1)
  const lastDateOfMonth = new Date(2023, 2, 0)
  console.log(lastDateOfMonth.getDate())
  //console.log(currentDate, firstDayOfYear)
  //const days = Math.floor((currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000));
  //const week = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);

  function moveForwardDay() {
    setWeek(week + 1)
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
            <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
              <Image src={calender} width={18} height={18} alt=" " />
              <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">
                {dateData.year}년 {dateData.month}월 {week}주차
              </span>
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center"
              onClick={moveForwardDay}
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
