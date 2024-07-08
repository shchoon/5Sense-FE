'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useRef } from 'react'

import DropDown from '@/components/common/DropDown'
import RoomReservation from '@/components/room/RoomReservation'
import instance from '@/lib/api/axios'
import SearchStudents from '@/components/common/searchPerson/SearchStudents'
import { classType } from '@/components/modal/StudentAddClassModal'
import RoomReservationCheck from '@/components/check/RoomReservationCheck'
import ContentHeader from '@/components/common/ContentHeader'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import { centerInfoState } from '@/lib/state/centerInfoState'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import AlertIcon from 'public/assets/icons/alert-circle.svg'
import SearchIcon from '@/icons/icon/search.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'
import UserIcon from 'public/assets/icons/user.svg'
import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'

interface IProps {
  query: {
    name?: string
  }
}

export default function Reservatoin() {
  const router = useRouter()
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const centerInfo = useRecoilValue(centerInfoState)
  const [dropDownProps, setDropDownProps] = useState({
    title: '클래스를 선택해주세요',
    list: [],
    type: 'class'
  })

  const [selectedClass, setSelectedClass] = useState({
    id: 0
  })
  const [studentName, setStudentName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [studentList, setStudentList] = useState([])
  const [roomData, setRoomdata] = useState<any>([])
  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: undefined | number
    clickedTime: undefined | number
    room: string
  }>({
    roomId: undefined,
    clickedTime: undefined,
    room: ''
  })

  const openTimeList: string[] = []

  if (centerInfo.name !== '') {
    const time = {
      open: Number(centerInfo.open.split(':')[0]),
      close: Number(centerInfo.close.split(':')[0])
    }
    for (var i = time.open; i < time.close; i++) {
      openTimeList.push(`${i}`)
    }
  }

  const handleChangeParentsDropdownData = (data: classType) => {
    setSelectedClass(data)
    getRoomData(data.id)
  }

  const classId = typeof window !== undefined && localStorage.getItem('classId')

  useEffect(() => {
    const classId = localStorage.getItem('classId')
    console.log(classId)
    if (classId === null) {
      instance(`/session-lessons`, {
        params: {
          isCheckRegistrationsCount: true
        }
      }).then(res => {
        const classData = res.data.data
        setDropDownProps(prev => ({
          ...prev,
          list: classData
        }))
      })
    } else {
      instance(`/session-lessons/${classId}/details`).then(res => {
        const category = res.data.data.category.subName
        setCategory(category)
      })
    }
  }, [])

  const reservationData = {
    className: typeof window !== undefined ? localStorage.getItem('className') : '',
    date: typeof window !== undefined ? localStorage.getItem('reservationDate') : '',
    lessonTime: typeof window !== undefined ? localStorage.getItem('lessonTime') : '',
    roomName: typeof window !== undefined ? localStorage.getItem('roomName') : '',
    classId: typeof window !== undefined ? localStorage.getItem('classId') : '',
    roomId: typeof window !== undefined ? localStorage.getItem('roomId') : '',
    startTime: typeof window !== undefined ? localStorage.getItem('reservationTime') : '',
    category: category
  }

  const calculateEndTime = () => {
    const startTime = {
      hour: Number(reservationData.startTime?.split(':')[0]),
      min: Number(reservationData.startTime?.split(':')[1])
    }

    const timeSum = startTime.hour * 2 + startTime.min / 30 + Number(reservationData.lessonTime) / 30

    const endTime = {
      hour: `${Math.floor(timeSum / 2)}`,
      min: timeSum / 2 - Math.floor(timeSum / 2) === 0 ? '00' : '30'
    }

    return endTime.hour + ':' + endTime.min
  }

  const getStudentList = () => {
    if (selectedClass !== undefined) {
      instance(`/students/lessons/${selectedClass.id}`).then(res => {
        const studentList = res.data.data
        setStudentList(studentList)
      })
    }
  }

  const getRoomData = (classId: number) => {
    instance('/lesson-rooms/daily', {
      params: {
        date: new Date(calendarDate.year, calendarDate.month, calendarDate.date).toISOString()
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
        /* 예약 불가인 룸 처리(애초에 예약 가능 여부가 false) -> 무조건 필요한거 */
        const absolutlyBookingFalse = []
        const relativlyBookingFalse = []
        for (var k = 0; k < test.length; k++) {
          if (test[k].lesonTime !== null && !test[k].isOpenForBooking) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k + 1; n <= k + range; n++) {
              absolutlyBookingFalse.push(n)
            }
          }
          if (
            test[k].lesonTime !== null &&
            test[k].isOpenForBooking &&
            classId !== test[k].id
          ) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k; n <= k + range; n++) {
              relativlyBookingFalse.push(n)
            }
          }
        }
        if (absolutlyBookingFalse.length !== 0) {
          for (var l = 0; l < absolutlyBookingFalse.length; l++) {
            test[absolutlyBookingFalse[l]].isOpenForBooking = false
          }
        }
        if (relativlyBookingFalse.length !== 0) {
          for (var l = 0; l < relativlyBookingFalse.length; l++) {
            test[relativlyBookingFalse[l]].isOpenForBooking = false
          }
        }
        /* 선택한 클래스와 룸에 예약되어 있는 클래스가 다른 경우 처리 -> 룸에 에약되어있는 클래스가 있는 경우에만 처리 */
        console.log(relativlyBookingFalse)
      }
      console.log(list)
      setRoomdata(list)
    })
  }

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

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="예약하기" back onClick={() => router.push('/room')} />
      <div className="w-[640px] flex flex-col items-center gap-10">
        {/* 예약 정보 */}
        <div className="w-full flex flex-col gap-10">
          <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
            <div className="gray-900-bold text-[20px]">예약 정보</div>
            {/*  날짜 정보 */}
            <div className="w-full h-[52px] flex border border-gray-100 rounded-md bg-primary-50 items-center justify-center">
              <div className="h-6 flex gap-2">
                <CalendarIcon className="text-gray-500" />
                <span className="gray-900-semibold text-[16px]">{calendarDate.year}년 {calendarDate.month + 1}월 {calendarDate.date}일</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              {/* 클래스 선택 */}
              <div className="w-full flex flex-col gap-2">
                <div className="gray-800-semibold text-[16px]">클래스 선택</div>
                <DropDown {...dropDownProps} handleChangeParentsClassDropdownData={handleChangeParentsDropdownData} />
                <div className="w-full flex gap-1.5 items-center">
                  <AlertIcon width={18} height={18} alt="AlertCircle" />
                  <div className="w-full gray-500-normal text-sm">
                    기간반은 [클래스 관리 - 클래스 등록]에서 강의실을 등록하고있습니다.
                  </div>
                </div>
              </div>
              {/* 수강생 찾기 */}
              {selectedClass.id !== 0 && <SearchStudents onChange={() => {}} classId={selectedClass.id} />}
            </div>
          </div>
        </div>
        {/* 예약 시간 확정 */}
        <div className='w-full flex flex-col gap-6 pt-8 pb-6 px-6 border rounded-xl border-1 border-gray-200'>
          <div className='gray-900-bold font-[20px]'>예약시간 확정</div>
          <div className='w-full flex justify-end'>
            <div className='flex gap-4'>
              <div className='flex gap-2 h-4 items-center'>
                <span className='w-4 h-4 rounded border border-gray-200 bg-white'/>
                <span className='gray-600-medium text-[13px]'>예약가능</span>
              </div>
              <div className='flex gap-2 h-4 items-center'>
                <span className='w-4 h-4 rounded border border-gray-200 bg-gray-100'/>
                <span className='gray-600-medium text-[13px]'>예약불가</span>
              </div>
            </div>
          </div>
          {roomData.length !== 0 && roomData.map((data, i) => {
            const roomId = data.id
            const room = data.name
            const timeRange: number | undefined = 2 /* lessonTime === '시간' ? undefined : Number(lessonTime) / 30 */
            return (
              <div key={i} className="relative flex flex-col gap-4">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <div className="gray-900-semibold text-xl flex items-center">{data.name}</div>
                        <div className="flex items-center gap-0.5">
                          <UserIcon width={16} height={16} />
                          <div className="gray-500-normal text-sm flex items-center">{data.capacity}인</div>
                        </div>
                      </div>
                      <button
                        className="w-[73px] h-[37px] border border-1 border-primary-600 rounded-lg flex items-center justify-center text-sm text-primary-600 font-normal"
                        onClick={() => {
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
                      ref={el => {refs.current[i] = el}}
                      className="w-full grid grid-flow-col overflow-y-auto scrollbar-hide"
                    >
                      <div className="w-full flex flex-col">
                        <div className="w-full flex">
                          {openTimeList.length !== 0 &&
                            openTimeList.map((time, i: number) => {
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
                          {data.workTime.map((data: any, i: number) => {
                            return (
                              <button
                                key={i}
                                className={`w-[27px] ${
                                  data.isOpenForBooking
                                    ? clickedRoomData.roomId === roomId &&
                                      clickedRoomData.clickedTime !== undefined &&
                                      timeRange !== undefined &&
                                      clickedRoomData.clickedTime <= i &&
                                      i <= clickedRoomData.clickedTime + timeRange - 1
                                      ? 'bg-primary-300'
                                      : 'bg-white'
                                    : 'bg-gray-100'
                                }`}
                                onClick={() => {
                                  if (!data.isOpenForBooking) {
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

        <button
          className="w-full h-[52px] btn-purple"
          onClick={() => {
            const date = reservationData.date?.split('.')
            instance
              .post('/session-lesson-schedules', {
                lessonId: Number(reservationData.classId),
                studentId: studentName,
                sessionDate: date && new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2])).toISOString(),
                startTime: reservationData.startTime,
                endTime: calculateEndTime(),
                roomId: Number(reservationData.roomId)
              })
              .then(res => {
                router.push('/room')
              })
              .catch(res => {
                console.log(res.response)
                const statusCode = res.response.status
                if (statusCode === 409) {
                  alert('선택한 수강생이 이미 예약되어있습니다.')
                }
              })
          }}
        >
          예약하기
        </button>
      </div>
    </div>
  )
}
