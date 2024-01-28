'use client'
import { useRouter } from 'next/navigation'
import angle_left from '@/assets/icon/angle-left.svg'
import Image from 'next/image'

export default function ClassRegisterLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col gap-[30px]">
      <button
        className="w-full black-bold text-3xl text-start cursor-pointer"
        onClick={() => router.push('/class')}
      >
        <Image src={angle_left} alt="angleleft" className="fill-[blue]" />
        클래스 등록
      </button>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}
