'use client'

import ClassFilter from '@/components/classFilter/classFilter'
import Link from 'next/link'

export default function ClassPage() {
  const data = [
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '일이삼사오육칠팔구십일이삼사오육칠팔구십',
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

  return (
    <div>
      <div className="w-full flex justify-between">
        <h1 className="black-bold text-3xl">클래스 관리</h1>
        <Link
          href={'class/register'}
          className="Button w-28 h-[37px] px-3 py-2 btn-purple text-sm"
        >
          클래스 등록
        </Link>
      </div>
      <ClassFilter />
      <div className="container w-full max-w-[1872px] grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-[87px]">
        {data.map(({ title, instructor, userCnt }) => (
          <div
            key={title}
            className="h-56 px-4 py-8 flex flex-col justify-between box-border bg-white rounded-lg shadow border border-gray-200"
          >
            <div className="categor w-fit h-fit px-2.5 py-2 box-border bg-[#FFF0E3] rounded justify-center items-center text-[#FF5A1F] text-xs font-semibold">
              일이삼사오육칠팔구십
            </div>
            <div className="mt-4 flex-1 gray-900-semibold text-xl">{title}</div>
            <div className="flex justify-between items-end">
              <div className="gray-500-medium text-base">
                담당 강사 : {instructor}
              </div>
              <div className="gray-500-normal text-sm">회원 수 : {userCnt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
