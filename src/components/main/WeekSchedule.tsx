'use client'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { dateDataType } from '../datePicker/dayDatePIcker'
import instance from '@/lib/api/axios'

interface IProps {
  dateData: dateDataType
  week: number
}

export default function WeekSchedule({ dateData, week }: IProps) {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [mouseOverId, setMouseOverId] = useState<string>('')

  const handleMouseEnter = (e: any) => {
    setMouseOverId(e.currentTarget.id)
  }

  const handelMouseLeave = (e: any) => {
    setMouseOverId('')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const minusXValue: number = e.currentTarget.getBoundingClientRect().left
    const minusYValue: number = e.currentTarget.getBoundingClientRect().top

    setCursorPosition({
      x: e.clientX - minusXValue + 20,
      y: e.clientY - minusYValue + 20
    })
  }

  const [lessonData, setLessonData] = useState<any>([])

  useEffect(() => {
    instance(`/lessons/${dateData.year}/${dateData.month + 1}`).then(res => {
      const data = res.data.data
      console.log(data)
      let returnData = []
      for (var i = 0; i < data.length; i++) {
        data[i].sort((a: any, b: any) => a.startTime.split(':')[0] - b.startTime.split(':')[0])
      }
      const startDay = new Date(dateData.year, dateData.month, 0).getDay()
      for (var i = 0; i <= startDay; i++) {
        returnData.push({})
      }
      for (var i = 0; i < data.length; i++) {
        returnData.push(data[i])
      }
      console.log(returnData)
      let result: any = []
      for (var i = 0; i < returnData.length; i += 7) {
        result.push(returnData.slice(i, i + 7))
      }

      let resultList: {
        time: string
        classData: {
          index: number
          data: {
            id: string
            lessonTime: number
            name: string
            startTime: string
            type: string
            teacher: string
            studentNum: string
          }[]
        }[]
      }[][] = []

      for (var k = 0; k < result.length; k++) {
        let list: {
          time: string
          classData: {
            index: number
            data: {
              id: string
              lessonTime: number
              name: string
              startTime: string
              type: string
              teacher: string
              studentNum: '5'
            }[]
          }[]
        }[] = []

        for (var i = 0; i < result[k].length; i++) {
          for (var j = 0; j < result[k][i].length; j++) {
            if (list.filter(item => item.time === result[k][i][j].startTime).length === 0) {
              list.push({ time: result[k][i][j].startTime, classData: [] })
            }
            const timeIndex = list.findIndex(item => item.time === result[k][i][j].startTime)
            if (list[timeIndex].classData.filter(item => item.index === i).length !== 0) {
              list[timeIndex].classData[list[timeIndex].classData.length - 1].data.push({
                id: result[k][i][j].id,
                lessonTime: result[k][i][j].lessonTime,
                name: result[k][i][j].name,
                startTime: result[k][i][j].startTime,
                type: result[k][i][j].type,
                teacher: result[k][i][j].teacher,
                studentNum: '5'
              })
            } else {
              list[timeIndex].classData.push({
                index: i,
                data: [
                  {
                    id: result[k][i][j].id,
                    lessonTime: result[k][i][j].lessonTime,
                    name: result[k][i][j].name,
                    startTime: result[k][i][j].startTime,
                    type: result[k][i][j].type,
                    teacher: result[k][i][j].teacher,
                    studentNum: '5'
                  }
                ]
              })
            }
          }
        }
        resultList.push(list)
      }

      for (var i = 0; i < resultList.length; i++) {
        resultList[i].sort(
          (a: { time: string }, b: { time: string }) => Number(a.time.split(':')[0]) - Number(b.time.split(':')[0])
        )
      }

      for (var k = 0; k < resultList.length; k++) {
        for (var i = 0; i < resultList[k].length; i++) {
          for (var j = 0; j < 7; j++) {
            if (resultList[k][i].classData.filter(item => item.index === j).length === 0) {
              resultList[k][i].classData.push({ index: j, data: [] })
            }
          }
          resultList[k][i].classData.sort((a: any, b: any) => a.index - b.index)
        }
      }

      setLessonData(resultList)
    })
  }, [dateData.month])

  return (
    <>
      {/* 회차반 / 기간반 */}
      <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
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
        {/* 시간표 */}
        <div className="flex flex-col w-full">
          {lessonData.length !== 0 &&
            lessonData[week - 1] &&
            lessonData[week - 1].map((data1: any, pI: number) => {
              return (
                <div key={pI} className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5">
                  <div className="w-[50px] text-right gray-800-semibold text-base">
                    {data1.time.split(':')[0]}:{data1.time.split(':')[1]}
                  </div>
                  <div className={`w-full grid grid-cols-7`}>
                    {data1.classData.map((data2: any, cI: number) => {
                      return (
                        <div key={cI} className={`p-[6px] flex flex-col gap-1 outline outline-1 outline-gray-200 `}>
                          {data2.data.map((data: any, i: number) => {
                            return (
                              <div
                                id={`${pI}` + `${cI}` + i.toString()}
                                key={i}
                                className={`relative flex flex-col p-[5px] gap-2 outline outline-1 rounded ${
                                  data.type === 'duration' ? 'outline-primary-200' : 'outline-orange-200'
                                } bg-[#FDFCF8] cursor-pointer`}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handelMouseLeave}
                              >
                                {mouseOverId === `${pI}` + `${cI}` + i.toString() && (
                                  <div
                                    className={`absolute z-10 left-10 top-10 w-[180px] min-h-[160px] p-[5px] flex flex-col gap-2 outline outline-1 ${
                                      data.type === 'duration' ? 'outline-primary-200' : 'outline-orange-200'
                                    } bg-stone-50 rounded`}
                                    style={{
                                      left: `${cursorPosition.x}px`,
                                      top: `${cursorPosition.y}px`
                                    }}
                                  >
                                    <div
                                      className={`flex flex-col gap-[2px] px-1 py-[5px] rounded ${
                                        data.type == 'duration' ? 'bg-primary-600' : 'bg-orange-500'
                                      }`}
                                    >
                                      <span className="h-4 text-white text-[13px] font-bold font-['Pretendard']">
                                        {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                                      </span>
                                      <span
                                        className={`w-full h-[15px] ${
                                          data.type === 'duration' ? 'text-primary-200' : 'text-orange-400'
                                        } text-xs font-semibold font-['Pretendard']`}
                                      >
                                        {data.lessonTime}분
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                      <span
                                        className={`w-full ${
                                          data.type === 'duration' ? 'text-primary-500' : 'text-orange-400'
                                        } text-[14px] font-bold font-['Pretendard']`}
                                      >
                                        {data.name}
                                      </span>
                                      <div className="w-full flex flex-col">
                                        <span
                                          className={`w-full ${
                                            data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                          } text-xs font-bold font-['Pretendard']`}
                                        >
                                          {data.teacher}
                                        </span>
                                        <span
                                          className={`w-full ${
                                            data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                          } text-xs font-bold font-['Pretendard']`}
                                        >
                                          {data.studentNum}명
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div
                                  className={`flex flex-col gap-[2px] px-1 py-[5px] rounded ${
                                    data.type === 'duration' ? 'bg-[#F0EFFF]' : 'bg-[#FFF0E3]'
                                  }`}
                                >
                                  <span
                                    className={`h-4 ${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                    } text-[13px] font-bold`}
                                  >
                                    {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                                  </span>
                                  <span
                                    className={`w-full h-[15px] ${
                                      data.type === 'duration' ? 'text-[#9B81FE]' : 'text-orange-400'
                                    } text-xs font-semibold`}
                                  >
                                    {data.lessonTime}분
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <div
                                    className={`w-full max-h-[42px] overflow-hidden text-ellipsis line-clamp-2 ${
                                      data.type === 'duration' ? 'text-primary-500' : 'text-orange-400'
                                    } text-[14px] font-bold`}
                                  >
                                    {data.name}
                                  </div>
                                  <span
                                    className={`w-full ${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                    } text-xs font-bold`}
                                  >
                                    {data.teacher}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
