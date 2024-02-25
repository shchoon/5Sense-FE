'use client'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

import chevronLeft from 'public/assets/icons/chevron/chevron-left.svg'
import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'
import calender from 'public/assets/icons/calendar.svg'
import user from 'public/assets/icons/user_icon.svg'

export default function Room() {
  const { width, height } = useWindowSize()
  const roomList = [
    {
      room: 'Room A'
    },
    {
      room: 'Room B'
    },
    {
      room: 'Room C'
    },
    {
      room: 'Room D'
    }
  ]
  const roomData = [
    {
      time: '09:00',
      class: [
        {
          time: '09:00',
          lessonTime: '90분',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          instructor: '조성훈'
        },
        {
          time: '09:00',
          lessonTime: '90분',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          instructor: '조성훈'
        },
        {
          time: '09:00',
          lessonTime: '90분',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          instructor: '조성훈'
        },
        {
          time: '09:00',
          lessonTime: '90분',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          instructor: '조성훈'
        }
      ]
    }
  ]
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })

  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month + 1, 0)
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  const moveForwardDay = () => {
    setIsClickedDatePicker(false)
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (dateData.date === lastDateOfCurrentMonth) {
      if (dateData.month === 11) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 0,
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

  const moveBackDay = () => {
    setIsClickedDatePicker(false)
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()

    if (dateData.date === 1) {
      if (dateData.month === 0) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 11,
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
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full black-bold text-3xl font-['Pretendard']">강의실 관리</div>
        </div>
        <div className="w-[241px] h-[41px] flex rounded-lg bg-primary-600">
          <Link
            href={''}
            className="flex w-full px-5 py-2.5 border border-r rounded-r-none border-r-primary-700 btn-purple text-sm"
          >
            강의실 찾기
          </Link>
          <Link href={''} className="flex w-full justify-center px-5 py-2.5 btn-purple text-sm">
            추가·편집
          </Link>
        </div>
      </div>
      {/* 캘린더 */}
      <div
        className={`flex mx-auto ${
          width > 950 ? 'w-[420px]' : 'w-[312px]'
        }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD] mb-[32px]`}
      >
        <div
          className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
          onClick={moveBackDay}
        >
          <Image src={chevronLeft} width={24} height={24} alt=" " />
        </div>
        <div
          className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base font-['Pretendard'] hover:text-primary-600 cursor-pointer"
          onClick={onClickDatePickerHandler}
        >
          <Image src={calender} width={18} height={18} alt=" " className="hover:fill-primary-600" />
          {dateData.year}년 {dateData.month + 1}월 {dateData.date}일
        </div>
        <div
          className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
          onClick={moveForwardDay}
        >
          <Image src={chevronRight} width={24} height={24} alt=" " />
        </div>
      </div>
      {/* 룸 리스트 */}
      <div className="relative w-full pl-[84px]">
        <span className="absolute w-6 h-6 left-[72px] top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full ">
          <Image src={chevronLeft} width={16} height={16} alt="chevronLeft" />
        </span>
        <span className="absolute w-6 h-6 -right-3 top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full ">
          <Image src={chevronRight} width={16} height={16} alt="chevronRight" />
        </span>
        <div className="w-full grid grid-cols-4 gap-2">
          {roomList.map((data, i) => {
            return (
              <div
                key={i}
                className="w-full flex flex-col gap-1.5 justify-center text-center h-[80px] border rounded-lg border-gray-300 py-2 px-3"
              >
                <div className="w-full gray-900-semibold">{data.room}</div>
                <div className="flex gap-1/2 h-4 justify-center">
                  <Image src={user} width={16} height={16} alt="user" />
                  <span className="gray-500-medium flex items-center">15인</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 pt-8 pb-[80px]">
        {/* 기간반, 회차반 */}
        <div className="w-full h-4 flex justify-end">
          <div className="w-[164px] h-4 flex gap-6">
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
              <span className="text-orange-500 text-[13px] font-bold">회차반</span>
            </div>
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
              <span className="text-primary-500 text-[13px] font-bold">기간반</span>
            </div>
          </div>
        </div>
        {/* 룸 예약표 */}
        <div className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5">
          {roomData.map((data, i) => {
            return (
              <>
                <div
                  key={i}
                  className="xl:w-[51px] lg:w-[45px] md:w-12 w-[49px] text-right gray-800-semibold text-base"
                >
                  {data.time}
                </div>
                <div className="w-full grid grid-cols-4 border border-1 border-gray-100">
                  {data.class.map((classData, i) => {
                    return (
                      <div key={i} className="w-full p-1.5 border border-r border-gray-100">
                        <div className="w-full flex flex-col gap-2 p-[5px] border border-1 rounded border-orange-200 bg-[#FDFCF8]">
                          <div className="flex flex-col gap-1/2 w-full py-5 px-4 rounded bg-[#FFF0E3]">
                            <div className="flex items-center w-full h-4 text-left font-bold text-[13px] text-[#FF5A1F]">
                              {classData.time}
                            </div>
                            <div className="flex items-center w-full h-[15px] text-left font-semibold text-xs text-[#FF8240]">
                              {classData.lessonTime}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1/2">
                            <div className="flex items-center w-full text-left font-bold text-sm text-[#FF7749]">
                              {classData.className}
                            </div>
                            <div className="flex items-center w-full h-[18px] text-left font-semibold text-xs text-[#FF5A1F]">
                              {classData.instructor}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
