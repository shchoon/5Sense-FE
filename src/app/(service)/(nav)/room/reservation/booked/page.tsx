'use client'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import ContentHeader from '@/components/common/ContentHeader'
import SearchPerson from '@/components/class/register/searchPerson'
import SessionReservationCard from '@/components/common/card/SessionReservationCard'
import { AddSessionState } from '@/lib/state/addSessionState'
import instance from '@/lib/api/axios'
import { useEffect } from 'react'

export default function BookedRoomReservation() {
  const router = useRouter()

  const reservationData = useRecoilValue(AddSessionState)

  useEffect(() => {
    return () => {
      localStorage.removeItem('classId')
      localStorage.removeItem('reservationDate')
      localStorage.removeItem('reservationTime')
      localStorage.removeItem('classId')
      localStorage.removeItem('roomId')
      localStorage.removeItem('roomName')
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="예약하기" back onClick={() => router.push('/room')} />
      <form
        className="w-[640px] flex flex-col gap-5"
        onSubmit={e => {
          e.preventDefault()
          instance
            .post('/session-lesson-schedules', { ...reservationData })
            .then(res => {
              alert('예약이 완료되었습니다')
              router.push('/room')
            })
            .catch(err => {
              console.log(err)
              if (err.response.status === 409) {
                alert(err.response.data.message)
              }
            })
          console.log(reservationData)
        }}
      >
        <SessionReservationCard />
        <SearchPerson type="students" />
        <button
          type="submit"
          className="w-full h-[52px] flex justify-center items-center text-white text-base font-semibold btn-purple"
        >
          예약하기
        </button>
      </form>
    </div>
  )
}
