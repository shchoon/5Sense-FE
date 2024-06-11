'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import instance from '@/lib/api/axios'
import { RoomDetailsState } from '@/lib/state/roomDetails'
import ContentHeader from '@/components/common/ContentHeader'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

export default function ModifyRoom() {
  const roomDetails = useRecoilValue(RoomDetailsState)
  const setRoomDetails = useSetRecoilState(RoomDetailsState)
  const router = useRouter()
  //const roomId = id
  //const [inputValue, setInputValue] = useState<string>(roomName)

  const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value
    const maxLength: number = e.target.maxLength
    if (value.length > maxLength) {
      setRoomDetails(prev => ({
        ...prev,
        name: value.slice(0, maxLength)
      }))
    }

    setRoomDetails(prev => ({
      ...prev,
      name: value
    }))
  }
  /* const [InputValue, handleChange] = useInputNum({
    name: 'room',
    submitData: inputValue,
    setSubmitData: setInputValue
  })
  const roomNameProps: InputFormProps = {
    title: '강의실 이름',
    placeholder: '강의실 이름을 입력해주세요',
    name: 'room',
    maxLength: 20,
    submitData: inputValue,
    setSubmitData: setInputValue
  } */
  useEffect(() => {
    const date = new Date()
    const roomId = localStorage.getItem('roomId') as string
    instance('lesson-rooms/daily', {
      params: {
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
      }
    }).then(res => {
      console.log(res)
      const room = res.data.data.filter((data: { id: number }) => data.id === Number(roomId))
      console.log(room)
      setRoomDetails(prev => ({
        ...prev,
        id: room[0].id,
        name: room[0].name,
        capacity: room[0].capacity
      }))
    })
  }, [])

  return (
    <div className='w-full flex flex-col items-center pb-[60px]'>
        <ContentHeader title='강의실 수정' back onClick={() => router.push('/room')} />
      <div className="w-[640px] flex flex-col gap-[34px]">
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">강의실 정보</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">강의실 이름</div>
              <input
                className="input-line-gray"
                value={roomDetails.name}
                maxLength={20}
                onChange={e => {
                  handleChangeRoomName(e)
                }}
              />
              <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                {roomDetails.name.length}/20
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gray-800-semibold text-base">권장 허용 인원</div>
              <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
                <button
                  type="button"
                  className={`w-10 h-full flex items-center justify-center rounded-full ${
                    roomDetails.capacity === 1 ? 'bg-gray-200' : 'bg-primary-600'
                  }`}
                  onClick={() => {
                    if (roomDetails.capacity !== 1) {
                      setRoomDetails(prev => ({
                        ...prev,
                        capacity: prev.capacity - 1
                      }))
                    }
                  }}
                >
                  <MinusIcon alt="Minus" />
                </button>
                <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">
                  {roomDetails.capacity}명
                </div>
                <button
                  type="button"
                  className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600"
                  onClick={() => {
                    setRoomDetails(prev => ({
                      ...prev,
                      capacity: prev.capacity + 1
                    }))
                  }}
                >
                  <PlusIcon alt="Plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full h-[52px] flex justify-center items-center text-white text-base font-semibold btn-purple"
          onClick={() => {
            instance
              .put(`/lesson-rooms/${roomDetails.id}`, {
                name: roomDetails.name,
                capacity: roomDetails.capacity
              })
              .then(res => {
                router.push('/room')
              })
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}