export default function ClassRegisterLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 pt-[60px] box-border">
      <div className="flex gap-4">
        <button>◀︎</button>
        <h1 className="menu-title">클래스 등록</h1>
      </div>
      <div className="flex flex-col items-center relative top-[30px]">
        {children}
      </div>
    </div>
  )
}
