'use client'
import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { useEffect, useState } from 'react'
import { durationScheduleState } from '../../../../lib/state/durationSchedule'
import { useRecoilValue } from 'recoil'
import { postClassData } from '@/lib/api/class'
import TeacherInfo from '@/app/teacherInfo/page'

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: 'test',
    memo: 'test',
    type: '',
    category: {
      id: '',
      name: '',
      parentId: ''
    },
    teacherId: ''
  })

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

  console.log(commonInfo)
  const DurationScheduleState = useRecoilValue(durationScheduleState)

  console.log(DurationScheduleState)

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
              name: 'Test',
              memo: 'Test',
              lessonTime: 120,
              tuitionFee: 2000,
              category: { id: 10, name: '아크릴화', parentId: 1 },
              teacherId: 2,
              schedules: [
                {
                  ...DurationScheduleState
                }
              ]
            }
          }).then(res => console.log(res))
        }}
      >
        등록하기 T
      </div>
    </div>
  )
}
