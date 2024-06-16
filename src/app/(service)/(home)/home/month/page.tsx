'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import MonthSchedule from '@/components/main/MonthSchedule'
import MonthCalendar from '@/components/common/calendar/MonthCalendar'
import { MonthCalendarDateState } from '@/lib/state/calendar/MonthCalendarDateState'
import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react'
import { MonthDetailClassState } from '@/lib/state/monthDetailClassState'
import { formatClassTime } from '@/utils'

export default function MonthDateTab() {
  const dateData = useRecoilValue(MonthCalendarDateState)
  const [isOpen, setIsopen] = useState(false)
  
  const classDetails = useRecoilValue(MonthDetailClassState)
  const setClassDetails = useSetRecoilState(MonthDetailClassState)
  const handleClose = () => {
    setClassDetails([])
    setIsopen(false)
  }
  useEffect(() => {
    if(classDetails.length !== 0){
      setIsopen(true)
    }
  }, [classDetails])

  console.log(classDetails, dateData)
  
  return (
    <>
    <MonthCalendar />
    <MonthSchedule dateData={dateData} /> 
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header />
      <Drawer.Items>
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex flex-col gap-4'>
            <div className='w-[91px] rounded px-2 py-1 '></div>
            <div className='gray-900-bold text-[26px] h-[39px] leading-[39px]'>타임라인</div>
          </div>
        {classDetails.map((data: any, i: number) => {
          return (
            <div className='w-fill flex flex-col gap-2'>
              <span className='gray-800-semibold text-base'>{formatClassTime(data.startTime)}</span>              
              <div className='w-full flex flex-col gap-7 border border-1 border-gray-200 rounded-lg p-4'>
                {data.data.map((classData: any, i: number) => {
                  return (
                    <div className='w-full flex gap-4'>
                      <span className={`w-[3px] ${classData.type === 'duration' ? 'bg-primary-600' : 'bg-secondary-600'}`} />
                      <div className='flex-1 flex-col items-start'>
                        <div className='flex gap-1.5'>
                          <span className='h-[21px] text-[14px] gray-800-medium leading-[21px]'>{classData.teacher}</span>
                          <span className='h-[21px] text-[14px] gray-800-medium leading-[21px]'>·</span>
                          <span className='h-[21px] text-[14px] gray-800-medium leading-[21px]'>{classData.room}</span>
                        </div>
                        <div className='gray-800-semibold text-[16px]'>{classData.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        </div>
      </Drawer.Items>
    </Drawer>
    </>
  )
}
