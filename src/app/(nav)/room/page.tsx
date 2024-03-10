'use client'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import DayDatePicker from '@/components/datePicker/dayDatePicker'

import chevronLeft from 'public/assets/icons/chevron/chevron-left.svg'
import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'
import calender from 'public/assets/icons/calendar.svg'
import user from 'public/assets/icons/user_icon.svg'
import ImgPlusCircle from 'public/assets/icons/plus-circle.svg'
import calendar from 'public/assets/icons/calendar-white.svg'
import { dateDataType } from '@/components/datePicker/dayDatePicker'

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

  const timeData = [
    { time: '9:00' },
    { time: '9:30' },
    { time: '10:00' },
    { time: '10:30' },
    { time: '11:00' },
    { time: '11:30' },
    { time: '12:00' }
  ]
  const roomData = [
    {
      roomName: 'A',
      resetvation: [
        {
          time: '09:00',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '09:30',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:00',
          lesseonTime: 90,
          className: '반야사 요가',
          teacher: '윤태식',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:30',
          lesseonTime: 90,
          className: '바른 자세 찾기',
          teacher: '엄세리',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
        },
        {
          time: '11:30',
          lesseonTime: 90,
          className: '필라테스',
          teacher: '조성훈',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
        }
      ]
    },
    {
      roomName: 'A',
      resetvation: [
        {
          time: '09:00',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '09:30',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:00',
          lesseonTime: 90,
          className: '반야사 요가',
          teacher: '윤태식',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:30',
          lesseonTime: 90,
          className: '바른 자세 찾기',
          teacher: '엄세리',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
        },
        {
          time: '11:30',
          lesseonTime: 90,
          className: '필라테스',
          teacher: '조성훈',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
        }
      ]
    },
    {
      roomName: 'A',
      resetvation: [
        {
          time: '',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '09:30',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:00',
          lesseonTime: 90,
          className: '반야사 요가',
          teacher: '윤태식',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:30',
          lesseonTime: 90,
          className: '바른 자세 찾기',
          teacher: '엄세리',
          studentNum: 5,
          limit: 10
        },
        {
          time: '11:00',
          lesseonTime: 60,
          className: '바른 자세 찾기',
          teacher: '조성훈',
          studentNum: 3,
          limit: 5
        },
        {
          time: '11:30',
          lesseonTime: 90,
          className: '필라테스',
          teacher: '조성훈',
          studentNum: 5,
          limit: 10
        },
        {
          time: '12:00',
          lesseonTime: 90,
          className: '반야사 요가',
          teacher: '윤태식',
          studentNum: 7,
          limit: 15
        }
      ]
    },
    {
      roomName: 'A',
      resetvation: [
        {
          time: '09:00',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '09:30',
          lesseonTime: 90,
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
          teacher: '김솔지',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:00',
          lesseonTime: 90,
          className: '반야사 요가',
          teacher: '윤태식',
          studentNum: 5,
          limit: 10
        },
        {
          time: '10:30',
          lesseonTime: 90,
          className: '바른 자세 찾기',
          teacher: '엄세리',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
        },
        {
          time: '11:30',
          lesseonTime: 90,
          className: '필라테스',
          teacher: '조성훈',
          studentNum: 5,
          limit: 10
        },
        {
          time: '',
          lesseonTime: undefined,
          className: '',
          teacher: '',
          studentNum: undefined,
          limit: undefined
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

  const onChangeDateDataFromChild = (data: dateDataType) => {
    setDateData({
      ...dateData,
      year: data.year,
      month: data.month,
      date: data.date
    })
    setIsClickedDatePicker(false)
  }
  console.log(dateData)
  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full black-bold text-3xl font-['Pretendard']">강의실 관리</div>
        </div>
        <div className="w-[300px] h-[41px] flex rounded-lg bg-primary-600">
          <Link
            href={'/room/schedule'}
            className="flex gap-2 w-full px-5 py-2.5 border border-r rounded-r-none border-r-primary-700 btn-purple"
          >
            <Image src={calendar} width={20} height={20} alt="calendar" />
            <div className="text-white text-sm font-semibold">일정 찾기</div>
          </Link>
          <Link href={'/room/addRoom'} className="flex items-center w-full gap-2 px-5 py-2.5 btn-purple">
            <Image src={ImgPlusCircle} width={20} height={20} alt="plusCircle" />
            <div className="text-white text-sm font-semibold">강의실 추가</div>
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
      {isClickedDatePicker && (
        <div className="absolute w-[283px] z-10 right-0 left-0 mx-auto top-[180px]">
          <DayDatePicker changeParentsDateData={onChangeDateDataFromChild} parentsDateData={dateData} />
        </div>
      )}

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
        <div className="w-full flex gap-6">
          <div className="flex flex-col">
            {timeData.map((data, i) => {
              return (
                <div key={i} className="w-[60px] h-[162px] text-right gray-800-semibold text-base">
                  {data.time}
                </div>
              )
            })}
          </div>

          <div className="w-full grid grid-cols-4">
            {roomData.map((data, i) => {
              return (
                <div key={i} className="w-full flex flex-col">
                  {data.resetvation.map((data, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full h-[210px] p-1.5 border border-1 border-gray-200 flex items-center justify-center"
                      >
                        {data.time !== '' ? (
                          <div className="w-full h-full p-1.5 bg-secondary-50 border rounded border-1 border-secondary-200">
                            <div className="w-full h-full flex flex-col gap-1.5">
                              <div className="w-full p-1.5 flex gap-1.5 bg-secondary-100 items-center">
                                <div className="text-secondary-600 text-sm font-bold">{data.time}</div>
                                <div className="text-secondary-400 text-xs font-semibold">{data.lesseonTime}분</div>
                              </div>
                              <div className="w-full h-full flex flex-col gap-2">
                                <div className="w-full text-secondary-400 text-sm font-bold">{data.className}</div>
                                <div className="w-full flex flex-col">
                                  <div className="w-full text-left text-secondary-600 text-xs font-medium">
                                    담당 강사 : {data.teacher}
                                  </div>
                                  <div className="w-full text-left text-secondary-600 text-xs font-medium">
                                    회원 수 : {data.studentNum}/{data.limit}
                                  </div>
                                </div>
                                <div className="w-full flex justify-end ">
                                  <button
                                    className="w-[85px] h-[37px] flex items-center px-3 py-2 border rounded-lg border-1 border-gray-200
           gray-800-semibold text-sm"
                                  >
                                    예약하기
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="w-[85px] h-[37px] flex items-center px-3 py-2 border rounded-lg border-1 border-gray-200
           gray-800-semibold text-sm"
                          >
                            예약하기
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* <div className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5">
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
        </div> */}
      </div>
    </div>
  )
}
