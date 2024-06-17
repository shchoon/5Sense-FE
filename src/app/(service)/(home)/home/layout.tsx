import MainBox from '@/components/main/MainBox'
import WriteBox from '@/components/main/WriteBox'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col gap-20 2xl:p-12 xl:p-12 lg:p-6 md:p-12 p-6">
      <MainBox />
      <div className='flex flex-col'>
      {children}
      </div>
      <WriteBox />
    </div>
  )
}
