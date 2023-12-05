import plusCircle from '../../../assets/icon/plus-circle.svg'
import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import Image from 'next/image'

export default function StudentPage() {
  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className="w-[137px] h-[30px]">
          <div className="w-full text-black text-[25px] font-bold font-['Pretendard'] leading-[30px]">
            수강생 관리
          </div>
        </div>

        <div className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 bg-primary-600">
          <Image src={plusCircle} width={20} height={20} alt=" " />
          <div className="h-[21px] w-16 text-white text-[11.5px] font-semibold font-['Pretendard'] leading-[21px]">
            수강생 등록
          </div>
        </div>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={search_16} width={16} height={16} alt=" " />
          <input
            className="w-[245px] focus:outline-none"
            placeholder="Search"
          />
          <Image src={x_icon_12} width={12} height={12} alt=" " />
        </div>
        <div className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600">
          <Image src={search_20} width={20} height={20} alt=" " />
        </div>
      </div>
    </div>
  )
}
