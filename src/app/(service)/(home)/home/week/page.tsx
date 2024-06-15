'use client'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

import WeekCalendar from '@/components/common/calendar/WeekCalendar'
import WeekSchedule from '@/components/main/WeekSchedule'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import { Drawer } from 'flowbite-react'
import { DetailClassState } from '@/lib/state/detailClassState'
import instance from '@/lib/api/axios'
import { changePhoneNUmberToString } from '@/utils'

export default function MainPageWeek() {
  const detailClassState = useRecoilValue(DetailClassState)
  const setDetailClassState = useSetRecoilState(DetailClassState)
  const weekdata = useRecoilValue(WeekCalendarDateState)
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  const [classDetail,setClassDetail] = useState({
    type: '',
    categoryName: '수영',
    className: '',
    capacity: 0,
    teacher: '',
    memo: '',
    students: []
  })

  useEffect(() => {
    if (detailClassState.id !== 0) {
      instance.get(`/${detailClassState.type}-lessons/${detailClassState.id}/details`).then(res => {
        console.log(res)
        const classData = res.data.data
        setClassDetail(prev => ({
          ...prev,
          type: classData.type,
          categoryName: classData.category.subName,
          className: classData.name,
          capacity: classData.capacity,
          teacher: classData.teacher.name,
          memo: classData.memo,
          students: classData.registeredStudents
        }))
      })
      setIsOpen(true)
    }
  }, [detailClassState])

  console.log(detailClassState)
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
              {classDetail.type === 'session' && <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 최대 수업 정원</div>
                <div className="w-full gray-800-medium text-base">{classDetail.capacity}</div>
              </div>}
              {classDetail.type === 'duration' && 
              <>
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
              </>}
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 클래스 메모</div>
                <div className="w-full gray-800-medium text-base">{classDetail.memo}</div>
              </div>
            </div>
            {/* 회원 목록 */}
        <div className="w-full flex flex-col gap-4 p-6 border border-1 border-gray-200 rounded-lg shadow">
          <div className="w-full flex gap-1.5">
            <div className="text-gray-800 text-base font-bold">회원 목록</div>
            <div className="gray-800-semibold text-base">({classDetail.students.length})</div>
          </div>
          {/* 학생 리스트 */}
          <div className="w-full flex flex-col gap-2.5">
            {classDetail.students.map((data: any, index: number) => {
              return (
                <div key={index} className="w-full flex gap-1">
                  <span className="w-[22px] text-primary-600 text-sm font-bold">{index + 1}</span>
                  <div className="w-full flex gap-2.5">
                    <div className="gray-800-medium text-sm">{data.name}</div>
                    <div className="w-[102px] gray-500-normal text-sm">{changePhoneNUmberToString(data.phone)}</div>
                    {classDetail.type === 'session' && (
                      <div className="text-primary-600 text-xs font-semibold">(잔여회차 : {data.sessionCount})</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
