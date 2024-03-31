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
  totalSessions: string
}

export interface IDuration {
  tuitionFee: string
}

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: '',
    memo: '',
    type: 'duration',
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
    totalSessions: ''
  })

  const [duration, setDuration] = useState<IDuration>({
    tuitionFee: ''
  })

  const durationSchedule = useRecoilValue(durationScheduleState)

  //기간반 회차반

  const handleRegisterClass = () => {
    let data
    if (commonInfo.type === 'duration') {
      const tuition = duration.tuitionFee.replaceAll(',', '')
      data = {
        type: commonInfo.type,
        durationLesson: {
          name: commonInfo.name,
          memo: commonInfo.memo,
          lessonTime: durationSchedule.lessonTime,
          tuitionFee: Number(tuition),
          category: { id: Number(commonInfo.category.id), name: commonInfo.category.name },
          teacherId: Number(commonInfo.teacherId),
          schedules: [
            {
              ...durationSchedule.schedules
            }
          ]
        }
      }
    } else {
      const tuition = session.tuitionFee.replaceAll(',', '')
      data = {
        type: commonInfo.type,
        sessionLesson: {
          name: commonInfo.name,
          memo: commonInfo.memo,
          lessonTime: session.lessonTime,
          tuitionFee: Number(tuition),
          capacity: session.capacity,
          totalSessions: Number(session.totalSessions),
          category: { id: Number(commonInfo.category.id), name: commonInfo.category.name },
          teacherId: Number(commonInfo.teacherId)
        }
      }
    }

    console.log(data)
    postClassData(data).then(res => console.log(res))
  }

  const changeValue = (name: string, value: string) => {
    setCommonInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log('여기', durationSchedule)
    console.log(commonInfo)
  }, [durationSchedule])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
      <ClassType
        session={session}
        setSession={setSession}
        duration={duration}
        setDuration={setDuration}
        onChange={changeValue}
      />
      <TeacherInfo onChange={changeValue} />
      <div className="Button w-full btn-purpl-lg" onClick={() => handleRegisterClass()}>
        등록하기
      </div>
    </div>
  )
}
