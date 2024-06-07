'use client'

import { useRouter } from 'next/navigation'

import BackIcon from '@/icons/icon/back.svg'

export default function ClassEditLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col gap-[30px]">
      <button
        className="w-full flex gap-4 items-center black-bold text-3xl text-start cursor-pointer"
        onClick={() => router.push('/class')}
      >
        <BackIcon />
        클래스 수정
      </button>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}
