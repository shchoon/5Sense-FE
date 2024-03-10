'use client'
import Image from 'next/image'
import { useState } from 'react'

import DropDown from '../common/DropDown'
import RoomReservation from '../room/RoomReservation'

import closeCircle from 'public/assets/icons/closeCircle.svg'

export default function AddClassModal() {
  const dropDownProps = {
    title: '클래스를 선택해주세요',
    list: ['반냐사 요가', '무적 필라테스', '스트레칭', 'PT'],
    type: 'withdrawl'
  }

  const [isPaid, setIsPaid] = useState<boolean>(false)

  const handleClickPayment = () => {
    setIsPaid(prev => !prev)
  }

  return (
    <div className="absolute left-10 top-10 w-[768px] border border-1 border-gray-200 rounded-xl bg-white">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 text-2xl gray-900-bold">클래스 추가</div>
        <Image className="absolute left-[717px] top-4" src={closeCircle} width={35} height={35} alt="closeCircle" />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-10">
        {/* 회차/기간반 버튼 */}
        <div className="w-full flex">
          <div className="w-full p-6 flex">
            <button className="w-full h-10 py-2 rounded-md text-gray-500 font-semibold text-base">기간반</button>
          </div>
          <div className="w-full p-6 flex">
            <button className="w-full h-10 py-2 rounded-md bg-primary-600 text-white font-semibold text-base">
              회차반
            </button>
          </div>
        </div>
        {/* 클래스 선택 */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full text-left gray-900-semibold text-base">클래스 선택</div>
          <DropDown {...dropDownProps} />
          <div className="w-full h-[69px] flex justify-between items-center px-6 py-[18px] bg-[#F8FAFD]">
            <div className="w-[100px] h-[21px] flex items-center justify-center gray-900-semibold text-sm">
              결제 상태
            </div>
            <div className="h-5 flex items-center gap-2">
              <div className="w-[50px] gray-700-medium">미결제</div>
              <button
                className={`relative w-10 h-5 flex items-center rounded-full ${
                  isPaid ? 'bg-primary-600' : 'bg-gray-200'
                } `}
                onClick={() => handleClickPayment()}
              >
                <span className={`absolute ${isPaid ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white`}></span>
              </button>
              <div className="w-[65px] gray-700-medium">결제완료</div>
            </div>
          </div>
        </div>
        {/* 강의실 예약 */}
        <RoomReservation />
      </div>
    </div>
  )
}
