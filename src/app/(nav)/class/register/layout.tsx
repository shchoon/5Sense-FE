'use client'
import { useRouter } from 'next/navigation'

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
        ◀︎ 클래스 등록
      </button>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}
