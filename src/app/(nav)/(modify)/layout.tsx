'use client'
import Image from 'next/image'
import ArrowBack from 'public/assets/icons/allowBack.svg'
import Ellipsis from 'public/assets/icons/ellipsis75.svg'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function ModifyPage({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const router = useRouter()
  const linkList = [
    {
      url: '/centerInfo',
      title: '센터 정보'
    },
    {
      url: '/policy',
      title: '개인정보처리방침'
    },
    {
      url: '/accessTerms',
      title: '이용 약관'
    },
    {
      url: '/withdrawal',
      title: '회원 탈퇴'
    }
  ]
  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image className="absolute left-[48px] top-[61px]" src={Ellipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">내 프로필 관리</div>
      </div>
      <div className="w-full flex justify-center pt-[120px] pb-6">
        <div className="w-[384px] h-6 flex gap-3.5">
          {linkList.map((data, i) => {
            return (
              <div
                key={i}
                className={`${pathName === data.url ? 'text-indigo-500' : 'text-gray-400'} text-base font-bold`}
                onClick={() => router.push(data.url)}
              >
                {data.title}
              </div>
            )
          })}
        </div>
      </div>
      {/* box */}
      <div className="w-full flex justify-center pb-[60px]">{children}</div>
    </div>
  )
}
