'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'

import AllowLeftIcon from 'public/assets/icons/allow_left.svg'
import AllowRightIcon from 'public/assets/icons/allow_right.svg'

interface dateType {
  year: number
  month: number
  date: number
}

interface IProps {
  handleChangeIsClickedDatePicker: () => void
}

export default function WeekDatePicker(props: IProps) {
  const weekData = useRecoilValue(WeekCalendarDateState)
  const setWeekData = useSetRecoilState(WeekCalendarDateState)
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  //const [dateData, setDateData] = useState<dateType>(props.parentsDateData)
  //const [week, setWeek] = useState<number>(props.parentsWeekData)
  //const [clickedDate, setClickedDate] = useState<string>(weekData.date.toString())
  //const [isClickedDate, setIsClickedDate] = useState<boolean>(false)

  const getCalanderData = () => {
    const lastDateOfLastMonthData = new Date(weekData.year, weekData.month, 0)
    const firstDateOfCurrentMonthData = new Date(weekData.year, weekData.month)
    const lastDateOfCurrnetMonthData = new Date(weekData.year, weekData.month + 1, 0)
    const firstDateOfNextMonthData = new Date(weekData.year, weekData.month + 1)

    let list = []
    if (firstDateOfCurrentMonthData.getDay() !== 0) {
      for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
        list.push({
          date: `${lastDateOfLastMonthData.getDate() - i}`,
          textColor: 'font-semibold text-gray-500',
          clickable: false
        })
      }
    }

    for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
      list.push({ date: `${i}`, textColor: 'gray-900-bold', clickable: true })
    }

    if (lastDateOfCurrnetMonthData.getDay() !== 6) {
      for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
        list.push({
          date: `${i}`,
          textColor: 'font-semibold text-gray-500',
          clickable: false
        })
      }
    }

    let result = []
    let weekNumber = 1
    for (var i = 0; i < list.length; i += 7) {
      result.push({ date: list.slice(i, i + 7), week: weekNumber })
      weekNumber++
    }

    return result
  }

  const onClickDateHandler = (week: number) => {
    setWeekData(prev => ({
      ...prev,
      week: week
    }))

  }

  const onClickMonthForwardHandler = () => {
    if (weekData.month === 11) {
      setWeekData(prev => ({
        ...prev,
        year: prev.year + 1,
        month: 0
      }))
    } else {
      setWeekData(prev => ({
        ...prev,
        month: prev.month + 1
      }))
    }
  }

  const onClickMonthBackHandler = () => {
    if (weekData.month === 0) {
      setWeekData(prev => ({
        ...prev,
        year: prev.year - 1,
        month: 11
      }))
    } else {
      setWeekData(prev => ({
        ...prev,
        month: prev.month - 1
      }))
    }
  }

  const onClickCancelBtn = () => {
    props.handleChangeIsClickedDatePicker()
  }

  const onClickCheckHandler = () => {
    props.handleChangeIsClickedDatePicker()
  }

  const dateList = getCalanderData()

  return (
    <div className="flex flex-col z-10 bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
      <div className="w-full flex justify-between">
        <AllowLeftIcon
          width={20}
          height={20}
          alt="allowLeft"
          className="cursor-pointer"
          onClick={onClickMonthBackHandler}
        />
        <div className="w-[126px] text-center gray-900-bold text-xs ">
          {weekData.year}년 {weekData.month + 1}월
        </div>
        <AllowRightIcon
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
                <div className="text-xs text-center font-semibold text-gray-500">{date}</div>
              </div>
            )
          })}
        </div>
        {dateList.map((data, i) => {
          return (
            <div key={i} className="w-full h-[34px] grid grid-cols-7">
              {data.date.map((dateData, i) => {
                return (
                  <div
                    key={i}
                    id={dateData.date}
                    className={`px-1 py-2 cursor-pointer ${dateData.textColor} ${
                      data.week === weekData.week && i !== 0 && i !== 6 ? 'bg-primary-50' : ''
                    } ${data.week === weekData.week && i === 0 ? 'bg-primary-700 rounded-l-lg text-white font-bold' : ''} 
                        ${
                          data.week === weekData.week && i === 6 ? 'bg-primary-700 rounded-r-lg text-white font-bold' : ''
                        } text-xs text-center`}
                    onClick={() => {
                      dateData.clickable && onClickDateHandler(data.week)
                    }}
                  >
                    {dateData.date}
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
          onClick={onClickCancelBtn}
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
