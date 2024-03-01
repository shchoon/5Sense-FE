import Image from 'next/image'

import Minus from 'public/assets/icons/minus_vector.svg'
import Plus from 'public/assets/icons/plus_vector.svg'

export default function LessonTimeModal() {
  return (
    <div className="relative left-[340px] top-0 w-[282px] p-4 flex flex-col gap-6 rounded-lg border border-1 border-primary-600">
      <div className="w-full flex flex-col gap-6">
        <div className="w-full h-6 text-left gray-900-semibold text-base">소요 시간</div>
        <div className="w-full flex items-center justify-between h-10">
          <button className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600">
            <Image src={Minus} width={12} height={9.6} alt="minus" />
          </button>
          <div className="w-[186px] h-[27px] flex justify-center items-center gray-800-semibold text-lg">2시간</div>
          <button className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600">
            <Image src={Plus} width={14} height={14} alt="plus" />
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2.5">
        <button className="w-full h-[41px] rounded-lg border border-1 border-gray-200 flex justify-center items-center gray-800-semibold text-sm btn-white">
          취소
        </button>
        <button className="w-full h-[41px] rounded-lg bg-primary-600 flex justify-center items-center text-white font-semibold text-sm btn-purple">
          확인
        </button>
      </div>
    </div>
  )
}
