import Link from 'next/link'

export default function ClassLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 py-[60px] box-border">
      <div className="w-full flex justify-between">
        <h1 className="menu-title">클래스 관리</h1>
        <Link
          href={'class/register'}
          className="Button w-28 h-[37px] px-3 py-2 bg-indigo-500 rounded-lg justify-center items-center gap-2 inline-flex"
        >
          <div className="Text text-white text-sm font-semibold font-['Pretendard'] leading-[21px]">
            클래스 등록
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}
