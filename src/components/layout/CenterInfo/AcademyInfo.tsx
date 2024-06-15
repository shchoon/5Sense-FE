'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CenterInfo } from '@/app/(service)/layout'
import { formatPhoneNum } from '@/utils'
import DefaultProfile from './DefualtProfile'

interface IProps {
  centerInfo: CenterInfo | undefined
  isExistCenter: boolean | undefined
}

export default function AcademyInfo({ centerInfo, isExistCenter }: IProps) {
  const router = useRouter()

  if (isExistCenter == undefined) {
    return
  }

  return centerInfo ? (
    <div className="w-full flex flex-col items-center gap-7">
      <div className="w-full flex flex-col items-center gap-4">
        <Image className="rounded-full bg-[#D3C4F9]" src={centerInfo.profile} alt="profile" width={90} height={90} />
        <div className="w-full flex flex-col items-center gap-2">
          <p className={`text-white text-[21px] font-bold`}>{centerInfo.name}</p>
          <p className={`text-white h-[14px] text-sm font-medium`}>{formatPhoneNum(centerInfo.mainPhone)}</p>
          <p className={`text-white h-3 text-xs font-medium`}>{centerInfo.address}</p>
        </div>
      </div>
      <button
        className="max-w-[200px] w-full px-4 py-3 bg-slate-50 bg-opacity-20 rounded-md text-center text-sm font-bold leading-[21px] cursor-pointer text-white"
        onClick={() => router.push('/centerInfo')}
      >
        내 프로필 관리
      </button>
    </div>
  ) : (
    <DefaultProfile />
  )
}
