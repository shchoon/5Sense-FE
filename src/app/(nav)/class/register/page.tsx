'use client'
import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { useEffect, useState } from 'react'
import { durationScheduleState } from '../../../../lib/state/durationSchedule'
import { useRecoilValue } from 'recoil'
import { postClassData } from '@/lib/api/class'

export interface ICommonInfo {
  name: string
  memo: string
  type: string
  category: {
    id: string
    name: string
  }
}

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: '',
    memo: '',
    type: '',
    category: {
      id: '',
      name: ''
    }
  })

  //기간반 회차반

  // const handleRegisterClass = () => {
  //   if(type === 'duration'){

  //   }
  // }

  const DurationScheduleState = useRecoilValue(durationScheduleState)

  console.log(DurationScheduleState)

  useEffect(() => {
    console.log('여기', DurationScheduleState)
  }, [DurationScheduleState])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
      <ClassType commonInfo={commonInfo} setCommonInfo={setCommonInfo} />

      <div
        className="Button w-full btn-purpl-lg"
        onClick={() => {
          postClassData({
            type: 'duration',
            durationLesson: {
              name: 'Test',
              memo: 'Test',
              lessonTime: 120,
              tuitionFee: 2000,
              category: { id: 10, name: '아크릴화', parentId: 1 },
              teacherId: 1,
              schedules: {
                ...DurationScheduleState
              }
            }
          }).then(res => console.log(res))
        }}
      >
        등록하기
      </div>
    </div>
  )
}
