'use client'
import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useWindowSize } from '@/hooks/useWindowSize'
import DateSlideTab from '@/components/main/DateSlideTab'
import WeekDatePicker from '@/components/common/calendar/datePicker/weekDatePicker'
import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import { WeekDateType } from '@/lib/state/calendar/WeekCalendarDateState'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import { modalState } from '@/lib/state/modal'
import Modal from '@/components/common/modal'
import DetailClassModal from '@/components/modal/DetailClassModal'

import ChevronLeft from '@/icons/icon/chevronLefyt.svg'
import ChevronRight from '@/icons/icon/chevronRight.svg'
import CalendarIcon from '@/icons/icon/calendar.svg'


export default function WeekCalendar() {
    const modal = useRecoilValue(modalState)
    const setModal = useSetRecoilState(modalState)
    const weekData = useRecoilValue(WeekCalendarDateState)
    const setWeekData = useSetRecoilState(WeekCalendarDateState)

  const [props, setProps] = useState<{ id: number; type: string }>({
    id: 0,
    type: ''
  })

  const [dayData, setDayData] = useState<any>([])
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const currentDateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }
  /* const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }) */
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  /* const [weekData, setWeekData] = useState<number>(
    Math.ceil((dateData.date + new Date(dateData.year, dateData.month, 0).getDay() + 1) / 7)
  ) */

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

  /* function clickDayTab(e: any) {
    const date = Number(e.currentTarget.id)
    setDateData(prevDateData => ({
      ...prevDateData,
      date: date
    }))
  } */

  const moveForwardWeek = () => {
    const maxWeek = weekLength.currentMonthLength
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData.week === maxWeek) {
      if (weekData.month === 11) {
        setWeekData(prev => ({
          ...prev,
          year: weekData.year + 1,
          month: 0,
          week: 1
        }))
      } else {
        setWeekData(prev => ({
          ...prev,
          month: weekData.month + 1,
          week: 1
        }))
      }
    } else {
      setWeekData(prev => ({
        ...prev,
        week: prev.week + 1,
        date: Number(dayData[weekData.week].date[0].date)
      }))
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }

  const moveBackWeek = () => {
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData.week === 1) {
      setWeekData(prev => ({
        ...prev,
        week: weekLength.lastMonthLength
      }))
      if (weekData.month === 0) {
        setWeekData(prev => ({
          ...prev,
          year: weekData.year - 1,
          month: 11,
          week: prev.week - 1,
          date: 31
        }))
      } else {
        setWeekData(prev => ({
          ...prev,
          month: weekData.month - 1,
          week: prev.week - 1,
          date: new Date(weekData.year, weekData.month, 0).getDate()
        }))
      }
    } else {
      setWeekData(prev => ({
        ...prev,
        week: prev.week - 1,
        date: Number(dayData[weekData.week - 2].date[6].date)
      }))
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }

  const handleChangeIsClickedDatePicker = () => {
    setIsClickedDatePicker(false)
  }

  const getCalanderData = (monthData: number) => {
    const lastDateOfLastMonthData = new Date(weekData.year, monthData, 0)
    const firstDateOfCurrentMonthData = new Date(weekData.year, monthData)
    const lastDateOfCurrnetMonthData = new Date(weekData.year, monthData + 1, 0)
    const firstDateOfNextMonthData = new Date(weekData.year, monthData + 1)

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

  /* useEffect(() => {
    const lastWeekList = getCalanderData(weekData.month - 1)
    const currentWeekList = getCalanderData(weekData.month)
    setWeekLength(prev => ({
      ...prev,
      lastMonthLength: lastWeekList.length,
      currentMonthLength: currentWeekList.length
    }))
    setDayData(currentWeekList)
  }, [weekData.month]) */


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
              <ChevronLeft />
            </div>
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base  cursor-pointer hover:text-primary-600"
              onClick={onClickDatePickerHandler}
            >
              <CalendarIcon />
              {weekData.year}년 {weekData.month + 1}월 {weekData.week}주차
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardWeek}
            >
              <ChevronRight />
            </div>
          </div>
          <DateSlideTab />
          {isClickedDatePicker && (
            <div className="absolute w-[255px] z-10 right-0 left-0 mx-auto top-[60px]">
              <WeekDatePicker
              handleChangeIsClickedDatePicker={handleChangeIsClickedDatePicker}
                //changeParentsDateData={setDateDataFromChild}
                //changeParentsWeekData={setWeekDataFromChild}
                //parentsDateData={dateData}
                //parentsWeekData={weekData}
              />
            </div>
          )}
        </div>
      </div>
      {/* 요일 선택 탭 */}
      <div className="w-full flex max-w-[1016px] mx-auto justify-end pt-[32px]">
        <div className="w-[51px] xl:mr-5 lg:mr-4"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dayData[weekData.week - 1]?.date.map((data: any, i: number) => {
            return (
              <div
                key={i}
                id={data.date}
                className={`xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col border rounded-lg bg-white cursor-pointer
                ${
                  currentDateData.year === weekData.year &&
                  currentDateData.month === weekData.month &&
                  currentDateData.date === Number(data.date)
                    ? 'border-primary-600'
                    : 'border-gray-200'
                }`}
                //onClick={clickDayTab}
              >
                <div
                  className={`text-center text-sm font-medium ${
                    currentDateData.year === weekData.year &&
                    currentDateData.month === weekData.month &&
                    currentDateData.date === Number(data.date)
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  {dayName[i]}
                </div>
                <div
                  className={`text-center text-xl font-bold ${
                    currentDateData.year === weekData.year &&
                    currentDateData.month === weekData.month &&
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
        </>
    )
}