import Image from 'next/image'
import Minus from 'public/assets/icons/minus_vector.svg'
import Plus from 'public/assets/icons/plus_vector.svg'

export default function ClasasModify() {
  return (
    <div className="absolute left-10 top-10 w-[640px] p-5 border border-1 border-gray-200 rounded-lg bg-white">
      {/* 클래스 등록 -> 소요 시간, 최대 수업 정원 */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full text-left text-base gray-800-semibold">소요시간</div>
        <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
          <div className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600">
            <Image src={Minus} width={12} height={10} alt="Minus" />
          </div>
          <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">90분</div>
          <div className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600">
            <Image src={Plus} width={14} height={14} alt="Plus" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full text-left text-base gray-800-semibold">최대 수업 정원</div>
        <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
          <div className="w-10 h-full flex items-center justify-center rounded-full bg-gray-200">
            <Image src={Minus} width={12} height={10} alt="Minus" />
          </div>
          <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">1명</div>
          <div className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600">
            <Image src={Plus} width={14} height={14} alt="Plus" />
          </div>
        </div>
      </div>
    </div>
  )
}
