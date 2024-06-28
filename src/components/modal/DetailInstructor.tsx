import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import instance from '@/lib/api/axios'
import { changePhoneNumberToString } from '@/utils'
import SessionDetailCard from '../common/card/SessionDetailCard'
import DurationDetailCard from '../common/card/DurationDetailCard'

interface IProps {
  onClose: () => void
  onCloseState: () => void
  id: number
}

export default function DetailInstructor() {
  const router = useRouter()

  const [teacher, setTeacher] = useState({
    name: '',
    phone: ''
  })

  const [instructorData, setInstructorData] = useState({
    id: 0,
    name: '',
    phone: '',
    durationLessons: [],
    sessionLessons: []
  })
  useEffect(() => {
    const instructorId = localStorage.getItem('instructorId')
    instance(`/teachers/${instructorId}`).then(res => {
      const data = res.data.data
      setInstructorData(prev => ({
        ...prev,
        id: data.id,
        name: data.name,
        phone: data.phone,
        durationLessons: data.durationLessons,
        sessionLessons: data.sessionLessons
      }))
    })
  }, [])

  console.log(instructorData)

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {/* 강사 이름 & 번호 */}
      <div className="w-full flex flex-col gap-2">
        <div className="gray-900-bold text-[26px]">{instructorData.name}</div>
        <div className="gray-800-medium text-base">{changePhoneNumberToString(instructorData.phone)}</div>
      </div>
      {/* 클래스 목록 */}
      <div className="w-full p-6 flex flex-col gap-4 border border-1 border-gray-200 rounded-lg shadow-[0_5px_15px_0_rgba(0,0,0,0.02)]">
        <span className="gray-800-bold text-base">클래스 목록</span>
        <div className="w-full flex flex-col gap-4">
          {instructorData.sessionLessons.length !== 0 &&
            instructorData.sessionLessons.map((data, i) => {
              return <SessionDetailCard sessionData={data} />
            })}
          {instructorData.durationLessons.length !== 0 &&
            instructorData.durationLessons.map((data, i) => {
              return <DurationDetailCard durationData={data} />
            })}
        </div>
      </div>
    </div>
  )
}
