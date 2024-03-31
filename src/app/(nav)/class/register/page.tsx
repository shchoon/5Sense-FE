'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { durationScheduleState } from '../../../../lib/state/durationSchedule'
import { postClassData } from '@/lib/api/class'
import TeacherInfo from '@/components/class/register/teacherInfo'

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

export interface ISession {
  lessonTime: number
  tuitionFee: string
  capacity: number
  totalSessions: number
}

export interface IDuration {
  tuitionFee: string
}

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: '',
    memo: '',
    type: '',
    category: {
      id: '',
      name: ''
    },
    teacherId: ''
  })

  const [session, setSession] = useState<ISession>({
    lessonTime: 0,
    tuitionFee: '',
    capacity: 1,
    totalSessions: 0
  })

  const [duration, setDuration] = useState<IDuration>({
    tuitionFee: ''
  })

  const DurationScheduleState = useRecoilValue(durationScheduleState)

  //기간반 회차반

  // const handleRegisterClass = () => {
  //   if(type === 'duration'){

  //   }
  // }

  const handleChangeName = (name: string, value: string) => {
    setCommonInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log('여기', DurationScheduleState)
    console.log(commonInfo)
  }, [DurationScheduleState, commonInfo])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
      <ClassType
        session={session}
        setSession={setSession}
        duration={duration}
        setDuration={setDuration}
        onChange={handleChangeName}
      />
      <TeacherInfo onChange={handleChangeName} />
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
