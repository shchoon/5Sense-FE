'use client'
import { useState, useRef } from 'react'

export default function MainPageWeek() {
  const dateData: { day: string; date: number }[] = [
    {
      day: '일요일',
      date: 5
    },
    {
      day: '월요일',
      date: 6
    },
    {
      day: '화요일',
      date: 7
    },
    {
      day: '수요일',
      date: 8
    },
    {
      day: '목요일',
      date: 9
    },
    {
      day: '금요일',
      date: 10
    },
    {
      day: '토요일',
      date: 11
    }
  ]

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
    //console.log(e.currentTarget.id)
    setMouseOverId(e.currentTarget.id)
    console.log(mouseOverId)
  }

  const handelMouseLeave = (e: any) => {
    setMouseOverId('')
    console.log(mouseOverId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    //console.log(e.currentTarget)
    const y = scrollY
    //console.log(y)
    const minusXValue: number = e.currentTarget.getBoundingClientRect().left
    const minusYValue: number = e.currentTarget.getBoundingClientRect().top
    //console.log(e.currentTarget.getBoundingClientRect())
    //console.log(curserRef.current?.offsetParent)
    //console.log(curserRef.current?.offsetTop)
    //console.log(e.pageX, e.pageY)
    //const { clientX, clientY } = e

    //setCursorPosition({ x: e.clientX - 409, y: e.clientY - 381 })
    setCursorPosition({
      x: e.clientX - minusXValue + 20,
      y: e.clientY - minusYValue + 20
    })
    //console.log(cursorPosition)
  }

  //console.log(classData[1].classTime === undefined)

  return (
    <div className="w-full h-full mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
      {/* 요일 선택 탭 */}
      <div className="w-full flex justify-end pb-6">
        <div className="w-[51px] xl:mr-5 lg:mr-4"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dateData.map((date, i) => {
            if (i == 3) {
              return (
                <div
                  key={i}
                  className="xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col  border rounded-lg border-primary-600 bg-white"
                >
                  <div className="text-primary-600 text-center text-sm font-medium   leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-primary-600 text-center text-xl font-bold   leading-[30px]">
                    {date.date}
                  </div>
                </div>
              )
            } else {
              return (
                <div
                  key={i}
                  className="xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col  border rounded-lg border-gray=-200 bg-white"
                >
                  <div className="text-gray-400 text-center text-sm font-medium   leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-gray-400 text-center text-xl font-bold   leading-[30px]">
                    {date.date}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>

      {/* 회차반 / 기간반 */}
      <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
        <div className="w-full h-4 flex justify-end">
          <div className="w-[164px] h-4 flex gap-6 ">
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
              <span className="text-orange-500 text-[13px] font-bold   leading-none">
                회차반
              </span>
            </div>
            <div className="w-[70px] h-full flex gap-2 items-center justify-end">
              <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
              <span className="text-primary-500 text-[13px] font-bold   leading-none">
                기간반
              </span>
            </div>
          </div>
        </div>
        {/* 시간표 */}
        <div className="flex flex-col w-full">
          {classInfo.map((data1, pI) => {
            /* 시간 */
            return (
              <div
                key={pI}
                className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5"
              >
                <div className="xl:w-[51px] lg:w-[45px] md:w-12 w-[49px] text-right text-gray-800 text-base font-semibold   leading-normal">
                  {data1.time}
                </div>
                <div
                  className={` xl:w-[945px] lg:w-[875px] md:w-[770px] w-[609px] outline outline-1 ${
                    pI === 0 ? 'rounded-t-lg' : null
                  } ${
                    pI === classInfo.length - 1 ? 'rounded-b-lg' : null
                  } outline-gray-200 grid grid-cols-7`}
                >
                  {data1.classData.map((data2, cI) => {
                    /* 시간표 */
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
                                  <span className="h-4 text-white text-[13px] font-bold font-['Pretendard'] leading-none">
                                    {data2.classTime.time}
                                  </span>
                                  <span className="w-full h-[15px] text-orange-200 text-xs font-semibold font-['Pretendard'] leading-[15px]">
                                    {data2.classTime.classTime}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <span className="w-full text-orange-400 text-[14px] font-bold font-['Pretendard'] ">
                                    {data2.classTime.className}
                                  </span>
                                  <div className="w-full flex flex-col">
                                    <span className="w-full text-orange-500 text-xs font-bold font-['Pretendard'] leading-[21px]">
                                      {data2.classTime.teacherName}
                                    </span>
                                    <span className="text-orange-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                                      5명
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#FFF0E3]">
                              <span className="h-4 text-orange-500 text-[13px] font-bold   leading-none">
                                {data2.classTime.time}
                              </span>
                              <span className="w-full h-[15px] text-orange-400 text-xs font-semibold   leading-[15px]">
                                {data2.classTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <div className="w-full max-h-[42px] overflow-hidden text-ellipsis line-clamp-2  text-orange-400 text-[14px] font-bold   leading-[21px]">
                                {data2.classTime.className}
                              </div>
                              <span className="w-full text-orange-500 text-xs font-bold   leading-[18px]">
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
                                  <span className="h-4 text-white text-[13px] font-bold font-['Pretendard'] leading-none">
                                    {data2.periodTime.time}
                                  </span>
                                  <span className="w-full h-[15px] text-primary-200 text-xs font-semibold font-['Pretendard'] leading-[15px]">
                                    {data2.periodTime.classTime}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <span className="w-full text-primary-500 text-[14px] font-bold font-['Pretendard'] ">
                                    {data2.periodTime.className}
                                  </span>
                                  <div className="w-full flex flex-col">
                                    <span className="w-full text-primary-600 text-xs font-bold font-['Pretendard'] leading-[21px]">
                                      {data2.periodTime.teacherName}
                                    </span>
                                    <span className="text-primary-600 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                                      5명
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#F0EFFF]">
                              <span className="w-full text-primary-600 text-[13px] font-bold font-['Pretendard'] leading-none">
                                {data2.periodTime.time}
                              </span>
                              <span className="w-full text-[#9B81FE] text-xs font-semibold   leading-[15px]">
                                {data2.periodTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <span className="w-full text-primary-500 text-sm font-semibold   leading-[21px]">
                                {data2.periodTime.className}
                              </span>
                              <span className="w-full text-primary-600 text-xs font-bold   leading-[18px]">
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
    </div>
  )
}
