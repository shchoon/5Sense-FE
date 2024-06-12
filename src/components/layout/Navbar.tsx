'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'

import IconHome from '@/icons/icon/nav/home.svg'
import IconClass from '@/icons/icon/nav/open-book.svg'
import IconStudent from '@/icons/icon/nav/user.svg'
import IconInstructor from '@/icons/icon/nav/profile-card.svg'
import IconReceipt from '@/icons/icon/nav/receipt.svg'
import IconRoom from '@/icons/icon/nav/layers.svg'

type Menu = {
  id: number
  imageUrl: ReactElement
  slug: string
  title: string
  active: boolean
}
const menu: Menu[] = [
  {
    id: 0,
    imageUrl: <IconHome width={20} height={20} />,
    slug: '/home',
    title: '메인 홈',
    active: true
  },
  {
    id: 1,
    imageUrl: <IconClass width={20} height={20} />,
    slug: '/class',
    title: '클래스 관리',
    active: false
  },
  {
    id: 2,
    imageUrl: <IconStudent width={20} height={20} />,
    slug: '/student',
    title: '수강생 관리',
    active: false
  },
  {
    id: 3,
    imageUrl: <IconInstructor width={20} height={20} />,
    slug: '/instructor',
    title: '강사 관리',
    active: false
  },
  {
    id: 4,
    imageUrl: <IconReceipt width={20} height={20} />,
    slug: '/pay',
    title: '청구/납부',
    active: false
  },
  {
    id: 5,
    imageUrl: <IconRoom width={20} height={20} />,
    slug: '/room',
    title: '강의실 관리',
    active: false
  }
]
export default function Navbar() {
  const pathname = usePathname()

  console.log(pathname)

  const router = useRouter()

  return (
    <div className="w-full lg:h-[76px] h-[62px] flex items-end gap-[1px]">
      {menu.map(menu => {
        return (
          <div
            key={menu.id}
            onClick={() => {
              router.push(`${menu.slug}`)
            }}
            className={`cursor-pointer`}
          >
            {pathname === menu.slug ? (
              <div className="lg:w-[160px] w-[130px] lg:h-[76px] h-[62px] relative">
                <Image
                  src={'/assets/icons/icon/nav/menu.png'}
                  alt="menu"
                  width={180}
                  height={90}
                  className="relative max-w-none hidden lg:block"
                />
                <Image
                  src={'/assets/icons/icon/nav/menu.png'}
                  alt="menu"
                  width={145}
                  height={50}
                  className="relative max-w-none lg:hidden block"
                />
                <div className="absolute top-0 lg:w-[160px] w-[130px] lg:h-[76px] h-[62px] flex justify-center lg:pt-[20px] pt-4 gap-1.5 lg:text-[17px] text-[15px] font-bold text-[#7354E8]">
                  {menu.imageUrl}
                  {menu.title}
                </div>
              </div>
            ) : (
              <div className="lg:w-[138px] w-[112px] lg:h-[70px] h-14 flex gap-1.5 lg:text-[15px] text-[13px] bg-[#907AE5] rounded-tl-lg rounded-tr-lg justify-center lg:pt-4 pt-[13px] text-[#D3C4F9]">
                {menu.imageUrl}
                {menu.title}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
