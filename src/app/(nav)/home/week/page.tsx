'use client'

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

  const classData = [
    {
      time: '09:00',
      classInfo: [
        {
          classTime: {
            time: '10:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          periodTime: {
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '10:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {},
        {},
        {
          classTime: {
            time: '10:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '10:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '10:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        }
      ]
    },
    {
      time: '11:00',
      classInfo: [
        {
          periodTime: {
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          periodTime: {
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {},
        {},
        {},
        {
          periodTime: {
            time: '11:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '11:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        }
      ]
    },
    {
      time: '12:00',
      classInfo: [
        {},
        {
          classTime: {
            time: '12:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {
          periodTime: {
            time: '12:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '12:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '12:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '12:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {},
        {}
      ]
    },
    {
      time: '13:00',
      classInfo: [
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {},
        {},
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        }
      ]
    },
    {
      time: '14:00',
      classInfo: [
        {},
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        },
        {},
        {}
      ]
    },
    {
      time: '15:00',
      classInfo: [
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          },
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {},
        {},
        {},
        {
          periodTime: {
            time: '13:00',
            classTime: '90분',
            className: '반야사요가',
            teacherName: '정은담'
          }
        },
        {
          classTime: {
            time: '13:00',
            classTime: '90분',
            className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
            teacherName: '조성훈'
          }
        }
      ]
    }
  ]

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
                  <div className="text-primary-600 text-center text-sm font-medium font-['Pretendard'] leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-primary-600 text-center text-xl font-bold font-['Pretendard'] leading-[30px]">
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
                  <div className="text-gray-400 text-center text-sm font-medium font-['Pretendard'] leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-gray-400 text-center text-xl font-bold font-['Pretendard'] leading-[30px]">
                    {date.date}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>

      {/* 시간표 회차/기간 */}
      <div className=" mx-auto xl:max-w-[1016px] lg:max-w-[936px]  flex flex-col items-end gap-4">
        <div className="w-[164px] h-4 flex gap-6 ">
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
            <span className="text-orange-500 text-[13px] font-bold font-['Pretendard'] leading-none">
              회차반
            </span>
          </div>
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
            <span className="text-primary-500 text-[13px] font-bold font-['Pretendard'] leading-none">
              기간반
            </span>
          </div>
        </div>
        {/* 시간표 */}
        <div className="flex flex-col w-full">
          {classData.map((data, i) => {
            return (
              <div
                key={i}
                className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5"
              >
                <div className="xl:w-[51px] lg:w-[45px] md:w-12 w-[49px] text-right text-gray-800 text-base font-semibold font-['Pretendard'] leading-normal">
                  {data.time}
                </div>
                <div className="xl:w-[945px] lg:w-[875px] md:w-[770px] w-[609px] outline outline-1 outline-gray-100 grid grid-cols-7">
                  {/* 1 */}
                  {data.classInfo.map((classData, i) => {
                    return (
                      <div key={i} className="p-[6px] flex flex-col gap-1 ">
                        {classData.classTime !== undefined ? (
                          <div className="flex flex-col p-[5px] gap-2 outline outline-1 rounded outline-orange-200 bg-[#FDFCF8]">
                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#FFF0E3]">
                              <span className=" text-orange-500 text-[13px] font-bold font-['Pretendard'] leading-none">
                                {classData.classTime.time}
                              </span>
                              <span className="w-full text-orange-400 text-xs font-semibold font-['Pretendard'] leading-[15px]">
                                {classData.classTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <div className="w-full max-h-[42px] overflow-hidden text-ellipsis line-clamp-2  text-orange-400 text-[14px] font-bold font-['Pretendard'] leading-[21px]">
                                {classData.classTime.className}
                              </div>
                              <span className="w-full text-orange-500 text-xs font-bold font-['Pretendard'] leading-[18px]">
                                {classData.classTime.teacherName}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        {classData.periodTime !== undefined ? (
                          <div className="flex flex-col p-[5px] gap-2 outline outline-1 rounded outline-primary-200 bg-primary-50">
                            <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-primary-100">
                              <span className="w-full text-primary-600 text-[13px] font-bold font-['Pretendard'] leading-none">
                                {classData.periodTime.time}
                              </span>
                              <span className="w-full text-[#9B81FE] text-xs font-semibold font-['Pretendard'] leading-[15px]">
                                {classData.periodTime.classTime}
                              </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                              <span className="w-full text-primary-500 text-sm font-semibold font-['Pretendard'] leading-[21px]">
                                {classData.periodTime.className}
                              </span>
                              <span className="w-full text-primary-600 text-xs font-bold font-['Pretendard'] leading-[18px]">
                                {classData.periodTime.teacherName}
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
