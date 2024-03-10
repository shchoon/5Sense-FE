import Image from 'next/image'

import chevronRight from 'public/assets/icons/chevron/chevron-right.svg'

interface IProps {
  id: string
  name: string
  phone: string
}

export default function Card({ id, name, phone }: IProps) {
  return (
    <div
      key={id}
      className="w-full h-[240px] flex flex-col justify-between px-6 pt-8 pb-6 border border-gray-200 rounded-3xl shadow-[0px_5px_15px_0px_rgba(0, 0, 0, 0.02)]"
    >
      <div className="w-full flex flex-col gap-2">
        <div className="w-[307px] gray-900-semibold text-2xl">{name}</div>
        <div className="w-[307px] text-gray-500 text-base font-medium ">
          {phone?.slice(0, 3)}-{phone?.slice(3, 7)}-{phone?.slice(7, 11)}
        </div>
      </div>
      <div className="w-full px-5 py-2.5 flex gap-2 justify-center border border-primary-600 rounded-lg">
        <div className="indigo-500-semibold text-sm">강사 정보</div>
        <Image src={chevronRight} width={20} height={20} alt="" />
      </div>
    </div>
  )
}
