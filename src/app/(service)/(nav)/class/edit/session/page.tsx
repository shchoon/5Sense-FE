'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useParams, useRouter } from 'next/navigation'
import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import ClassInfo from '@/components/class/edit/classInfo'
import ClassType from '@/components/class/edit/classType'
import TeacherInfo from '@/components/class/edit/teacherInfo'
import { getDurationLessons, getSesstionLessons, putSesstionLessons } from '@/lib/api/class'

export interface IClassInfo {
  name: string
  memo: string
  category: {
    id: number
    name: string
    subId: number
    subName: string
  }
  categoryId: string
  categoryName: string
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
  id: string
  name: string
}

export default function EditPage() {
  const router = useRouter()

  //const params = useParams<{ type: string; id: string }>()
  const [targetClass, setTargetClass] = useState<{ id: number; type: string }>({
    id: 0,
    type: ''
  })
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

  const [teacherInfo, setTeacherInfo] = useState({
    id: '',
    name: ''
  })

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
    getSesstionLessons({ id: targetClass.id }).then((res): any => {
      const result = res.data.data
      console.log('result', result)
      if (result.category.subId === null || result.category.id === 0) {
        console.log('jojo')
        setClassInfo(prev => ({
          ...prev,
          name: result.name,
          memo: result.memo,
          category: {
            id: result.category.id,
            name: result.category.name,
            subId: result.category.id,
            subName: result.category.name
          }
        }))
        setTeacherInfo({ ...result.teacher })
        setClassType(prev => ({
          ...prev,
          type: result.type,
          lessonTime: result.lessonTime,
          tuitionFee: result.tuitionFee.toLocaleString(),
          totalSessions: result.totalSessions,
          capacity: result.capacity
        }))
      } else {
        setClassInfo(prev => ({
          ...prev,
          name: result.name,
          memo: result.memo,
          category: {
            ...result.category
          }
        }))
        setTeacherInfo({ ...result.teacher })
        setClassType(prev => ({
          ...prev,
          type: result.type,
          lessonTime: result.lessonTime,
          tuitionFee: result.tuitionFee.toLocaleString(),
          totalSessions: result.totalSessions,
          capacity: result.capacity
        }))
      }
    })
  }, [])

  useEffect(() => {
    console.log(classInfo)
    console.log(classType)
    console.log(teacherInfo)
  }, [classInfo, classType, teacherInfo])

  console.log(durationSchedule)

  const handleRegisterClass = () => {
    if (classInfo.name.length === 0) {
      return setInfoValid(prev => ({ ...prev, valid: false, name: false }))
    } else {
      setInfoValid(prev => ({ ...prev, valid: true, name: true }))
    }

    if (classInfo.category.id == 0 || classInfo.category.subName.length === 0) {
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

    if (teacherInfo.id.length === 0) {
      return setTeacherValid(false)
    }

    let data
    const tuition = classType.tuitionFee.replaceAll(',', '')

    data = {
      name: classInfo.name,
      memo: classInfo.memo,
      category: {
        id: classInfo.category.subId,
        name: classInfo.category.subName
      },
      teacherId: Number(teacherInfo.id)
    }

    return console.log(data)
    // return putSesstionLessons(params.id, data).then(res => {
    //   console.log(res)
    // })
  }

  useEffect(() => {
    setTargetClass(prev => ({
      ...prev,
      id: Number(localStorage.getItem('editClassId')),
      type: String(localStorage.getItem('editClassType'))
    }))
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
      <TeacherInfo
        teacherInfo={teacherInfo}
        valid={teacherValid}
        onChange={(value: string) => setTeacherInfo(prev => ({ ...prev, id: value }))}
      />
      <div className="Button w-full btn-purple-lg" onClick={handleRegisterClass}>
        수정하기
      </div>
    </div>
  )
}
