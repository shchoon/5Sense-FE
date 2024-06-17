'use client'
import { useState, useRef, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { MonthDateType } from '@/lib/state/calendar/MonthCalendarDateState'
import instance from '@/lib/api/axios'
import FormatDayData from './DataFormatter/FormatDayData'
import { MonthDetailClassState } from '@/lib/state/monthDetailClassState'

interface IProps {
  dateData: MonthDateType
}

export default function MonthSchedule({ dateData }: IProps) {
  const currentDay = new Date().getDate()
  const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']

  const setClassDetails = useSetRecoilState(MonthDetailClassState)

  const [classData, setClassData] = useState<any>([])
  useEffect(() => {
    const startDay = new Date(dateData.year, dateData.month, 0).getDay()
    instance(`/lessons/${dateData.year}/${dateData.month + 1}`).then(res => {
      const data = res.data.data
      let returnData = []
      for (var i = 0; i <= startDay; i++) {
        returnData.push({day: null})
      }
      /* for (var i = 0; i < data.length; i++) {
        let day = i + 1
        const sortedData = data[i].sort(
          (a: any, b: any) => Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0])
        )
        const filterData = []
        if(sortedData.length !== 0) {
          filterData.push(sortedData[0])
          for (var j = 1; j < sortedData.length; j++) {
            const target = filterData[filterData.length - 1]
            if (target.id !== sortedData[j].id || target.startTime !== sortedData[j].startTime) {
              filterData.push(sortedData[j])
            }
          }
          let duration = filterData.filter((data: any) => data.type == 'duration').length
        let session = filterData.length - duration
        returnData.push({
          day: day,
          duration: duration,
          session: session
        })
        } else {
        returnData.push({
          day: day,
          duration: 0,
          session: 0
        })
        }
        
      } */
     const formatData = FormatDayData(data)
     console.log(formatData)
      setClassData([...returnData, ...FormatDayData(data)])
    })
  }, [dateData.month])

  console.log(classData)

  return (
    <div className="w-full flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8">
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
                <span className="h-[19px] gray-500-medium text-base">{day}</span>
              </div>
            )
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {classData.map((data: any, i: number) => {
            const startDay = new Date(dateData.year, dateData.month, 0).getDay()
            let day = 0
            if(data.day === undefined){
              day = i + - startDay
            }
            let durations = 0
            let sessions = 0
            if(data.length !== 0) {
              for(var i=0; i<data.length; i++){
                const numOfDurations = data[i].data.filter(el => el.type === 'duration').length
                const numofSessions = data[i].data.length - numOfDurations
                durations += numOfDurations
                sessions += numofSessions
              }
              /* durations =  data.filter(el => el.data.type === 'duration').length
              sessions = data.length - durations */
            }
            return (
              <div
                key={i}
                className="w-full h-[180px] px-[10px] pt-[10px] pb-3 flex flex-col justify-between outline outline-1 outline-gray-200"
                onClick={() => {
                  setClassDetails(data)
                }}
              >
                {currentDay === day ? (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-600 text-white text-lg font-medium">
                    {day}
                  </div>
                ) : (
                  <div className="w-7 h-[21px] flex items-center justify-center gray-500-medium text-lg">
                    {day}
                  </div>
                )}
                {day !== 0 && (
                  <div className="w-full h-14 flex flex-col border border-1 border-primary-200">
                    <div className={`w-full flex items-center gap-1 h-7 px-2 py-[6px]`}>
                      <div className={`w-[14px] h-[14px] bg-primary-500 rounded`}></div>
                      <div className={`flex-1 text-right text-primary-600 text-[13px] font-bold`}>{durations}개</div>
                    </div>
                    <div className={`w-full flex gap-1 h-7 px-2 py-[6px]`}>
                      <div className={`w-[14px] h-[14px] bg-secondary-500  rounded`}></div>
                      <div className={`flex-1 text-right text-secondary-600 text-[13px] font-bold`}>{sessions}개</div>
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
