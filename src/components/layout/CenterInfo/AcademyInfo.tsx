'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

import { getCenterInfo } from '@/lib/api/center'
import { useEffect } from 'react'
import DefaultProfile from './DefualtProfile'
import { formatPhoneNum } from '@/utils'

export interface CenterInfo {
  status: string
  name: string
  address: string
  mainPhone: string
  profile: string
  open: string
  close: string
}

export default function AcademyInfo() {
  const router = useRouter()

  const [centerInfo, setCenterInfo] = useState<CenterInfo>()

  const getCenterInfoData = async () => {
    try {
      const result = await getCenterInfo()
      setCenterInfo(() => ({ ...result.data.data, status: 'success' }))
    } catch (err) {
      throw err
    }
  }
  const renderProfile = () => {
    if (centerInfo) {
      return centerInfo.status !== undefined ? (
        <div className="w-full flex flex-col items-center gap-4">
          <Image className="rounded-full" src={centerInfo.profile} alt="profile" width={90} height={90} />
          <div className="w-full flex flex-col items-center gap-2">
            <p className={`text-white text-[21px] font-bold`}>{centerInfo.name}</p>
            <p className={`text-white h-[14px] text-sm font-medium`}>{formatPhoneNum(centerInfo.mainPhone)}</p>
            <p className={`text-white h-3 text-xs font-medium`}>{centerInfo.address}</p>
          </div>
        </div>
      ) : (
        <DefaultProfile />
      )
    }
  }
  useEffect(() => {
    getCenterInfoData()
  }, [])

  return (
    <div className="w-full flex flex-col items-center gap-7">
      {renderProfile()}
      <button
        className="max-w-[200px] w-full px-4 py-3 bg-slate-50 opacity-20 rounded-md text-center text-sm font-bold leading-[21px] cursor-pointer"
        onClick={() => router.push('/centerInfo')}
      >
        내 프로필 관리
      </button>
    </div>
  )
}
