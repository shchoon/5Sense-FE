'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { changePhoneNumberToString, formatLessonDate, formatStartTime } from '@/utils'
import { Drawer } from 'flowbite-react'
import instance from '@/lib/api/axios'

/* interface IProps {
  id: number
  type: string
  onClose: () => void
} */

interface IClassDetail {
  type: string
  categoryName: string
  className: string
  teacher: string
  duration: Array<any>
  capacity: number
  totalSessions: number
  memo: string
  studentList: Array<any>
}

interface IProps {
  id: number
  type: string
  isOpen: boolean
  handleClose: () => void
}

interface ClassDetail {
  type: string
  categoryName: string
  className: string
  capacity: number
  teacher: string
  memo: string
  students: any[]
  schedules: any[]
}

export default function DetailClassModal({ id, type, isOpen, handleClose }: IProps) {
  const router = useRouter()

  const [classDetail, setClassDetail] = useState<ClassDetail>({
    type: '',
    categoryName: '',
    className: '',
    capacity: 0,
    teacher: '',
    memo: '',
    students: [],
    schedules: []
  })
  const [isClickedEdit, setIsClickedEdit] = useState<boolean>(false)

  const endOfClass = () => {
    instance.patch(`/${type}-lessons/${id}/close`).then(res => {
      console.log(res)
    })
  }

  const editOfClass = () => {
    setIsClickedEdit(true)
  }

  useEffect(() => {
    instance.get(`/${type}-lessons/${id}/details`).then(res => {
      console.log(res)
      const classData = res.data.data
      setClassDetail(prev => ({
        ...prev,
        type: classData.type,
        categoryName: classData.category.subName === null ? classData.category.name : classData.category.subName,
        className: classData.name,
        capacity: classData.capacity,
        teacher: classData.teacher.name,
        memo: classData.memo,
        students: classData.registeredStudents,
        schedules: classData.schedules && classData.schedules
      }))
    })
  }, [])

  useEffect(() => {
    if (isClickedEdit) {
      localStorage.setItem('editClassType', type)
      localStorage.setItem('editClassId', String(id))

      if (type === 'session') {
        router.push('class/edit/session')
      } else if (type === 'duration') {
        router.push('class/edit/duration')
      }
    }
  }, [editOfClass])

  return (
    <>
      {classDetail.type !== '' && (
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
                {classDetail.type === 'session' && (
                  <div className="w-full flex gap-8">
                    <div className="w-[150px] gray-500-medium text-base">• 최대 수업 정원</div>
                    <div className="w-full gray-800-medium text-base">{classDetail.capacity}</div>
                  </div>
                )}
                {classDetail.type === 'duration' && (
                  <>
                    <div className="w-full flex gap-8">
                      <div className="w-[150px] gray-500-medium text-base">• 기간 정보</div>
                      {classDetail.schedules.map((data: { startDate: string; endDate: string }, i) => {
                        return (
                          <div key={i} className="w-full gray-800-medium text-base">
                            {formatLessonDate(data.startDate)} - {formatLessonDate(data.endDate)}
                          </div>
                        )
                      })}
                    </div>
                    <div className="w-full flex gap-8">
                      <div className="w-[150px] gray-500-medium text-base">• 일정 정보</div>
                      {classDetail.schedules.map(
                        (data: { startTime: string; endTime: string; repeatDate: string }, i) => {
                          return (
                            <div key={i} className="w-full gray-800-medium text-base">
                              {formatStartTime(data.startTime)} ~ {formatStartTime(data.endTime)} / {data.repeatDate}
                            </div>
                          )
                        }
                      )}
                    </div>
                  </>
                )}
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
                  {classDetail.students.map((data: { name: string; phone: string; sessionCount: number }, i) => {
                    return (
                      <div key={i} className="w-full flex gap-1">
                        <span className="w-[22px] text-primary-600 text-sm font-bold">{i + 1}</span>
                        <div className="w-full flex gap-2.5">
                          <div className="gray-800-medium text-sm">{data.name}</div>
                          <div className="w-[105px] gray-500-normal text-sm">
                            {changePhoneNumberToString(data.phone)}
                          </div>
                          {classDetail.type === 'session' && (
                            <div className="text-primary-600 text-xs font-semibold">
                              (잔여회차 : {data.sessionCount})
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full flex gap-2.5 pb-[18px] px-6">
                <button
                  className="w-full h-[52px] flex justify-center items-center border border-1 border-primary-600 rounded-lg"
                  onClick={() => endOfClass()}
                >
                  <span className="text-[16px] text-primary-600 font-semibold">종료하기</span>
                </button>
                <button
                  className="w-full h-[52px] flex justify-center items-center text-white bg-primary-600 rounded-lg"
                  onClick={() => editOfClass()}
                >
                  <span className="text-[16px] font-semibold">수정하기</span>
                </button>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  )
}

// 보내는 요청다르고
// 받는 데이터 다르고
// 뿌주는 UI는 비슷함
// 그럼 뿌려주는 데이터를 같이 쓸건지를 일단 골라야지
// 보자
// 뿌려주는 데이터 optional 써서 같이 쓰자
