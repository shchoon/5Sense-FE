'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import DaySchedule from '@/components/main/DaySchedule'
import { calendarDateState } from '@/lib/state/calendarDateState'
import { useWindowSize } from '@/hooks/useWindowSize'
import Calendar from '@/components/common/calendar/Calendar'

export default function MainPageDay() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const setCalendarDate = useSetRecoilState(calendarDateState)
  const calendarDate = useRecoilValue(calendarDateState)

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
      <Calendar page="main" />
      <DaySchedule dateData={calendarDate} />
    </>
  )
}
