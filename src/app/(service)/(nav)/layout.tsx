import Link from 'next/link'

export default function ClassLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 pt-[60px] box-border">{children}</div>
}
