'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import ClassInfo from '@/components/class/register/classInfo'
import ClassType from '@/components/class/register/classType'
import MemberOfCenter from '@/components/class/register/memberOfCenter'

import { durationClassScheduleState } from '../../../../lib/state/classDurationSchedule'
import { useRouter } from 'next/navigation'
import { postDurationLessons, postSesstionLessons } from '@/lib/api/class'

export interface IClassInfo {
  name: string
  memo: string
  category: {
    id: number
    name: string
    subId: number
    subName: string
  }
}

export interface IInfoValid {
  valid: boolean
  name: boolean
  category: boolean
}

export interface ITypeValid {
  valid: boolean
  fee: boolean
  schedule: boolean
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

interface IProps {
  id: number
  type: string
}

export default function RegisterPage() {
  const router = useRouter()

  const [classInfo, setClassInfo] = useState({
    name: '',
    memo: '',
    category: {
      id: 0,
      name: '',
      subId: 0,
      subName: ''
    }
  })

  const [classType, setClassType] = useState({
    type: 'duration',
    lessonTime: 30,
    tuitionFee: '',
    totalSessions: '',
    capacity: 1
  })

  const [teacherInfo, setTeacherInfo] = useState('')

  const durationSchedule = useRecoilValue(durationClassScheduleState)
  const setDurationSchedule = useSetRecoilState(durationClassScheduleState)

  const [infoValid, setInfoValid] = useState({
    valid: true,
    name: true,
    category: true
  })

  const [typeValid, setTypeValid] = useState({
    valid: true,
    fee: true,
    schedule: true
  })

  const [teacherValid, setTeacherValid] = useState(true)

  useEffect(() => {
    console.log(classInfo)
    console.log(classType)
    console.log(teacherInfo)
  }, [classInfo, classType, teacherInfo])

  console.log(durationSchedule)

  const handleRegisterClass = () => {
    // 전체 valid 코드 있어야해
    // setInfoValid(prev => ({ ...prev, valid: true, name: true, category: true }))
    // setTypeValid(prev => ({ ...prev, valid: true, fee: true, schedule: true }))
    // setTeacherValid(true)

    if (classInfo.name.length === 0) {
      return setInfoValid(prev => ({ ...prev, valid: false, name: false }))
    } else {
      setInfoValid(prev => ({ ...prev, valid: true, name: true }))
    }

    if (classInfo.category.id == 0 || classInfo.category.subId == 0) {
      return setInfoValid(prev => ({ ...prev, valid: false, category: false }))
    } else {
      setInfoValid(prev => ({ ...prev, category: true }))
    }
    console.log(classType.tuitionFee.length)
    if (classType.tuitionFee.length === 0) {
      return setTypeValid(prev => ({ ...prev, valid: false, fee: false }))
    } else {
      setTypeValid(prev => ({ ...prev, valid: true, fee: true }))
    }

    if (classType.type === 'duration') {
      if (durationSchedule.length === 0) {
        return setTypeValid(prev => ({ ...prev, valid: false, schedule: false }))
      } else {
        setTypeValid(prev => ({ ...prev, schedule: true }))
      }
    }

    if (teacherInfo.length === 0) {
      return setTeacherValid(false)
    }

    let data
    const tuition = classType.tuitionFee.replaceAll(',', '')
    if (classType.type === 'duration') {
      data = {
        ...classInfo,
        tuitionFee: Number(tuition),
        teacherId: Number(teacherInfo),
        schedules: durationSchedule
      }

      return console.log(data)
      // return postDurationLessons(data).then(res => {
      //   console.log(res)
      //   // router.push('/class')
      // })
    } else {
      data = {
        ...classInfo,
        lessonTime: Number(classType.lessonTime),
        tuitionFee: Number(tuition),
        capacity: classType.capacity,
        totalSessions: Number(classType.totalSessions),
        teacherId: Number(teacherInfo)
      }

      // return postSesstionLessons(data).then(res => {
      //   console.log(res)
      // })
    }
  }

  useEffect(() => {
    return () => {
      setDurationSchedule([])
    }
  }, [])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo
        classInfo={classInfo}
        vaild={infoValid}
        checkValid={(newValue: { [key: string]: boolean }) => {
          setClassType(prev => ({ ...prev, ...newValue }))
        }}
        onChange={(newValue: { [key: string]: string }) => {
          setClassInfo(prev => ({ ...prev, ...newValue }))
        }}
      />
      <ClassType classType={classType} valid={typeValid} setClassType={setClassType} />
      <MemberOfCenter type="teachers" valid={teacherValid} onChange={(name: string) => setTeacherInfo(name)} />
      <div className="Button w-full btn-purple-lg" onClick={handleRegisterClass}>
        등록하기
      </div>
    </div>
  )
}
