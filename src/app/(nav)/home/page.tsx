'use client'
import { useEffect, useRef, useState } from 'react'

export default function MainPageDay() {
  const date = new Date()
  const currentHour = date.getHours()
  const classData = [
    {
      time: '09:00',
      class: [
        {
          classType: 'preiod',
          hour: '9',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조성훈',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '9',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'preiod',
          hour: '9',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '3호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '9',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '정은담',
          roomNum: '4호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '11:00',
      class: [
        {
          classType: 'preiod',
          hour: '11',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '윤태식',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '12:00',
      class: [
        {
          classType: 'preiod',
          hour: '12',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조성훈',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '13:00',
      class: [
        {
          classType: 'preiod',
          hour: '13',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '13',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '14:00',
      class: [
        {
          classType: 'preiod',
          hour: '14',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '14',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },

    {
      time: '17:00',
      class: [
        {
          classType: 'preiod',
          hour: '17',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '17',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '18:00',
      class: [
        {
          classType: 'preiod',
          hour: '18',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '18',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '19:00',
      class: [
        {
          classType: 'preiod',
          hour: '19',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '19',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },

    {
      time: '21:00',
      class: [
        {
          classType: 'preiod',
          hour: '21',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '21',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '22:00',
      class: [
        {
          classType: 'preiod',
          hour: '22',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '22',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '23:00',
      class: [
        {
          classType: 'preiod',
          hour: '23',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          classType: 'time',
          hour: '23',
          bgColorOn: 'bg-orange-500',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    }
  ]

  useEffect(() => {
    let currentTimeClassIndex = classData.findIndex(
      data => data.time.split(':')[0] == String(currentHour)
    )

    if (currentTimeClassIndex == -1) {
      for (var i = 0; i < classData.length; i++) {
        if (classData[i].time.split(':')[0] > String(currentHour)) {
          currentTimeClassIndex = i
          break
        }
      }
    }
    let targetRef = document.getElementById(`ref${currentTimeClassIndex}`)
    let position = targetRef?.offsetTop
    const classSchedule = document.getElementById('classSchedule')
    classSchedule?.scrollTo(0, Number(position))
  }, [])

  return (
    <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
      {/* 회차반 / 기간반 */}
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
      {/* 일 시간표 */}
      <div
        id="classSchedule"
        className="relative flex flex-col gap-7 w-full max-h-[800px] p-2 overflow-y-auto"
      >
        {classData.map((data, i) => {
          if (true) {
            return (
              <div
                key={i}
                className="w-full flex xl:gap-[60px] md:gap-12 gap-6"
              >
                {/* 시간 */}
                <div className="flex w-[77px] h-6 gap-5 items-center">
                  <div
                    className={`w-[51px] text-right ${
                      currentHour === Number(data.time.split(':')[0])
                        ? 'text-indigo-500'
                        : 'text-black'
                    }  text-base font-semibold font-['Pretendard']`}
                  >
                    {data.time}
                  </div>
                  <div className="w-1.5 h-1.5 bg-primary-600"></div>
                </div>
                <div
                  id={`ref${i}`}
                  className="w-full flex flex-col p-4 gap-[7px] outline outline-1 rounded-lg outline-gray-200"
                >
                  {data.class.map((data, i) => {
                    return (
                      <div key={i} className="flex gap-4 h-[45px]">
                        <div
                          className={`w-[3px] h-full rounded ${
                            currentHour === Number(data.hour)
                              ? data.bgColorOn
                              : data.bgColorOff
                          }`}
                        ></div>
                        <div className="flex flex-col w-full h-full">
                          <div className="flex gap-[6px]">
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              {data.teacherName}
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              ·
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium`}
                            >
                              {data.roomNum}
                            </div>
                          </div>
                          <div
                            className={`${
                              currentHour === Number(data.hour)
                                ? data.textColorOn
                                : data.textColorOff
                            }  text-base font-semibold font-['Pretendard'] truncate`}
                          >
                            {data.className}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
