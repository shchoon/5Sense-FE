'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import instance from '@/lib/api/axios'
import InputForm, { InputFormProps } from '@/components/common/InputForm'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

export default function AddRoom() {
  const [permissonNum, setPermissonNum] = useState<number>(1)
  const [roomName, setRoomName] = useState<string>('')
  const [inputCount, setInputCount] = useState<number>(0)

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20)
      setRoomName(e.target.value)
    }
    setRoomName(e.target.value)
    setInputCount(e.target.value.length)
  }

  return (
    <>
      <div className="relative">
        <Link href={'/room'}>
          <EllipsisIcon className="absolute left-[48px] top-[61px]" width={28} height={28} alt="" />
          <ArrowBackIcon className="absolute left-[55px] top-[68px]" width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">강의실 추가</div>
      </div>
      <form
        className="w-[640px] pt-[120px] flex flex-col gap-[34px] mx-auto"
        onSubmit={e => {
          e.preventDefault()
          instance.post('lesson-rooms', {
            name: roomName,
            capacity: permissonNum
          })
        }}
      >
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">강의실 정보</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">강의실 이름</div>
              <input
                className="input-line-gray"
                placeholder="강의실 이름을 입력해주세요"
                value={roomName}
                maxLength={20}
                onChange={e => {
                  onInputHandler(e)
                }}
              />
              <div className="w-full text-right gray-500-normal text-sm font-['Inter']">{inputCount}/20</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gray-800-semibold text-base">권장 허용 인원</div>
              <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
                <button
                  type="button"
                  className={`w-10 h-full flex items-center justify-center rounded-full ${
                    permissonNum === 1 ? 'bg-gray-200' : 'bg-primary-600'
                  }`}
                  onClick={() => {
                    if (permissonNum !== 1) {
                      setPermissonNum(prev => prev - 1)
                    }
                  }}
                >
                  <MinusIcon />
                </button>
                <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">
                  {permissonNum}명
                </div>
                <button
                  type="button"
                  className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600"
                  onClick={() => {
                    setPermissonNum(prev => prev + 1)
                  }}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[52px] flex justify-center items-center text-white text-base font-semibold btn-purple"
        >
          추가하기
        </button>
      </form>
    </>
  )
}
