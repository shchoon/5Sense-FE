'use client'

import Image from 'next/image'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { ISession } from '@/app/(nav)/class/register/page'
import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

interface IProps {
  session: ISession
  setSession: Dispatch<SetStateAction<ISession>>
}

export default function Session({ session, setSession }: IProps) {
  const [allCount, setAllCount] = useState('')
  const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    const removedCommaValue = value.replaceAll(',', '')

    setSession(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  }

  const sumTuitionFee = (tutionFee: string, cnt: string) => {
    const removedCommaValue = Number(tutionFee.replaceAll(',', ''))
    const cntToNum = Number(cnt)

    return (removedCommaValue * cntToNum).toLocaleString()
  }

  const handleLessonTime = (type: string) => {
    if (type === 'plus') {
      setSession(prev => ({ ...prev, lessonTime: prev.lessonTime + 30 }))
    } else {
      setSession(prev => ({ ...prev, lessonTime: prev.lessonTime - 30 }))
    }
  }

  const handleStudentCnt = (type: string) => {
    if (type === 'plus') {
      setSession(prev => ({ ...prev, capacity: prev.capacity + 1 }))
    } else {
      setSession(prev => ({ ...prev, capacity: prev.capacity - 1 }))
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
                value={session.tuitionFee}
                onChange={changeTuitionFee}
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
                value={allCount}
                onChange={e => setAllCount(e.target.value)}
              />
              <span className="text-gray-400 text-base font-normal">회</span>
            </div>
          </div>
          <div className="w-full p-5 bg-gray-50 rounded-lg flex flex-col">
            <div className="flex w-full">
              <span className="gray-900-semibold text-base">총 금액</span>
              <span className="flex-grow text-right text-indigo-500 text-[22px] font-bold">
                {sumTuitionFee(session.tuitionFee, allCount)}원
              </span>
            </div>
            <p className="text-right text-gray-500 text-xs font-medium">만원</p>
          </div>
        </div>
      </div>
      {/* 상세 내역 */}
      <div className="detailInfo w-full flex flex-col gap-3 mt-6">
        <p className="gray-800-semibold text-base">상세 내역</p>
        <div className="w-full flex">
          <div className="w-[3px] h-[21px] bg-indigo-500 rounded-sm" />
          <div className="text-gray-600 text-sm font-normal ml-3.5">1회 금액 * 총 회차</div>
          <div className="flex-grow text-right text-gray-600 text-sm font-normal">
            {session.tuitionFee}*{allCount}회
          </div>
        </div>
      </div>
      {/* 소요 시간*/}
      <div className="time w-full flex flex-col gap-2 mt-10">
        <div className="gray-800-semibold text-base">소요 시간</div>
        <div className="w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full">
          <button
            disabled={session.lessonTime === 0}
            className={`w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer disabled:bg-gray-200`}
            onClick={() => handleLessonTime('minus')}
          >
            <MinusIcon />
          </button>
          <div className="w-[186px] h-[27px] flex justify-center items-center gray-800-semibold text-lg">
            {session.lessonTime}분
          </div>
          <button
            className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer"
            onClick={() => {
              handleLessonTime('plus')
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      {/* 최대 수업 정원*/}
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="text-base gray-800-semibold">최대 수업 정원</div>
        <div className="w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full">
          <button
            disabled={session.capacity === 1}
            className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600 cursor-pointer disabled:bg-gray-200"
            onClick={() => {
              handleStudentCnt('minus')
            }}
          >
            <MinusIcon />
          </button>
          <div className="flex items-center justify-center text-lg gray-800-semibold">{session.capacity}명</div>
          <button
            className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600 cursor-pointer"
            onClick={() => {
              handleStudentCnt('plus')
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
