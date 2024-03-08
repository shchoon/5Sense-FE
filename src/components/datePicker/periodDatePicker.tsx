'use client'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { dateDataType } from './dayDatePicker'
import { useGetCalendarData } from '@/hooks/useGetCalendarData'

import allowLeft from 'public/assets/icons/allow_left.svg'
import allowRight from 'public/assets/icons/allow_right.svg'

interface clickedDateType {
  year: undefined | number
  month: undefined | number
  date: undefined | number
}

export default function PeriodDatePicker() {
  const currentDate = new Date()
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [firstDateData, setFirstDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })

  const [secondDateData, setSecondDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })

  const [clickedDate, setClickedDate] = useState<string>(``)
  const [firstClickedDate, setFirstClickedDate] = useState<clickedDateType>({
    year: undefined,
    month: undefined,
    date: undefined
  })
  const [secondClickedDate, setSecondClickedDate] = useState<clickedDateType>({
    year: undefined,
    month: undefined,
    date: undefined
  })

  const firstDateList = useGetCalendarData(firstDateData)
  const secondDateList = useGetCalendarData(secondDateData)

  const onClickFirstDateHandler = (date: number) => {
    setFirstClickedDate(prev => ({
      ...prev,
      year: firstDateData.year,
      month: firstDateData.month,
      date: date
    }))
  }

  const onClickSecondDateHandler = (date: number) => {
    setSecondClickedDate(prev => ({
      ...prev,
      year: secondDateData.year,
      month: secondDateData.month,
      date: date
    }))
  }

  const onClickMonthForwardHandler = (dateData: dateDataType, type: string) => {
    if (dateData.year === 2025 && dateData.month === 11) {
      return
    }
    if (dateData.month === 11) {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      }
    } else {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      }
    }
  }

  const onClickMonthBackHandler = (dateData: dateDataType, type: string) => {
    if (
      dateData.year === currentDate.getFullYear() &&
      ((type === 'first' && dateData.month === currentDate.getMonth()) ||
        (type === 'second' && dateData.month === currentDate.getMonth() + 1))
    ) {
      return
    }
    if (dateData.year === 2021 && dateData.month === 0) {
      return
    }
    if (dateData.month === 0) {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      }
    } else {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      }
    }
  }

  const onClickCancelHandler = () => {
    setFirstClickedDate(prev => ({
      ...prev,
      date: undefined
    }))
    setSecondClickedDate(prev => ({
      ...prev,
      date: undefined
    }))
  }

  const onClickCheckHandler = () => {
    console.log(firstClickedDate, secondClickedDate)
    /* props.changeParentsDateData({
      year: dateData.year,
      month: dateData.month,
      date: Number(clickedDate)
    }) */
  }

  console.log(firstClickedDate, secondClickedDate)
  return (
    <div className="w-[592px] p-4 flex gap-6">
      {/* 첫 번째 달력 */}
      <div className="flex flex-col bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          <Image
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={() => {
              onClickMonthBackHandler(firstDateData, 'first')
              onClickMonthBackHandler(secondDateData, 'second')
            }}
          />
          <div className="w-full text-center gray-900-bold text-xs font-['Pretendard']">
            {firstDateData.year}년 {firstDateData.month + 1}월
          </div>
          {/* <Image
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
            className="cursor-pointer"
            onClick={onClickMonthForwardHandler}
          /> */}
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">{date}</div>
                </div>
              )
            })}
          </div>
          {firstDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className={`px-1 py-2 cursor-pointer ${
                        (dateData.clickable &&
                          firstDateData.year === firstClickedDate.year &&
                          firstDateData.month === firstClickedDate.month &&
                          firstClickedDate.date === dateData.date) ||
                        (firstDateData.month === secondClickedDate.month && secondClickedDate.date === dateData.date)
                          ? 'bg-primary-700 border rounded-lg'
                          : ''
                      }
                      /* 같은 월인 경우 */
                      ${
                        secondClickedDate.month !== firstDateData.month &&
                        secondClickedDate.date !== undefined &&
                        firstClickedDate.date !== undefined &&
                        firstClickedDate.month !== undefined &&
                        dateData.clickable &&
                        firstDateData.month === firstClickedDate.month &&
                        dateData.date > firstClickedDate.date &&
                        'bg-red-100'
                      }
                      /* 달력 월 > 시작 지정 월 */
                      ${
                        secondClickedDate.month !== undefined &&
                        secondClickedDate.month > firstDateData.month &&
                        secondClickedDate.date !== undefined &&
                        firstClickedDate.date !== undefined &&
                        firstClickedDate.month !== undefined &&
                        dateData.clickable &&
                        firstDateData.month > firstClickedDate.month &&
                        'bg-red-100'
                      }
                      /* 달력 월 == 종료 지정 월 */
                      ${
                        secondClickedDate.month === firstDateData.month &&
                        dateData.clickable &&
                        secondClickedDate.date !== undefined &&
                        dateData.date < secondClickedDate.date &&
                        'bg-red-100'
                      }
                      `}
                      onClick={e => {
                        dateData.clickable && onClickFirstDateHandler(dateData.date)
                      }}
                    >
                      <div
                        className={`text-xs text-center ${
                          (dateData.clickable &&
                            firstClickedDate.month === firstDateData.month &&
                            firstClickedDate.date === dateData.date) ||
                          (firstDateData.month === secondClickedDate.month && secondClickedDate.date === dateData.date)
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
        <div className="w-full h-[37px]">
          <div
            className="w-full h-full px-3 py-2 flex justify-center btn-white text-sm gray-800-semibold"
            onClick={onClickCancelHandler}
          >
            취소
          </div>
        </div>
      </div>
      {/* 두번째 달력 */}
      <div className="flex flex-col bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          {/* <Image
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={onClickMonthBackHandler}
          /> */}
          <div className="w-full text-center gray-900-bold text-xs font-['Pretendard']">
            {secondDateData.year}년 {secondDateData.month + 1}월
          </div>
          <Image
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
            className="cursor-pointer"
            onClick={() => {
              onClickMonthForwardHandler(firstDateData, 'first')
              onClickMonthForwardHandler(secondDateData, 'second')
            }}
          />
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">{date}</div>
                </div>
              )
            })}
          </div>
          {secondDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className={`px-1 py-2 cursor-pointer ${
                        dateData.clickable &&
                        ((secondClickedDate.month === secondDateData.month &&
                          secondClickedDate.date === dateData.date) ||
                          (secondDateData.month === firstClickedDate.month && firstClickedDate.date === dateData.date))
                          ? 'bg-primary-700 border rounded-lg'
                          : ''
                      }
                      /* 현재 월 == 종료 지정 월 */
                      ${
                        dateData.clickable &&
                        firstClickedDate.date !== undefined &&
                        secondClickedDate.month !== undefined &&
                        secondClickedDate.date !== undefined &&
                        secondDateData.month === secondClickedDate.month &&
                        dateData.date < secondClickedDate.date &&
                        'bg-red-100'
                      }
                      /* 현재 월 < 종료 지정 월 */
                      ${
                        dateData.clickable &&
                        firstClickedDate.month !== undefined &&
                        firstClickedDate.date !== undefined &&
                        secondClickedDate.month !== undefined &&
                        secondClickedDate.date !== undefined &&
                        secondDateData.month > firstClickedDate.month &&
                        secondDateData.month < secondClickedDate.month &&
                        'bg-red-100'
                      }
                      ${
                        dateData.clickable &&
                        firstClickedDate.date !== undefined &&
                        secondDateData.month === firstClickedDate.month &&
                        dateData.date > firstClickedDate.date &&
                        'bg-red-100'
                      }
                      `}
                      onClick={e => {
                        dateData.clickable && onClickSecondDateHandler(dateData.date)
                      }}
                    >
                      <div
                        className={`text-xs text-center ${
                          dateData.clickable &&
                          ((secondClickedDate.month === secondDateData.month &&
                            secondClickedDate.date === dateData.date) ||
                            (secondDateData.month === firstClickedDate.month &&
                              firstClickedDate.date === dateData.date))
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
        <div className="w-full h-[37px]">
          <div
            className="w-full h-full px-3 py-2 flex justify-center text-sm font-semibold btn-purple"
            onClick={onClickCheckHandler}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  )
}
