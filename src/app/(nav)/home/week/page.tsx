'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import WeekSchedule from '@/components/main/WeekSchedule'
import { useWindowSize } from '@/hooks/useWindowSize'
import CalendarIcon from '../../../../../public/assets/icons/calendar'
import DateSlideTab from '@/components/main/DateSlideTab'
import WeekDatePicker from '@/components/datePicker/weekDatePicker'
import { dateDataType } from '@/components/datePicker/dayDatePIcker'

import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'

export default function MainPageWeek() {
  const [dayData, setDayData] = useState<any>([])
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const currentDateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const [weekData, setWeekData] = useState<number>(
    Math.ceil((dateData.date + new Date(dateData.year, dateData.month, 0).getDay() + 1) / 7)
  )
  console.log(dateData.date, new Date(dateData.year, dateData.month, 0).getDay())
  const [weekLength, setWeekLength] = useState<{
    lastMonthLength: number
    currentMonthLength: number
  }>({
    lastMonthLength: 0,
    currentMonthLength: 0
  })
  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)
  const [isClickedArrow, setIsClickedArrow] = useState<boolean>(false)
  const [clickArrowCount, setClickArrowCount] = useState(0)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  function clickDayTab(e: any) {
    const date = Number(e.currentTarget.id)
    setDateData(prevDateData => ({
      ...prevDateData,
      date: date
    }))
  }

  function moveForwardWeek() {
    const maxWeek = weekLength.currentMonthLength
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData === maxWeek) {
      if (dateData.month === 11) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 0,
          date: 1
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1,
          date: 1
        })
      }
      setWeekData(1)
    } else {
      setWeekData(weekData + 1)
      setDateData(prevDateData => ({
        ...prevDateData,
        date: Number(dayData[weekData].date[0].date)
      }))
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }

  function moveBackWeek() {
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData === 1) {
      setWeekData(weekLength.lastMonthLength)
      if (dateData.month === 0) {
        setDateData(prevDateData => ({
          ...prevDateData,
          year: dateData.year - 1,
          month: 11,
          date: 31
        }))
      } else {
        setDateData(prevDateData => ({
          ...prevDateData,
          month: dateData.month - 1,
          date: new Date(dateData.year, dateData.month, 0).getDate()
        }))
      }
    } else {
      setDateData(prevDateData => ({
        ...prevDateData,
        date: Number(dayData[weekData - 2].date[6].date)
      }))
      setWeekData(weekData - 1)
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }
  const setDateDataFromChild = (data: dateDataType, date: number, type: string) => {
    setDateData({
      ...dateData,
      year: data.year,
      month: data.month,
      date: data.date
    })
    setIsClickedDatePicker(false)
  }

  const setWeekDataFromChild = (week: number) => {
    setWeekData(week)
  }

  const getCalanderData = (monthData: number) => {
    const lastDateOfLastMonthData = new Date(dateData.year, monthData, 0)
    const firstDateOfCurrentMonthData = new Date(dateData.year, monthData)
    const lastDateOfCurrnetMonthData = new Date(dateData.year, monthData + 1, 0)
    const firstDateOfNextMonthData = new Date(dateData.year, monthData + 1)

    let list = []
    if (firstDateOfCurrentMonthData.getDay() !== 0) {
      for (var i = lastDateOfLastMonthData.getDay(); i >= 0; i--) {
        list.push({
          date: `${lastDateOfLastMonthData.getDate() - i}`
        })
      }
    }

    for (var i = 1; i <= lastDateOfCurrnetMonthData.getDate(); i++) {
      list.push({ date: `${i}` })
    }

    if (lastDateOfCurrnetMonthData.getDay() !== 6) {
      for (var i = 1; i <= 7 - firstDateOfNextMonthData.getDay(); i++) {
        list.push({
          date: `${i}`
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

  useEffect(() => {
    const lastWeekList = getCalanderData(dateData.month - 1)
    const currentWeekList = getCalanderData(dateData.month)
    setWeekLength(prev => ({
      ...prev,
      lastMonthLength: lastWeekList.length,
      currentMonthLength: currentWeekList.length
    }))
    setDayData(currentWeekList)
  }, [dateData.month])

  /* post 할 데이터 dateData 바꾸기 */
  return (
    <>
      <div className="mt-[80px] w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackWeek}
            >
              <ChevronLeftIcon width={24} height={24} alt=" " />
            </div>
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base  cursor-pointer hover:text-primary-600"
              onClick={onClickDatePickerHandler}
            >
              <CalendarIcon width="18" height="18" color={isClickedDatePicker ? '#7354E8' : '#6B7280'} />
              {dateData.year}년 {dateData.month + 1}월 {weekData}주차
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardWeek}
            >
              <ChevronRightIcon width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
          {isClickedDatePicker && (
            <div className="absolute w-[255px] z-10 right-0 left-0 mx-auto top-[60px]">
              <WeekDatePicker
                changeParentsDateData={setDateDataFromChild}
                changeParentsWeekData={setWeekDataFromChild}
                parentsDateData={dateData}
                parentsWeekData={weekData}
              />
            </div>
          )}
        </div>
      </div>
      {/* 요일 선택 탭 */}
      <div className="w-full flex max-w-[1016px] mx-auto justify-end pt-[32px]">
        <div className="w-[51px] xl:mr-5 lg:mr-4"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dayData[weekData - 1]?.date.map((data: any, i: number) => {
            return (
              <div
                key={i}
                id={data.date}
                className={`xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col border rounded-lg bg-white cursor-pointer
                ${
                  currentDateData.year === dateData.year &&
                  currentDateData.month === dateData.month &&
                  currentDateData.date === Number(data.date)
                    ? 'border-primary-600'
                    : 'border-gray-200'
                }`}
                onClick={clickDayTab}
              >
                <div
                  className={`text-center text-sm font-medium ${
                    currentDateData.year === dateData.year &&
                    currentDateData.month === dateData.month &&
                    currentDateData.date === Number(data.date)
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  {dayName[i]}
                </div>
                <div
                  className={`text-center text-xl font-bold ${
                    currentDateData.year === dateData.year &&
                    currentDateData.month === dateData.month &&
                    currentDateData.date === Number(data.date)
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  {data.date}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <WeekSchedule dateData={dateData} week={weekData} />
    </>
  )
}
