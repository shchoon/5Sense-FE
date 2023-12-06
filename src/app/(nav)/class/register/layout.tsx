'use client'
import { useRouter } from 'next/navigation'

export default function ClassRegisterLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 box-border">
      <div className="flex gap-4">
        <button onClick={() => router.push('/class')}>◀︎</button>
        <h1 className="black-bold text-3xl">클래스 등록</h1>
      </div>
      <div className="flex flex-col items-center relative top-[30px]">
        {children}
      </div>
    </div>
  )
}
