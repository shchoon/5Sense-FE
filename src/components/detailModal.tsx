'use client'
import { fetchApi } from '@/hooks/useApi'
import { idState, modalState } from '@/state/modal'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  isModal: boolean
  setIsModal: (modal: boolean) => void
}

const DetailModal = () => {
  const router = useRouter()

  const [modalValue, setModalValue] = useRecoilState(modalState)
  const [idValue, setIdValue] = useRecoilState(idState)

  const [student, setStudent] = useState({
    id: '',
    name: '',
    phone: '',
    particulars: ''
  })

  useEffect(() => {
    fetchApi(`/students/${idValue}`, 'GET').then(res => {
      setStudent(res.data)
    })
  })

  return (
    <div className="relative top-0 left-0 w-[480px] h-screen bg-white rounded-tr-[32px] shadow">
      <button
        className="absolute top-6 right-6"
        onClick={() => setModalValue(!modalValue)}
      >
        x
      </button>
      <div className="pt-[72px] px-6 box-border">
        <div className="text-gray-900 text-[26px] font-bold mb-2">
          {student.name}
        </div>
        <div className="text-gray-800 text-base font-medium mb-5">
          {student.phone.slice(0, 3)}-{student.phone.slice(3, 7)}-
          {student.phone.slice(7, 11)}
        </div>

        <div className="text-gray-500 text-sm font-normal">
          {student.particulars}
        </div>
      </div>
      <div className="absolute bottom-0 p-6">
        <button
          onClick={() => {
            router.push('/student/edit')
            setModalValue(!modalValue)
          }}
          className="h-[52px] w-[431px] btn-purple"
        >
          수정하기
        </button>
      </div>
    </div>
  )
}

export default DetailModal
