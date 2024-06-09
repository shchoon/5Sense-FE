'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import AcademyInfo from '@/components/layout/AcademyInfo'
import Navbar from '@/components/layout/Navbar'
import TodaySchedule from '@/components/layout/TodaySchedule'
import { modalState } from '@/lib/state/modal'
import Footer from '@/components/layout/Footer'
import MobileHeader from '@/components/layout/Header/MobileHeader'
import PcHeader from '@/components/layout/Header/PcHeader'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const [isClickedMenu, setIsClickedMenu] = useState<boolean>(false)

  const onClose = () => {
    setModal(false)
    setIsClickedMenu(false)
  }

  return (
    <div className={`w-screen min-h-screen h-full`}>
      <div className={`w-full h-full`}>
        <MobileHeader />
        <PcHeader />
        <div className="w-full flex lg:pl-0 2xl:pr-12 xl:pr-8 lg:pr-4 md:px-12 px-6">
          <div className="w-full box-content mt-[180px] max-w-[248px] xl:px-6 lg:px-4 lg:block hidden">
            <AcademyInfo />
            <TodaySchedule />
          </div>
          <div className="w-full lg:pt-[66px]">
            <Navbar />
            <div className="relative w-full bg-white rounded-2xl lg:bottom-[22px] bottom-4">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
      {/* <SideModal /> */}
      {/* {isClickedMenu && (
        <Modal>
          <Hambuger onClose={onClose} />
        </Modal>
      )} */}
      {/* static은 레이어 계층에 들어가지 않기때문에 purplebox에 인덱스값을 -로 설정함*/}
      <div className="purplebox absolute top-0 left-0 w-screen h-[601px] lg:h-[469px] bg-gradient-to-b from-[#6F53DB] to-[#875EDC] z-[-10]" />
    </div>
  )
}
