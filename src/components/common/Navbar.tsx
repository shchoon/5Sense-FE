'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import menuPc from '@/icons/icon/nav/menu-pc.png'
import menuMobile from '@/icons/icon/nav/menu-mobile.png'

type Menu = {
  id: number
  imageUrl: string
  slug: string
  title: string
  active: boolean
}

export default function Navbar() {
  const pathname = usePathname()

  const router = useRouter()

  const [navbarId, setNavbarId] = useState<undefined | number>(undefined)

  const menu: Menu[] = [
    {
      id: 0,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/home',
      title: '메인 홈',
      active: true
    },
    {
      id: 1,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/class',
      title: '클래스 관리',
      active: false
    },
    {
      id: 2,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/student',
      title: '수강생 관리',
      active: false
    },
    {
      id: 3,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/instructor',
      title: '강사 관리',
      active: false
    },
    {
      id: 4,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/pay',
      title: '청구/납부',
      active: false
    },
    {
      id: 5,
      imageUrl: 'public/assets/icons/icon/nav/home.svg',
      slug: '/room',
      title: '강의실 관리',
      active: false
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
    <div className="relative w-full h-[76px] flex gap-[1px] top-4">
      {menu.map(menu => {
        return (
          <div key={menu.id} onClick={() => router.push(`${menu.slug}`)} className={`w-full cursor-pointer`}>
            {menu.active ? (
              <div className="lg:w-[160px] w-[135px] h-[70px] overflow-visible">
                <Image
                  src={'/assets/icons/icon/nav/bg-menu.png'}
                  alt="menu"
                  width={180}
                  height={70}
                  className="relative max-w-none"
                />
              </div>
            ) : (
              <div className="max-w-[138px] h-[70px] pl-[31px] pr-[34px] pt-4 pb-[30px] bg-[#907AE5] rounded-tl-xl rounded-tr-xl justify-center items-center"></div>
            )}
          </div>

          // <Link href={`${menu.slug}`} key={menu.id}>
          //   <div
          //     className={`flex justify-center xl:w-[138px] xl:h-[70px] xl:pt-4 w-28 h-14 pt-[13px] bg-primary-500 rounded-tl-xl rounded-tr-xl ${
          //       navbarId !== undefined && menu.id >= navbarId && 'translate-x-[16px]'
          //     } translate-y-4 `}
          //   >
          //     <div className="content w-full h-full flex justify-center gap-1.5">
          //       <span className={` text-primary-300 font-bold text-[13px] xl:text-base`}>{menu.title}</span>
          //     </div>
          //   </div>
          //   {pathname.includes(menu.slug) ? (
          //     <div className="absolute top-[124px] lg:top-0 h-[90px] z-30">
          //       {width > 1281 ? (
          //         <RectangleIcon1 className="mt-[11px] w-[185px] h-[60px]" />
          //       ) : (
          //         <RectangleIcon2 className="mt-[11px] w-[145px] h-[50px]" />
          //       )}

          //       <div className="content xl:ml-3 w-[135px] h-[42px] xl:h-[54px] flex justify-center items-center gap-[10px] translate-y-[-42px] xl:translate-y-[-54px]">
          //         <span className="bold-500 text-base xl:text-lg leading-[42px] xl:leading-[60px]">{menu.title}</span>
          //       </div>
          //     </div>
          //   ) : (
          //     ''
          //   )}
          // </Link>
        )
      })}
    </div>
  )
}
