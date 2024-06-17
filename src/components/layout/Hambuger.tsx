import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import TodaySchedule from './CenterInfo/TodaySchedule'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { changePhoneNumberToString } from '@/utils'

import Profile from 'public/assets/images/profile.png'
import ModalClose from '@/icons/icon/modalClose.svg'
import ProfileIcon from '@/icons/icon/defaultProfile.svg'
import { useEffect } from 'react'

interface IProps {
  onClose: () => void
}

export default function Hambuger({ onClose }: IProps) {
  const centerInfo = useRecoilValue(centerInfoState)
  const router = useRouter()
  const currentDate = new Date()
  const currentDateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }

  /* useEffect(() => {
    const centerInfo = useRecoilValue(centerInfoState)

  },[]) */

  return (
    <div className="w-[480px] pt-6 flex flex-col gap-[40px] h-screen rounded-tr-[32px] bg-white">
      {/* 센터 정보 */}
      <div className="w-full px-6">
        <div className="w-full flex justify-end">
          <ModalClose className="cursor-pointer" width={35} height={35} alt="ModalClose" onClick={() => onClose()} />
        </div>
        <div className="w-full px-6 flex flex-col items-center gap-7">
          <div className="relative w-[212px] h-[179px] flex items-center flex-col gap-4">
            {centerInfo.profile === null ? (
              <ProfileIcon className="absolute -top-5" />
            ) : (
              <img className="rounded-full w-[90px] h-[90px]" src={centerInfo.profile} />
            )}
            <div className="absolute top-[104px] w-full flex flex-col gap-2">
              <div className="w-full text-center gray-800-bold text-[22px]">{centerInfo.name}</div>
              <div className="h-[34px] flex-col gap-2">
                <div className="text-center text-gray-600 text-base font-medium">
                  {changePhoneNumberToString(centerInfo.mainPhone)}
                </div>
                <div className="text-center text-gray-600 text-sm font-medium">{centerInfo.address}</div>
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
      </div>
      {/* 경계선 */}
      <div className="w-full h-px bg-gray-200"></div>
      {/* <div className="absolute top-[405px] w-full px-6 flex flex-col gap-3">
        <div className="w-[140px] px-2 py-1 flex items-center gap-1.5 rounded bg-primary-200">
          <div className="text-primary-600 text-sm font-bold">TODAY</div>
          <div className="text-primary-600 text-sm font-medium">
            {currentDateData.year}/{currentDateData.month + 1}/{currentDateData.date}
          </div>
        </div>
      </div> */}
      <div className="w-full px-6">
        <TodaySchedule />
      </div>
    </div>
  )
}
