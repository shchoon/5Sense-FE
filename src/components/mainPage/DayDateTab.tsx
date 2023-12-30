import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import { useState } from 'react'
import DateSlideTab from './DateSlideTab'
import Calendar from '@/components/calendar'
import allowLeft from '../../assets/icons/allowLeft.svg'
import allowright from '../../assets/icons/allowRight.svg'

export default function DayDateTab() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })

  const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month, 0)
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month - 1, 0)

  function moveForwardDay() {
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (dateData.date == lastDateOfCurrentMonth) {
      if (dateData.month == 12) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 1,
          date: 1
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1,
          date: 1
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date + 1
      })
    }
  }

  function moveBackDay() {
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()

    if (dateData.date == 1) {
      if (dateData.month == 1) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 12,
          date: 31
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month - 1,
          date: lastDateOfLastMonth
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date - 1
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
              onClick={moveBackDay}
            >
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <button className="w-full px-3 py-2 flex justify-center gap-2 items-center group">
              <Calendar className="fill-[#6B7280] group-hover:fill-primary-600 group-focus:fill-primary-600" />
              <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal group-hover:text-primary-600 group-focus:text-primary-600">
                {dateData.year}년 {dateData.month}월 {dateData.date}일
              </span>
            </button>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardDay}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
          <div className="absolute z-10 w-full top-[60px] flex justify-center">
            <div className="w-[284px] h-[313px] bg-white p-4 rounded-lg shadow flex flex-col gap-2">
              <div className="w-full h-6 flex space-x-[43px]">
                <Image src={allowLeft} width={20} height={20} alt="" />
                <div className="w-[126px] h-[18px]">
                  <div className="w-[126px] text-center text-gray-900 text-xs font-bold font-['Pretendard'] leading-[18px]">
                    2021년 10월
                  </div>
                </div>
                <Image src={allowright} width={20} height={20} alt="" />
              </div>
              <div className="flex flex-col">
                <div className="w-full flex h-[18px]">
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                  <div className="w-7 h-[18px] px-1 py-2">
                    <div className="w-7 text-center text-gray-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                      Sun
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
