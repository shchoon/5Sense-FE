'use client'
import { useState, useRef, useEffect } from 'react'

import { MonthDateType } from '@/lib/state/calendar/MonthCalendarDateState'
import instance from '@/lib/api/axios'

interface IProps {
  dateData: MonthDateType
}

export default function MonthSchedule({ dateData }: IProps) {
  const currentDay = new Date().getDate()
  const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']

  const [classData, setClassData] = useState<{ day?: number; duration?: number; session?: number }[]>([])

  useEffect(() => {
    const startDay = new Date(dateData.year, dateData.month, 0).getDay()
    instance(`/lessons/${dateData.year}/${dateData.month + 1}`).then(res => {
      const data = res.data.data
      let returnData = []
      for (var i = 0; i <= startDay; i++) {
        returnData.push({})
      }
      for (var i = 0; i < data.length; i++) {
        let day = i + 1
        let duration = data[i].filter((data: any) => data.type == 'duration').length
        let session = data[i].length - duration
        returnData.push({
          day: day,
          duration: duration,
          session: session
        })
      }
      setClassData(returnData)
    })
  }, [dateData.month])

  return (
    <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
      {/* 회차반 / 기간반 */}
      <div className="w-full h-4 flex justify-end">
        <div className="w-[164px] h-4 flex gap-6 ">
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
      {/* 월 시간표 */}
      <div className="w-full flex flex-col outline outline-1 outline-gray-200 rounded-md">
        <div className="w-full h-[43px] grid grid-cols-7">
          {dayOfTheWeek.map((day, i) => {
            return (
              <div
                key={i}
                className="w-full h-[43px] px-[10px] py-3 flex items-center outline outline-1 outline-gray-200"
              >
                <span className=" gray-500-medium text-base">{day}</span>
              </div>
            )
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {classData.map((data, i) => {
            return (
              <div
                key={i}
                className="w-full h-[180px] px-[10px] pt-[10px] pb-3 flex flex-col justify-between outline outline-1 outline-gray-200"
              >
                {currentDay === data.day ? (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-600 text-white text-lg font-medium">
                    {data.day}
                  </div>
                ) : (
                  <div className="w-7 h-[21px] flex items-center justify-center gray-500-medium text-lg">
                    {data.day}
                  </div>
                )}
                {data.day && (
                  <div className="w-full h-[62px] flex flex-col gap-1.5 border border-1 border-primary-200">
                    <div className={`w-full flex gap-1 h-7 px-2 py-[6px]`}>
                      <div className={`w-[14px] h-[14px] bg-primary-500 rounded`}></div>
                      <div className={`flex-1 text-right text-indigo-500 text-[13px] font-bold`}>{data.duration}개</div>
                    </div>
                    <div className={`w-full flex gap-1 h-7 px-2 py-[6px]`}>
                      <div className={`w-[14px] h-[14px] bg-orange-500  rounded`}></div>
                      <div className={`flex-1 text-right text-orange-500 text-[13px] font-bold`}>{data.session}개</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
