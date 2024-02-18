import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from 'public/assets/icons/chevron/chevron-left.svg'
import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'
import calender from 'public/assets/icons/calendar.svg'
import { useState } from 'react'
import DateSlideTab from './DateSlideTab'
import MonthDatePicker from '../datePicker/monthDatePicker'
import { dateDataType } from '../datePicker/dayDatePicker'

export default function MonthDateTab() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  function moveForwardMonth() {
    if (dateData.month === 11) {
      setDateData({
        ...dateData,
        year: dateData.year + 1,
        month: 0
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month + 1
      })
    }
  }

  function moveBackMonth() {
    if (dateData.month === 0) {
      setDateData({
        ...dateData,
        year: dateData.year - 1,
        month: 11
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month - 1
      })
    }
  }

  const setDateDataFromChild = (data: dateDataType, type: string) => {
    if (type === 'check') {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month
      })
      setIsClickedDatePicker(false)
    } else {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month
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
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base font-['Pretendard'] hover:text-primary-600 cursor-pointer"
              onClick={onClickDatePickerHandler}
            >
              <Image src={calender} width={18} height={18} alt=" " />
              {dateData.year}년 {dateData.month + 1}월
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardMonth}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
          {isClickedDatePicker && (
            <div className="absolute w-[255px] z-10 right-0 left-0 mx-auto top-[60px]">
              <MonthDatePicker
                changeParentsDateData={setDateDataFromChild}
                parentsDateData={dateData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
