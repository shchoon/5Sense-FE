'use client'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

import WeekCalendar from '@/components/common/calendar/WeekCalendar'
import WeekSchedule from '@/components/main/WeekSchedule'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import { Drawer } from 'flowbite-react'
import { DetailClassState } from '@/lib/state/detailClassState'
import instance from '@/lib/api/axios'

export default function MainPageWeek() {
  const detailClassState = useRecoilValue(DetailClassState)
  const setDetailClassState = useSetRecoilState(DetailClassState)
  const weekdata = useRecoilValue(WeekCalendarDateState)
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => setIsOpen(false)

  const classDetail = {
    type: 'duration',
    categoryName: '수영',
    className: '수영 초급반',
    capacity: 5,
    teacher: '박태환',
    memo: '메모메모메모메모메모메모메모메모'
  }

  useEffect(() => {
    if (detailClassState.id !== 0) {
      instance.get(`/${detailClassState.type}-lessons/${detailClassState.id}/details`).then(res => {
        console.log(res)
      })
    }
  }, [detailClassState])

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
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header />
        <Drawer.Items>
          <div className="w-full flex flex-col gap-6">
            {/* 카테고리, 클래스 이름 */}
            <div className="w-full flex flex-col gap-4">
              <div
                className={`flex items-start justify-center w-[72px] px-2.5 py-2 rounded ${
                  classDetail.type === 'duration' ? 'bg-primary-100' : 'bg-secondary-100'
                } `}
              >
                <div
                  className={`${
                    classDetail.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                  } text-xs font-semibold`}
                >
                  {classDetail.categoryName}
                </div>
              </div>
              <div className="gray-900-bold text-[26px] font-bold">{classDetail.className}</div>
            </div>
            {/* 클래스 정보 */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 담당 강사</div>
                <div className="w-full gray-800-medium text-base">{classDetail.teacher}</div>
              </div>
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 클래스 유형</div>
                {classDetail.type === 'duration' ? (
                  <div className="w-full gray-800-medium text-base">기간반</div>
                ) : (
                  <div className="w-full gray-800-medium text-base">회차반</div>
                )}
              </div>
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 최대 수업 정원</div>
                <div className="w-full gray-800-medium text-base">{classDetail.capacity}</div>
              </div>
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 기간 정보</div>
                <div className="w-full gray-800-medium text-base">
                  {/* {classDetail.duration[0].startDate} ~ {classDetail.duration[0].endDate} */}
                  2024-06-15 ~ 2024-07-15
                </div>
              </div>
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 일정 정보</div>
                {/* {classDetail.duration.map((data, index) => {
                    return (
                      <div key={index} className="w-full gray-800-medium text-base">
                        {data.startTime} ~ {data.endTime} / {data.repeatDate}
                      </div>
                    )
                  })} */}
              </div>
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 클래스 메모</div>
                <div className="w-full gray-800-medium text-base">{classDetail.memo}</div>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
