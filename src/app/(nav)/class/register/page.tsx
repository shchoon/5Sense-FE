'use client'

import ClassType from '@/components/class/register/classType'
import ClassInfo from '@/components/class/register/classInfo'
import instance from '@/hooks/useAxios'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
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

  // const renderOptions = (item: any, groupId: string) => {
  //   return (
  //     <>
  //       {groupId === '9' ? (
  //         <InputForm {...optionProps} />
  //       ) : (
  //         <div className="grid grid-cols-4 w-full gap-2">
  //           {item.map((option: subCategory) => (
  //             <div
  //               key={option.id}
  //               className={`flex justify-center items-center w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
  //                 selectedOption === option.id ? 'bg-[#F0EFFF]' : 'bg-white'
  //               }`}
  //               onClick={() => handleOptionChange(option.id)}
  //             >
  //               <>
  //                 <input
  //                   type="radio"
  //                   id={option.id}
  //                   value={option.id}
  //                   className="hidden"
  //                 />
  //                 <label
  //                   htmlFor={option.id}
  //                   className={`text-base font-medium   leading-normal text-primary-600`}
  //                 >
  //                   {option.name}
  //                 </label>
  //               </>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </>
  //   )
  // }

  const getcCategoryDatas = () => {
    instance.get(`/categories`).then(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    getcCategoryDatas()
  }, [])

  return (
    <div className="w-[640px] flex flex-col gap-5">
      <ClassInfo />
      <ClassType />
      <div className="Button w-full h-[52px] px-6 py-3.5 btn-purple">
        등록하기
      </div>
    </div>
  )
}
