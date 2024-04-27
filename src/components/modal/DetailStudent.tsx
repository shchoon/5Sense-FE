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
    sessionLesson: [],
    durationLesson: []
  })
  useEffect(() => {
    instance(`/students/${studentsId}`).then(res => {
      const data = res.data.data
      setStudentData(prev => ({
        ...prev,
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
            <div className="w-full gray-900-bold text-[26px]">엄세리</div>
            <div className="w-full gray-800-medium text-base">010-1234-5678</div>
          </div>
          <div className="w-full gray-500-normal text-sm">
            수강생 관련 간단메모가 300자까지 들어갑니다수강생 관련 간단메모가 300자까지 들어갑니다수강생 관련 간단메모가
            300자까지 들어갑니다수강생 관련 간단메모가 300자까지 들어갑니다
          </div>
          {/* 클래스 목록 */}
          <div className="w-full max-h-[760px] overflow-y-auto py-6 px-6 flex items-center flex-col gap-4 border border-1 border-gray-200 rounded-lg shadow">
            <div className="w-full gray-800-bold text-base">클래스 목록</div>
            <button
              type="button"
              className="flex justify-center gap-2 w-full px-6 py-3.5 border rounded-lg border-primary-600"
              onClick={() => {}}
            >
              <PlusIcon width={24} height={24} />
              <div className="text-base font-semibold text-primary-600 font-['Pretendard']">클래스 추가</div>
            </button>
            <div className="w-full flex flex-col gap-4">
              {studentData.sessionLesson.length !== 0 &&
                studentData.sessionLesson.map(
                  (
                    data: {
                      name: string
                      sessionCount: number
                      totalSessions: number
                    },
                    i
                  ) => {
                    return (
                      <StudentsSession
                        className={data.name}
                        sessionCount={data.sessionCount}
                        totalSessions={data.totalSessions}
                        type="detail"
                      />
                    )
                  }
                )}
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
            router.push(`/student/edit/${studentsId}`)
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
