export default function myCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <div className="flex flex-col items-center gap-4 w-[640px] px-6 py-8 border rounded-2xl border-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)]">
        {children}
      </div>
    </div>
  )
}
