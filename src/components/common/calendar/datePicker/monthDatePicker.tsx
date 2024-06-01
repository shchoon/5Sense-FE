'use client'
import { useState } from 'react'

import AllowRight from '@/icons/icon/datePicker/allowRight.svg'
import AllowLeft from '@/icons/icon/datePicker/allowLeft.svg'

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

  const [dateData, setDateData] = useState<dateType>(props.parentsDateData)
  const [clickedMonth, setClickedMonth] = useState<string>(dateData.month.toString())
  const onClickMonthHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickedMonth(e.currentTarget.id)
  }

  const onClickYearForwardHandler = () => {
    if (dateData.year === 2025) {
      return
    }
    setDateData((prevDateData: dateType) => ({
      ...prevDateData,
      year: dateData.year + 1,
      month: dateData.month
    }))
    props.changeParentsDateData(
      {
        year: dateData.year + 1,
        month: dateData.month
      },
      'arrow'
    )
  }

  const onClickYearBackHandler = () => {
    if (dateData.year === 2021) {
      return
    }
    setDateData((prevDateData: dateType) => ({
      ...prevDateData,
      year: dateData.year - 1,
      month: dateData.month
    }))
    props.changeParentsDateData(
      {
        year: dateData.year - 1,
        month: dateData.month
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
      <div className="w-full flex justify-between items-center">
        <AllowLeft className="cursor-pointer" onClick={onClickYearBackHandler} />
        <div className="w-[126px] text-center gray-900-bold text-xs">{dateData.year}년</div>
        <AllowRight className="cursor-pointer" onClick={onClickYearForwardHandler} />
      </div>
      {/* 달력 */}
      <div className="w-full grid grid-cols-3 gap-4">
        {monthData.map((date, i) => {
          return (
            <div
              key={i}
              id={`${i}`}
              className={`px-1 py-2 h-[32px] cursor-pointer text-xs text-center gray-900-medium ${
                clickedMonth === date && 'border rounded-lg bg-primary-700 text-white'
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
