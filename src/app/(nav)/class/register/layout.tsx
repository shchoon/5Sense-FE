'use client'
import { useRouter } from 'next/navigation'
import arrowBack from 'public/assets/icons/arrow-back.svg'
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
        className="w-full flex gap-4 items-center black-bold text-3xl text-start cursor-pointer"
        onClick={() => router.push('/class')}
      >
        <Image
          src={'/public/assets/icons/arrow-back.svg'}
          alt="arrow-back"
          width={28}
          height={28}
        />
        클래스 등록
      </button>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}
