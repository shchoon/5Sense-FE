'use client'
import { useEffect} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DaySchedule from '@/components/main/DaySchedule'
import DayCalendar from '@/components/common/calendar/DayCalendar'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'

export default function MainPageDay() {
  
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)
  const calendarDate = useRecoilValue(DayCalendarDateState)

  useEffect(() => {
    return () => {
      const currentDate = new Date()
      setCalendarDate({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
      })
    }
  }, [])
  
  return (
    <>
    <DayCalendar page='main' />
    <DaySchedule dateData={calendarDate} />
    </>
  )
}
