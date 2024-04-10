'use client'
import { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import LessonTimeModal from '../modal/RoundLessonTimeModal'

import { durationScheduleState } from '@/lib/state/classDurationSchedule'
import { lessonTimeState } from '@/lib/state/lessonTime'
import { modalState } from '@/lib/state/modal'
import CalendarIcon from '../../../public/assets/icons/calendar'
import ClockIcon from '../../../public/assets/icons/clock'
import RoomReservationCheck from '../check/RoomReservationCheck'
import Modal from '../common/modal'
import DayDatePicker, { dateDataType } from '../datePicker/dayDatePicker'
import PeriodDatePicker from '../datePicker/periodDatePicker'
import PeriodLessonTimeModal from '../modal/PeriodLessonTimeModal'

import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'
import SearchIcon from 'public/assets/icons/search_white.svg'
import UserIcon from 'public/assets/icons/user.svg'

interface RoomDataType {
  id: number
  name: string
  personNum: number
  list: {
    openTimeList: string[]
    roomClickList: string[]
  }
}

interface IProps {
  class: string
  studentName?: string
  classType: string
  viewType: string
  onClick: () => void
}

export default function RoomReservation(props: IProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const setDurationSchedule = useSetRecoilState(durationScheduleState)
  const setLessonTimeState = useSetRecoilState(lessonTimeState)

  console.log(durationScheduleState)

  const currentDate = new Date()
  const [dateData, setDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [dateValue, setDateValue] = useState<string>('날짜')
  const [lessonTime, setLessonTime] = useState<string>('시간')
  const [isClickedTab, setIsClickedTab] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  })
  const [isClickedSearch, setIsClickedSearch] = useState<boolean>(false)
  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: undefined | number
    clickedTime: undefined | number
    room: string
  }>({
    roomId: undefined,
    clickedTime: undefined,
    room: ''
  })
  const [reservationData, setReservationData] = useState<{
    className: string
    studentName?: string
    date: string
    lessonTime: string
    room: string
  }>({
    className: '',
    studentName: '',
    date: '',
    lessonTime: '',
    room: ''
  })

  const handleChangeDateDataFromChild = (data: dateDataType | any, type?: string) => {
    if (type === 'session') {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month,
        date: data.date
      })
      setDateValue(`${data.year}.${data.month + 1}.${data.date}`)
    }

    if (type === 'duration') {
      console.log(data)
      if (data.length === 1) {
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]}~${data[0].year}.${data[0].month + 1}.${
            data[0].date[1]
          }`
        )
      } else {
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]}~${data[1].year}.${data[1].month + 1}.${
            data[1].date[0]
          }`
        )
      }
    }

    setIsClickedTab(prev => ({
      ...prev,
      date: false
    }))
  }

  const handleChangeLessonTimeFromChild = (time: string, type: string) => {
    if (type === 'session') {
      setLessonTime(time)
    }
    if (type === 'duration') {
      console.log('duration')
      setLessonTime(time)
    }

    setIsClickedTab(prev => ({
      ...prev,
      time: false
    }))
  }

  const handleClickTab = (type: string) => {
    if (type === 'date') {
      setIsClickedTab(prev => ({
        ...prev,
        date: !prev.date,
        time: false
      }))
    } else {
      setIsClickedTab(prev => ({
        ...prev,
        date: false,
        time: !prev.time
      }))
    }
  }

  const openTimeList: string[] = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22'
  ]
  const roomClickList: string[] = []
  for (var i = 0; i < openTimeList.length * 2; i++) {
    roomClickList.push('')
  }

  const roomData: RoomDataType[] = [
    {
      id: 1,
      name: 'A룸',
      personNum: 15,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 2,
      name: 'B룸',
      personNum: 10,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 3,
      name: 'C룸',
      personNum: 20,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    },
    {
      id: 4,
      name: 'D룸',
      personNum: 5,
      list: {
        openTimeList: openTimeList,
        roomClickList: roomClickList
      }
    }
  ]

  const scrollRight = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft += 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  const scrollLeft = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft -= 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  const calculateTime = (min: number) => {
    if (min === 0.5) {
      return '30'
    } else {
      return '00'
    }
  }
  const calculateDay = (day: number) => {
    const dayList = ['일', '월', '화', '수', '목', '금', '토']
    return dayList[day]
  }

  const calculatePeriodClassLessonTime = () => {
    const start = lessonTime.slice(0, 5)
    const end = lessonTime.slice(6, 11)
    const time =
      (Number(end.split(':')[0]) - Number(start.split(':')[0])) * 2 +
      (Number(end.split(':')[1]) - Number(start.split(':')[1])) / 30

    return time
  }

  return (
    <>
      <div className="relative w-full flex flex-col gap-4">
        <div className="w-full text-left gray-900-semibold text-base">예약 가능한 강의실 찾기</div>
        <div
          className={`w-full h-[68px] flex items-center justify-between ${
            isClickedTab.date || isClickedTab.time
              ? isClickedTab.date
                ? 'pl-2.5 bg-[#F8FAFD]'
                : 'pl-6 bg-[#F8FAFD]'
              : 'pl-6'
          } pr-2.5 py-2.5 rounded-full border border-1 border-gray-300`}
        >
          <button
            className={`${
              isClickedTab.date
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full'
                : 'w-[218.5px] h-full'
            }  flex gap-2 bg-white`}
            onClick={() => handleClickTab('date')}
          >
            <div className="w-[18px] mt-1/2 flex items-start">
              <CalendarIcon width="18" height="18" color={isClickedTab.date ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">날짜</div>
              <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">{dateValue}</div>
            </div>
          </button>
          {!isClickedTab.date && !isClickedTab.time && <div className="w-px h-7 bg-gray-300"></div>}

          <button
            className={`${
              isClickedTab.time
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full bg-white'
                : 'w-[218.5px] h-full'
            } flex gap-2 `}
            onClick={() => handleClickTab('time')}
          >
            <div className="w-[18px] mt-1/2 flex items-start">
              <ClockIcon width="18" height="18" color={isClickedTab.time ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">소요시간</div>
              <div className="w-full h-full text-left text-gray-400 font-medium text-[15px]">
                {lessonTime === '시간' ? lessonTime : props.classType === 'session' ? lessonTime + '분' : lessonTime}
              </div>
            </div>
          </button>
          <div
            className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (dateValue !== '날짜' && lessonTime !== '시간') {
                setIsClickedSearch(true)
              } else {
                return
              }
            }}
          >
            <SearchIcon width={20} height={20} />
          </div>
        </div>
        <div className="absolute z-10 left-0 top-[120px]">
          {props.classType === 'session' && isClickedTab.date && (
            <DayDatePicker
              parentsDateData={dateData}
              changeParentsDateData={handleChangeDateDataFromChild}
              type="addClass"
            />
          )}
          {props.classType === 'duration' && isClickedTab.date && (
            <PeriodDatePicker changeParentDateData={handleChangeDateDataFromChild} />
          )}
        </div>
        <div className="absolute z-10 right-10 top-[120px]">
          {props.classType === 'session' && isClickedTab.time && (
            <LessonTimeModal
              lessonTime={lessonTime}
              handleChangeLessonTimeFromChild={handleChangeLessonTimeFromChild}
            />
          )}
          {props.classType === 'duration' && isClickedTab.time && (
            <PeriodLessonTimeModal handleChangeLessonTimeFromChild={handleChangeLessonTimeFromChild} />
          )}
        </div>
      </div>
      {/* 일정 선택 문구 */}
      {!isClickedSearch && (
        <div className="w-full h-[422px] border border-1 border-gray-200 rounded-lg flex items-center">
          <div className="w-full text-center font-semibold text-base text-gray-400">
            일정을 선택해주시면 예약가능 리스트를 볼 수 있습니다.
          </div>
        </div>
      )}

      {/* 일정 선택 */}
      {dateValue !== '날짜' && lessonTime !== '시간' && isClickedSearch && (
        <div className="w-full mb-[60px] p-6 flex flex-col gap-6 border border-1 border-gray-200 rounded-lg max-h-[450px] overflow-y-scroll">
          {/* 룸 선택*/}
          <div className="w-full flex flex-col gap-10">
            {roomData.map((data, i) => {
              const roomId = data.id
              const room = data.name
              const timeRange: number | undefined =
                lessonTime === '시간'
                  ? undefined
                  : lessonTime.length <= 3
                    ? Number(lessonTime) / 30
                    : calculatePeriodClassLessonTime()
              return (
                <div key={i} className="relative flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="gray-900-semibold text-xl flex items-center">{data.name}</div>
                      <div className="flex items-center gap-0.5">
                        <UserIcon width={16} height={16} />
                        <div className="gray-500-normal text-sm flex items-center">{data.personNum}인</div>
                      </div>
                    </div>
                    <button
                      className="w-[73px] h-[37px] border border-1 border-primary-600 rounded-lg flex items-center justify-center text-sm text-primary-600 font-normal"
                      onClick={() => {
                        if (room !== clickedRoomData.room) {
                          return
                        }
                        if (props.classType === 'session') {
                          const start = 8 + (Number(clickedRoomData.clickedTime) * 30) / 60
                          const end = start + Number(lessonTime) / 60
                          const startTime = String(Math.floor(start)) + ':' + calculateTime(start - Math.floor(start))
                          let endTime: string
                          if (end > 22) {
                            endTime = '22:00'
                          } else {
                            endTime = String(Math.floor(end)) + ':' + calculateTime(end - Math.floor(end))
                          }
                          if (props.studentName) {
                          }
                          const day = calculateDay(new Date(dateData.year, dateData.month, dateData.date).getDay())

                          setReservationData(prev => ({
                            ...prev,
                            className: props.class,
                            studentName: props.studentName,
                            date: dateValue + `(${day})`,
                            lessonTime: startTime + '-' + endTime,
                            room: clickedRoomData.room
                          }))

                          /* 예약 확인 모달 보여주기 위함 */
                          if (props.viewType === 'page') {
                            setModal(true)
                          } else if (props.viewType === 'modal') {
                            /* 예약 정보 전송 */
                            console.log(dateValue, lessonTime)
                            const data = {
                              date: ''
                            }
                          }
                        } else if (props.classType === 'duration') {
                          const time = lessonTime.split(',')[0]
                          const day = lessonTime.slice(12, lessonTime.length)
                          const data = {
                            date: dateValue,
                            lessonTime: time,
                            day: day,
                            room: clickedRoomData.room
                          }
                          const startDateData = dateValue.split('~')[0].split('.')
                          const endDateData = dateValue.split('~')[1].split('.')

                          if (timeRange !== undefined) {
                            setDurationSchedule(prev => [
                              ...prev,
                              {
                                startDate: new Date(
                                  Number(startDateData[0]),
                                  Number(startDateData[1]) - 1,
                                  Number(startDateData[2])
                                ).toISOString(),
                                endDate: new Date(
                                  Number(endDateData[0]),
                                  Number(endDateData[1]) - 1,
                                  Number(endDateData[2])
                                ).toISOString(),
                                startTime: lessonTime.slice(0, 5),
                                endTime: lessonTime.slice(6, 11),
                                repeatDate: lessonTime.slice(12, lessonTime.length).split(' ')[0],
                                roomId: 1,
                                lessonTime: timeRange * 30
                              }
                            ])
                          }
                        }
                        props.onClick()
                      }}
                    >
                      예약하기
                    </button>
                  </div>
                  <button
                    className="absolute z-10 -left-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                    onClick={() => {
                      scrollLeft(i)
                    }}
                  >
                    <ChevronLeftIcon className="z-10" width={16} height={16} />
                  </button>
                  <button
                    className="absolute z-10 -right-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                    onClick={() => {
                      scrollRight(i)
                    }}
                  >
                    <ChevronRightIcon className="z-10" width={16} height={16} />
                  </button>
                  <div
                    ref={el => (refs.current[i] = el)}
                    className="w-full grid grid-flow-col overflow-y-auto scrollbar-hide"
                  >
                    <div className="w-full flex flex-col">
                      <div className="w-full flex">
                        {data.list.openTimeList.map((time, i) => {
                          return (
                            <div key={i} className={`w-[54px] flex flex-col`}>
                              <div
                                className={`relative w-full flex flex-col h-[42px] py-[11px] ${
                                  i === 0 ? 'border border-1' : 'border-y border-r'
                                }  border-gray-200 flex items-center justify-center gray-800-medium text-[13px]`}
                              >
                                {time}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="w-full flex">
                        {data.list.roomClickList.map((data, i) => {
                          return (
                            <button
                              key={i}
                              className={`w-[27px] ${
                                clickedRoomData.roomId === roomId &&
                                clickedRoomData.clickedTime !== undefined &&
                                timeRange !== undefined &&
                                clickedRoomData.clickedTime <= i &&
                                i <= clickedRoomData.clickedTime + timeRange - 1 &&
                                'bg-primary-300'
                              }`}
                              onClick={() => {
                                if (timeRange === undefined) {
                                  return
                                } else {
                                  setClickedRoomData(prev => ({
                                    ...prev,
                                    roomId: roomId,
                                    clickedTime: i,
                                    room: room
                                  }))
                                }
                              }}
                            >
                              <div
                                className={`w-full h-9 ${i === 0 && 'border-l'} border-r border-b  border-gray-200`}
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {props.viewType === 'page' && modal && (
        <Modal small>
          <RoomReservationCheck reservationData={reservationData} onClose={() => setModal(false)} />
        </Modal>
      )}
    </>
  )
}
