'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import DropDown from '@/components/common/DropDown'
import RoomReservation from '@/components/room/RoomReservation'
import { useState, useEffect } from 'react'
import SearchInput from '@/components/common/SearchInput'
import MemberOfCenter from '@/components/class/register/memberOfCenter'
import instance from '@/lib/api/axios'
import { classType } from '@/components/modal/StudentAddClassModal'
import RoomReservationCheck from '@/components/check/RoomReservationCheck'
import ContentHeader from '@/components/common/ContentHeader'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import AlertIcon from 'public/assets/icons/alert-circle.svg'
import SearchIcon from '@/icons/icon/search.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'

interface IProps {
  query: {
    name?: string
  }
}

export default function Reservatoin() {
  const router = useRouter()
  const [dropDownProps, setDropDownProps] = useState({
    title: '클래스를 선택해주세요',
    list: [],
    type: 'class'
  })

  const [selectedClass, setSelectedClass] = useState<classType>()
  const [studentName, setStudentName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [studentList, setStudentList] = useState([])

  const handleChangeParentsDropdownData = (data: classType) => {
    setSelectedClass(data)
  }

  const classId = typeof window !== undefined && localStorage.getItem('classId')

  useEffect(() => {
    const classId = localStorage.getItem('classId')
    if (classId === 'null') {
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

  console.log(selectedClass)

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
                <span className="gray-900-semibold text-[16px]">2024년 7월 5일</span>
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
              {/* <div className="relative w-full flex flex-col gap-2">
                <div className="gray-800-semibold text-[16px]">수강생 찾기</div>
                <div className="flex items-center gap-2 w-full h-[52px] px-3 py-3.5 border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
                  <SearchIcon />
                  <input
                    className="flex-1 focus:outline-none bg-inherit"
                    placeholder="수강생 이름을 입력해주세요"
                    onClick={getStudentList}
                  />
                </div>
              </div> */}
              <div className="w-full"></div>
            </div>
          </div>
        </div>
        {/* 예약 시간 확정 */}
        <div></div>

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
