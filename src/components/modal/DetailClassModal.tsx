'use client'
import Image from 'next/image'

import instance from '@/lib/api/axios'

import { useEffect, useState } from 'react'
import { getDurationLessons, getSesstionLessons, patchSesstionLessons, patchDurationLessons } from '@/lib/api/class'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  type: string
  onClose: () => void
}

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

export default function DetailClassModal({ id, type, onClose }: IProps) {
  const router = useRouter()

  const [classDetail, setClassDetail] = useState<IClassDetail>({
    type: '',
    categoryName: '',
    className: '',
    teacher: '',
    duration: [],
    capacity: 0,
    totalSessions: 0,
    memo: '',
    studentList: []
  })

  const handleCloseClass = (id: string, type: string) => {
    const data = {
      lessonId: id,
      type: type
    }
    if (type === 'duration') {
      patchDurationLessons(data).then(res => {
        console.log(res.data)
      })
    } else {
      patchSesstionLessons(data).then(res => {
        console.log(res.data)
      })
    }
    onClose()
  }

  useEffect(() => {
    let result: any
    if (type === 'duration') {
      getDurationLessons({ id: id }).then(res => {
        result = res.data.data
        setClassDetail(prev => ({
          ...prev,
          type: result.type,
          categoryName: result.category.subName,
          className: result.name,
          teacher: result.teacher.name,
          duration: result.schedules,
          memo: result.memo,
          studentList: result.registeredStudents
        }))
      })
    } else {
      getSesstionLessons({ id: id }).then(res => {
        result = res.data.data
        console.log(result)
        setClassDetail(prev => ({
          ...prev,
          type: result.type,
          categoryName: result.category.subName,
          className: result.name,
          teacher: result.teacher.name,
          capacity: result.capacity,
          totalSessions: result.totalSessions,
          memo: result.memo,
          studentList: result.registeredStudents
        }))
      })
    }
  }, [])
  console.log(classDetail)

  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      {/* <CloseCircleIcon
        className="absolute right-6 top-6 cursor-pointer"
        width={35}
        height={35}
        onClick={() => onClose()}
      /> */}
      <div className="absolute top-[72px] w-full px-6 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6">
          {/* 카테고리, 클래스 명 */}
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
            {classDetail.capacity > 0 && (
              <div className="w-full flex gap-8">
                <div className="w-[150px] gray-500-medium text-base">• 최대 수업 정원</div>
                <div className="w-full gray-800-medium text-base">{classDetail.capacity}</div>
              </div>
            )}
            {classDetail.duration.length > 0 && (
              <>
                <div className="w-full flex gap-8">
                  <div className="w-[150px] gray-500-medium text-base">• 기간 정보</div>
                  <div className="w-full gray-800-medium text-base">
                    {classDetail.duration[0].startDate} ~ {classDetail.duration[0].endDate}
                  </div>
                </div>
                <div className="w-full flex gap-8">
                  <div className="w-[150px] gray-500-medium text-base">• 일정 정보</div>
                  {classDetail.duration.map((data, index) => {
                    return (
                      <div key={index} className="w-full gray-800-medium text-base">
                        {data.startTime} ~ {data.endTime} / {data.repeatDate}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
            <div className="w-full flex gap-8">
              <div className="w-[150px] gray-500-medium text-base">• 클래스 메모</div>
              <div className="w-full gray-800-medium text-base">{classDetail.memo}</div>
            </div>
          </div>
        </div>
        {/* 회원 목록 */}
        <div className="w-full flex flex-col gap-4 p-6 border border-1 border-gray-200 rounded-lg shadow">
          <div className="w-full flex gap-1.5">
            <div className="text-gray-800 text-base font-bold">회원 목록</div>
            <div className="gray-800-semibold text-base">({classDetail?.studentList.length})</div>
          </div>
          {/* 학생 리스트 */}
          <div className="w-full flex flex-col gap-2.5">
            {classDetail.studentList.map((data: any, index: number) => {
              return (
                <div key={index} className="w-full flex gap-1">
                  <span className="w-[22px] text-primary-600 text-sm font-bold">{index + 1}</span>
                  <div className="w-full flex gap-2.5">
                    <div className="gray-800-medium text-sm">{data.name}</div>
                    <div className="gray-500-normal text-sm">{data.phone}</div>
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
      <div className="absolute bottom-0 w-full px-6 pb-[18px] flex gap-2.5">
        <button
          className="w-1/2 h-[52px] text-primary-600 btn-white"
          onClick={() => {
            handleCloseClass(String(id), classDetail.type)
            alert('클래스가 종료되었습니다.')
            onClose()
          }}
        >
          종료하기
        </button>
        <button
          className="w-1/2 h-[52px] btn-purple-lg"
          onClick={() => {
            if (type === 'duration') {
              router.push(`/class/edit/duration/${id}`)
            } else {
              router.push(`/class/edit/session/${id}`)
            }
            onClose()
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}

// 보내는 요청다르고
// 받는 데이터 다르고
// 뿌주는 UI는 비슷함
// 그럼 뿌려주는 데이터를 같이 쓸건지를 일단 골라야지
// 보자
// 뿌려주는 데이터 optional 써서 같이 쓰자
