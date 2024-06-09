'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import instance from '@/lib/api/axios'

import { centerInfoState } from '@/lib/state/centerInfoState'

import profile from 'public/assets/images/profile.png'
import ProfileIcon from '@/icons/icon/defaultProfile.svg'
import { useEffect } from 'react'

export default function AcademyInfo() {
  const router = useRouter()

  const centerInfo = useRecoilValue(centerInfoState)
  const setCenterInfo = useSetRecoilState(centerInfoState)

  useEffect(() => {
    instance('/centers/my').then(res => {
      const centerData = res.data.data
      console.log(res.data.data)
      setCenterInfo(prev => ({
        ...prev,
        name: centerData.name,
        address: centerData.address,
        mainPhone: centerData.mainPhone,
        open: centerData.open,
        close: centerData.close,
        profile: centerData.profile
      }))
    })
  }, [])

  return (
    <div className="w-full flex flex-col items-center gap-7">
      <div className="relative w-full flex flex-col items-center gap-2">
        {centerInfo.name !== '' &&
          (centerInfo.profile !== null ? (
            <div className="absolute top-5 w-[148px] h-[148px] flex justify-center items-center ">
              <img className="rounded-full w-[90px] h-[90px]" src={centerInfo.profile} />
            </div>
          ) : (
            <ProfileIcon width={150} className="absolute -top-5" />
          ))}

        {centerInfo.name !== '' && (
          <div className="absolute top-[100px] w-full infoDetail flex flex-col items-center gap-2">
            <p className={`text-white text-[21px] font-bold`}>{centerInfo.name}</p>
            <p className={`text-white h-[14px] text-sm font-medium`}>
              {centerInfo.mainPhone.slice(0, 3)}-{centerInfo.mainPhone.slice(3, 7)}-{centerInfo.mainPhone.slice(7, 11)}
            </p>
            <p className={`text-white h-3 text-xs font-medium `}>{centerInfo.address}</p>
          </div>
        )}
      </div>
      <button
        onClick={() => router.push('/centerInfo')}
        className={`mt-[160px] max-w-[200px] w-full h-[45px] px-4 py-3 box-border bg-slate-50 bg-opacity-20 rounded-md justify-center items-center text-center text-white text-sm font-bold leading-[21px]`}
      >
        내 프로필 관리
      </button>
    </div>
  )
}
