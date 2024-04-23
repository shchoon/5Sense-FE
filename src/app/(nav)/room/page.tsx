'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { useWindowSize } from '@/hooks/useWindowSize'
import DayDatePicker from '@/components/datePicker/dayDatePIcker'
import CalendarIcon from '../../../../public/assets/icons/calendar'
import { dateDataType } from '@/components/datePicker/dayDatePIcker'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { modalState } from '@/lib/state/modal'
import DeleteModal from '@/components/modal/DeleteModal'
import PlusCircleIcon from '../../../../public/assets/icons/plus-circle'
import Modal from '@/components/common/modal'
import { centerInfoState } from '@/lib/state/centerInfoState'
import instance from '@/lib/api/axios'

import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'
import UserIcon from 'public/assets/icons/user_icon.svg'
import ScheduleIcon from 'public/assets/icons/schedule.svg'
import DotsIcon from 'public/assets/icons/dotsVertical.svg'
import ModifyIcon from 'public/assets/icons/modify.svg'
import DeleteIcon from 'public/assets/icons/trash.svg'

export default function Room() {
  const { width, height } = useWindowSize()
  const centerInfo = useRecoilValue(centerInfoState)
  const router = useRouter()
  const optionRef = useRef<HTMLButtonElement>(null)
  const whitePlusCircleProps = {
    width: '20',
    height: '20',
    color: '#FFF'
  }
  const grayPlusCircleProps = {
    width: '24',
    height: '24',
    color: '#9CA3AF'
  }
  const modal = useRecoilValue(modalState) // 상태의 값을 가져옴
  const setModal = useSetRecoilState(modalState)

  const [roomListNum, setRoomListNum] = useState<number>(0)
  const [room, setRoom] = useState<any>([])
  const [timeList, setTimeList] = useState<{ time: string }[]>([])
  const currentDate = new Date()
  const [dateData, setDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })

  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)
  const [roomOption, setRoomOption] = useState<{
    isClicked: boolean
    id: undefined | number
    roomId: number
  }>({
    isClicked: false,
    id: undefined,
    roomId: 0
  })
  const createTimeList = () => {
    const openTime: string = centerInfo.open
    const closeTime: string = centerInfo.close

    let timeList = [{ time: openTime }]
    let time: string = openTime

    while (time !== closeTime) {
      let hour: number = Number(time.split(':')[0])
      let min: string = time.split(':')[1]
      if (Number(min) + 30 === 60) {
        hour = hour + 1
        min = '00'
      } else {
        min = '30'
      }

      time = String(hour).length === 1 ? '0' + String(hour) + ':' + min : String(hour) + ':' + min
      timeList.push({ time: time })
    }

    return timeList
  }

  const onClickOutsideOfOption = (e: any) => {
    if (roomOption.isClicked && !optionRef.current?.contains(e.target)) {
      console.log('outside')
      setRoomOption(prev => ({
        ...prev,
        isClicked: false,
        id: undefined
      }))
    }
  }

  //useOnClickOutside(optionRef, onClickOutsideOfOption)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  const moveForwardDay = () => {
    setIsClickedDatePicker(false)
    const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month + 1, 0)
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (dateData.date === lastDateOfCurrentMonth) {
      if (dateData.month === 11) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 0,
          date: 1
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1,
          date: 1
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date + 1
      })
    }
  }

  const moveBackDay = () => {
    setIsClickedDatePicker(false)
    const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()

    if (dateData.date === 1) {
      if (dateData.month === 0) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 11,
          date: 31
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month - 1,
          date: lastDateOfLastMonth
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date - 1
      })
    }
  }

  const onChangeDateDataFromChild = (data: dateDataType) => {
    setDateData({
      ...dateData,
      year: data.year,
      month: data.month,
      date: data.date
    })
    setIsClickedDatePicker(false)
  }

  useEffect(() => {
    if (!modal) {
      if (roomOption.isClicked) {
        setRoomOption({
          isClicked: false,
          id: undefined,
          roomId: 0
        })
      }
      setTimeList(createTimeList())
      instance('lesson-rooms/daily', {
        params: {
          date: new Date(dateData.year, dateData.month, dateData.date).toISOString()
        }
      }).then(res => {
        const list = res.data.data
        for (var i = 0; i < list.length; i++) {
          const test: any = []
          const keys = Object.keys(list[i].workTime)
          for (var j = 0; j < keys.length; j++) {
            const key = keys[j]
            let value = list[i].workTime[key]
            value.time = key
            test.push(value)
          }
          list[i].workTime = test
          list[i].index = i
        }

        list[0].workTime[3] = {
          id: 1,
          type: 'session',
          name: '체형 교정 및 삶의 균형을 통한 이완 찾기',
          lessonTime: 90,
          teacher: '조성훈',
          time: '10:30',
          capacity: 5,
          studentCount: 3,
          isOpenForBooking: false
        }

        list[0].workTime[8] = {
          id: 1,
          type: 'duration',
          name: '반야사 요가',
          lessonTime: 60,
          teacher: '윤태식',
          time: '13:00',
          isOpenForBooking: false
        }

        /* for (var i = 0; i < 7; i++) {
        list.push({})
      } */
        if (list.length >= 4) {
          const pushedCount: number = 4 - (list.length % 4)
          for (var i = 0; i < pushedCount; i++) {
            list.push({})
          }
          const result = []
          for (var i = 0; i < list.length; i += 4) {
            result.push([...list.slice(i, i + 4)])
          }
          setRoom(result)
        } else if (list.length < 4) {
          const pushedCount: number = 4 - list.length
          for (var i = 0; i < pushedCount; i++) {
            list.push({})
          }
          setRoom([list])
        }
      })
    }
  }, [dateData, modal])

  console.log(room)
  console.log(roomOption)

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full black-bold text-3xl font-['Pretendard']">강의실 관리</div>
        </div>
        <Link href={'/room/addRoom'} className="flex btn-purple-test gap-2">
          <PlusCircleIcon {...whitePlusCircleProps} />
          <div className="text-sm font-semibold">강의실 추가</div>
        </Link>
      </div>
      {/* 캘린더 */}
      <div
        className={`flex items-center mx-auto ${
          width > 950 ? 'w-[420px]' : 'w-[312px]'
        }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD] mb-[32px]`}
      >
        <div
          className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
          onClick={moveBackDay}
        >
          <ChevronLeftIcon width={24} height={24} />
        </div>
        <div
          className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base font-['Pretendard'] hover:text-primary-600 cursor-pointer"
          onClick={onClickDatePickerHandler}
        >
          <CalendarIcon width="18" height="18" color="#6B7280" />
          {dateData.year}년 {dateData.month + 1}월 {dateData.date}일
        </div>
        <div
          className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
          onClick={moveForwardDay}
        >
          <ChevronRightIcon width={24} height={24} />
        </div>
      </div>
      {isClickedDatePicker && (
        <div className="absolute w-[283px] z-10 right-0 left-0 mx-auto top-[180px]">
          <DayDatePicker changeParentsDateData={onChangeDateDataFromChild} parentsDateData={dateData} />
        </div>
      )}

      {/* 룸 리스트 */}
      <div className="relative w-full pl-[84px]">
        {roomListNum !== 0 && (
          <span
            className="absolute z-10 w-6 h-6 left-[72px] top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full cursor-pointer"
            onClick={() => {
              if (roomListNum === 0) {
                return
              } else {
                setRoomListNum(roomListNum - 1)
              }
            }}
          >
            <ChevronLeftIcon width={16} height={16} alt="chevronLeft" />
          </span>
        )}
        {roomListNum !== room.length - 1 && (
          <span
            className="absolute z-10 w-6 h-6 -right-3 top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full cursor-pointer"
            onClick={() => {
              if (roomListNum === room.length - 1) {
                return
              } else {
                setRoomListNum(roomListNum + 1)
              }
            }}
          >
            <ChevronRightIcon width={16} height={16} alt="chevronRight" />
          </span>
        )}

        <div className="w-full grid grid-cols-4 gap-2">
          {room.length !== 0 &&
            room[roomListNum].map((data, i) => {
              return (
                <div
                  key={i}
                  className={`relative w-full flex flex-col gap-1.5 justify-center text-center h-[80px] border rounded-lg ${
                    data !== undefined ? 'border-gray-300' : 'border-gray-100 bg-primary-50'
                  }  py-2 px-3`}
                >
                  {Object.keys(data).length !== 0 ? (
                    <>
                      <div className="w-full gray-900-semibold">{data.name} </div>
                      <div className="flex gap-1/2 h-4 justify-center">
                        <UserIcon width={16} height={16} alt="user" />
                        <span className="gray-500-medium flex items-center">{data.capacity} 인</span>
                      </div>
                      <button
                        ref={optionRef}
                        className={`absolute right-3 top-3 w-8 h-8 p-1 rounded-full hover:bg-gray-100 ${
                          roomOption && 'focus:bg-gray-100'
                        } `}
                        onClick={() => {
                          if (roomOption.id === i && roomOption) {
                            setRoomOption(prev => ({
                              ...prev,
                              isClicked: false,
                              id: undefined,
                              roomId: 0
                            }))
                          }
                          if (roomOption.id !== i) {
                            setRoomOption(prev => ({
                              ...prev,
                              isClicked: true,
                              id: data.index,
                              roomId: data.id
                            }))
                          }
                        }}
                      >
                        <DotsIcon width={24} height={24} alt="dots" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full h-full flex justify-center items-center"
                      onClick={() => router.push('/room/addRoom')}
                    >
                      <PlusCircleIcon {...grayPlusCircleProps} />
                    </button>
                  )}
                  {/* 룸 옵션 모달 */}
                  {roomOption.isClicked && roomOption.id === i && (
                    <div className="absolute right-2 bg-white top-[45px] w-[140px] p-1 flex flex-col gap-1/2 border border-1 border-primary-600 rounded-md shadow-[0_2px_5px_0_rgba(0, 0, 0, 0.12)]">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-2 py-1"
                        onClick={() => {
                          localStorage.setItem('roomName', data.name)
                          localStorage.setItem('roomId', data.id)
                          localStorage.setItem('capacity', data.capacity)
                          router.push('/room/modifyRoom/' + `${data.name}`)
                        }}
                      >
                        <div className="w-[98px] gray-500-medium text-sm">수정하기</div>
                        <ModifyIcon width={16} height={16} alt="modify" />
                      </button>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-2 py-1"
                        onClick={() => {
                          setModal(true)
                        }}
                      >
                        <div className="w-[98px] gray-500-medium text-sm">삭제하기</div>
                        <DeleteIcon className="text-gray-400" width={16} height={16} alt="modify" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 pt-8 pb-[80px]">
        {/* 기간반, 회차반 */}
        <div className="w-full h-4 flex justify-end">
          <div className="w-[164px] h-4 flex gap-6">
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
        {/* 룸 예약표 */}
        <div className="w-full flex gap-6">
          <div className="flex flex-col">
            {timeList.length !== 0 &&
              timeList.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="w-[60px] 2xl:h-[162px] lg:h-[183px] h-[180px] text-right gray-800-semibold text-base"
                  >
                    {data.time}
                  </div>
                )
              })}
          </div>

          <div className="w-full grid grid-cols-4">
            {room.length !== 0 &&
              room[roomListNum].map((data: any, i: number) => {
                return (
                  <div key={i} className="w-full flex flex-col">
                    {data.workTime &&
                      data.workTime.map((data: any, i: number) => {
                        const lessonTime = data.lessonTime
                        let height: string = ''
                        if (lessonTime / 30 > 1) {
                          const multipleValue = lessonTime / 30
                          if (width >= 1441) {
                            const value = 162 * multipleValue
                            height = `h-[${value}px]`
                          }
                        }

                        return (
                          <div
                            key={i}
                            className={`w-full ${
                              lessonTime > 30 && data.type === 'session'
                                ? 'h-[486px]'
                                : '2xl:h-[162px] lg:h-[183px] h-[180px]'
                            } p-1.5 border border-1 border-gray-200 flex items-center justify-center`}
                          >
                            {data.id !== null ? (
                              <div
                                className={`relative w-full h-full p-1.5 ${
                                  data.type === 'session'
                                    ? 'bg-primary-50 border-primary-200'
                                    : 'bg-secondary-50 border-secondary-200'
                                } border rounded border-1 `}
                              >
                                <div className="w-full h-full flex flex-col gap-1.5">
                                  <div
                                    className={`w-full p-1.5 flex gap-1.5 ${
                                      data.type === 'session' ? 'bg-primary-100' : 'bg-secondary-100'
                                    } items-center`}
                                  >
                                    <div
                                      className={`${
                                        data.type === 'session' ? 'text-primary-600' : 'text-secondary-600'
                                      } text-sm font-bold`}
                                    >
                                      {data.time}
                                    </div>
                                    <div
                                      className={`${
                                        data.type === 'session' ? 'text-primary-600' : 'text-secondary-400'
                                      } text-xs font-semibold`}
                                    >
                                      {data.lessonTime}분
                                    </div>
                                  </div>
                                  <div className="w-full h-full flex flex-col gap-2">
                                    <div
                                      className={`w-full ${
                                        data.type === 'session' ? 'text-primary-400' : 'text-secondary-400'
                                      } text-sm font-bold`}
                                    >
                                      {data.name}
                                    </div>
                                    <div className="w-full flex flex-col">
                                      <div
                                        className={`w-full text-left ${
                                          data.type === 'session' ? 'text-primary-600' : 'text-secondary-600'
                                        } text-xs font-medium`}
                                      >
                                        담당 강사 : {data.teacher}
                                      </div>
                                      {data.type === 'session' && (
                                        <div className="w-full text-left text-primary-600 text-xs font-medium">
                                          회원 수 : {data.studentCount}/{data.capacity}
                                        </div>
                                      )}
                                    </div>
                                    {data.type === 'session' && (
                                      <button
                                        className="absolute right-1.5 bottom-1.5 lg:w-[75px] lg:h-[39px] w-[68px] h-[36px] flex items-center px-3 py-2 bg-white border rounded-lg border-1 border-gray-200
                                    gray-800-semibold lg:text-sm text-xs text-center"
                                        //onClick={() => router.push('/room/reservation')}
                                      >
                                        예약하기
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="lg:w-[75px] lg:h-[39px] w-[68px] h-[36px] flex items-center px-3 py-2 border rounded-lg border-1 border-gray-200
                             gray-800-semibold lg:text-sm text-xs"
                                //onClick={() => router.push('/room/reservation')}
                              >
                                예약하기
                              </button>
                            )}
                          </div>
                        )
                      })}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {modal && (
        <Modal small>
          <DeleteModal onClose={() => setModal(false)} roomId={roomOption.roomId} />
        </Modal>
      )}
    </div>
  )
}
