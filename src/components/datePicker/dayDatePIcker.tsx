'use client'
import allowLeft from 'public/assets/icons/allow_left.svg'
import allowRight from 'public/assets/icons/allow_right.svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useGetCalendarData } from '@/hooks/useGetCalendarData'

export interface dateDataType {
  year: number
  month: number
  date: number
}

export default function DayDatePicker(props: any) {
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [dateData, setDateData] = useState<dateDataType>(props.parentsDateData)
  const [clickedDate, setClickedDate] = useState<string>(`${dateData.date}`)

  const dateList = useGetCalendarData(dateData)

  const onClickDateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickedDate(e.currentTarget.id)
  }

  const onClickMonthForwardHandler = () => {
    if (dateData.year === 2025 && dateData.month === 11) {
      return
    }
    if (dateData.month === 11) {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        year: preDateData.year + 1,
        month: 0
      }))
    } else {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        month: preDateData.month + 1
      }))
    }
  }

  const onClickMonthBackHandler = () => {
    if (dateData.year === 2021 && dateData.month === 0) {
      return
    }
    if (dateData.month === 0) {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        year: preDateData.year - 1,
        month: 11
      }))
    } else {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        month: preDateData.month - 1
      }))
    }
  }

  const onClickCancelHandler = () => {
    setClickedDate('')
  }

  const onClickCheckHandler = () => {
    props.changeParentsDateData({
      year: dateData.year,
      month: dateData.month,
      date: Number(clickedDate)
    })
  }

  return (
    <div className="flex flex-col bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
      <div className="w-full flex justify-between">
        <Image
          src={allowLeft}
          width={20}
          height={20}
          alt="allowLeft"
          className="cursor-pointer"
          onClick={onClickMonthBackHandler}
        />
        <div className="w-[126px] text-center gray-900-bold text-xs font-['Pretendard']">
          {dateData.year}년 {dateData.month + 1}월
        </div>
        <Image
          src={allowRight}
          width={20}
          height={20}
          alt="allowRight"
          className="cursor-pointer"
          onClick={onClickMonthForwardHandler}
        />
      </div>
      {/* 달력 */}
      <div className="w-[252px]">
        <div className="w-full h-[34px] grid grid-cols-7">
          {dateName.map((date, i) => {
            return (
              <div key={i} className="px-1 py-2 ">
                <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">{date}</div>
              </div>
            )
          })}
        </div>
        {dateList.map((data, i) => {
          return (
            <div key={i} className="w-full h-[34px] grid grid-cols-7">
              {data.map((dateData: any, i: number) => {
                return (
                  <div
                    key={i}
                    id={dateData.date.toString()}
                    className={`px-1 py-2 cursor-pointer ${
                      clickedDate === dateData.date.toString() && dateData.clickable
                        ? 'bg-primary-700 border rounded-lg'
                        : ''
                    }`}
                    onClick={e => {
                      dateData.clickable && onClickDateHandler(e)
                    }}
                  >
                    <div
                      className={`text-xs text-center ${
                        clickedDate === dateData.date.toString() && dateData.clickable
                          ? 'text-white font-bold'
                          : `${dateData.textColor}`
                      } font-['Pretendard']`}
                    >
                      {dateData.date}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="w-full flex h-[37px] justify-between">
        <div
          className="w-[121px] h-full px-3 py-2 flex justify-center btn-white text-sm gray-800-semibold"
          onClick={onClickCancelHandler}
        >
          취소
        </div>
        <div
          className="w-[121px] h-full px-3 py-2 flex justify-center text-sm font-semibold btn-purple"
          onClick={onClickCheckHandler}
        >
          확인
        </div>
      </div>
    </div>
  )
}
