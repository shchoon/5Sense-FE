import { Dispatch, SetStateAction, useState } from 'react'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import Category from './Category'
import { IClassInfo, IInfoValid } from '@/app/(nav)/class/register/page'

interface IProps {
  classInfo: IClassInfo
  vaild: IInfoValid
  onChange: (name: string, value: string) => void
}

export default function ClassInfo({ classInfo, vaild, onChange }: IProps) {
  const classNameProps: InputFormProps = {
    valid: vaild.name,
    title: '클래스 명',
    placeholder: '클래스명을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: classInfo,
    onChange: onChange
  }

  const classMemoProps: TextareaFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'memo',
    maxLength: 300,
    submitData: classInfo,
    onChange: onChange
  }

  return (
    <div className={`${vaild.valid ? '' : 'border-[#EF5D5D]'} class-box`}>
      <div className={`gray-900-bold text-xl`}>클래스 정보</div>
      <div className="info-detail flex flex-col gap-2">
        <InputForm {...classNameProps} />
        <TextareaForm {...classMemoProps} />
        <Category classInfo={classInfo} valid={vaild.category} onChange={onChange} />
      </div>
    </div>
  )
}
