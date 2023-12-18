import Image from 'next/image'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DateTab() {
  const currentDate = new Date()
  const pathName = usePathname().split('/')[2]

  const dateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }
  //console.log(pathName)
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1)
  //console.log(currentDate, firstDayOfYear)
  //const days = Math.floor((currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000));
  //const week = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);

  //console.log(dateData)
  return (
    <>
      <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
        <Image src={chevronLeft} width={24} height={24} alt=" " />
      </div>
      <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
        <Image src={calender} width={18} height={18} alt=" " />
        <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">
          {dateData.year}년 {dateData.month}월{' '}
          {pathName == 'day' ? `${dateData.date}일` : null}
          {pathName == 'week' ? '1주차' : null}
        </span>
      </div>
      <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
        <Image src={chevronRight} width={24} height={24} alt=" " />
      </div>
    </>
  )
}
