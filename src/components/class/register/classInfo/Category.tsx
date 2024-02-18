// import InputForm, { InputFormProps } from '@/components/InputForm'
import InputForm, { InputFormProps } from '@/components/common/InputForm'
import { useState } from 'react'

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

export default function Category() {
  // categories : [
  //   { id: 1, name : 악기 , parentId : null },
  //   { id: 2, name : 첼로 , parentId : 1 },
  //   { id: 3, name : 연기 , parentId : null },
  //   { id: 4, name : 댄스 , parentId : null },
  //   { id: 5, name : 탭댄스 , parentId : 4 },
  //   { id: 6, name : 방송댄스 , parentId : 4 },
  //   ...
  //   ]

  // 통신 후 데이터 변환 필요

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
  //   const optionProps: InputFormProps = {
  //     title: '기타',
  //     placeholder: '직접 입력',
  //     name: 'options',
  //     maxLength: 10
  //   }
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
  return (
    <div>
      <p className="gray-800-semibold">카테고리</p>
      <div className="flex flex-col gap-6">
        <div className="mt-2 grid grid-cols-3 w-full gap-2">
          {categorydata.map((item: category) => (
            <>
              <div
                className={`relative flex justify-center items-end w-48 h-[110px] py-4 rounded-md border border-primary-500 ${
                  selectedGroup === item.id ? 'bg-[#F0EFFF]' : 'bg-white'
                }`}
                key={item.id}
                onClick={() => handleGroupChange(item.id, item.options)}
              >
                <input
                  type="radio"
                  id={item.id}
                  value={item.id}
                  className={`hidden`}
                />
                <label
                  htmlFor={item.id}
                  className={`text-base font-medium leading-normal ${
                    selectedGroup === item.id
                      ? ' text-primary-600'
                      : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </label>
              </div>
            </>
          ))}
        </div>
        {/* {renderOptions(selectedOptionList, selectedGroup)} */}
      </div>
    </div>
  )
}
