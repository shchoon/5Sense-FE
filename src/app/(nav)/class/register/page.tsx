'use client'

import ClassInfo from '@/components/class/register/ClassInfo'
import ClassType from '@/components/class/register/ClassType'
import InputForm, { InputFormProps } from '@/components/InputForm'

export default function RegisterPage() {
  const classNameProps: InputFormProps = {
    title: '클래스 명',
    placeholder: '클래스명을 입력해 주세요',
    name: 'className',
    maxLength: 20
  }
  const classMemoProps: InputFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'classMemo',
    maxLength: 300,
    textarea: true
  }
  return (
    <div className="w-[640px] flex-col justify-start items-start gap-5">
      <div className="class-box">
        <div className="m-title">클래스 정보</div>
        <div className="info-detail flex flex-col gap-2">
          <InputForm {...classNameProps} />
          <InputForm {...classMemoProps} />
          <div>
            <p className="s-title">카테고리</p>
          </div>
        </div>
      </div>
      <ClassType />
      {/* <div className="Button w-[640px] h-[52px] px-6 py-3.5 bg-indigo-500 rounded-lg justify-center items-center gap-2 inline-flex">
        <div className="Text text-white text-base font-semibold font-['Pretendard'] leading-normal">
          등록하기
        </div>
      </div> */}
    </div>
  )
}
