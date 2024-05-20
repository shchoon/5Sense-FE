'use client'
import { useState, useEffect } from 'react'

import instance from '@/lib/api/axios'
import { dateDataType } from '../common/calendar/datePicker/dayDatePIcker'

interface getLessonDataType {
  id: number
  type: string
  name: string
  lessonTime: number
  memo: string
  startTime: string
  teacher: string
  numberOfStudents: number
  room: string
}

// 메인에서 스케줄 받아오고 저장해서 모달에서도 햄버거 버튼때도 사용해야함
export default function TodaySchedule() {
  const currentDate = new Date()
  const currentDateData: dateDataType = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  }
  const [todayLessonData, setTodayLessonData] = useState<{ startTime: string; endTime: string; className: string }[][]>(
    []
  )
  const [pageData, setPageData] = useState<{ wholePage: undefined | number; currentPage: number }>({
    wholePage: undefined,
    currentPage: 0
  })

  useEffect(() => {
    instance(`/lessons/${currentDateData.year}/${currentDateData.month}`).then(res => {
      const classData: getLessonDataType[] = res.data.data[currentDateData.date - 1]
      setPageData(prev => ({
        ...prev,
        wholePage: Math.ceil(classData.length / 5)
      }))
      let list = []
      classData.sort((a, b) => Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0]))
      for (var i = 0; i < classData.length; i++) {
        let hour, min
        if (classData[i].lessonTime % 60 === 0) {
          hour = Number(classData[i].startTime.split(':')[0]) + Math.floor(classData[i].lessonTime / 60)
          min = classData[i].startTime.split(':')[1]
        } else {
          if (Number(classData[i].startTime.split(':')[1]) === 30) {
            hour = Number(classData[i].startTime.split(':')[0]) + Math.floor(classData[i].lessonTime / 60) + 1
            min = '00'
          } else {
            hour = Number(classData[i].startTime.split(':')[0]) + Math.floor(classData[i].lessonTime / 60)
            min = '30'
          }
        }

        list.push({
          startTime: classData[i].startTime.slice(0, 6),
          endTime: String(hour) + ':' + String(min),
          className: classData[i].name
        })
      }
      let result = []
      for (var i = 0; i < list.length; i += 5) {
        result.push(list.slice(i, i + 5))
      }
      setTodayLessonData(result)
    })
  }, [])
  return (
    <>
      {todayLessonData.length !== 0 && (
        <div className="flex flex-col w-full lg:w-[248px] gap-3">
          <div className="today flex w-fit h-[29px] items-center box-border px-2 py-1 gap-[6px] bg-primary-100 rounded">
            <span className="bold-500 text-sm leading-[21px]">TODAY</span>
            <span className="medium-500 text-sm leading-[21px]">
              {currentDateData.year}/{currentDateData.month}/{currentDateData.date}
            </span>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            {todayLessonData.length !== 0 &&
              todayLessonData[pageData.currentPage].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="before:inline-block before:w-[6px] before:h-[6px] before:rounded-full before:bg-primary-500 before:mr-2">
                    <span className="text-gray-500 text-xs font-semibold   leading-[18px]">{item.startTime}</span>
                    <span className="text-gray-500 text-xs font-semibold   leading-[18px] before:content-['-'] before:px-1">
                      {item.endTime}
                    </span>
                  </div>
                  <div className="pl-4 mr-0 text-['#1F2A37'] text-[13px] font-semibold   leading-tight">
                    {item.className}
                  </div>
                </div>
              ))}
          </div>
          <div className="relative w-full top-1 text-center text-gray-700 text-xs font-medium   leading-3">
            <span
              className="absolute left-2.5 cursor-pointer"
              onClick={() => {
                if (pageData.currentPage === 0) {
                  return
                } else {
                  setPageData(prev => ({
                    ...prev,
                    currentPage: prev.currentPage - 1
                  }))
                }
              }}
            >
              &lt;
            </span>
            {pageData.currentPage + 1} / {pageData.wholePage}
            <span
              className="absolute right-2.5 cursor-pointer"
              onClick={() => {
                if (pageData.currentPage + 1 === todayLessonData.length) {
                  return
                } else {
                  setPageData(prev => ({
                    ...prev,
                    currentPage: prev.currentPage + 1
                  }))
                }
              }}
            >
              &gt;
            </span>
          </div>
        </div>
      )}
    </>
  )
}
