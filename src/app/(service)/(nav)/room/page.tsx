'use client'
import { useState, useRef, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { calendarDateState } from '@/lib/state/calendarDateState'
import { modalState } from '@/lib/state/modal'
import DeleteModal from '@/components/modal/DeleteModal'
import Modal from '@/components/common/modal'
import instance from '@/lib/api/axios'
import Calendar from '@/components/common/calendar/Calendar'
import RoomDataFormatter from '@/components/room/RoomDataFormatter'
import ContentHeader from '@/components/common/ContentHeader'
import RoomList from '@/components/room/RoomList'
import RoomSchedule from '@/components/room/RoomSchedule'

export default function RoomPage() {
  const currentDate = new Date()
  const calendarDate = useRecoilValue(calendarDateState)
  const setCalendarDate = useSetRecoilState(calendarDateState)
  const router = useRouter()
  const optionRef = useRef<HTMLButtonElement>(null)

  const modal = useRecoilValue(modalState) // 상태의 값을 가져옴

  const [indexOfRoomList, setIndexOfRoomList] = useState<number>(0)
  const [room, setRoom] = useState<any>([])
  /* const [roomOption, setRoomOption] = useState<{
    isClicked: boolean
    id: undefined | number
    roomId: number
  }>({
    isClicked: false,
    id: undefined,
    roomId: 0
  }) */

  const onChangeRoomList = (num: number) => {
    setIndexOfRoomList(num)
  }

  useEffect(() => {
    if (!modal) {
      /* if (roomOption.isClicked) {
        setRoomOption({
          isClicked: false,
          id: undefined,
          roomId: 0
        })
      } */
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
      setCalendarDate({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
      })
    }
  }, [])

  return (
    <div>
      <ContentHeader title="강의실 관리" btnName="강의실 추가" onClick={() => router.push('room/register')} />
      {/* 캘린더 */}
      <Calendar page="room" />

      {/* 룸 리스트 */}
      <RoomList roomData={room} onChangeRoomList={onChangeRoomList} indexOfRoomList={indexOfRoomList} />
      <RoomSchedule roomScheduleData={room} indexOfRoomList={indexOfRoomList} />
      {/* {modal && (
        <Modal small>
          <DeleteModal onClose={() => setModal(false)} roomId={roomOption.roomId} />
        </Modal>
      )} */}
    </div>
  )
}
