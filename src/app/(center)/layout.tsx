'use client'
import { useEffect,useState } from "react"
import {useRouter} from "next/navigation"

export default function myCenterLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLogin, setisLogin] = useState<boolean>(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setisLogin(prev => accessToken !== null ? true : false)
    if(accessToken === null){
      alert('서비스를 이용하려면 로그인을 해주세요.')
      router.replace('/login')
    }
  }, [])
  return (
    <>
    {isLogin && <div className="flex justify-center w-screen h-screen items-center">
      <div className="flex flex-col items-center gap-4 w-[640px] px-6 py-8 border rounded-2xl border-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)]">
        {children}
      </div>
    </div>}
    </>
  )
}
