'use client'
import Image from 'next/image'

import instance from '@/lib/api/axios'

import CloseCircleIcon from 'public/assets/icons/closeCircle.svg'
import { useEffect, useState } from 'react'

interface IProps {
  props: {
    id: number
    type: string
  }
  onClose: () => void
}

export default function DetailClassModal({ props, onClose }: IProps) {
  const [classDetail, setClassDetail] = useState<null | any>(null)

  useEffect(() => {
    instance(`/lessons/${props.id}/details?type=${props.type}`).then(res => {
      const classData = res.data.data
      setClassDetail({
        type: classData.type,
        category: classData.subCategory,
        className: classData.name,
        classInfo:
          classData.type === 'duration'
            ? [
                {
                  title: '담당 강사',
                  text: classData.teacher
                },
                {
                  title: '클래스 유형',
                  text: classData.type === 'duration' ? '기간반' : '회차반'
                },
                {
                  title: '기간 정보',
                  text: classData.duration
                },
                {
                  title: '일정 정보',
                  text: classData.lessonDurations
                },
                {
                  title: '클래스 메모',
                  text: classData.memo
                }
              ]
            : [
                {
                  title: '담당 강사',
                  text: classData.teacher
                },
                {
                  title: '클래스 유형',
                  text: classData.type === 'duration' ? '기간반' : '회차반'
                },
                {
                  title: '최대 수업 정원',
                  text: classData.capacity
                },
                {
                  title: '클래스 메모',
                  text: classData.memo
                }
              ],
        students: classData.registeredStudents
      })
    })
  }, [])

  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      <CloseCircleIcon
        className="absolute right-6 top-6 cursor-pointer"
        width={35}
        height={35}
        onClick={() => onClose()}
      />
      <div className="absolute top-[72px] w-full px-6 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6">
          {/* 카테고리 명 */}
          <div className="w-full flex flex-col gap-4">
            <div
              className={`flex items-start justify-center w-[72px] px-2.5 py-2 rounded ${
                classDetail !== null && classDetail.type === 'duration' ? 'bg-primary-100' : 'bg-secondary-100'
              } `}
            >
              <div
                className={`${
                  classDetail !== null && classDetail.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                } text-xs font-semibold`}
              >
                {classDetail !== null && classDetail.category}
              </div>
            </div>
            <div className="gray-900-bold text-[26px] font-bold">{classDetail !== null && classDetail.className}</div>
          </div>
          {/* 클래스 정보 */}
          <div className="w-full flex flex-col gap-2.5">
            {classDetail !== null &&
              classDetail.classInfo.map((info: any, i: number) => {
                return (
                  <>
                    {info.title !== '일정 정보' ? (
                      <div key={i} className="w-full flex gap-8">
                        <div className="w-[150px] gray-500-medium text-base">• {info.title}</div>
                        <div key={i} className="w-full gray-800-medium text-base">
                          {info.text}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="w-full flex gap-8">
                        <div className="w-[150px] gray-500-medium text-base">• {info.title}</div>
                        <div className="w-full flex flex-col gap-1.5">
                          {info.text.map((text: any, i: number) => {
                            return (
                              <div key={i} className=" gray-800-medium text-base">
                                {text.startTime.slice(0, 5)} ~ {text.endTime.slice(0, 5)} / {text.repeatDate} 반복
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )
              })}
          </div>
        </div>
        {/* 회원 목록 */}
        <div className="w-full flex flex-col gap-4 p-6 border border-1 border-gray-200 rounded-lg shadow">
          <div className="w-full flex gap-1.5">
            <div className="text-gray-800 text-base font-bold">회원 목록</div>
            <div className="gray-800-semibold text-base">({classDetail !== null && classDetail.students.length})</div>
          </div>
          {/* 학생 리스트 */}
          <div className="w-full flex flex-col gap-2.5">
            {classDetail !== null &&
              classDetail.students.map((data: any, i: number) => {
                return (
                  <div className="w-full flex gap-1">
                    <span className="w-[22px] text-primary-600 text-sm font-bold">{i + 1}</span>
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
        <button className="w-1/2 h-[52px] text-primary-600 btn-white">종료하기</button>
        <button className="w-1/2 h-[52px] btn-purple-lg">수정하기</button>
      </div>
    </div>
  )
}
