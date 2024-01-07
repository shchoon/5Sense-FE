'use client'

import Category from '@/components/class/register/Category'
import ClassType from '@/components/class/register/ClassType'
import ClassFilter from '@/components/classFilter/classFilter'
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

export type ClassInfo = {
  name: string
  memo: String
}

export default function RegisterPage() {
  const [classInfo, setClassInfo] = useState<ClassInfo>({
    name: '',
    memo: ''
  })

  const classNameProps: InputFormProps = {
    title: '클래스 명',
    placeholder: '클래스명을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: classInfo,
    setSubmitData: setClassInfo
  }
  const optionProps: InputFormProps = {
    title: '기타',
    placeholder: '직접 입력',
    name: 'options',
    maxLength: 20,
    submitData: classInfo,
    setSubmitData: setClassInfo
  }
  const classMemoProps: TextareaFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'memo',
    maxLength: 300,
    submitData: classInfo,
    setSubmitData: setClassInfo
  }
  const categorydata: category[] = [
    {
      id: '1',
      name: '미술',
      value: '미술',
      options: [
        { id: '1', name: '아크릴화' },
        { id: '2', name: '수채화' },
        { id: '3', name: '유화' },
        { id: '4', name: '디지털 드로잉' },
        { id: '5', name: '이색 드로잉' },
        { id: '6', name: '캘리그라피' }
      ]
    },
    {
      id: '2',
      name: '연기',
      value: '연기',
      options: []
    },
    {
      id: '3',
      name: '공연',
      value: '공연',
      options: []
    },
    {
      id: '4',
      name: '체육',
      value: '체육',
      options: [
        { id: '1', name: '클라이밍' },
        { id: '2', name: '실내다이빙' },
        { id: '3', name: '라켓스포츠' },
        { id: '4', name: '구기스포츠' },
        { id: '5', name: '무도' },
        { id: '6', name: '수영' },
        { id: '7', name: '겨울스포츠' },
        { id: '8', name: '이색스포츠' }
      ]
    },
    {
      id: '5',
      name: '댄스',
      value: '댄스',
      options: [
        { id: '1', name: '방송댄스' },
        { id: '2', name: '발레' },
        { id: '3', name: '폴댄스' },
        { id: '4', name: '스윙댄스' },
        { id: '5', name: '이색댄스' }
      ]
    },
    {
      id: '6',
      name: '보컬',
      value: '보컬',
      options: [
        { id: '1', name: '재즈' },
        { id: '2', name: '실용음악' },
        { id: '3', name: '뮤지컬' },
        { id: '4', name: '기타 작곡' }
      ]
    },
    {
      id: '7',
      name: '프로듀싱',
      value: '프로듀싱',
      options: [
        { id: '1', name: '프로듀싱' },
        { id: '2', name: '작곡·작사' },
        { id: '3', name: '디제잉악기' }
      ]
    },
    {
      id: '8',
      name: '연주',
      value: '연주',
      options: [
        { id: '1', name: '피아노' },
        { id: '2', name: '현악기' },
        { id: '3', name: '국악기' },
        { id: '4', name: '드럼' },
        { id: '5', name: '이색 악기' },
        { id: '6', name: 'guitar' }
      ]
    },
    {
      id: '9',
      name: '기타',
      value: '기타',
      options: []
    }
  ]
  // 클래스 정보

  // 카테고리 선택 값
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionList, setSelectedOptionList] = useState([])

  const handleGroupChange = (groupId: any, optionList: any) => {
    console.log('handle')
    setSelectedGroup(groupId)
    setSelectedOption('')
    setSelectedOptionList(optionList)
  }
  const handleOptionChange = (optionId: any) => {
    setSelectedOption(optionId)
  }

  console.log(classInfo)

  const renderOptions = (item: any, groupId: string) => {
    return (
      <>
        {groupId === '9' ? (
          <InputForm {...optionProps} />
        ) : (
          <div className="grid grid-cols-4 w-full gap-2">
            {item.map((option: subCategory) => (
              <div
                key={option.id}
                className={`flex justify-center items-center w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
                  selectedOption === option.id ? 'bg-[#F0EFFF]' : 'bg-white'
                }`}
                onClick={() => handleOptionChange(option.id)}
              >
                <>
                  <input
                    type="radio"
                    id={option.id}
                    value={option.id}
                    className="hidden"
                  />
                  <label
                    htmlFor={option.id}
                    className={`text-base font-medium   leading-normal text-primary-600`}
                  >
                    {option.name}
                  </label>
                </>
              </div>
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <div className="class-box">
        <div className="gray-900-bold text-xl">클래스 정보</div>
        <div className="info-detail flex flex-col gap-2">
          <InputForm {...classNameProps} />
          <TextareaForm {...classMemoProps} />
          <Category />
        </div>
      </div>
      <ClassType />
      <div className="Button w-full h-[52px] px-6 py-3.5 btn-purple">
        등록하기
      </div>
    </div>
  )
}
