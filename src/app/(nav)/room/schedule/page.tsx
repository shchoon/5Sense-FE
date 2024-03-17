'use client'
import Link from 'next/link'
import Image from 'next/image'

import DropDown from '@/components/common/DropDown'
import RoomReservation from '@/components/room/RoomReservation'

import ImgArrowBack from 'public/assets/icons/allowBack.svg'
import ImgEllipsis from 'public/assets/icons/ellipsis75.svg'
import AlertCircle from 'public/assets/icons/alert-circle.svg'
import Search from 'public/assets/icons/search.svg'
import { useScreen } from 'usehooks-ts'
import { useState } from 'react'

export default function Schedule() {
  const dropDownProps = {
    title: '클래스를 선택해주세요',
    list: ['반야사 요가', '필라테스', '체형 관리'],
    type: 'dropdown'
  }

  const [selectedClass, setSelectedClass] = useState<string>('')
  const [studentName, setStudentName] = useState<string>('')

  const handleChangeParentsDropdownData = (data: string) => {
    setSelectedClass(data)
  }

  return (
    <>
      <div className="relative">
        <Link href={'/room'}>
          <Image className="absolute left-[48px] top-[61px]" src={ImgEllipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ImgArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">일정 찾기</div>
      </div>
      <div className="w-[720px] pt-[120px] pb-[50px] flex flex-col gap-10 mx-auto ">
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">클래스 정보</div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="w-full text-left gray-800-semibold text-base">클래스 선택</div>
                <DropDown {...dropDownProps} handleChangeParentsDropdownData={handleChangeParentsDropdownData} />
              </div>
              <div className="w-full flex gap-1.5 items-center">
                <Image src={AlertCircle} width={18} height={18} alt="AlertCircle" />
                <div className="w-full gray-500-normal text-sm">
                  기간반은 [클래스 관리 - 클래스 등록]에서 강의실을 등록하고있습니다.
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">수강생 찾기</div>
              <div className="w-full h-[52px] flex px-3 py-2.5 gap-2 border border-1 border-gray-200 rounded-lg focus-within:border-[#5539C0]">
                <Image src={Search} width={18} height={18} alt="Search" />
                <input
                  placeholder="수강생 이름"
                  value={studentName}
                  onChange={e => {
                    setStudentName(e.target.value)
                  }}
                  className=" w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="w-full h-[400px] border border-1 border-gray-200 rounded-xl flex items-center justify-center
         text-gray-400 text-base font-semibold"
        >
          클래스를 선택해주시면 예약가능 리스트를 볼 수 있습니다.
        </div> */}
        {selectedClass !== '' && <RoomReservation class={selectedClass} studentName={studentName} classType="round" />}
      </div>
    </>
  )
}
