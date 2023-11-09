import Navbar from '@/components/main/Navbar'
import Image from 'next/image'
import mainlogo from '@/assets/logo/mainlogo.svg'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="wrapper w-screen h-full bg-primary-50 overflow-auto">
      <div className="topcontainer relative w-full min-w-[768px] h-[601px] xl:h-[469px] px-6 md:px-12 lg:px-0 bg-gradient-to-b from-indigo-500 to-violet-500">
        <div className="LogoBox absolute top-[48px] left-[24px] flex flex-row items-center gap-[6px]">
          <Image src={mainlogo} width={52} height={52} alt="mainlogo"></Image>
          <span className="Sense text-slate-50 text-xl font-bold font-['Poppins']">
            5sense
          </span>
        </div>
        <div className="topbox flex w-full h-fullmin-w-[768px] ">
          <div className="academyInfo hidden lg:academy-info">학원정보</div>
          <div className="relative w-full h-full min-w-[768px] xl:mr-4 2xl:mr-8 3xl:mr-12 top-[124px] xl:top-[66px]">
            <Navbar />
            <div className="relative w-full h-full min-w-[720px] bg-white rounded-2xl shadow">
              {children}
            </div>
            <div className="relative bottom-0">footer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
