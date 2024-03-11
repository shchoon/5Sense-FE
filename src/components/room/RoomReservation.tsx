'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

import LessonTimeModal from '../modal/LessonTimeModal'
import DayDatePicker from '../datePicker/dayDatePicker'
import ClockIcon from '../../../public/assets/icons/clock'
import CalendarIcon from '../../../public/assets/icons/calendar'

import searchIconWhite from 'public/assets/icons/search_white.svg'
import user from 'public/assets/icons/user.svg'
import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'
import chevronLeft from 'public/assets/icons/chevron/chevron-left.svg'
import { dateDataType } from '../datePicker/dayDatePicker'

interface RoomDataType {
  id: number
  name: string
  personNum: number
  list: {
    openTimeList: string[]
    roomClickList: string[]
  }
}

export default function RoomReservation() {
  const currentDate = new Date()
  const [dateData, setDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [dateValue, setDateValue] = useState<string>('날짜')

  const setDateDataFromChild = (data: dateDataType) => {
    console.log(data)
    setDateData({
      ...dateData,
      year: data.year,
      month: data.month,
      date: data.date
    })
    setDateValue(`${data.year}.${data.month + 1}.${data.date}`)

    setIsClickedTab(prev => ({
      ...prev,
      date: false
    }))
  }

  const [lessonTime, setLessonTime] = useState<string | number>('시간')

  const handleChangeLessonTimeFromChild = (time: number) => {
    setLessonTime(time)
    setIsClickedTab(prev => ({
      ...prev,
      time: false
    }))
  }

  const [isClickedTab, setIsClickedTab] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  })

  const handleClickTab = (type: string) => {
    if (type === 'date') {
      setIsClickedTab(prev => ({
        ...prev,
        date: !prev.date,
        time: false
      }))
    } else {
      setIsClickedTab(prev => ({
        ...prev,
        date: false,
        time: !prev.time
      }))
    }
  }

  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: undefined | number
    clickedTime: undefined | number
  }>({
    roomId: undefined,
    clickedTime: undefined
  })

  const refs = useRef<(HTMLDivElement | null)[]>([])
  const openTimeList: string[] = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22'
  ]
  const roomClickList: string[] = []
  for (var i = 0; i < openTimeList.length * 2; i++) {
    roomClickList.push('')
  }

  const roomData: RoomDataType[] = [
    {
      id: 1,
      name: 'A룸',
      personNum: 15,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 2,
      name: 'B룸',
      personNum: 10,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 3,
      name: 'C룸',
      personNum: 20,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 4,
      name: 'D룸',
      personNum: 5,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    }
  ]

  const scrollRight = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft += 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  const scrollLeft = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft -= 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  return (
    <>
      <div className="relative w-full flex flex-col gap-4">
        <div className="w-full text-left gray-900-semibold text-base">예약 가능한 강의실 찾기</div>
        <div
          className={`w-full h-[68px] flex items-center justify-between ${
            isClickedTab.date || isClickedTab.time
              ? isClickedTab.date
                ? 'pl-2.5 bg-[#F8FAFD]'
                : 'pl-6 bg-[#F8FAFD]'
              : 'pl-6'
          } pr-2.5 py-2.5 rounded-full border border-1 border-gray-300`}
        >
          <button
            className={`${
              isClickedTab.date
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full'
                : 'w-[218.5px] h-full'
            }  flex gap-2 bg-white`}
            onClick={() => handleClickTab('date')}
          >
            <div className="w-[18px] mt-1/2 flex items-start">
              <CalendarIcon width="18" height="18" color={isClickedTab.date ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">날짜</div>
              <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">{dateValue}</div>
            </div>
          </button>
          {!isClickedTab.date && !isClickedTab.time && <div className="w-px h-7 bg-gray-300"></div>}

          <button
            className={`${
              isClickedTab.time
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full bg-white'
                : 'w-[218.5px] h-full'
            } flex gap-2 `}
            onClick={() => handleClickTab('time')}
          >
            <div className="w-[18px] mt-1/2 flex items-start">
              <ClockIcon width="18" height="18" color={isClickedTab.time ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">소요시간</div>
              <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">{lessonTime}</div>
            </div>
          </button>
          <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
            <Image src={searchIconWhite} width={20} height={20} alt="search" />
          </div>
        </div>
        <div className="absolute z-10 left-3 top-[120px]">
          {isClickedTab.date && (
            <DayDatePicker parentsDateData={dateData} changeParentsDateData={setDateDataFromChild} />
          )}
        </div>
        <div className="absolute z-10 right-14 top-[120px]">
          {isClickedTab.time && <LessonTimeModal handleChangeLessonTimeFromChild={handleChangeLessonTimeFromChild} />}
        </div>
      </div>
      {/* 일정 선택 문구 */}
      {/* <div className="w-full h-[422px] border border-1 border-gray-200 rounded-lg flex items-center">
          <div className="w-full text-center font-semibold text-base text-gray-400">
            일정을 선택해주시면 예약가능 리스트를 볼 수 있습니다.
          </div>
        </div> */}
      {/* 일정 선택 */}
      <div className="w-full mb-[60px] p-6 flex flex-col gap-6 border border-1 border-gray-200 rounded-lg">
        {/* 예약 설명 */}
        <div className="w-full h-4 flex gap-5 justify-end">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className="w-4 h-full bg-white rounded border border-1 border-gray-200" />
              <div className="h-full gray-600-normal text-[13px]">예약 가능</div>
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-full bg-gray-100 rounded border border-1 border-gray-200" />
              <div className="h-full gray-600-normal text-[13px]">예약 불가</div>
            </div>
          </div>
          <div className="w-px h-full bg-gray-300" />
          <div className="flex gap-2">
            <div className="w-4 h-full bg-primary-300 rounded" />
            <div className="flex gap-1.5">
              <div className="h-full gray-600-normal text-[13px]">내 예약</div>
              <div className="h-full gray-600-normal text-[13px]">90 / 120(분)</div>
            </div>
          </div>
        </div>
        {/* 룸 선택*/}
        <div className="w-full flex flex-col gap-10">
          {roomData.map((data, i) => {
            const roomId = data.id
            const timeRange: number | undefined = typeof lessonTime === 'number' ? lessonTime / 30 : undefined
            return (
              <div key={i} className="relative flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="gray-900-semibold text-xl flex items-center">{data.name}</div>
                    <div className="flex gap-0.5">
                      <Image src={user} width={16} height={16} alt="user" />
                      <div className="gray-500-normal text-sm flex items-center">{data.personNum}인</div>
                    </div>
                  </div>
                  <button className="w-[73px] h-[37px] border border-1 border-primary-600 rounded-lg flex items-center justify-center text-sm text-primary-600 font-normal">
                    예약하기
                  </button>
                </div>
                <button
                  className="absolute z-10 -left-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                  onClick={() => {
                    scrollLeft(i)
                  }}
                >
                  <Image className="z-10" src={chevronLeft} width={16} height={16} alt="chevronLeft" />
                </button>
                <button
                  className="absolute z-10 -right-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                  onClick={() => {
                    scrollRight(i)
                  }}
                >
                  <Image className="z-10" src={chevronRight} width={16} height={16} alt="chevronRight" />
                </button>
                <div
                  ref={el => (refs.current[i] = el)}
                  className="w-full grid grid-flow-col overflow-y-auto scrollbar-hide"
                >
                  <div className="w-full flex flex-col">
                    <div className="w-full flex">
                      {data.list.openTimeList.map((time, i) => {
                        return (
                          <div key={i} className={`w-[54px] flex flex-col`}>
                            <div
                              className={`relative w-full flex flex-col h-[42px] py-[11px] ${
                                i === 0 ? 'border border-1' : 'border-y border-r'
                              }  border-gray-200 flex items-center justify-center gray-800-medium text-[13px]`}
                            >
                              {time}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="w-full flex">
                      {data.list.roomClickList.map((data, i) => {
                        return (
                          <button
                            key={i}
                            className={`w-[27px] ${
                              clickedRoomData.roomId === roomId &&
                              clickedRoomData.clickedTime !== undefined &&
                              timeRange !== undefined &&
                              clickedRoomData.clickedTime <= i &&
                              i <= clickedRoomData.clickedTime + timeRange - 1 &&
                              'bg-primary-300'
                            }`}
                            onClick={() => {
                              if (timeRange === undefined) {
                                return
                              } else {
                                setClickedRoomData(prev => ({
                                  ...prev,
                                  roomId: roomId,
                                  clickedTime: i
                                }))
                              }
                            }}
                          >
                            <div className={`w-full h-9 ${i === 0 && 'border-l'} border-r border-b  border-gray-200`} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
