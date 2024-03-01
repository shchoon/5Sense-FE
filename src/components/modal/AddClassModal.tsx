'use client'
import Image from 'next/image'

import DropDown from '../common/DropDown'
import LessonTimeModal from './LessonTimeModal'

import closeCircle from 'public/assets/icons/closeCircle.svg'
import calendar from 'public/assets/icons/calendar.svg'
import searchIconWhite from 'public/assets/icons/search_white.svg'
import clock from 'public/assets/icons/clock.svg'
import user from 'public/assets/icons/user.svg'
import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'
import chevronLeft from 'public/assets/icons/chevron/chevron-left.svg'

import { useRef, useState } from 'react'

export default function AddClassModal() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const openTimeList = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
  const roomData = [
    {
      name: 'A룸',
      personNum: 15,
      timeList: openTimeList
    },
    {
      name: 'B룸',
      personNum: 10,
      timeList: openTimeList
    },
    {
      name: 'C룸',
      personNum: 20,
      timeList: openTimeList
    },
    {
      name: 'D룸',
      personNum: 5,
      timeList: openTimeList
    }
  ]

  const dropDownProps = {
    title: '클래스를 선택해주세요',
    list: ['반냐사 요가', '무적 필라테스', '스트레칭', 'PT'],
    type: 'withdrawl'
  }

  const [isClickedTab, setIsClickedTab] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  })

  const [isPaid, setIsPaid] = useState<boolean>(false)

  const handleClickPayment = () => {
    setIsPaid(prev => !prev)
  }

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
  console.log(refs)

  return (
    <div className="absolute left-10 top-10 w-[768px] border border-1 border-gray-200 rounded-xl bg-white">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 text-2xl gray-900-bold">클래스 추가</div>
        <Image className="absolute left-[717px] top-4" src={closeCircle} width={35} height={35} alt="closeCircle" />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-10">
        {/* 회차/기간반 버튼 */}
        <div className="w-full flex">
          <div className="w-full p-6 flex">
            <button className="w-full h-10 py-2 rounded-md text-gray-500 font-semibold text-base">기간반</button>
          </div>
          <div className="w-full p-6 flex">
            <button className="w-full h-10 py-2 rounded-md bg-primary-600 text-white font-semibold text-base">
              회차반
            </button>
          </div>
        </div>
        {/* 클래스 선택 */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full text-left gray-900-semibold text-base">클래스 선택</div>
          <DropDown {...dropDownProps} />
          <div className="w-full h-[69px] flex justify-between items-center px-6 py-[18px] bg-[#F8FAFD]">
            <div className="w-[100px] h-[21px] flex items-center justify-center gray-900-semibold text-sm">
              결제 상태
            </div>
            <div className="h-5 flex items-center gap-2">
              <div className="w-[50px] gray-700-medium">미결제</div>
              <button
                className={`relative w-10 h-5 flex items-center rounded-full ${
                  isPaid ? 'bg-primary-600' : 'bg-gray-200'
                } `}
                onClick={() => handleClickPayment()}
              >
                <span className={`absolute ${isPaid ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white`}></span>
              </button>
              <div className="w-[65px] gray-700-medium">결제완료</div>
            </div>
          </div>
        </div>
        {/* 강의실 예약 */}
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
                  ? 'w-[325.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full'
                  : 'w-[282.5px] h-full'
              }  flex gap-2 bg-white`}
              onClick={() => handleClickTab('date')}
            >
              <div className="w-[18px] mt-1/2 flex items-start">
                <Image src={calendar} width={18} height={18} alt="calender" />
              </div>
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-full text-left text-gray-700 font-medium text-sm">날짜</div>
                <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">날짜</div>
              </div>
            </button>
            {!isClickedTab.date && !isClickedTab.time && <div className="w-px h-7 bg-gray-300"></div>}

            <button
              className={`${
                isClickedTab.time
                  ? 'w-[318.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full bg-white'
                  : 'w-[282.5px] h-full'
              } flex gap-2 `}
              onClick={() => handleClickTab('time')}
            >
              <div className="w-[18px] mt-1/2 flex items-start">
                <Image src={clock} width={18} height={18} alt="clock" />
              </div>
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-full text-left text-gray-700 font-medium text-sm">소요시간</div>
                <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">시간</div>
              </div>
            </button>
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
              <Image src={searchIconWhite} width={20} height={20} alt="search" />
            </div>
          </div>
          {isClickedTab.time && <LessonTimeModal />}
        </div>
        {/* 일정 선택 문구 */}
        {/* <div className="w-full h-[422px] border border-1 border-gray-200 rounded-lg flex items-center">
          <div className="w-full text-center font-semibold text-base text-gray-400">
            일정을 선택해주시면 예약가능 리스트를 볼 수 있습니다.
          </div>
        </div> */}
        {/* 일정 선택 */}
        <div className="w-full p-6 flex flex-col gap-6 border border-1 border-gray-200 rounded-lg">
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
              return (
                <div className="relative flex flex-col gap-4">
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
                    className="w-full mr-[50px] grid grid-flow-col overflow-y-auto scrollbar-hide"
                  >
                    {data.timeList.map((time, i) => {
                      return (
                        <div className={`w-[54px] flex flex-col`}>
                          <div
                            className={`relative w-full flex flex-col h-[42px] py-[11px] ${
                              i === 0 ? 'border border-1' : 'border-y border-r'
                            }  border-gray-200 flex items-center justify-center gray-800-medium text-[13px]`}
                          >
                            {time}
                          </div>
                          <div className="w-full flex">
                            <div className={`w-full h-9 ${i === 0 && 'border-l'} border-r border-b  border-gray-200`} />
                            <div className="w-full h-9 border-b border-r border-gray-200" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
