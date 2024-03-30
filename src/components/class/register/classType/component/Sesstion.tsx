'use client'

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'

import Minus from 'public/assets/icons/minus_vector.svg'
import Plus from 'public/assets/icons/plus_vector.svg'
import { ICommonInfo } from '@/app/(nav)/class/register/page'

interface IProps {
  commonInfo: ICommonInfo
  setCommonInfo: Dispatch<SetStateAction<ICommonInfo>>
}

export default function Sesstion({ commonInfo, setCommonInfo }: IProps) {
  const [first, setFirst] = useState<string>('')

  const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    if (!Number(value)) {
      return setFirst('')
    }
    const removedCommaValue = value.replaceAll(',', '')
    setFirst(Number(removedCommaValue.slice(0, 9)).toLocaleString())
  }

  const [lessonTime, setLessonTime] = useState<number>(0)
  const [studentCnt, setStudentCnt] = useState<number>(1)

  const handleLessonTime = (type: string) => {
    if (type === 'plus') {
      setLessonTime(prev => (prev += 30))
    } else {
      setLessonTime(prev => (prev -= 30))
    }
  }

  const handleStudentCnt = (type: string) => {
    if (type === 'plus') {
      setStudentCnt(prev => (prev += 1))
    } else {
      setStudentCnt(prev => (prev -= 1))
    }
  }
  return (
    <div className="w-full flex flex-col">
      {/* 수강료 */}
      <div className="payBox w-full flex flex-col gap-2">
        <p className="gray-800-semibold text-base">수강료</p>
        <div className="flex flex-col gap-2.5">
          <div className="w-full px-5 py-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-between gap-4">
            <div className="flex w-full">
              <span className="text-[#4B5563] text-base font-medium">1회 금액</span>
              <input
                type="text"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal outline-none"
                placeholder="0"
                value={first}
                onChange={changeEnteredNum}
              />
              <span className="text-gray-400 text-base font-normal">원</span>
            </div>
            <div className="w-[552px] h-px bg-gray-200" />
            <div className="flex w-full">
              <span className="text-[#4B5563] text-base font-medium">총 회차</span>
              <input
                type="number"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal outline-none"
                placeholder="0"
                //   value={count}
                //   onChange={oncountChangeHandler}
              />
              <span className="text-gray-400 text-base font-normal">회</span>
            </div>
          </div>
          <div className="w-full p-5 bg-gray-50 rounded-lg flex flex-col">
            <div className="flex w-full">
              <span className="gray-900-semibold text-base">총 금액</span>
              <span className="flex-grow text-right text-indigo-500 text-[22px] font-bold">원</span>
            </div>
            <p className="text-right text-gray-500 text-xs font-medium   leading-[18px]">만원</p>
          </div>
        </div>
      </div>
      {/* 상세 내역 */}
      <div className="detailInfo w-full flex flex-col gap-3 mt-6">
        <p className="gray-800-semibold text-base">상세 내역</p>
        <div className="w-full flex">
          <div className="w-[3px] h-[21px] bg-indigo-500 rounded-sm" />
          <div className="text-gray-600 text-sm font-normal ml-3.5">1회 금액 * 총 회차</div>
          <div className="flex-grow text-right text-gray-600 text-sm font-normal">hihi</div>
        </div>
      </div>
      {/* 소요 시간*/}
      <div className="time w-full flex flex-col gap-2 mt-10">
        <div className="gray-800-semibold text-base">소요 시간</div>
        <div className="w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full">
          <button
            disabled={lessonTime === 0}
            className={`w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer disabled:bg-gray-200`}
            onClick={() => handleLessonTime('minus')}
          >
            <Image src={Minus} width={12} height={9.6} alt="minus" />
          </button>
          <div className="w-[186px] h-[27px] flex justify-center items-center gray-800-semibold text-lg">
            {lessonTime}분
          </div>
          <button
            className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer"
            onClick={() => {
              handleLessonTime('plus')
            }}
          >
            <Image src={Plus} width={14} height={14} alt="plus" />
          </button>
        </div>
      </div>
      {/* 최대 수업 정원*/}
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="text-base gray-800-semibold">최대 수업 정원</div>
        <div className="w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full">
          <button
            disabled={studentCnt === 1}
            className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600 cursor-pointer disabled:bg-gray-200"
            onClick={() => {
              handleStudentCnt('minus')
            }}
          >
            <Image src={Minus} width={12} height={10} alt="Minus" />
          </button>
          <div className="flex items-center justify-center text-lg gray-800-semibold">{studentCnt}명</div>
          <button
            className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600 cursor-pointer"
            onClick={() => {
              handleStudentCnt('plus')
            }}
          >
            <Image src={Plus} width={14} height={14} alt="Plus" />
          </button>
        </div>
      </div>
    </div>
  )
}
