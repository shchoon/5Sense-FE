'use client'
import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import { modalState } from '@/lib/state/modal'
import instance from '@/lib/api/axios'
import DayCalendar from '@/components/common/calendar/DayCalendar'
import RoomDataFormatter from '@/components/room/roomDataFormatter'
import ContentHeader from '@/components/common/ContentHeader'
import RoomList from '@/components/room/roomList'
import RoomSchedule from '@/components/room/RoomSchedule'

export default function RoomPage() {
  const currentDate = new Date()
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)
  const router = useRouter()
  const modal = useRecoilValue(modalState) // 상태의 값을 가져옴
  const [indexOfRoomList, setIndexOfRoomList] = useState<number>(0)
  const [room, setRoom] = useState<any>([])

  const onChangeRoomList = (num: number) => {
    setIndexOfRoomList(num)
  }

  useEffect(() => {
    if (!modal) {
      instance('lesson-rooms/daily', {
        params: {
          date: new Date(calendarDate.year, calendarDate.month, calendarDate.date).toISOString()
        }
      }).then(res => {
        const list = res.data.data
        const formatData = RoomDataFormatter(list)
        setRoom(formatData)
      })
    }
  }, [calendarDate, modal])

  useEffect(() => {
    return () => {
      if(!window.location.href.includes('room')){
        setCalendarDate({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
          date: currentDate.getDate()
        })
      }
    }
  }, [])

  return (
    <div>
      <ContentHeader title="강의실 관리" btnName="강의실 추가" onClick={() => router.push('room/register')} />
      {/* 캘린더 */}
      <DayCalendar page="room" />
      {/* 룸 리스트 */}
      <RoomList roomData={room} onChangeRoomList={onChangeRoomList} indexOfRoomList={indexOfRoomList} />
      {/* 룸 시간표 */}
      <RoomSchedule roomScheduleData={room} indexOfRoomList={indexOfRoomList} />
    </div>
  )
}
