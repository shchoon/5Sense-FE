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

  const router = useRouter()

  const [selectId, setSelectId] = useState<number>(0)

  return (
    <div className="relative w-full xl:h-[54px] h-[44px] flex gap-[1px]">
      {menu.map(menu => {
        return (
          <div
            key={menu.id}
            onClick={() => {
              router.push(`${menu.slug}`)
              setSelectId(menu.id)
            }}
            className={`cursor-pointer`}
          >
            {selectId === menu.id ? (
              <div className="xl:w-[160px] w-[130px] xl:h-[70px] h-[50px] overflow-visible">
                <Image
                  src={'/assets/icons/icon/nav/bg-menu.png'}
                  alt="menu"
                  width={180}
                  height={70}
                  className="relative max-w-none xl:block hidden"
                />
                <Image
                  src={'/assets/icons/icon/nav/bg-menu.png'}
                  alt="menu"
                  width={145}
                  height={50}
                  className="relative max-w-none xl:hidden block"
                />
                <div className="relative z-30 xl:bottom-[45px] bottom-[40px] h-7 flex justify-center items-center gap-1.5 xl:text-[17px] text-[15px] font-bold text-[#7354E8]">
                  {menu.imageUrl}
                  {menu.title}
                </div>
              </div>
            ) : (
              <div className="xl:w-[138px] w-28 xl:h-[54px] h-[44px] flex gap-1.5 xl:text-[15px] text-[13px] bg-[#907AE5] rounded-tl-xl rounded-tr-xl justify-center items-center text-[#D3C4F9]">
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
