import instance from '@/lib/api/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import CloseCircleIcon from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
  onCloseState: () => void
}

export default function DetailInstructor({ onClose, onCloseState }: IProps) {
  const router = useRouter()

  const [teacher, setTeacher] = useState({
    name: '',
    phone: ''
  })

  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      <CloseCircleIcon
        className="absolute right-6 top-6 cursor-pointer"
        width={35}
        height={35}
        onClick={() => {
          onClose()
          onCloseState()
        }}
      />
    </div>
  )
}
