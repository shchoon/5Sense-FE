'use client'

import Category from '@/components/class/register/Category'
import ClassType from '@/components/class/register/ClassType'
import InputForm, { InputFormProps } from '@/components/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/TextareaForm'
import { ChangeEvent, useEffect, useState } from 'react'

export type category = {
  id: string
  name: string
  value: string
  options: subCategory[]
}

type subCategory = {
  id: string
  name: string
}

export default function RegisterPage() {
  const classNameProps: InputFormProps = {
    title: '클래스 명',
    placeholder: '클래스명을 입력해 주세요',
    name: 'className',
    maxLength: 20
  }

  const classMemoProps: TextareaFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'classMemo',
    maxLength: 300
  }

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <div className="Info class-box">
        <div className="gray-900-bold text-xl">클래스 정보</div>
        <div className="info-detail flex flex-col gap-2">
          <InputForm {...classNameProps} />
          <TextareaForm {...classMemoProps} />
        </div>
        <Category />
      </div>
      <ClassType />
      <div className="Button w-full h-[52px] px-6 py-3.5 btn-purple">
        등록하기
      </div>
    </div>
  )
}
