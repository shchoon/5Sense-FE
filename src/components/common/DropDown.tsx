'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import chevron_gray_down from 'public/assets/icons/chevron/chevron_down_gray.svg'
import chevron_gray_up from 'public/assets/icons/chevron/chevron_up_gray.svg'

interface HandleChangeTimeFromChildType {
  (data: { open?: string; close?: string }): void
}

interface IProps {
  title: string
  list: string[]
  handleChangeParentsOpenTimeData?: (data: { time: string }) => void
  handleChangeParentsCloseTimeData?: (data: { time: string }) => void
  handleChangeParentsReasonData?: (data: { reason: string }) => void
  type: string
}

export default function DropDown(props: IProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const propsFunction = (item: string) => {
    if (props.type === 'open' && props.handleChangeParentsOpenTimeData) {
      props.handleChangeParentsOpenTimeData({
        time: item
      })
    } else if (props.type === 'close' && props.handleChangeParentsCloseTimeData) {
      props.handleChangeParentsCloseTimeData({
        time: item
      })
    } else if (props.type === 'withdrawl' && props.handleChangeParentsReasonData) {
      props.handleChangeParentsReasonData({
        reason: item
      })
    }
  }

  const [isClickDropDown, setIsClickDropDown] = useState(false)
  const [clickedItem, setClickedItem] = useState<string>(props.title)

  const handleClickDropDown = () => {
    setIsClickDropDown(prev => !prev)
  }

  const handleClickOutsideOfDropdown = (e: any) => {
    if (isClickDropDown && !dropdownRef.current?.contains(e.target)) {
      setIsClickDropDown(false)
    }
  }

  useOnClickOutside(dropdownRef, handleClickOutsideOfDropdown)

  return (
    <div ref={dropdownRef} className="relative w-full flex items-center cursor-pointer" onClick={handleClickDropDown}>
      <button
        className={`w-full px-4 py-3.5 h-[52px] border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50`}
      >
        <div
          className={`h-[18px] ${
            props.list.includes(clickedItem) ? 'gray-900-normal' : 'gray-500-normal'
          } text-sm font-['Pretendard'] text-left`}
        >
          {clickedItem}
        </div>
      </button>
      <Image
        className="absolute right-4"
        src={isClickDropDown ? chevron_gray_up : chevron_gray_down}
        width={16}
        height={16}
        alt="cheveon_gray"
      />
      {isClickDropDown && (
        <div
          className={`absolute top-full w-full h-[174px] border rounded-lg border-gray-200 bg-white overflow-y-scroll`}
        >
          {props.list.map((item: string, i: number) => {
            return (
              <div
                key={i}
                className={`flex h-[44px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                title={item}
                onClick={() => {
                  propsFunction(item)
                  setClickedItem(item)
                }}
              >
                <div id="box" className="w-full gray-900-normal text-base font-['Pretendard']">
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
