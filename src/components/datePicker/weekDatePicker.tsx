'use client'
import { useEffect, useState } from 'react'

import AllowLeftIcon from 'public/assets/icons/allow_left.svg'
import AllowRightIcon from 'public/assets/icons/allow_right.svg'

interface dateType {
  year: number
  month: number
  date: number
}

export default function WeekDatePicker(props: any) {
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [dateData, setDateData] = useState<dateType>(props.parentsDateData)
  const [week, setWeek] = useState<number>(props.parentsWeekData)
  const [clickedDate, setClickedDate] = useState<string>(dateData.date.toString())
  const [isClickedDate, setIsClickedDate] = useState<boolean>(false)

  const getCalanderData = () => {
    const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)
    const firstDateOfCurrentMonthData = new Date(dateData.year, dateData.month)
    const lastDateOfCurrnetMonthData = new Date(dateData.year, dateData.month + 1, 0)
    const firstDateOfNextMonthData = new Date(dateData.year, dateData.month + 1)

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

  const onClickDateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setWeek(Number(e.currentTarget.title))
    setClickedDate(e.currentTarget.id)
    setIsClickedDate(true)
  }

  const onClickMonthForwardHandler = () => {
    if (dateData.month === 11) {
      setDateData((preDateData: dateType) => ({
        ...preDateData,
        year: preDateData.year + 1,
        month: 0
      }))
    } else {
      setDateData((preDateData: dateType) => ({
        ...preDateData,
        month: preDateData.month + 1
      }))
    }
  }

  const onClickMonthBackHandler = () => {
    if (dateData.month === 0) {
      setDateData((preDateData: dateType) => ({
        ...preDateData,
        year: preDateData.year - 1,
        month: 11
      }))
    } else {
      setDateData((preDateData: dateType) => ({
        ...preDateData,
        month: preDateData.month - 1
      }))
    }
  }

  const onClickCancelBtn = () => {
    setClickedDate('')
    setWeek(0)
  }

  const onClickCheckHandler = () => {
    props.changeParentsDateData({
      year: dateData.year,
      month: dateData.month,
      date: Number(clickedDate)
    })
    props.changeParentsWeekData(week)
  }

  const dateList = getCalanderData()

  useEffect(() => {
    if (isClickedDate) {
      const dateList = getCalanderData()
      for (var i = 0; i < dateList.length; i++) {
        for (var j = 0; j < dateList[i].date.length; j++) {
          if (dateList[i].date[j].date === clickedDate && dateList[i].date[j].clickable) {
            setWeek(dateList[i].week)
          }
        }
      }
    }
  }, [clickedDate])

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
          {dateData.year}년 {dateData.month + 1}월
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
                    title={data.week.toString()}
                    className={`px-1 py-2 cursor-pointer ${dateData.textColor} ${
                      data.week === week && i !== 0 && i !== 6 ? 'bg-primary-50' : ''
                    } ${data.week === week && i === 0 ? 'bg-primary-700 rounded-l-lg text-white font-bold' : ''} 
                        ${
                          data.week === week && i === 6 ? 'bg-primary-700 rounded-r-lg text-white font-bold' : ''
                        } text-xs text-center`}
                    onClick={e => {
                      dateData.clickable && onClickDateHandler(e)
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
