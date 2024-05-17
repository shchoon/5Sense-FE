import Image from 'next/image'
import { useRouter } from 'next/navigation'

import TodaySchedule from './TodaySchedule'

import Profile from 'public/assets/images/profile.png'

interface IProps {
  onClose: () => void
}

export default function Hambuger({ onClose }: IProps) {
  const router = useRouter()
  const currentDate = new Date()
  const currentDateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }

  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      <div className="absolute top-[72px] left-[48px] w-[384px] flex flex-col items-center gap-7">
        <div className="w-[212px] h-[179px] flex items-center flex-col gap-4">
          <Image src={Profile} className="w-[88px] h-[88px]" alt="Propfile" />
          <div className="w-full flex flex-col gap-2">
            <div className="w-full text-center gray-800-bold text-[22px]">매직기구필라테스</div>
            <div className="h-[34px] flex-col gap-2">
              <div className="text-center text-gray-600 text-base font-medium">031-706-1281</div>
              <div className="text-center text-gray-600 text-sm font-medium">경기 성남시 분당구 판교로256번길 19</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="w-[200px] h-[45px] px4 py-3 rounded-md btn-purple"
          onClick={() => {
            onClose()
            router.push('/centerInfo')
          }}
        >
          내 프로필 관리
        </button>
      </div>
      <div className="absolute top-[364px] w-full h-px bg-gray-200"></div>
      {/* <div className="absolute top-[405px] w-full px-6 flex flex-col gap-3">
        <div className="w-[140px] px-2 py-1 flex items-center gap-1.5 rounded bg-primary-200">
          <div className="text-primary-600 text-sm font-bold">TODAY</div>
          <div className="text-primary-600 text-sm font-medium">
            {currentDateData.year}/{currentDateData.month + 1}/{currentDateData.date}
          </div>
        </div>
      </div> */}
      <div className="absolute top-[405px] w-full px-6">
        <TodaySchedule />
      </div>
    </div>
  )
}
