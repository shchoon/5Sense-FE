'use client'
import { classDataType } from '@/app/(service)/(nav)/class/register/page'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import Duration from './component/Duration'
import Session from './component/Session'

export type scheduleItem = {
  id: number
  content: string
  modal: boolean
}

export default function ClassType(props: UseFormReturn<classDataType, any, undefined>) {
  const { reset, getValues } = props

  const [isDuration, setIsDuration] = useState<string>(getValues('type'))

  const onInitClassType = (data: string) => {
    if (data === '기간반') {
      reset({
        ...getValues(),
        type: 'duration',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      })
      setIsDuration('duration')
    } else {
      reset({
        ...getValues(),
        type: 'session',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      })
      setIsDuration('session')
    }
  }

  const ClassType = (content: string, isActive: boolean) => {
    return (
      <button
        className={`w-[290px] h-10 rounded-md flex justify-center items-center text-base leading-normal ${
          isActive ? 'bg-primary-600 text-white font-semibold' : 'text-gray-500 font-medium'
        }`}
        onClick={e => {
          e.preventDefault()
          onInitClassType(content)
        }}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={`class-box`}>
      <div className="Title gray-900-bold text-xl">클래스 유형</div>
      <div className="flex w-full h-[52px] p-1.5 rounded-md border border-gray-300 ">
        {ClassType('기간반', isDuration == 'duration')}
        {ClassType('회차반', !(isDuration == 'duration'))}
      </div>
      {isDuration == 'duration' ? <Duration {...props} /> : <Session {...props} />}
    </div>
  )
}
