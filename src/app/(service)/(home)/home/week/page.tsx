'use client'
import { useRecoilValue } from 'recoil'

import WeekCalendar from '@/components/common/calendar/WeekCalendar'
import WeekSchedule from '@/components/main/WeekSchedule'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'

export default function MainPageWeek() {
  const weekdata = useRecoilValue(WeekCalendarDateState)
  console.log(weekdata)
  return (
    <>
      <WeekCalendar />
      <WeekSchedule />
      {/* <WeekSchedule dateData={dateData} week={weekData} /> */}
      {/* {modal && (
        <Modal>
          <DetailClassModal {...props} onClose={() => setModal(false)} />
        </Modal>
      )} */}
    </>
  )
}
