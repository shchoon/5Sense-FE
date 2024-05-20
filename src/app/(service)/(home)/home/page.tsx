'use client'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import DaySchedule from '@/components/main/DaySchedule'
import { calendarDateState } from '@/lib/state/calendarDateState'
import { useWindowSize } from '@/hooks/useWindowSize'
import Calendar from '@/components/common/calendar/Calendar'

export default function MainPageDay() {
  const { width, height } = useWindowSize()
  const calendarDate = useRecoilValue(calendarDateState)

  return (
    <>
      <Calendar page="main" />
      <DaySchedule dateData={calendarDate} />
    </>
  )
}
