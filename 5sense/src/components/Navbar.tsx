import Link from 'next/link'

const menu = [
  {
    href: '/',
    title: '클래스 관리'
  },
  {
    href: '/student',
    title: '수강생 관리'
  },
  {
    href: '/instructor',
    title: '강사 관리'
  },
  {
    href: '/pay',
    title: '청구/납부'
  }
]

export default function Navbar() {
  return (
    <div className="flex">
      {menu.map(({ href, title }) => (
        <li key={href}>
          <Link href={href} aria-label={title}>
            {title}
          </Link>
        </li>
      ))}
    </div>
  )
}
