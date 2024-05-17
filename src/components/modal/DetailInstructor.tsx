import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import instance from '@/lib/api/axios'

import CloseCircleIcon from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
  onCloseState: () => void
  id: number
}

export default function DetailInstructor({ onClose, onCloseState, id }: IProps) {
  console.log(id)
  const router = useRouter()

  const [teacher, setTeacher] = useState({
    name: '',
    phone: ''
  })

  const [instructorData, setInstructorData] = useState({
    id: 0,
    name: '',
    phone: '',
    durationLessons: [],
    sessionLessons: []
  })
  useEffect(() => {
    instance(`/teachers/${id}`).then(res => {
      const data = res.data.data
      setInstructorData(prev => ({
        ...prev,
        id: data.id,
        name: data.name,
        phone: data.phone,
        durationLessons: data.durationLessons,
        sessionLessons: data.sessionLessons
      }))
    })
  }, [])

  console.log(instructorData)

  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      <CloseCircleIcon
        className="absolute right-6 top-6 cursor-pointer"
        width={35}
        height={35}
        onClick={() => {
          onClose()
          onCloseState()
        }}
      />
      <div className="absolute w-full top-[72px] flex flex-col items-center gap-6">
        <div className="w-[432px] flex flex-col gap-2">
          <div className="gray-900-bold text-[26px]">{instructorData.name}</div>
          <div className="gray-800-medium text-base">
            {instructorData.phone.slice(0, 3)}-{instructorData.phone.slice(3, 7)}-{instructorData.phone.slice(7, 11)}
          </div>
        </div>
        <div className="w-[432px] flex flex-col gap-4 p-6 border border-1 border-gray-200 rounded-lg">
          <div className="gray-800-bold text-base">클래스 목록</div>
          {instructorData.sessionLessons.length !== 0 &&
            instructorData.sessionLessons.map((data: { name: string; totalSessions: number; capacity: number }, i) => {
              return (
                <div
                  key={i}
                  className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 "
                >
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex items-center flex-col gap-px">
                      <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
                      <div className="w-full gray-900-semibold text-[15px]">{data.name}</div>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full flex gap-2">
                        <div className="w-[120px] gray-500-medium text-sm">• 총 세션 횟수</div>
                        <div className="w-full flex items-center gap-px">
                          <div className="w-full gray-500-medium text-sm">{data.totalSessions} 회</div>
                        </div>
                      </div>
                      <div className="w-full flex gap-2">
                        <div className="w-[130px] gray-500-medium text-sm">• 권장 허용 인원</div>
                        <div className="w-full flex items-center gap-px">
                          <div className="w-full gray-500-medium text-sm">{data.capacity} 명</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {instructorData.durationLessons.length !== 0 &&
            instructorData.durationLessons.map((data: any, i) => {
              return (
                <div
                  key={i}
                  className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 "
                >
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex items-center flex-col gap-px">
                      <div className="w-full text-primary-600 text-xs font-bold">기간반</div>
                      <div className="w-full gray-900-semibold text-[15px]">{data.name}</div>
                    </div>
                    {data.schedules.map((scheduleData: any, i: number) => {
                      return (
                        <div key={i} className="w-full flex flex-col items-center gap-2">
                          <div className="w-full flex gap-2">
                            <div className="w-[70px] gray-500-medium text-sm">• 기간</div>
                            <div className="w-full flex items-center gap-px">
                              <div className="w-full gray-500-medium text-sm">
                                {scheduleData.startDate.slice(0, 10)} - {scheduleData.endDate.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex gap-2">
                            <div className="w-[70px] gray-500-medium text-sm">• 시간</div>
                            <div className="w-full flex items-center gap-px">
                              <div className="w-full gray-500-medium text-sm">
                                {scheduleData.startTime.slice(0, 5)} - {scheduleData.endTime.slice(0, 5)}
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex gap-2">
                            <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
                            <div className="w-full flex items-center gap-px">
                              <div className="w-full gray-500-medium text-sm">{scheduleData.repeatDate}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
