'use client'
import Link from 'next/link'
import OpenBookIcon from 'public/assets/icons/nav/open-book.svg'
import HomeIcon from 'public/assets/icons/nav/home.svg'
import UserIcon from 'public/assets/icons/nav/user.svg'
import ReceiptIcon from 'public/assets/icons/nav/receipt.svg'
import ProfileCardIcon from 'public/assets/icons/nav/profile-card.svg'
import RectangleIcon from 'public/assets/images/Rectangle.svg'
import LayerIcon from 'public/assets/icons/layers.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Router } from 'next/router'
import path from 'path'

type Menu = {
  id: string
  icon: React.ComponentType<any>
  slug: string
  title: string
  avtive: boolean
}

const menu: Menu[] = [
  {
    id: '0',
    icon: HomeIcon,
    slug: '/home',
    title: '메인 홈',
    avtive: false
  },
  {
    id: '1',
    icon: OpenBookIcon,
    slug: '/class',
    title: '클래스 관리',
    avtive: false
  },
  {
    id: '2',
    icon: UserIcon,
    slug: '/student',
    title: '수강생 관리',
    avtive: false
  },
  {
    id: '3',
    icon: ProfileCardIcon,
    slug: '/instructor',
    title: '강사 관리',
    avtive: false
  },
  {
    id: '4',
    icon: ReceiptIcon,
    slug: '/pay',
    title: '청구/납부',
    avtive: false
  },
  {
    id: '5',
    icon: LayerIcon,
    slug: '/room',
    title: '강의실 관리',
    avtive: false
  }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex w-[720px] xl:w-[879px] gap-[1px]">
      {menu.map(menu => {
        const Icon = menu.icon
        return (
          <Link href={`${menu.slug}`} key={menu.id}>
            <div
              className={`flex justify-center h-14  ${
                pathname.includes(menu.slug) ? 'w-[170px] xl:w-[205px]' : 'w-[135px] xl:w-[168px] bg-primary-400'
              } xl:h-[70px] rounded-tl-xl rounded-tr-xl translate-y-[14px] xl:translate-y-[17px]`}
            >
              <div className="content w-[135px] h-[42px] xl:w-[168px] xl:h-[54px] flex justify-center items-center gap-[10px]">
                <Icon className="w-6 h-6 text-primary-200 top-4 left-[37.5px]" />
                <span className={`leading-[60px] text-primary-300 font-bold text-[13px] xl:text-base`}>
                  {menu.title}
                </span>
              </div>
            </div>
            {pathname.includes(menu.slug) ? (
              <div className="absolute top-[124px] lg:top-0 translate-y-2 z-30">
                <RectangleIcon className="w-[177px] h-[50px] xl:w-[220px] xl:h-[62px]" />
                <div className="content w-[135px] h-[42px] xl:w-[205px] xl:h-[54px] flex justify-center items-center gap-[10px] translate-y-[-42px] xl:translate-y-[-54px]">
                  <Icon className="w-6 h-6 text-primary-600" />
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
