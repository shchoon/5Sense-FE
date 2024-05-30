'use client'
import { useRecoilValue } from "recoil"

import WeekCalendar from "@/components/common/calendar/WeekCalendar"
import { WeekCalendarDateState } from "@/lib/state/calendar/WeekCalendarDateState"

export default function MainPageWeek() {
  const weekdata = useRecoilValue(WeekCalendarDateState)
  console.log(weekdata)
  return (
    <>
      <WeekCalendar />
      {/* <WeekSchedule dateData={dateData} week={weekData} /> */}
      {/* {modal && (
        <Modal>
          <DetailClassModal {...props} onClose={() => setModal(false)} />
        </Modal>
      )} */}
    </>
  )
}
