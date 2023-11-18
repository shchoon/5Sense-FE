'use client'

import ClassInfo from '@/components/class/register/ClassInfo'
import ClassType from '@/components/class/register/ClassType'

export default function RegisterPage() {
  return (
    <div className="w-[640px] flex-col justify-start items-start gap-5 inline-flex">
      <ClassInfo />
      <ClassType />
      {/* <div className="Button w-[640px] h-[52px] px-6 py-3.5 bg-indigo-500 rounded-lg justify-center items-center gap-2 inline-flex">
        <div className="Text text-white text-base font-semibold font-['Pretendard'] leading-normal">
          등록하기
        </div>
      </div> */}
    </div>
  )
}
