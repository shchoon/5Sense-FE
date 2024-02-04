import instance from '@/hooks/useAxios'
import { useEffect, useState } from 'react'
import { SideProps } from './SideModal'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { modalState } from '@/state/modal'

export default function DetailStudent({ id }: SideProps) {
  const router = useRouter()

  const [Modal, setModal] = useRecoilState(modalState)

  const [student, setStudent] = useState({
    name: '',
    phone: '',
    particulars: ''
  })

  const handleModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      active: false
    }))
  }

  const getStudentInfo = () => {
    instance.get(`/students/${id}`).then(res => {
      setStudent({
        ...student,
        name: res.data.data.name,
        phone: res.data.data.phone,
        particulars: res.data.data.particulars
      })
    })
  }

  useEffect(() => {
    getStudentInfo()
  }, [])

  return (
    <>
      <div className="w-full mt-[13px]">
        <div className="text-gray-900 text-[26px] font-bold mb-2">
          {student.name}
        </div>
        <div className="text-gray-800 text-base font-medium mb-5">
          {student.phone?.slice(0, 3)}-{student.phone?.slice(3, 7)}-
          {student.phone?.slice(7, 11)}
        </div>

        <div className="text-gray-500 text-sm font-normal">
          {student.particulars}
        </div>
      </div>
      <button
        className="absolute bottom-6 left-6 w-[431px] h-[52px] btn-purple"
        onClick={() => {
          router.push('/student/edit')
          handleModal()
        }}
      >
        수정하기
      </button>
    </>
  )
}
