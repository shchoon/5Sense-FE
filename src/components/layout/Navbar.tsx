'use client'
import Link from 'next/link'
import OpenBookIcon from 'public/assets/icons/nav/open-book.svg'
import HomeIcon from 'public/assets/icons/nav/home.svg'
import UserIcon from 'public/assets/icons/nav/user.svg'
import ReceiptIcon from 'public/assets/icons/nav/receipt.svg'
import ProfileCardIcon from 'public/assets/icons/nav/profile-card.svg'
import RectangleIcon1 from 'public/assets/images/Rectangle2.svg'
import RectangleIcon2 from 'public/assets/images/Rectangle3.svg'
import LayerIcon from 'public/assets/icons/layers.svg'
import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'

type Menu = {
  id: number
  icon: React.ComponentType<any>
  slug: string
  title: string
  avtive: boolean
}

/* ${
                pathname.includes(menu.slug) ? 'w-[170px] xl:w-[205px]' : 'w-[135px] xl:w-[168px] bg-primary-400'
              } */

export default function Navbar() {
  const { width, height } = useWindowSize()
  const pathname = usePathname()
  const [navbarId, setNavbarId] = useState<undefined | number>(undefined)

  const menu: Menu[] = [
    {
      id: 0,
      icon: HomeIcon,
      slug: '/home',
      title: '메인 홈',
      avtive: false
    },
    {
      id: 1,
      icon: OpenBookIcon,
      slug: '/class',
      title: '클래스 관리',
      avtive: false
    },
    {
      id: 2,
      icon: UserIcon,
      slug: '/student',
      title: '수강생 관리',
      avtive: false
    },
    {
      id: 3,
      icon: ProfileCardIcon,
      slug: '/instructor',
      title: '강사 관리',
      avtive: false
    },
    {
      id: 4,
      icon: ReceiptIcon,
      slug: '/pay',
      title: '청구/납부',
      avtive: false
    },
    {
      id: 5,
      icon: LayerIcon,
      slug: '/room',
      title: '강의실 관리',
      avtive: false
    }
  ]

  const checkNavbarId = (pathname: string) => {
    const checkedMenu = menu.filter((data, i) => pathname.includes(data.slug))
    if (checkedMenu.length === 0) {
      setNavbarId(undefined)
    } else {
      setNavbarId(checkedMenu[0].id)
    }
  }

  useEffect(() => {
    checkNavbarId(pathname)
  }, [pathname])

  return (
    <div className="flex w-[854px] gap-[1px]">
      {menu.map(menu => {
        const Icon = menu.icon
        return (
          <Link href={`${menu.slug}`} key={menu.id}>
            <div
              className={`flex justify-center xl:w-[138px] xl:h-[70px] xl:pt-4 w-28 h-14 pt-[13px] bg-primary-500 rounded-tl-xl rounded-tr-xl ${
                navbarId !== undefined && menu.id >= navbarId && 'translate-x-[16px]'
              } translate-y-4 `}
            >
              <div className="content w-full h-full flex justify-center gap-1.5">
                <Icon className="xl:w-6 xl:h-6 w-5 h-5 text-primary-200" />
                <span className={` text-primary-300 font-bold text-[13px] xl:text-base`}>{menu.title}</span>
              </div>
            </div>
            {pathname.includes(menu.slug) ? (
              <div className="absolute top-[124px] lg:top-0 h-[90px] z-30">
                {width > 1281 ? (
                  <RectangleIcon1 className="mt-[11px] w-[185px] h-[60px]" />
                ) : (
                  <RectangleIcon2 className="mt-[11px] w-[145px] h-[50px]" />
                )}

                <div className="content xl:ml-3 w-[135px] h-[42px] xl:h-[54px] flex justify-center items-center gap-[10px] translate-y-[-42px] xl:translate-y-[-54px]">
                  <Icon className="xl:w-6 xl:h-6 w-5 h-5 text-primary-600" />
                  <span className="bold-500 text-base xl:text-lg leading-[42px] xl:leading-[60px]">{menu.title}</span>
                </div>
              </div>
            ) : (
              ''
            )}
          </Link>
        )
      })}
    </div>
  )
}
