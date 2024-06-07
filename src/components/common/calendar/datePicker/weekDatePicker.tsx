'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import GetWeekList from '../GetWeekList'

import AllowRight from '@/icons/icon/datePicker/allowRight.svg'
import AllowLeft from '@/icons/icon/datePicker/allowLeft.svg'

interface currentMonthdDataType {
  year: number
  month: number
  week: number
}

interface IProps {
  handleChangeIsClickedDatePicker: () => void
}

export default function WeekDatePicker(props: IProps) {
  const weekData = useRecoilValue(WeekCalendarDateState)
  const setWeekData = useSetRecoilState(WeekCalendarDateState)
  /* calendar 컴포넌트에서는 날짜 값 지역 관리 후 확인 버튼 누르면 recoil을 통해 값 변경 */
  const [dateList, setDateList] = useState(GetWeekList(weekData.year, weekData.month))

  const [currentMonthData, setCurrentMonthData] = useState<currentMonthdDataType>({
    year: weekData.year,
    month: weekData.month,
    week: weekData.week
  })
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const onClickDateHandler = (week: number) => {
    setCurrentMonthData(prev => ({
      ...prev,
      week: week
    }))
  }

  const onClickMonthForwardHandler = () => {
    if (weekData.month === 11) {
      setCurrentMonthData(prev => ({
        ...prev,
        year: prev.year + 1,
        month: 0
      }))
    } else {
      setCurrentMonthData(prev => ({
        ...prev,
        month: prev.month + 1
      }))
    }
  }

  const onClickMonthBackHandler = () => {
    if (weekData.month === 0) {
      setCurrentMonthData(prev => ({
        ...prev,
        year: prev.year - 1,
        month: 11
      }))
    } else {
      setCurrentMonthData(prev => ({
        ...prev,
        month: prev.month - 1
      }))
    }
  }

  const onClickCancelBtn = () => {
    props.handleChangeIsClickedDatePicker()
  }

  const onClickCheckHandler = () => {
    setWeekData(prev => ({
      ...prev,
      year: currentMonthData.year,
      month: currentMonthData.month,
      week: currentMonthData.week
    }))
    props.handleChangeIsClickedDatePicker()
  }

  useEffect(() => {
    const nextMonthData = GetWeekList(currentMonthData.year, currentMonthData.month)
    setDateList(nextMonthData)
  }, [currentMonthData.month])

  return (
    <div className="flex flex-col z-10 bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
      <div className="w-full flex justify-between items-center">
        <AllowLeft className="cursor-pointer" onClick={onClickMonthBackHandler} />
        <div className="w-[126px] text-center gray-900-bold text-xs ">
          {currentMonthData.year}년 {currentMonthData.month + 1}월
        </div>
        <AllowRight className="cursor-pointer" onClick={onClickMonthForwardHandler} />
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
                      data.week === currentMonthData.week && i !== 0 && i !== 6 ? 'bg-primary-50' : ''
                    } ${data.week === currentMonthData.week && i === 0 ? 'bg-primary-700 rounded-l-lg text-white font-bold' : ''} 
                        ${
                          data.week === currentMonthData.week && i === 6
                            ? 'bg-primary-700 rounded-r-lg text-white font-bold'
                            : ''
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
