import { ChangeEvent, useState } from 'react'
import { category } from './ClassInfo'

type props = {
  mainSelect: string
}

export default function ClassSub(props: props) {
  const categorydata: category[] = [
    {
      id: '1',
      name: '미술',
      value: '미술',
      sub: [
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
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '3',
      name: '공연',
      value: '공연',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '4',
      name: '체육',
      value: '체육',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '5',
      name: '댄스',
      value: '댄스',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '6',
      name: '댄스',
      value: '댄스',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '7',
      name: '댄스',
      value: '댄스',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '8',
      name: '댄스',
      value: '댄스',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    },
    {
      id: '9',
      name: '댄스',
      value: '댄스',
      sub: [{ id: '1', name: '아크릴화', value: '아크릴화' }]
    }
  ]
  const main = props.mainSelect
  console.log(props.mainSelect)
  const array: any = []

  const object = categorydata.map(item => {
    if (item.value == main) {
      return array.push(...item.sub)
    }
  })
  const [selectedOption, setSelectedOption] = useState('')
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="grid grid-cols-4 w-full gap-2">
      {categorydata.map((item: any) => (
        <div
          className="w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 "
          key={item.id}
        >
          <input
            type="radio"
            id={item.id}
            value={item.id}
            checked={selectedOption === item.id}
            onChange={handleOptionChange}
            // className="w-8 h-8 mr-2"
          />
          <label
            htmlFor={item.id}
            className="text-indigo-500 text-sm font-semibold font-['Pretendard']"
          >
            {item.name}
          </label>
        </div>
      ))}
    </div>
  )
}