'use client'
import Image from 'next/image'
import Ellipsis from '../../../../assets/icon/ellipsis75.svg'
import ArrowBack from '../../../../assets/icon/allowBack.svg'
import PlusCircle from '../../../../assets/icon/plusCirclePrimary600.svg'
import { useState } from 'react'

export default function StudentRegister() {
  let [postStudentData, setPostStudentData] = useState({
    name: '',
    phoneNumber: '',
    other: ''
  })

  const onChangeName = (e: any) => {
    setPostStudentData({
      ...postStudentData,
      name: e.target.value
    })
    console.log(postStudentData.name)
  }

  const onChangePhoneNumber = (e: any) => {
    setPostStudentData({
      ...postStudentData,
      phoneNumber: e.target.value
    })
    console.log(postStudentData.phoneNumber)
  }

  const onChangeOther = (e: any) => {
    setPostStudentData({
      ...postStudentData,
      other: e.target.value
    })
    console.log(postStudentData.other)
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Image
          className="absolute left-[48px] top-[61px]"
          src={Ellipsis}
          width={28}
          height={28}
          alt=""
        />
        <Image
          className="absolute left-[55px] top-[68px]"
          src={ArrowBack}
          width={14}
          height={14}
          alt=""
        />
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl  font-['Pretendard'] leading-[30px]">
          수강생 등록
        </div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <div className="flex flex-col gap-5">
          {/* 수강생 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
              수강생 정보
            </div>
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex flex-col gap-2">
                <div className="w-[592px] gray-800-semibold text-base font-['Pretendard'] leading-normal">
                  이름
                </div>
                <div className="w-full h-[52px] px-4 py-[14px] outline outline-1 rounded-lg outline-gray-200 focus-within:outline-[#563AC0]">
                  <input
                    className="w-full h-6 border-none focus:ring-0"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={postStudentData.name}
                    onChange={onChangeName}
                  />
                </div>
                <div className="w-full text-right text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]">
                  {postStudentData.name.length}/20
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-[592px] gray-800-semibold text-base font-['Pretendard'] leading-normal">
                  전화번호
                </div>
                <div className="w-full h-[52px] px-4 py-[14px] outline outline-1 rounded-lg outline-gray-200 focus-within:outline-[#563AC0]">
                  <input
                    className="w-full h-6 border-none focus:ring-0"
                    type="text"
                    placeholder="전화번호흫 입력해주세요 (-제외)"
                    value={postStudentData.phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-[592px] gray-800-semibold text-base font-['Pretendard'] leading-normal">
                  특이사항
                </div>
                <div className="w-full h-[52px] px-4 py-[14px] outline outline-1 rounded-lg outline-gray-200 focus-within:outline-[#563AC0]">
                  <input
                    className="w-full h-6 border-none focus:ring-0"
                    type="text"
                    placeholder="수강생 특이사항을 적어주세요"
                    value={postStudentData.other}
                    onChange={onChangeOther}
                  />
                </div>
                <div className="w-[592px] text-right text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]">
                  {postStudentData.other.length}/300
                </div>
              </div>
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
              클래스 목록
            </div>
            <button className="flex justify-center gap-2 w-full px-6 py-3.5 border rounded-lg border-primary-600">
              <Image src={PlusCircle} width={24} height={24} alt="" />
              <div className="indigo-500-semibold text-base font-['Pretendard'] leading-normal">
                클래스 추가
              </div>
            </button>
          </div>
          {/* 등록 버튼 */}
          <button className="w-full py-3.5 rounded-lg bg-primary-600">
            <div className="text-white text-base font-semibold font-['Pretendard'] leading-normal">
              등록하기
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
