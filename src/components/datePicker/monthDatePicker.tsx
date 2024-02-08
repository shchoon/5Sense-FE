'use client'
import allowLeft from '@/assets/icons/allow_left.svg'
import allowRight from '@/assets/icons/allow_right.svg'
import Image from 'next/image'
import { useState } from 'react'

interface dateType {
  year: number
  month: number
  date: number
}

export default function MonthDatePicker(props: any) {
  let monthData = []
  for (var i = 0; i <= 11; i++) {
    monthData.push(`${i}`)
  }
  const currentDate = new Date()
  /* const [dateData, setDateData] = useState<dateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }) */
  const dateData = props.parentsDateData
  const [clickedMonth, setClickedMonth] = useState<string>('')
  const onClickMonthHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.id)
    setClickedMonth(e.currentTarget.id)
  }

  const onClickYearForwardHandler = () => {
    props.changeParentsDateData(
      {
        year: dateData.year + 1,
        month: 0
      },
      'arrow'
    )
  }

  const onClickYearBackHandler = () => {
    props.changeParentsDateData(
      {
        year: dateData.year - 1,
        month: 11
      },
      'arrow'
    )
  }

  const onClickCancelHandler = () => {
    setClickedMonth('')
  }

  const onClickCheckHandler = () => {
    props.changeParentsDateData(
      {
        year: dateData.year,
        month: Number(clickedMonth)
      },
      'check'
    )
  }

  return (
    <div className="flex flex-col gap-2 w-[255px] bg-white p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
      <div className="w-full flex justify-between">
        <Image
          src={allowLeft}
          width={20}
          height={20}
          alt="allowLeft"
          className="cursor-pointer"
          onClick={onClickYearBackHandler}
        />
        <div className="w-[126px] text-center gray-900-bold text-xs font-['Pretendard']">
          {dateData.year}년
        </div>
        <Image
          src={allowRight}
          width={20}
          height={20}
          alt="allowRight"
          className="cursor-pointer"
          onClick={onClickYearForwardHandler}
        />
      </div>
      {/* 달력 */}
      <div className="w-full grid grid-cols-3 gap-4">
        {monthData.map((date, i) => {
          return (
            <div
              key={i}
              id={`${i}`}
              className={`px-1 py-2 h-[32px] cursor-pointer text-xs text-center gray-900-medium font-['Pretendard'] ${
                clickedMonth === date
                  ? 'border rounded-lg bg-primary-700 text-white'
                  : ''
              }`}
              onClick={e => {
                onClickMonthHandler(e)
              }}
            >
              {Number(date) + 1}월
            </div>
          )
        })}
      </div>
      <div className="w-full flex gap-2.5">
        <div
          className="w-full px-3 py-2 flex justify-center btn-white text-sm gray-800-semibold"
          onClick={onClickCancelHandler}
        >
          취소
        </div>
        <div
          className="w-full px-3 py-2 flex justify-center text-sm font-semibold btn-purple"
          onClick={onClickCheckHandler}
        >
          확인
        </div>
      </div>
    </div>
  )
}
