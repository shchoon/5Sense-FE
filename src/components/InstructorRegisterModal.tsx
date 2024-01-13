import Image from 'next/image'
import x_circle from '../assets/icon/x_circle_35.svg'
import { instructorRegisterModal } from '@/state/modal'
import { useRecoilState } from 'recoil'

export default function () {
  const [modal, setModal] = useRecoilState(instructorRegisterModal)

  const clickClose = () => {
    setModal(false)
  }

  return (
    <div className="relative w-[424px] h-[326px] bg-white rounded-xl border border-gray-900 flex justify-center">
      <div className="absolute left-6 top-10 gray-900-bold text-[22px]">
        강사 등록
      </div>
      <Image
        className="absolute right-4 top-4 cursor-pointer"
        src={x_circle}
        width={35}
        height={35}
        alt=""
        onClick={clickClose}
      />
      <div className="absolute top-[90px] w-[376px] flex flex-col gap-7">
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-3 h-[58px] py-5 rounded-lg border-gray-200"
          />
          <input
            type="text"
            placeholder="전화번호 (-제외)"
            className="w-full px-3 h-[58px] py-5 rounded-lg border-gray-200"
          />
        </div>
        <button className="w-full h-[52px] btn-purple flex justify-center items-center">
          <div className="text-white text-base font-semibold leading-normal">
            등록
          </div>
        </button>
      </div>
    </div>
  )
}
