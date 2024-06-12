'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import IconNotice from '@/icons/icon/main/Notification.svg'
import IconLogout from '@/icons/icon/main/logout.svg'
import MenuIcon from 'public/assets/icons/menu.svg'
import Logo from 'public/assets/logo/Logo.png'

export default function MobileHeader() {
  const router = useRouter()
  return (
    <div className="lg:hidden block w-full px-6 pt-8 pb-10 box-border md:px-12">
      <div className="flex justify-between items-center">
        <div className="rightBox flex items-center gap-5">
          <MenuIcon
            className="cursor-pointer"
            // onClick={() => {
            //   setModal(true)
            //   setIsClickedMenu(true)
            // }}
          />
          <div className="logoBox flex gap-[10px] cursor-pointer" onClick={() => router.push('/home')}>
            <Image src={Logo} alt="logo" width={52} height={52} />
            <span className="text-slate-50 text-xl font-bold leading-[52px]">5Sense</span>
          </div>
        </div>
        <div className="iconBox lg:absolute lg:top-[37px] lg:right-6 flex items-center gap-6 cursor-pointer">
          <IconNotice />
          <IconLogout
            width={28}
            height={28}
            onClick={() => {
              typeof window !== undefined && localStorage.clear()
              router.push('/login')
            }}
          />
        </div>
      </div>
    </div>
  )
}
