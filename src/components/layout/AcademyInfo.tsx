'use client'
import Image from 'next/image'
import profile from '@/assets/images/profile.png'
import Link from 'next/link'

export default function AcademyInfo(props: any) {
  console.log(props.color)
  const onProfileHandler = () => {
    console.log('hello')
  }
  return (
    <div className="infoContent w-full flex flex-col items-center gap-7">
      <div className="flex flex-col items-center gap-4">
        <Image src={profile} alt="profile" />
        <div className="infoDetail flex flex-col items-center gap-2">
          <p className={`${props.color} text-[21px] font-bold`}>
            매직기구필라테스
          </p>
          <p className={`${props.color} h-[14px] text-sm font-medium`}>
            031-706-1281
          </p>
          <p className={`${props.color} h-3 text-xs font-medium `}>
            경기 성남시 분당구 판교로256번길 19
          </p>
        </div>
      </div>
      <Link href={'/management'}>
        <button
          onClick={onProfileHandler}
          className={`w-[200px] h-[45px] px-4 py-3 box-border ${props.btnColor} rounded-md justify-center items-center`}
        >
          <span className="text-center text-white text-sm font-bold leading-[21px]">
            내 프로필 관리
          </span>
        </button>
      </Link>
    </div>
  )
}
