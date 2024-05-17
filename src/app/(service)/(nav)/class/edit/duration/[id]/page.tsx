'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useParams, useRouter } from 'next/navigation'
import { durationScheduleState } from '@/lib/state/classDurationSchedule'
import ClassInfo from '@/components/class/edit/classInfo'
import ClassType from '@/components/class/edit/classType'
import TeacherInfo from '@/components/class/edit/teacherInfo'
import { getDurationLessons, putDurationLessons } from '@/lib/api/class'

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

  const params = useParams<{ type: string; id: string }>()

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

  const durationSchedule = useRecoilValue(durationScheduleState)
  const setDurationSchedule = useSetRecoilState(durationScheduleState)

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
    getDurationLessons({ id: params.id }).then((res): any => {
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
          type: params.type,
          lessonTime: result.lessonTime,
          tuitionFee: result.tuitionFee.toLocaleString(),
          totalSessions: result.totalSessions,
          capacity: result.capacity
        }))
        setDurationSchedule([...result.schedules])
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
          type: params.type,
          lessonTime: result.lessonTime,
          tuitionFee: result.tuitionFee.toLocaleString(),
          totalSessions: result.totalSessions,
          capacity: result.capacity
        }))
        setDurationSchedule([...result.schedules])
      }
    })
  }, [])

  useEffect(() => {
    console.log(classInfo)
    console.log(classType)
    console.log(teacherInfo)
  }, [classInfo, classType, teacherInfo])

  console.log(durationSchedule)

  // if (classInfo.category.subName === null) {
  //   setClassInfo(prev => ({
  //     ...prev,
  //     category: {
  //       id: classInfo.category.id,
  //       name: classInfo.category.name,
  //       subId: classInfo.category.id,
  //       subName: classInfo.category.name
  //     }
  //   }))
  // } else {

  const handleEditClass = () => {
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
      tuitionFee: Number(tuition),
      teacherId: Number(teacherInfo.id),
      schedules: durationSchedule
    }

    console.log(params.id)

    console.log(data)

    return putDurationLessons(params.id, data).then(res => {
      console.log('res', res)
      // router.push('/class')
    })
  }

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
      <div className="Button w-full btn-purple-lg" onClick={handleEditClass}>
        수정하기
      </div>
    </div>
  )
}
