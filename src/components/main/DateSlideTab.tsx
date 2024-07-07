import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { dateSideTab } from '@/app/recoilContextProvider'

export default function DateSlideTab() {
  const currentDate = new Date()
  const router = useRouter()
  const currentPath = usePathname()

  let [slideTab, setSlideTab] = useRecoilState(dateSideTab)
  let [pathName, setPathName] = useState<string>('')

  useEffect(() => {
    let path = currentPath.split('/')[2]
    if (path === 'day' || path === undefined) {
      setPathName('day')
      setSlideTab('translate-x-0')
    } else if (path === 'week') {
      //console.log(currentPath.split('/')[2])
      setSlideTab('translate-x-[48px]')
      setPathName('week')
    } else if (path === 'month') {
      setSlideTab('translate-x-[96px]')
      setPathName('month')
    }
  }, [currentPath])

  const dateData = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  }

  const [date, setDate] = useState<number>(dateData.date)
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1)
  const lastDateOfMonth = new Date(2023, 2, 0)


  return (
    <>
      <div className="absolute right-0 flex items-center w-[160px] h-[44px] p-1 outline outline-1 rounded-full outline-gray-200">
        <div
          className={`absolute z-0 w-14 h-9 border border-1 border-primary-400 bg-primary-600 rounded-full transition-transform ${slideTab}`}
        ></div>
        <div
          className={` z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab == 'translate-x-0' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-0' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-0')
            router.push('/home/day')
          }}
        >
          <div className="flex justify-center">일</div>
        </div>
        <div
          className={`z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab === 'translate-x-[48px]' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-[48px]' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-[48px]')
            router.push('/home/week')
          }}
        >
          <div className="flex justify-center">주</div>
        </div>
        <div
          className={`z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab === 'translate-x-[96px]' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-[96px]' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-[96px]')
            router.push('/home/month')
          }}
        >
          <div className="flex justify-center">월</div>
        </div>
      </div>
    </>
  )
}
