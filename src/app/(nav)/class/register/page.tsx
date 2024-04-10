'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import ClassInfo from '@/components/class/register/classInfo'
import ClassType from '@/components/class/register/classType'
import TeacherInfo from '@/components/class/register/teacherInfo'
import { postClassData } from '@/lib/api/class'
import { durationScheduleState } from '../../../../lib/state/classDurationSchedule'
import { useRouter } from 'next/navigation'

export interface IClassInfo {
  name: string
  memo: string
  categoryId: string
  categoryName: string
}

export interface IInfoValid {
  valid: boolean
  name: boolean
  category: boolean
}

export interface IClassType {
  type: string
  lessonTime: number
  tuitionFee: string
  totalSessions: string
  capacity: number
}

export interface ITeacherInfo {
  teacherId: string
}

export default function RegisterPage() {
  const router = useRouter()

  const [classInfo, setClassInfo] = useState({
    name: '',
    memo: '',
    categoryId: '',
    categoryName: ''
  })

  const [classType, setClassType] = useState({
    type: 'duration',
    lessonTime: 30,
    tuitionFee: '',
    totalSessions: '',
    capacity: 1
  })

  const [teacherInfo, setTeacherInfo] = useState('')

  const [durationSchedule, setDurationSchedule] = useRecoilValue(durationScheduleState)

  const [infoValid, setInfoValid] = useState({
    valid: true,
    name: true,
    category: true
  })

  const [typeValid, setTypeValid] = useState({
    valid: true,
    fee: true
  })

  const [teacherValid, setTeacherValid] = useState({
    valid: true
  })

  useEffect(() => {
    console.log(classInfo)
    console.log(classType)
    console.log(teacherInfo)
  }, [classInfo, classType, teacherInfo])

  console.log(durationSchedule)

  const handleRegisterClass = () => {
    Object.entries(classInfo).map(([key, value]) => {
      if (key === 'name' && value.length === 0) {
        console.log('뭐지')
        return setInfoValid(prev => ({ ...prev, valid: false, name: false }))
      }
      if (key === 'categoryId' && value.length === 0) {
        return setInfoValid(prev => ({ ...prev, valid: false, name: true, category: false }))
      }
    })

    if (classType.tuitionFee.length === 0) {
      setInfoValid(prev => ({ ...prev, valid: true, category: true }))
      return setTypeValid(prev => ({ ...prev, valid: false, fee: false }))
    }

    if (classType.tuitionFee.length === 0) {
      setInfoValid(prev => ({ ...prev, valid: true, category: true }))
      return setTypeValid(prev => ({ ...prev, valid: false, fee: false }))
    }

    if (teacherInfo.length === 0) {
      setInfoValid(prev => ({ ...prev, valid: true }))
      setTypeValid(prev => ({ ...prev, valid: true }))
      return setTeacherValid(prev => ({ ...prev, valid: false }))
    }

    let data
    const tuition = classType.tuitionFee.replaceAll(',', '')
    if (classType.type === 'duration') {
      data = {
        type: classType.type,
        durationLesson: {
          name: classInfo.name,
          memo: classInfo.memo,
          tuitionFee: Number(tuition),
          category: { id: Number(classInfo.categoryId), name: classInfo.categoryName },
          teacherId: Number(teacherInfo),
          schedules: [durationSchedule]
        }
      }
    } else {
      data = {
        type: classType.type,
        sessionLesson: {
          name: classInfo.name,
          memo: classInfo.memo,
          lessonTime: Number(classType.lessonTime),
          tuitionFee: Number(tuition),
          capacity: classType.capacity,
          totalSessions: Number(classType.totalSessions),
          category: { id: Number(classInfo.categoryId), name: classInfo.categoryName },
          teacherId: Number(teacherInfo)
        }
      }
    }
    postClassData(data).then(res => {
      console.log(res.data)
      if (res.status === 201) {
        router.push('/class')
      }
    })
  }

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo
        classInfo={classInfo}
        vaild={infoValid}
        onChange={(name: string, value: string) => setClassInfo(prev => ({ ...prev, [name]: value }))}
      />
      <ClassType classType={classType} setClassType={setClassType} />
      <TeacherInfo onChange={(value: string) => setTeacherInfo(value)} />
      <div className="Button w-full btn-purple-lg" onClick={handleRegisterClass}>
        등록하기
      </div>
    </div>
  )
}
