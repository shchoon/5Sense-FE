import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import instance from '@/lib/api/axios'
import StudentsDuration from '../studentsDetail/studentsDuartion'
import StudentsSession from '../studentsDetail/studentsSession'

import CloseCircleIcon from 'public/assets/icons/closeCircle.svg'
import PlusIcon from 'public/assets/icons/plus_circle_bg_pri_600.svg'

interface IProps {
  studentsId: string
  onClose: () => void
}

export default function DetailStudent({ studentsId, onClose }: IProps) {
  const router = useRouter()
  const [studentData, setStudentData] = useState({
    name: '',
    particulars: '',
    phone: '',
    sessionLesson: [],
    durationLesson: []
  })
  useEffect(() => {
    instance(`/students/${studentsId}`).then(res => {
      const data = res.data.data
      setStudentData(prev => ({
        ...prev,
        name: data.name,
        particulars: data.particulars,
        phone: data.phone,
        sessionLesson: data.sessionLessons,
        durationLesson: data.durationLessons
      }))
    })
  }, [])

  console.log(studentData)

  return (
    <div className="relative w-[480px]  h-screen rounded-tr-[32px] bg-white">
      <CloseCircleIcon
        className="absolute right-6 top-6 cursor-pointer"
        width={35}
        height={35}
        onClick={() => onClose()}
      />
      <div className="absolute top-[72px] w-full px-6 flex flex-col gap-6">
        {/* 수강생 이름, 번호, 메모 */}
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex items-center flex-col gap-2">
            <div className="w-full gray-900-bold text-[26px]">{studentData.name}</div>
            <div className="w-full gray-800-medium text-base">
              {studentData.phone.slice(0, 3)}-{studentData.phone.slice(3, 7)}-{studentData.phone.slice(7, 11)}
            </div>
          </div>
          <div className="w-full gray-500-normal text-sm">{studentData.particulars}</div>
          {/* 클래스 목록 */}
          <div className="w-full max-h-[760px] overflow-y-auto py-6 px-6 flex items-center flex-col gap-4 border border-1 border-gray-200 rounded-lg shadow">
            <div className="w-full gray-800-bold text-base">클래스 목록</div>

            <div className="w-full flex flex-col gap-4">
              {studentData.sessionLesson.length !== 0 &&
                studentData.sessionLesson.map((data: any, i) => {
                  console.log(data)
                  return (
                    <StudentsSession
                      key={i}
                      className={data.name}
                      paymentStatus={data.paymentStatus}
                      sessionSchedule={data.schedules}
                      type="detail"
                    />
                  )
                })}
              {studentData.durationLesson.length !== 0 &&
                studentData.durationLesson.map((data: any, i) => {
                  return (
                    <StudentsDuration
                      key={i}
                      type="detail"
                      className={data.name}
                      startDate={data.schedules[0].startDate}
                      endDate={data.schedules[0].endDate}
                      startTime={data.schedules[0].startTime}
                      endTime={data.schedules[0].endTime}
                      repeatDate={data.schedules[0].repeatDate}
                      room="A 룸"
                    />
                  )
                })}
              {/* <StudentsDuration />
              <StudentsSession />
              <StudentsSession />
              <StudentsSession />
              <StudentsDuration /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-6 pb-6">
        <button
          type="button"
          className="w-full btn-purple-lg"
          onClick={() => {
            router.push(`/student/edit`)
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
