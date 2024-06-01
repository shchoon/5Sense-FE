'use client'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DaySchedule from '@/components/main/DaySchedule'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import DayCalendar from '@/components/common/calendar/DayCalendar'

export default function MainPageDay() {
  const currentDate = new Date()
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)
  const calendarDate = useRecoilValue(DayCalendarDateState)

  useEffect(() => {
    return () => {
      setCalendarDate({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
      })
    }
  }, [])

  return (
    <>
      <DayCalendar page="main" />
      <DaySchedule dateData={calendarDate} />
    </>
  )
}
