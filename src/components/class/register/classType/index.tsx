'use client'
import { IClassType } from '@/app/(nav)/class/register/page'
import { Dispatch, SetStateAction, useState } from 'react'
import Duration from './component/Duration'
import Session from './component/Session'

export type scheduleItem = {
  id: number
  content: string
  modal: boolean
}

export interface ITypeProps {
  classType: IClassType
  setClassType: Dispatch<SetStateAction<IClassType>>
}

export default function ClassType({ classType, setClassType }: ITypeProps) {
  const [tab, setTab] = useState<boolean>(true)

  const onTabHandler = (date: string) => {
    if (date === '기간반') {
      setClassType(prev => ({
        ...prev,
        type: 'duration',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      }))
      return setTab(true)
    } else {
      setClassType(prev => ({
        ...prev,
        type: 'session',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      }))
      return setTab(false)
    }
  }

  const activeTab = (content: string, isActive: boolean) => {
    return (
      <button
        className={`w-[290px] h-10 rounded-md flex justify-center items-center text-base leading-normal ${
          isActive ? 'bg-primary-600 text-white font-semibold' : 'text-gray-500 font-medium'
        }`}
        onClick={() => onTabHandler(content)}
      >
        {content}
      </button>
    )
  }

  return (
    <div className="class-box">
      <div className="Title gray-900-bold text-xl">클래스 유형</div>
      <div className="flex w-full h-[52px] p-1.5 rounded-md border border-gray-300 ">
        {activeTab('기간반', tab)}
        {activeTab('회차반', !tab)}
      </div>
      {tab ? (
        <Duration classType={classType} setClassType={setClassType} />
      ) : (
        <Session classType={classType} setClassType={setClassType} />
      )}
    </div>
  )
}
