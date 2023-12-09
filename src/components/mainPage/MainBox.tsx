'use client'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import graph from '../../assets/images/graph.svg'
import calender from '../../assets/icons/calendar.svg'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import DateTab from './DateSlideTab'
import DayDateTab from './DayDateTab'
import WeekDateTab from './WeekDateTab'
import MonthDateTab from './MonthDateTab'

export default function MainBox() {
  const { width, height } = useWindowSize()
  const router = useRouter()
  const currentUrl = usePathname()
  const currentPath = currentUrl.split('/')[2]
  const incomeData = [
    {
      rounded: 'rounded-l-xl',
      title: '지난달 수입',
      income: '1,252,181,153원',
      statstics: [
        {
          bg_color: 'bg-[#563AC0]',
          percentage: '40%',
          className: '소도구 필라테스'
        },
        {
          bg_color: 'bg-primary-600',
          percentage: '40%',
          className: '플라잉 요가'
        },
        {
          bg_color: 'bg-[#9B81FE]',
          percentage: '15%',
          className:
            '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      rounded: 'rounded-r-xl',
      title: '이번달 수입',
      income: '1,252,181,153원',
      statstics: [
        {
          bg_color: 'bg-[#563AC0]',
          percentage: '40%',
          className: '소도구 필라테스'
        },
        {
          bg_color: 'bg-primary-600',
          percentage: '40%',
          className: '플라잉 요가'
        },
        {
          bg_color: 'bg-[#9B81FE]',
          percentage: '15%',
          className:
            '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    }
  ]

  const studentNum = [
    {
      bg_color: 'bg-[#563AC0]',
      percentage: '30%',
      className: '요가'
    },
    {
      bg_color: 'bg-primary-600',
      percentage: '20%',
      className: '필라테스'
    },
    {
      bg_color: 'bg-[#9B81FE]',
      percentage: '15%',
      className:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      bg_color: 'bg-primary-200',
      percentage: '10%',
      className: '기타'
    },
    {
      bg_color: 'bg-gray-200',
      percentage: '10%',
      className: '미수강'
    }
  ]

  let [cor, setCor] = useState({ cor_x: 0, cor_y: 0 })
  let [onMouse, setOnMouse] = useState(false)
  //const classRefs = studentNum.map(() => useRef<HTMLDivElement>(null))
  //const classRef0 = useRef<HTMLDivElement>(null)
  //const classRef4 = useRef<HTMLDivElement>(null)

  return (
    <>
      {width > 1180 ? (
        <div className="w-full flex items-start gap-6 ">
          <div className="w-full h-[247px] flex outline outline-1 rounded-xl  outline-gray-200 ">
            {incomeData.map((data, i) => {
              return (
                <div
                  key={i}
                  className={`w-1/2 p-6 flex flex-col gap-5 outline outline-1 ${data.rounded} outline-gray-200 h-full`}
                >
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-gray-600 text-base font-semibold   leading-normal">
                      {data.title}
                    </div>
                    <span className="w-full h-[33px] text-black text-[28px] font-bold  ">
                      {data.income}
                    </span>
                  </div>
                  <div className="w-full h-[114px] flex items-end gap-6 ">
                    <div className="flex w-full flex-col gap-[6px]">
                      {data.statstics.map((data, i) => {
                        return (
                          <div
                            key={i}
                            className="w-full flex gap-1 items-center"
                          >
                            <span
                              className={`w-3 h-[9px] rounded-[3px] ${data.bg_color}`}
                            ></span>
                            <span className="w-8 h-[18px] text-gray-800 text-xs font-bold  ">
                              {data.percentage}
                            </span>
                            <span className="text-gray-400 flex-1 w-1 min-w-8 truncate h-[18px] text-xs font-medium   ">
                              {data.className}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <Image src={graph} width={110} height={110} alt="" />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="h-[247px] w-full flex flex-col gap-5 p-6 2xl:max-w-[416px] xl:max-w-[296px] lg:max-w-[300px] outline outline-1 rounded-xl outline-gray-200">
            <div className="w-full flex flex-col gap-2 ">
              <div className="text-gray-600 text-base font-semibold   leading-normal">
                전체 등록 학생 수
              </div>
              <div className="w-full h-[33px] text-black text-[28px] font-bold  ">
                513명
              </div>
            </div>
            <div className="w-full h-[114px] flex items-end gap-6">
              <div className="flex w-full flex-col gap-[6px]">
                {studentNum.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="flex w-full h-[18px] gap-1 items-center"
                    >
                      <span
                        className={`w-3 min-w-3 h-[9px] rounded-[3px] ${data.bg_color}`}
                      ></span>
                      <div className="w-8 h-[18px] text-gray-800 text-xs font-bold   ">
                        40%
                      </div>
                      <div className="text-gray-400 h-[18px] max-w-[182px] flex-1 w-1 truncate text-xs font-medium   ">
                        {data.className}
                      </div>
                    </div>
                  )
                })}
              </div>
              <Image src={graph} width={110} height={110} alt="" />
            </div>
          </div>
        </div>
      ) : null}
      {width <= 1180 ? (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex outline outline-1 rounded-xl  outline-gray-200">
            {incomeData.map((data, i) => {
              return (
                <div
                  key={i}
                  className={`w-1/2 p-6 flex flex-col gap-5 outline outline-1 ${data.rounded} outline-gray-200 h-full`}
                >
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-gray-600 text-base font-semibold   leading-normal">
                      {data.title}
                    </div>
                    <span className="w-full h-[33px] text-black text-[28px] font-bold  ">
                      {data.income}
                    </span>
                  </div>
                  <div className="w-full h-[114px] flex items-end gap-6">
                    <div className="flex w-full flex-col gap-[6px]">
                      {data.statstics.map((data, i) => {
                        return (
                          <div
                            key={i}
                            className="w-full flex gap-1 items-center"
                          >
                            <span
                              className={`w-3 h-[9px] rounded-[3px] ${data.bg_color}`}
                            ></span>
                            <span className="w-8 h-[18px] text-gray-800 text-xs font-bold  ">
                              {data.percentage}
                            </span>
                            <span className="text-gray-400 flex-1 w-1 truncate h-[18px] text-xs font-medium   ">
                              {data.className}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <Image src={graph} width={110} height={110} alt="" />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full flex flex-col outline outline-1 rounded-xl  outline-gray-200 p-6 gap-5">
            <div className="w-full flex flex-col gap-2 ">
              <div className="text-gray-600 text-base font-semibold   leading-normal">
                전체 등록 학생 수
              </div>
              <div className="w-full h-[33px] text-black text-[28px] font-bold  ">
                513명
              </div>
            </div>
            <div className="w-full h-[114px] flex items-end gap-6">
              <div className="flex w-full flex-col gap-[6px]">
                {studentNum.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="flex w-full h-[18px] gap-1 items-center"
                    >
                      <span
                        className={`w-3 min-w-3 h-[9px] rounded-[3px] ${data.bg_color}`}
                      ></span>
                      <div className="w-8 h-[18px] text-gray-800 text-xs font-bold   ">
                        40%
                      </div>
                      <div className="text-gray-400 h-[18px] max-w-[182px] flex-1 w-1 truncate text-xs font-medium   ">
                        {data.className}
                      </div>
                    </div>
                  )
                })}
              </div>
              <Image src={graph} width={110} height={110} alt="" />
            </div>
          </div>
        </div>
      ) : null}

      {/* 날짜 & 주,일,월 탭 950px 이상*/}
      {currentPath == undefined ? <DayDateTab /> : null}
      {currentPath == 'day' ? <DayDateTab /> : null}
      {currentPath == 'week' ? <WeekDateTab /> : null}
      {currentPath == 'month' ? <MonthDateTab /> : null}
    </>
  )
}
