'use client'
import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { useEffect, useState } from 'react'
import { durationScheduleState } from '../../../../lib/state/durationSchedule'
import { useRecoilValue } from 'recoil'
import { postClassData } from '@/lib/api/class'
import TeacherInfo from '@/app/teacherInfo/page'
import { lessonTimeState } from '@/lib/state/lessonTime'

export interface ICommonInfo {
  name: string
  memo: string
  type: string
  category: {
    id: string
    name: string
  }
  teacherId: string
}

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: '',
    memo: '',
    type: '',
    category: {
      id: '',
      name: '',
      parentId: ''
    },
    teacherId: ''
  })

  const test = useRecoilValue(lessonTimeState)
  //기간반 회차반

  // const handleRegisterClass = () => {
  //   if(type === 'duration'){

  //   }
  // }

  const handleChangeTeacherId = (id: string) => {
    setCommonInfo(prev => ({
      ...prev,
      teacherId: id
    }))
  }

  const DurationScheduleState = useRecoilValue(durationScheduleState)

  useEffect(() => {
    console.log('여기', DurationScheduleState)
  }, [DurationScheduleState])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo />
      <ClassType />
      <TeacherInfo handleChangeTeacherId={handleChangeTeacherId} />
      <div
        className="Button w-full btn-purpl-lg"
        onClick={() => {
          postClassData({
            type: 'duration',
            durationLesson: {
              name: 'K-POP 인재 양성 태국반',
              memo: '강사 블랙핑크 리사',
              lessonTime: 90,
              tuitionFee: 1000000,
              category: { id: 20, name: '발레' },
              teacherId: 7,
              schedules: [
                {
                  ...DurationScheduleState
                }
              ]
            }
          }).then(res => console.log(res))
        }}
      >
        등록하기
      </div>
    </div>
  )
}
