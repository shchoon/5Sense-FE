'use client'
import Image from 'next/image'
import chevron_gray from '@/assets/icons/chevron_down_gray.svg'
import { useState } from 'react'

interface DropDownPropsType {
  height: string
  px: string
  py: string
  dropDownList: string[]
  name: string
}

export default function DropDown({
  height,
  px,
  py,
  dropDownList,
  name
}: DropDownPropsType) {
  const [isClickDropDown, setIsClickDropDown] = useState(false)
  const [clickedItem, setClickedItem] = useState<string>(name)

  const handleClickDropDown = () => {
    setIsClickDropDown(prev => !prev)
  }
  const handleClickList = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickedItem(e.currentTarget.title)
    setIsClickDropDown(prev => !prev)
  }
  return (
    <div
      className="relative w-full flex items-center cursor-pointer"
      onClick={handleClickDropDown}
    >
      <div
        className={`w-full ${height} px-4 ${px} ${py} py-3.5 h-[52px] border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50`}
      >
        <div className="h-[18px] gray-500-normal text-sm font-['Pretendard']">
          {clickedItem}
        </div>
      </div>
      <Image
        className="absolute right-4"
        src={chevron_gray}
        width={16}
        height={16}
        alt="cheveon_gray"
      />
      {isClickDropDown && (
        <div
          className={`absolute top-full w-full h-[174px] border rounded-lg border-gray-200 bg-white overflow-y-scroll`}
        >
          {dropDownList.map((item: string, i: number) => {
            return (
              <div
                key={i}
                className={`${height} ${px} ${py} flex items-center border rounded-lg hover:border-primary-600 cursor-pointer`}
                title={item}
                onClick={e => {
                  handleClickList(e)
                }}
              >
                <div
                  id="box"
                  className="w-full gray-900-normal text-base font-['Pretendard']"
                >
                  {item}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
