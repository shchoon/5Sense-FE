import Image from 'next/image'
import noneResult from '@/assets/icons/noneResult.svg'

export default function NoneResult() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col gap-6 w-[432px] h-[244px]">
        <Image
          className="mx-auto"
          src={noneResult}
          width={148}
          height={148}
          alt=" "
        />
        <div className="w-full flex flex-col gap-3">
          <div className="w-[432px] text-center gray-900-bold text-2xl font-['Pretendard']">
            검색결과가 없습니다.
          </div>
          <div className="w-[432px] text-center text-gray-400 text-base font-medium font-['Pretendard']">
            다른 검색어를 통해 검색을 이어나가보세요
          </div>
        </div>
      </div>
    </div>
  )
}
