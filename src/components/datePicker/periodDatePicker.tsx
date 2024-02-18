'use client'
import allowLeft from 'public/assets/icons/allow_left.svg'
import allowRight from 'public/assets/icons/allow_right.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useGetHolidayData from '@/hooks/useGetHolidayData'

interface dateType {
  year: number
  month: number
  date: number
}

interface clickDateType {
  firstDate: string
  secondDate: string
}

export default function PeriodDatePicker() {
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDate = new Date()
  const [firstDateData, setFirstDateData] = useState<dateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [secondDateData, setSecondDateData] = useState<dateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })
  const [clickedDate, setClickedDate] = useState<string>('')
  const getFirstHoliData = useGetHolidayData(firstDateData.year)
  const getSecondHoliData = useGetHolidayData(secondDateData.year)

  const getCalanderData = (monthData: dateType) => {
    const lastDateOfLastMonthData = new Date(monthData.year, monthData.month, 0)
    const firstDateOfCurrentMonthData = new Date(
      monthData.year,
      monthData.month
    )
    const lastDateOfCurrnetMonthData = new Date(
      monthData.year,
      monthData.month + 1,
      0
    )
    const firstDateOfNextMonthData = new Date(
      monthData.year,
      monthData.month + 1
    )

    let list = []
    if (firstDateOfCurrentMonthData.getDay() !== 0) {
      for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
        list.push({
          date: lastDateOfLastMonthData.getDate() - i,
          textColor: 'font-semibold text-gray-500',
          clickable: false
        })
      }
    }

    for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
      list.push({ date: i, textColor: 'gray-900-bold', clickable: true })
    }

    if (lastDateOfCurrnetMonthData.getDay() !== 6) {
      for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
        list.push({
          date: i,
          textColor: 'font-semibold text-gray-500',
          clickable: false
        })
      }
    }

    let result = []
    for (var i = 0; i < list.length; i += 7) {
      result.push(list.slice(i, i + 7))
    }

    return result
  }

  const onClickDateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.id)
    setClickedDate(e.currentTarget.id)
  }

  const onClickMonthForwardHandler = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    if (e.currentTarget.id === 'first') {
      if (firstDateData.month === 11) {
        setFirstDateData((preDateData: dateType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      } else {
        setFirstDateData((preDateData: dateType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      }
    } else if (e.currentTarget.id === 'second') {
      if (secondDateData.month === 11) {
        setSecondDateData((preDateData: dateType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      } else {
        setSecondDateData((preDateData: dateType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      }
    }
  }

  const onClickMonthBackHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.id === 'first') {
      if (firstDateData.month === 0) {
        setFirstDateData((preDateData: dateType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      } else {
        setFirstDateData((preDateData: dateType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      }
    } else if (e.currentTarget.id === 'second') {
      if (secondDateData.month === 0) {
        setSecondDateData((preDateData: dateType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      } else {
        setSecondDateData((preDateData: dateType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      }
    }
  }

  const onClickCancelBtn = () => {
    setClickedDate('')
  }

  const currentMonthDateList = getCalanderData(firstDateData)
  const nextMonthDateList = getCalanderData(secondDateData)

  return (
    <div className="flex gap-6">
      {/* current month */}
      <div className="flex flex-col gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          <Image
            id="first"
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={e => onClickMonthBackHandler(e)}
          />
          <div className="w-[126px] text-center gray-900-bold text-xs font-['Pretendard']">
            {firstDateData.year}년 {firstDateData.month + 1}월
          </div>
          <Image
            id="first"
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
            className="cursor-pointer"
            onClick={e => onClickMonthForwardHandler(e)}
          />
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">
                    {date}
                  </div>
                </div>
              )
            })}
          </div>
          {currentMonthDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData, i) => {
                  return (
                    <div
                      key={i}
                      id={dateData.date.toString()}
                      className={`px-1 py-2 cursor-pointer ${
                        clickedDate === dateData.date.toString() &&
                        dateData.clickable
                          ? 'bg-primary-700 border rounded-lg'
                          : ''
                      }`}
                      onClick={e => {
                        dateData.clickable && onClickDateHandler(e)
                      }}
                    >
                      <div
                        className={`text-xs text-center ${
                          clickedDate === dateData.date.toString() &&
                          dateData.clickable
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
        <div
          className="w-full flex h-[37px] px-3 py-2 justify-center btn-white text-sm gray-800-semibold"
          onClick={onClickCancelBtn}
        >
          취소
          {/* <div className="w-[121px] h-full px-3 py-2 flex justify-center text-sm font-semibold btn-purple">
          확인
        </div> */}
        </div>
      </div>
      {/* next month */}
      <div className="flex flex-col gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          <Image
            id="second"
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={e => onClickMonthBackHandler(e)}
          />
          <div className="w-[126px] text-center gray-900-bold text-xs font-['Pretendard']">
            {secondDateData.year}년 {secondDateData.month + 1}월
          </div>
          <Image
            id="second"
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
            className="cursor-pointer"
            onClick={e => onClickMonthForwardHandler(e)}
          />
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">
                    {date}
                  </div>
                </div>
              )
            })}
          </div>
          {nextMonthDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData, i) => {
                  return (
                    <div
                      key={i}
                      id={dateData.date.toString()}
                      className={`px-1 py-2 cursor-pointer ${
                        clickedDate === dateData.date.toString() &&
                        dateData.clickable
                          ? 'bg-primary-700 border rounded-lg'
                          : ''
                      }`}
                      onClick={e => {
                        dateData.clickable && onClickDateHandler(e)
                      }}
                    >
                      <div
                        className={`text-xs text-center ${
                          clickedDate === dateData.date.toString() &&
                          dateData.clickable
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
        <div
          className="w-full flex h-[37px] px-3 py-2 justify-center text-sm font-semibold btn-purple"
          //onClick={onClickCancelBtn}
        >
          확인
        </div>
      </div>
    </div>
  )
}
