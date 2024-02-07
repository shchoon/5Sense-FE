'use client'
import { useState, useRef } from 'react'

export default function MainPageWeek() {
  const classInfo = [
    {
      time: '09:00',
      classData: [
        {
          classTime: {
            checkId: '1',
            time: '10:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '2',
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '3',
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '4',
            time: '10:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {},
        {},
        {
          classTime: {
            checkId: '5',
            time: '10:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '6',
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '7',
            time: '10:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        }
      ]
    },
    {
      time: '11:00',
      classData: [
        {
          periodTime: {
            checkId: '8',
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '9',
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {},
        {},
        {},
        {
          periodTime: {
            checkId: '10',
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '11',
            time: '11:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        }
      ]
    },
    {
      time: '12:00',
      classData: [
        {},
        {
          classTime: {
            checkId: '12',
            time: '12:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '13',
            time: '12:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '14',
            time: '12:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '15',
            time: '12:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '16',
            time: '12:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {},
        {}
      ]
    },
    {
      time: '13:00',
      classData: [
        {
          classTime: {
            checkId: '17',
            time: '13:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '18',
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '19',
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '20',
            time: '13:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {},
        {},
        {
          classTime: {
            checkId: '21',
            time: '13:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '22',
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '23',
            time: '13:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        }
      ]
    },
    {
      time: '14:00',
      classData: [
        {},
        {
          classTime: {
            checkId: '24',
            time: '14:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '25',
            time: '14:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '26',
            time: '14:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '27',
            time: '14:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        },
        {},
        {}
      ]
    },
    {
      time: '15:00',
      classData: [
        {
          classTime: {
            checkId: '28',
            time: '15:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          },
          periodTime: {
            checkId: '29',
            time: '15:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          periodTime: {
            checkId: '30',
            time: '15:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {},
        {},
        {},
        {
          periodTime: {
            checkId: '31',
            time: '15:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담',
            studentNum: '10명'
          }
        },
        {
          classTime: {
            checkId: '32',
            time: '15:00',
            classTime: '90분',
            className:
              '체형 교정 및 이완을 통한 삶의 균형 찾기 / 스트레스로부터 벗어나기',
            teacherName: '조성훈',
            studentNum: '10명'
          }
        }
      ]
    }
  ]

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
    const y = scrollY
    const minusXValue: number = e.currentTarget.getBoundingClientRect().left
    const minusYValue: number = e.currentTarget.getBoundingClientRect().top

    setCursorPosition({
      x: e.clientX - minusXValue + 20,
      y: e.clientY - minusYValue + 20
    })
  }

  return (
    <>
      {/* 회차반 / 기간반 */}
      <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
        <div className="w-full h-4 flex justify-end">
          <div className="w-[164px] h-4 flex gap-6 ">
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
              <span className="text-orange-500 text-[13px] font-bold">
                회차반
              </span>
            </div>
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
              <span className="text-primary-500 text-[13px] font-bold">
                기간반
              </span>
            </div>
          </div>
        </div>
        {/* 시간표 */}
        <div className="flex flex-col w-full">
          {classInfo.map((data1, pI) => {
            return (
              <div
                key={pI}
                className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5"
              >
                <div className="xl:w-[51px] lg:w-[45px] md:w-12 w-[49px] text-right gray-800-semibold text-base">
                  {data1.time}
                </div>
                <div
                  className={`w-full outline outline-1 ${
                    pI === 0 ? 'rounded-t-lg' : null
                  } ${
                    pI === classInfo.length - 1 ? 'rounded-b-lg' : null
                  } outline-gray-200 grid grid-cols-7`}
                >
                  {data1.classData.map((data2, cI) => {
                    return (
                      <div
                        key={cI}
                        className={`p-[6px] flex flex-col gap-1 outline outline-1 outline-gray-200 ${
                          pI == 0 && cI == 0 ? 'rounded-tl-lg' : null
                        } ${
                          pI == 0 && cI == data1.classData.length - 1
                            ? 'rounded-tr-lg'
                            : null
                        } ${
                          pI == classInfo.length - 1 && cI == 0
                            ? 'rounded-bl-lg'
                            : null
                        } ${
                          pI == classInfo.length - 1 &&
                          cI == data1.classData.length - 1
                            ? 'rounded-br-lg'
                            : null
                        }`}
                      >
                        {data2.classTime !== undefined ? (
                          <div
                            id={data2.classTime.checkId}
                            className="relative flex flex-col p-[5px] gap-2 outline outline-1 rounded outline-orange-200 bg-[#FDFCF8] cursor-pointer"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handelMouseLeave}
                          >
                            {mouseOverId === data2.classTime.checkId ? (
                              <div
                                className="absolute z-10 left-10 top-10 w-[180px] p-[5px] flex flex-col gap-2 outline outline-1 outline-orange-200 bg-stone-50 rounded "
                                style={{
                                  left: `${cursorPosition.x}px`,
                                  top: `${cursorPosition.y}px`
                                }}
                              >
                                <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-orange-500">
                                  <span className="h-4 text-white text-[13px] font-bold font-['Pretendard']">
                                    {data2.classTime.time}
                                  </span>
                                  <span className="w-full h-[15px] text-orange-200 text-xs font-semibold font-['Pretendard']">
                                    {data2.classTime.classTime}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <span className="w-full text-orange-400 text-[14px] font-bold font-['Pretendard'] ">
                                    {data2.classTime.className}
                                  </span>
                                  <div className="w-full flex flex-col">
                                    <span className="w-full text-orange-500 text-xs font-bold font-['Pretendard']">
                                      {data2.classTime.teacherName}
                                    </span>
                                    <span className="text-orange-500 text-xs font-semibold font-['Pretendard']">
                                      5명
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#FFF0E3]">
                              <span className="h-4 text-orange-500 text-[13px] font-bold">
                                {data2.classTime.time}
                              </span>
                              <span className="w-full h-[15px] text-orange-400 text-xs font-semibold">
                                {data2.classTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <div className="w-full max-h-[42px] overflow-hidden text-ellipsis line-clamp-2  text-orange-400 text-[14px] font-bold">
                                {data2.classTime.className}
                              </div>
                              <span className="w-full text-orange-500 text-xs font-bold">
                                {data2.classTime.teacherName}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        {data2.periodTime !== undefined ? (
                          <div
                            id={data2.periodTime.checkId}
                            className="relative flex flex-col p-[5px] gap-2 outline outline-1 rounded outline-orange-200 bg-[#FDFCF8] cursor-pointer"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handelMouseLeave}
                          >
                            {mouseOverId === data2.periodTime.checkId ? (
                              <div
                                className="absolute z-10 left-10 top-10 w-[180px] p-[5px] flex flex-col gap-2 outline outline-1 outline-primary-200 bg-stone-50 rounded "
                                style={{
                                  left: `${cursorPosition.x}px`,
                                  top: `${cursorPosition.y}px`
                                }}
                              >
                                <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-primary-600">
                                  <span className="h-4 text-white text-[13px] font-bold font-['Pretendard']">
                                    {data2.periodTime.time}
                                  </span>
                                  <span className="w-full h-[15px] text-primary-200 text-xs font-semibold font-['Pretendard']">
                                    {data2.periodTime.classTime}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <span className="w-full text-primary-500 text-[14px] font-bold font-['Pretendard']">
                                    {data2.periodTime.className}
                                  </span>
                                  <div className="w-full flex flex-col">
                                    <span className="w-full text-primary-600 text-xs font-bold font-['Pretendard']">
                                      {data2.periodTime.teacherName}
                                    </span>
                                    <span className="text-primary-600 text-xs font-semibold font-['Pretendard']">
                                      5명
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#F0EFFF]">
                              <span className="w-full text-primary-600 text-[13px] font-bold font-['Pretendard']">
                                {data2.periodTime.time}
                              </span>
                              <span className="w-full text-[#9B81FE] text-xs font-semibold">
                                {data2.periodTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <span className="w-full text-primary-500 text-sm font-semibold">
                                {data2.periodTime.className}
                              </span>
                              <span className="w-full text-primary-600 text-xs font-bold">
                                {data2.periodTime.teacherName}
                              </span>
                            </div>
                          </div>
                        ) : null}
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
