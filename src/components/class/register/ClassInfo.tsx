'use client'
import { Button } from 'flowbite-react'
import { ChangeEvent, MouseEventHandler, useState } from 'react'
import ClassSub from './ClassSub'

type subCategory = {
  id: string
  name: string
  value: string
}
export type category = {
  id: string
  name: string
  value: string
  sub: subCategory[]
}
export default function ClassInfo() {
  const [className, setClassName] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const [mainSelect, setMainSelect] = useState<string>('')
  const [subCategory, setSubCategory] = useState<boolean>(false)

  const onMainCategoryhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    console.log(value)
    setMainSelect(value)
    setSubCategory(true)
  }
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
    }
  ]
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value)
  }
  const onMemoChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value)
  }

  return (
    <div className="Container w-[640px] h-[864px] px-6 py-8 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-10 inline-flex">
      <div className="Title m-title">클래스 정보</div>
      <div className="w-full flex flex-col gap-[2.5px]">
        <div className="w-full flex flex-col gap-2">
          <p className="s-title">클래스명</p>
          <input
            className="w-full h-[52px] px-4 py-3.5 bg-white rounded-lg border border-gray-200 placeholder:placeholder"
            placeholder="클래스명을 입력해 주세요"
            maxLength={20}
            value={className}
            onChange={onChangeHandler}
          />
          <p className="text-right text-gray-500 text-sm font-normal font-['Inter']">
            {className.length}/20
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="s-title">클래스 메모</p>
          <textarea
            className="w-full h-[52px] px-4 py-3.5 bg-white rounded-lg border border-gray-200 placeholder:placeholder"
            placeholder="클래스관련 메모를 적어주세요"
            maxLength={300}
            value={memo}
            onChange={onMemoChangeHandler}
          />
          <p className="text-right w-full text-gray-500 text-sm font-normal font-['Inter']">
            {memo.length}/300
          </p>
        </div>
        <div>
          <p className="s-title">카테고리</p>
          <div className="grid grid-cols-3 w-full gap-2">
            {categorydata.map((item: category) => (
              <div
                className="w-48 h-[110px] relative bg-white rounded-lg border border-gray-200"
                key={item.id}
              >
                <input
                  type="radio"
                  id={item.id}
                  value={item.value}
                  checked={mainSelect === item.value}
                  onChange={onMainCategoryhandler}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            ))}
          </div>
          {subCategory ? <ClassSub mainSelect={mainSelect}></ClassSub> : ''}
        </div>
      </div>
    </div>
  )
}
