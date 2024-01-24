'use client'
import Image from 'next/image'
import ArrowBack from '../../../assets/icons/allowBack.svg'
import Ellipsis from '../../../assets/icons/ellipsis75.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ModifyPage({
  children
}: {
  children: React.ReactNode
}) {
  const router = usePathname()
  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image
            className="absolute left-[48px] top-[61px]"
            src={Ellipsis}
            width={28}
            height={28}
            alt=""
          />
          <Image
            className="absolute left-[55px] top-[68px]"
            src={ArrowBack}
            width={14}
            height={14}
            alt=""
          />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard'] leading-[30px]">
          내 프로필 관리
        </div>
      </div>
      <div className="w-full flex justify-center pt-[120px] pb-6">
        <div className="w-[384px] h-6 flex  gap-4">
          <Link href={'/management'}>
            <div
              className={`${
                router === '/management' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard'] leading-normal`}
            >
              센터 정보
            </div>
          </Link>
          <Link href={'/policy'}>
            <div
              className={`${
                router === '/policy' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard'] leading-normal`}
            >
              개인정보처리방침
            </div>
          </Link>
          <Link href={'/accessTerms'}>
            <div
              className={`${
                router === '/accessTerms' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard'] leading-normal`}
            >
              이용약관
            </div>
          </Link>
          <Link href={'/withdrawal'}>
            <div
              className={`${
                router === '/withdrawal' ? 'text-indigo-500' : 'text-gray-400'
              }  text-base font-bold font-['Pretendard'] leading-normal`}
            >
              회원 탈퇴
            </div>
          </Link>
        </div>
      </div>
      {/* box */}
      <div className="w-full flex justify-center pb-[60px]">{children}</div>
    </div>
  )
}
