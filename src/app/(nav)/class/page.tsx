'use client'

import { useRouter } from 'next/navigation'
import ClassFilter from '@/components/class/classFilter'
import ContentHeader from '@/components/common/contentHeader'

export default function ClassPage() {
  const classList = [
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    }
  ]

  const router = useRouter()

  return (
    <div>
      <ContentHeader title="클래스 관리" btnName="클래스 등록" onClick={() => router.push('class/register')} />
      <ClassFilter />
      <div className="container w-full max-w-[1872px] grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-5">
        {classList.map((it, idx) => (
          <div
            key={idx}
            className="h-56 px-4 py-8 flex flex-col justify-between box-border bg-white rounded-lg shadow border border-gray-200"
          >
            <div className="categor w-fit h-fit px-2.5 py-2 box-border bg-[#FFF0E3] rounded justify-center items-center text-[#FF5A1F] text-xs font-semibold">
              일이삼사오육칠팔구십
            </div>
            <div className="mt-4 flex-1 gray-900-semibold text-xl">{it.title}</div>
            <div className="flex justify-between items-end">
              <div className="gray-500-medium text-base">담당 강사 : {it.instructor}</div>
              <div className="gray-500-normal text-sm">회원 수 : {it.userCnt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
