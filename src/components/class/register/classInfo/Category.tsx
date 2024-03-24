import InputForm, { InputFormProps } from '@/components/common/InputForm'
import Image from 'next/image'
import { useState } from 'react'

export type category = {
  id: string
  name: string
  imgUrl: string
  options: subCategory[]
}

type subCategory = {
  id: string
  name: string
}

export default function Category() {
  const categorydata: category[] = [
    {
      id: '1',
      name: '미술',
      imgUrl: '/assets/icons/category/arts.svg',
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
      imgUrl: '/assets/icons/category/arts.svg',
      options: []
    },
    {
      id: '3',
      name: '공연',
      imgUrl: '/assets/icons/category/arts.svg',
      options: []
    },
    {
      id: '4',
      name: '체육',
      imgUrl: '/assets/icons/category/arts.svg',
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
      imgUrl: '/assets/icons/category/arts.svg',
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
      imgUrl: '/assets/icons/category/arts.svg',
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
      imgUrl: '/public/assets/icons/category/arts.svg',
      options: [
        { id: '1', name: '프로듀싱' },
        { id: '2', name: '작곡·작사' },
        { id: '3', name: '디제잉악기' }
      ]
    },
    {
      id: '8',
      name: '연주',
      imgUrl: '/public/assets/icons/category/arts.svg',
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
      imgUrl: '/assets/icons/category/arts.svg',
      options: []
    }
  ]
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)
  const [selectedOptionList, setSelectedOptionList] = useState([])

  const handleGroupChange = (groupId: any, optionList: any) => {
    setSelectedGroup(Number(groupId))
    setSelectedOption(0)
    setSelectedOptionList(optionList)
  }
  const handleOptionChange = (optionId: any) => {
    console.log('optionId', optionId)
    setSelectedOption(Number(optionId))
    console.log('hi')
  }

  console.log(selectedGroup)

  const renderOptionsList = () => {
    const optionProps = {
      title: '기타',
      placeholder: '직접 입력',
      name: 'options',
      maxLength: 10
    }
    return (
      <>
        {selectedGroup === 9 ? (
          <input {...optionProps} />
        ) : (
          <div className="grid grid-cols-4 w-full gap-2">
            {selectedOptionList.map((option: subCategory) => (
              <div
                key={option.id}
                className={`flex justify-center items-center w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
                  selectedOption === Number(option.id) ? 'bg-[#F0EFFF]' : 'bg-white cursor-pointer'
                }`}
                onClick={() => handleOptionChange(Number(option.id))}
              >
                <>
                  <input type="radio" id={option.name} value={option.name} className="hidden" />
                  <label
                    htmlFor={option.name}
                    className={`text-base font-medium leading-normal text-primary-600 cursor-pointer`}
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
    <div>
      <p className="gray-800-semibold">카테고리</p>
      {/* 대분류 소분류 박스 */}
      <div className="flex flex-col gap-6 mt-2">
        <div className="grid grid-cols-3 w-full gap-2">
          {categorydata.map((item: category) => (
            <div
              key={item.id}
              className={`flex flex-col gap-[6px] justify-center items-center h-[110px] py-4 rounded-md border border-primary-500 ${
                selectedGroup === Number(item.id) ? 'bg-[#F0EFFF]' : 'bg-white cursor-pointer'
              }`}
              onClick={() => handleGroupChange(item.id, item.options)}
            >
              <div
                className={`w-12 h-12 rounded-[50px] flex justify-center items-center ${
                  selectedGroup === Number(item.id) ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <Image src={item.imgUrl} alt={item.name} width={30} height={30} />
              </div>

              <input type="radio" id={item.id} value={item.id} className={`hidden`} />
              <label
                htmlFor={item.id}
                className={`text-sm font-semibold ${
                  selectedGroup === Number(item.id) ? 'text-primary-600' : 'text-gray-500'
                } cursor-pointer`}
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
        {selectedGroup > 0 && renderOptionsList()}
      </div>
    </div>
  )
}
