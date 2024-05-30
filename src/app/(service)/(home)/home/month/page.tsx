'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import MonthSchedule from '@/components/main/MonthSchedule'
import MonthCalendar from '@/components/common/calendar/MonthCalendar'
import { MonthCalendarDateState } from '@/lib/state/calendar/MonthCalendarState'

export default function MonthDateTab() {
  const dateData = useRecoilValue(MonthCalendarDateState)
  
  
  return (
    <>
    <MonthCalendar />
    <MonthSchedule dateData={dateData} /> 
    </>
  )
}
