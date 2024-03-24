'use client'
import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import { useState } from 'react'

export default function RegisterPage() {
  const [commonInfo, setCommonInfo] = useState({
    name: '',
    memo: '',
    category: {
      id: '',
      name: '',
      parentId: ''
    }
  })

  //기간반 회차반

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo />
      <ClassType />
      <div className="Button w-full btn-purpl-lg">등록하기</div>
    </div>
  )
}
