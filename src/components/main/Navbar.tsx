'use client'
import Link from 'next/link'
import book from '@/assets/icons/notice-active.svg'
import Image from 'next/image'

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
// flex하면 부모 크기에 맞춰지나?
export default function Navbar() {
  return (
    <div className="flex translate-y-[16px]">
      {menu.map(menu => (
        <div
          key={menu.id}
          className="flex justify-center w-[168px] h-[70px] gap-[10px] bg-primary-500 md:rounded-tl-xl md:rounded-tr-xl"
        >
          <Image src={book} alt="test" />
          <Link
            href={`/main/${menu.slug}`}
            className="leading-[60px] text-purple-300 text-base font-bold font-['Pretendard']"
          >
            {menu.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
