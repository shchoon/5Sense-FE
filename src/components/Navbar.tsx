'use client'
import Link from 'next/link'

const menu = [
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
    <ul>
      {menu.map(post => (
        <li key={post.id}>
          <Link href={`/main/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
