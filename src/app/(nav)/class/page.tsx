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
        <h1 className="menu-title">클래스 관리</h1>
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
            className="h-56 px-6 py-8 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-16 inline-flex"
          >
            <div className="self-stretch text-gray-900 text-xl font-semibold   leading-[30px]">
              {title}
            </div>
            <div className="Frame814119 self-stretch justify-between items-end inline-flex">
              <div className=" text-gray-500 text-base font-medium   leading-normal">
                담당 강사 : {instructor}
              </div>
              <div className="3040 text-center text-gray-500 text-sm font-normal   leading-[21px]">
                회원 수 : {userCnt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
