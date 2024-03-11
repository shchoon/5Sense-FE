'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import useInputNum from '@/hooks/useInputNum'
import { InputNumProps } from '@/app/(nav)/student/register/page'

import ImgArrowBack from 'public/assets/icons/allowBack.svg'
import ImgEllipsis from 'public/assets/icons/ellipsis75.svg'
import Minus from 'public/assets/icons/minus_vector.svg'
import Plus from 'public/assets/icons/plus_vector.svg'

export default function ModifyRoom() {
  const pathName = usePathname()
  const roomName = pathName.split('/')[3]

  const [permissonNum, setPermissonNum] = useState<number>(1)
  const [inputValue, setInputValue] = useState<string>(roomName)

  const [InputValue, handleChange] = useInputNum({
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
  }

  return (
    <>
      <div className="relative">
        <Link href={'/room'}>
          <Image className="absolute left-[48px] top-[61px]" src={ImgEllipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ImgArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">강의실 수정</div>
      </div>
      <div className="w-[640px] pt-[120px] flex flex-col gap-[34px] mx-auto ">
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">강의실 정보</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">강의실 이름</div>
              <input
                className="input-line-gray"
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                }}
              />
              <div className="w-full text-right gray-500-normal text-sm font-['Inter']">0/20</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gray-800-semibold text-base">권장 허용 인원</div>
              <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
                <div className="w-10 h-full flex items-center justify-center rounded-full bg-gray-200">
                  <Image src={Minus} width={12} height={10} alt="Minus" />
                </div>
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
                  <Image src={Plus} width={14} height={14} alt="Plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full h-[52px] flex justify-center items-center text-white text-base font-semibold btn-purple">
          수정하기
        </button>
      </div>
    </>
  )
}
