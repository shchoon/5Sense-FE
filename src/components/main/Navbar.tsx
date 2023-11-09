'use client'
import Link from 'next/link'
import OpenBook from '@/assets/icons/navbar/open-book.svg'

const menu = [
  {
    id: 0,
    slug: '',
    title: '메인 홈'
  },
  {
    id: 1,
    slug: 'class',
    title: '클래스 관리'
  },
  {
    id: 2,
    slug: 'student',
    title: '수강생 관리'
  },
  {
    id: 3,
    slug: 'instructor',
    title: '강사 관리'
  },
  {
    id: 4,
    slug: 'pay',
    title: '청구/납부'
  }
]

export default function Navbar() {
  return (
    <div className="flex">
      {menu.map(menu => (
        <div
          key={menu.id}
          className="w-[140px] h-14 md:w-[168px] md:h-[54px] relative bg-indigo-400 rounded-tl-[9.75px] rounded-tr-[9.75px] md:rounded-tl-xl md:rounded-tr-xl"
        >
          <div className="left-[26.17px] top-[13px] md:left-[44px] md:top-[16px] absolute flex flex-row justify-start items-center gap-2.5">
            <Link
              href={`/main/${menu.slug}`}
              className="text-center text-purple-300 text-[13px] md:text-base font-bold font-['Pretendard']"
            >
              {menu.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
