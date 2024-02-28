'use client'
import { useEffect, useRef, useState } from 'react'
import instance from '@/lib/api/axios'
import { dateDataType } from '../datePicker/dayDatePicker'

interface IProps {
  dateData: dateDataType
}

interface getClassDataType {
  id: string
  type: string
  name: string
  startTime: string
  teacher: string
  lessonTime: number
}

export default function DaySchedule({ dateData }: IProps) {
  const date = new Date()
  const currentHour = date.getHours()

  const [lessonData, setLessonData] = useState<any>([])
  useEffect(() => {
    instance(`/lessons/${dateData.year}/${dateData.month + 1}`).then(res => {
      const data = res.data.data
      for (var i = 0; i < data.length; i++) {
        data[i].sort(
          (a: getClassDataType, b: getClassDataType) =>
            Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0])
        )
      }
      let returnData = []
      for (var i = 0; i < data.length; i++) {
        let list: { startTime: string; data: { teacher: string; room: string; name: string; type: string }[] }[] = []
        for (var j = 0; j < data[i].length; j++) {
          if (list.length !== 0 && list.findIndex(listData => listData.startTime === data[i][j].startTime) !== -1) {
            const index = list.findIndex(listData => listData.startTime === data[i][j].startTime)
            list[index].data.push({
              teacher: data[i][j].teacher,
              room: '1호실',
              name: data[i][j].name,
              type: data[i][j].type
            })
          } else {
            list.push({
              startTime: data[i][j].startTime,
              data: [
                {
                  teacher: data[i][j].teacher,
                  room: '1호실',
                  name: data[i][j].name,
                  type: data[i][j].type
                }
              ]
            })
          }
        }
        returnData.push(list)
      }
      setLessonData(returnData)
    })
  }, [dateData.month])

  /* useEffect(() => {
    if (lessonData.length !== 0) {
      let currentTimeClassIndex = lessonData[dateData.date - 1].findIndex(
        data => data.startTime.split(':')[0] == String(currentHour)
      )

      if (currentTimeClassIndex == -1) {
        for (var i = 0; i < lessonData[dateData.date - 1].length; i++) {
          if (lessonData[dateData.date - 1][i].startTime.split(':')[0] > String(currentHour)) {
            currentTimeClassIndex = i
            break
          }
        }
      }
      let targetRef = document.getElementById(`ref${currentTimeClassIndex}`)
      console.log(targetRef)
      let position = targetRef?.offsetTop
      const classSchedule = document.getElementById('classSchedule')
      classSchedule?.scrollTo(0, Number(position))
    }
  }, []) */

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
      {/* 일 시간표 */}
      <div id="classSchedule" className="relative flex flex-col gap-7 w-full max-h-[800px] p-2 overflow-y-auto">
        {lessonData.length !== 0 &&
          lessonData[dateData.date - 1].map((data: any, i: number) => {
            const startTime = data.startTime.split(':')[0]
            return (
              <div key={i} className="w-full flex xl:gap-[60px] md:gap-12 gap-6">
                <div className="flex w-[77px] h-6 gap-5 items-center">
                  <div
                    className={`w-[51px] text-right ${
                      currentHour === Number(data.startTime.split(':')[0]) ? 'text-indigo-500' : 'text-black'
                    }  text-base font-semibold font-['Pretendard']`}
                  >
                    {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                  </div>
                  <div className="w-1.5 h-1.5 bg-primary-600"></div>
                </div>
                <div
                  id={`ref${i}`}
                  className="w-full flex flex-col p-4 gap-[7px] outline outline-1 rounded-lg outline-gray-200"
                >
                  {data.data.map((data: { teacher: string; room: string; name: string; type: string }, i: number) => {
                    return (
                      <div key={i} className="flex gap-4 h-[45px]">
                        <div
                          className={`w-[3px] h-full rounded ${
                            currentHour === Number(startTime)
                              ? data.type === 'duration'
                                ? 'bg-primary-600'
                                : 'bg-orange-500'
                              : 'bg-gray-200'
                          }`}
                        ></div>
                        <div className="flex flex-col w-full h-full">
                          <div className="flex gap-[6px]">
                            <div
                              className={`${
                                currentHour === Number(startTime) ? 'text-gray-800' : 'text-gray-400'
                              }  text-sm font-medium`}
                            >
                              {data.teacher}
                            </div>
                            <div
                              className={`${
                                currentHour === Number(startTime) ? 'text-gray-800' : 'text-gray-400'
                              }  text-sm font-medium`}
                            >
                              ·
                            </div>
                            <div
                              className={`${
                                currentHour === Number(startTime) ? 'text-gray-800' : 'text-gray-400'
                              }  text-sm font-medium`}
                            >
                              1호실
                            </div>
                          </div>
                          <div
                            className={`${
                              currentHour === Number(startTime) ? 'text-gray-800' : 'text-gray-400'
                            }  text-base font-semibold font-['Pretendard'] truncate`}
                          >
                            {data.name}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* {data.class.map((data, i) => {
                    return (
                      <div key={i} className="flex gap-4 h-[45px]">
                        <div
                          className={`w-[3px] h-full rounded ${
                            currentHour === Number(data.hour) ? data.bgColorOn : data.bgColorOff
                          }`}
                        ></div>
                        <div className="flex flex-col w-full h-full">
                          <div className="flex gap-[6px]">
                            <div
                              className={`${
                                currentHour === Number(data.hour) ? data.textColorOn : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              {data.teacherName}
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour) ? data.textColorOn : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              ·
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour) ? data.textColorOn : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              {data.roomNum}
                            </div>
                          </div>
                          <div
                            className={`${
                              currentHour === Number(data.hour) ? data.textColorOn : data.textColorOff
                            }  text-base font-semibold font-['Pretendard'] truncate`}
                          >
                            {data.className}
                          </div>
                        </div>
                      </div>
                    )
                  })} */}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
