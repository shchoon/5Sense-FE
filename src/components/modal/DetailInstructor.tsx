import instance from '@/lib/api/axios'
import { useEffect, useState } from 'react'
import { SideProps } from './SideModal'
import { useRecoilState } from 'recoil'
import { modalState } from '@/lib/state/modal'
import { useRouter } from 'next/navigation'

export default function DetailInstructor({ id }: SideProps) {
  const router = useRouter()

  const [teacher, setTeacher] = useState({
    name: '',
    phone: ''
  })

  const [Modal, setModal] = useRecoilState(modalState)

  const handleModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      active: false
    }))
  }

  const getTeacherInfo = () => {
    instance.get(`/teachers/${id}`).then(res => {
      setTeacher({
        ...teacher,
        name: res.data.data.name,
        phone: res.data.data.phone
      })
    })
  }

  useEffect(() => {
    getTeacherInfo()
  }, [])

  return (
    <>
      <div className="w-full mt-[13px]">
        <div className="text-gray-900 text-[26px] font-bold mb-2">
          {teacher.name}
        </div>
        <div className="text-gray-800 text-base font-medium mb-5">
          {teacher.phone?.slice(0, 3)}-{teacher.phone?.slice(3, 7)}-
          {teacher.phone?.slice(7, 11)}
        </div>
      </div>
      <button
        className="absolute bottom-6 left-6 w-[431px] h-[52px] btn-purple"
        onClick={() => {
          router.push('/instructor/edit')
          handleModal()
        }}
      >
        수정하기
      </button>
    </>
  )
}
