'use client'
import Image from 'next/image'
import ArrowBack from 'public/assets/icons/allowBack.svg'
import Ellipsis from 'public/assets/icons/ellipsis75.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ModifyPage({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

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
              <Link href={data.url}>
                <div
                  key={i}
                  className={`${
                    pathName === `${data.url}` ? 'text-indigo-500' : 'text-gray-400'
                  }  text-base font-bold font-['Pretendard']`}
                >
                  {data.title}
                </div>
              </Link>
            )
          })}
          {/* <Link href={'/centerInfo'}>
            <div
              className={`${
                pathName === '/centerInfo' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard']`}
            >
              센터 정보
            </div>
          </Link>
          <Link href={'/policy'}>
            <div
              className={`${
                pathName === '/policy' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard']`}
            >
              개인정보처리방침
            </div>
          </Link>
          <Link href={'/accessTerms'}>
            <div
              className={`${
                pathName === '/accessTerms' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard']`}
            >
              이용약관
            </div>
          </Link>
          <Link href={'/withDrawal'}>
            <div
              className={`${
                pathName === '/withDrawal' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard']`}
            >
              회원 탈퇴
            </div>
          </Link> */}
        </div>
      </div>
      {/* box */}
      <div className="w-full flex justify-center pb-[60px]">{children}</div>
    </div>
  )
}
