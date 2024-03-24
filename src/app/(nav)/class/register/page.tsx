'use client'
import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { useEffect, useState } from 'react'
import { durationScheduleState } from '../../../../lib/state/durationSchedule'
import { useRecoilValue } from 'recoil'
import { postClassData } from '@/lib/api/class'

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

  const handleChangeTeacherId = (id: string) => {
    setCommonInfo(prev => ({
      ...prev,
      teacherId: id
    }))
  }
  //기간반 회차반

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo />
      <ClassType />
      <div className="Button w-full btn-purpl-lg">등록하기</div>
    </div>
  )
}
