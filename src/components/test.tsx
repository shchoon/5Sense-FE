'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import useInputNum from '@/hooks/useInputNum'
import { InputNumProps } from '@/app/(nav)/student/register/page'
import instance from '@/lib/api/axios'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

export default function ({ id }: any) {
  const roomId = id
  console.log(id)
  const router = useRouter()
  //const [inputValue, setInputValue] = useState<string>(roomName)
  const [roomData, setRoomData] = useState<{ name: string; roomId: number; capacity: number }>({
    name: '',
    roomId: 0,
    capacity: 0
  })

  const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value
    const maxLength: number = e.target.maxLength
    if (value.length > maxLength) {
      setRoomData(prev => ({
        ...prev,
        name: value.slice(0, maxLength)
      }))
    }

    setRoomData(prev => ({
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

  console.log(roomData)
  return (
    <>
      <div className="relative">
        <Link href={'/room'}>
          <EllipsisIcon className="absolute left-[48px] top-[61px]" width={28} height={28} alt="" />
          <ArrowBackIcon className="absolute left-[55px] top-[68px]" width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl ">강의실 수정</div>
      </div>
      <div className="w-[640px] pt-[120px] flex flex-col gap-[34px] mx-auto ">
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">강의실 정보</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">강의실 이름</div>
              <input
                className="input-line-gray"
                value={roomData.name}
                maxLength={20}
                onChange={e => {
                  handleChangeRoomName(e)
                }}
              />
              <div className="w-full text-right gray-500-normal text-sm font-['Inter']">{roomData.name.length}/20</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gray-800-semibold text-base">권장 허용 인원</div>
              <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
                <button
                  type="button"
                  className={`w-10 h-full flex items-center justify-center rounded-full ${
                    roomData.capacity === 1 ? 'bg-gray-200' : 'bg-primary-600'
                  }`}
                  onClick={() => {
                    if (roomData.capacity !== 1) {
                      setRoomData(prev => ({
                        ...prev,
                        capacity: prev.capacity - 1
                      }))
                    }
                  }}
                >
                  <MinusIcon alt="Minus" />
                </button>
                <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">
                  {roomData.capacity}명
                </div>
                <button
                  type="button"
                  className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600"
                  onClick={() => {
                    setRoomData(prev => ({
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
              .put(`/lesson-rooms/${roomId}`, {
                name: roomData.name,
                capacity: roomData.capacity
              })
              .then(res => {
                console.log(res)
                router.push('/room')
              })
          }}
        >
          수정하기
        </button>
      </div>
    </>
  )
}
