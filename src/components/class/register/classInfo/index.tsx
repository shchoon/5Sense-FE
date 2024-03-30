import { Dispatch, SetStateAction, useState } from 'react'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import Category from './Category'
import { ICommonInfo } from '@/app/(nav)/class/register/page'

type ClassInfo = {
  name: string
  memo: String
}

interface IProps {
  commonInfo: ICommonInfo
  setCommonInfo: Dispatch<SetStateAction<ICommonInfo>>
}

export default function ClassInfo({ commonInfo, setCommonInfo }: IProps) {
  const [classInfo, setClassInfo] = useState<ClassInfo>({
    name: '',
    memo: ''
  })

  const classNameProps: InputFormProps = {
    title: '클래스 명',
    placeholder: '클래스명을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: commonInfo,
    setSubmitData: setCommonInfo
  }
  const optionProps: InputFormProps = {
    title: '기타',
    placeholder: '직접 입력',
    name: 'options',
    maxLength: 20,
    submitData: commonInfo,
    setSubmitData: setCommonInfo
  }
  const classMemoProps: TextareaFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'memo',
    maxLength: 300,
    submitData: commonInfo,
    setSubmitData: setCommonInfo
  }

  return (
    <div className="class-box">
      <div className="gray-900-bold text-xl">클래스 정보</div>
      <div className="info-detail flex flex-col gap-2">
        <InputForm {...classNameProps} />
        <TextareaForm {...classMemoProps} />
        <Category />
      </div>
    </div>
  )
}
