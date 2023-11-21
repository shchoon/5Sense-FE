'use client'

import ClassInfo from '@/components/class/register/ClassInfo'
import ClassSub from '@/components/class/register/ClassSub'
import ClassType from '@/components/class/register/ClassType'
import InputForm, { InputFormProps } from '@/components/InputForm'
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
  value: string
}

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

  const categorydata: category[] = [
    {
      id: '1',
      name: '미술',
      value: '미술',
      options: [
        { id: '1', name: '아크릴화', value: '아크릴화' },
        { id: '2', name: '수채화', value: '수채화' },
        { id: '3', name: '유화', value: '유화' },
        { id: '4', name: '디지털 드로잉', value: '디지털 드로잉' }
      ]
    },
    {
      id: '2',
      name: '연기',
      value: '연기',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '3',
      name: '공연',
      value: '공연',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '4',
      name: '체육',
      value: '체육',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '5',
      name: '댄스',
      value: '댄스',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '6',
      name: '보컬',
      value: '보컬',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '7',
      name: '프로듀싱',
      value: '프로듀싱',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '8',
      name: '연주',
      value: '연주',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '9',
      name: '기타',
      value: '기타',
      options: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    }
  ]

  const [selectedOption, setSelectedOption] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [list, setList] = useState([])
  const handleGroupChange = (groupId: any) => {
    setSelectedGroup(groupId)
    setSelectedOption('')
  }
  const handleOptionChange = (optionId: any) => {
    setSelectedOption(optionId)
  }

  const renderOptions = (item: any) => {
    return (
      <div className="static bottom-0 grid grid-cols-4 w-full gap-2">
        {item.map((option: subCategory) => (
          <div
            key={option.id}
            className={`w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
              selectedOption === option.id ? 'bg-[#F0EFFF]' : 'bg-white'
            }`}
            onClick={() => handleOptionChange(option.id)}
          >
            <input
              type="radio"
              id={option.id}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="hidden"
            />
            <label
              htmlFor={option.id}
              className={`absolute left-[82px] bottom-4 text-base font-medium font-['Pretendard'] leading-normal text-[#7253E7]`}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    )
  }

  // const test = () => {
  //   categorydata.map(item => {
  //     if (item.id === selectedGroup) {
  //       setList(list, [...item.options])
  //     }
  //   })
  // }

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <div className="class-box">
        <div className="m-title">클래스 정보</div>
        <div className="info-detail flex flex-col gap-2">
          <InputForm {...classNameProps} />
          <InputForm {...classMemoProps} />
          <div>
            <p className="s-title">카테고리</p>
            <div className="grid grid-cols-3 w-full gap-2">
              {categorydata.map((item: category) => (
                <>
                  <div
                    className={`relative w-48 h-[110px] p-3 rounded-md border border-primary-500 ${
                      selectedGroup === item.id ? 'bg-[#F0EFFF]' : 'bg-white'
                    }`}
                    key={item.id}
                    onClick={() => handleGroupChange(item.id)}
                  >
                    <input
                      type="radio"
                      id={item.id}
                      value={item.id}
                      checked={selectedGroup === item.id}
                      onChange={handleOptionChange}
                      className={`hidden`}
                    />
                    <label
                      htmlFor={item.id}
                      className={`absolute left-[82px] bottom-4  text-base font-medium font-['Pretendard'] leading-normal ${
                        selectedGroup === item.id
                          ? ' text-[#7253E7]'
                          : 'text-[#6B7280]'
                      }`}
                    >
                      {item.name}
                    </label>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ClassType />
      <div className="Button w-full h-[52px] px-6 py-3.5 bg-indigo-500 rounded-lg justify-center items-center box-border">
        <div className="Text text-white text-base font-semibold font-['Pretendard'] leading-normal text-center">
          등록하기
        </div>
      </div>
    </div>
  )
}
