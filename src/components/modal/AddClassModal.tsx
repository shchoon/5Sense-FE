import Image from 'next/image'

import RoomReservation from '../room/RoomReservation'

import closeCircle from 'public/assets/icons/closeCircle.svg'

export default function AddClassModal() {
  return (
    <div className="absolute left-10 top-10 w-[640px] border border-1 border-gray-200 rounded-xl bg-white">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 text-2xl gray-900-bold">일정 추가</div>
        <Image className="absolute right-4 top-4" src={closeCircle} width={35} height={35} alt="closeCircle" />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-10">
        <RoomReservation class="" studentName="" classType="period" />
      </div>
    </div>
  )
}
