import Image from 'next/image'

import instance from '@/lib/api/axios'
import { modalState } from '@/lib/state/modal'
import { useSetRecoilState } from 'recoil'

import CloseIcon from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
  roomId: number
}

export default function DeleteModal({ onClose, roomId }: IProps) {
  const setModal = useSetRecoilState(modalState)
  console.log(roomId)
  return (
    <div className="relative bg-white w-[424px] h-[282px] border border-1 border-gray-900 rounded-xl">
      <CloseIcon
        className="absolute right-4 top-4 cursor-pointer"
        width={35}
        height={35}
        alt="CloseCircle"
        onClick={() => onClose()}
      />
      <div className="absolute top-[100px] w-full text-center gray-900-bold text-2xl">정말 삭제하시겠습니까?</div>
      <div className="absolute left-6 bottom-6 w-[376px] h-[52px] flex gap-2">
        <button
          className="w-full btn-white flex items-center justify-center gray-800-semibold font-base"
          onClick={() => {
            instance.delete(`/lesson-rooms/${roomId}`).then(res => {
              console.log(res)
              setModal(false)
            })
          }}
        >
          삭제하기
        </button>
        <button
          className="w-full btn-purple flex items-center justify-center text-white font-semibold font-base"
          onClick={() => onClose()}
        >
          취소하기
        </button>
      </div>
    </div>
  )
}
