'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Duration from './component/Duration'
import Session from './component/Session'
import { IDuration, ISession } from '@/app/(nav)/class/register/page'

export type scheduleItem = {
  id: number
  content: string
  modal: boolean
}

interface IProps {
  session: ISession
  setSession: Dispatch<SetStateAction<ISession>>
  duration: IDuration
  setDuration: Dispatch<SetStateAction<IDuration>>
  onChange: (name: string, value: string) => void
}

export default function ClassType({ session, setSession, duration, setDuration, onChange }: IProps) {
  const [tab, setTab] = useState<boolean>(true)

  const onTabHandler = (date: string) => {
    if (date === '기간반') {
      onChange('type', 'duration')
      return setTab(true)
    } else {
      onChange('type', 'session')
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
        <Duration duration={duration} setDuration={setDuration} />
      ) : (
        <Session session={session} setSession={setSession} />
      )}
    </div>
  )
}
