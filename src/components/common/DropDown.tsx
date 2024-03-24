'use client'
import Image from 'next/image'

import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { classifyListType } from '../class/classFilter'

import chevron_gray_down from 'public/assets/icons/chevron/chevron_down_gray.svg'
import chevron_gray_up from 'public/assets/icons/chevron/chevron_up_gray.svg'

interface HandleChangeTimeFromChildType {
  (data: { open?: string; close?: string }): void
}

interface IProps {
  title: string
  list: any[]
  handleChangeParentsOpenTimeData?: (data: { time: string }) => void
  handleChangeParentsCloseTimeData?: (data: { time: string }) => void
  handleChangeParentsDropdownData?: (data: string) => void
  handleChangeParentsCategoryData?: (data: any, type: string) => void
  handleChangeParentsDropdownDataCheckbox?: (data: string) => void
  type: string
}

export default function DropDown(props: IProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const propsFunction = (item: any) => {
    if (props.type === 'open' && props.handleChangeParentsOpenTimeData) {
      props.handleChangeParentsOpenTimeData({
        time: item
      })
    } else if (props.type === 'close' && props.handleChangeParentsCloseTimeData) {
      props.handleChangeParentsCloseTimeData({
        time: item
      })
    } else if (props.type === 'dropdown' && props.handleChangeParentsDropdownData) {
      props.handleChangeParentsDropdownData(item)
    } else if (props.type === 'category' && props.title === '대분류 선택' && props.handleChangeParentsCategoryData) {
      props.handleChangeParentsCategoryData(
        {
          title: item.name,
          id: item.id
        },
        'classify'
      )
    } else if (props.type === 'category' && props.title === '소분류 선택' && props.handleChangeParentsCategoryData) {
      props.handleChangeParentsCategoryData(
        {
          title: item.name,
          id: item.id
        },
        'subClass'
      )
    } /* else if (props.type === 'repeat' && props.handleChangeParentsDropdownDataRepeat) {
      console.log(repeatClickedItemTitle)
      props.handleChangeParentsDropdownDataRepeat(test, 'repeat')
    } */
  }
  const [isClickDropDown, setIsClickDropDown] = useState(false)
  const [clickedItemTitle, setClickedItemTitle] = useState<string>(props.title)
  const [repeatClickedItemTitle, setRepeatClickedItemTitle] = useState<string[]>([])
  const [clickedItem, setClickedItem] = useState<any>(props.title)
  const [checked, setChecked] = useState<string[]>([])

  const returnCheckedDay: () => string = () => {
    if (checked.length === 0) {
      return ''
    }
    let result: string = ''
    for (var i = 0; i < checked.length; i++) {
      if (i !== 0) {
        result += ',' + checked[i]
      } else {
        result += checked[i]
      }
    }
    return result + '  반복'
  }

  const handleClickDropDown = (type: string) => {
    setIsClickDropDown(prev => !prev)
    if (props.type === 'checkbox' && props.handleChangeParentsDropdownDataCheckbox) {
      props.handleChangeParentsDropdownDataCheckbox(returnCheckedDay())
    }
  }

  const handleClickOutsideOfDropdown = (e: any) => {
    if (isClickDropDown && !dropdownRef.current?.contains(e.target)) {
      setIsClickDropDown(false)
      if (props.type === 'checkbox' && props.handleChangeParentsDropdownDataCheckbox) {
        props.handleChangeParentsDropdownDataCheckbox(returnCheckedDay())
      }
    }
  }

  useOnClickOutside(dropdownRef, handleClickOutsideOfDropdown)

  return (
    <div ref={dropdownRef} className="w-full relative">
      <div className="relative w-full flex items-center">
        <button
          type="button"
          onClick={() => handleClickDropDown(props.type)}
          className={`w-full px-4 py-3.5 h-[52px] border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50`}
        >
          <div
            className={`h-[18px] ${
              props.list.includes(clickedItemTitle) ? 'gray-900-normal' : 'gray-500-normal'
            } text-sm font-['Pretendard'] text-left`}
          >
            {props.type !== 'checkbox' && clickedItemTitle}
            {props.type === 'checkbox' && (checked.length === 0 ? clickedItemTitle : returnCheckedDay())}
          </div>
        </button>
        <Image
          className="absolute right-4"
          src={isClickDropDown ? chevron_gray_up : chevron_gray_down}
          width={16}
          height={16}
          alt="cheveon_gray"
        />
      </div>
      {isClickDropDown && (
        <div
          className={`absolute z-10 top-full w-full max-h-[174px] border rounded-lg border-gray-200 bg-white overflow-y-scroll`}
        >
          {props.type !== 'category' &&
            props.type !== 'checkbox' &&
            props.list.map((item: string, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex h-[42px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                  title={item}
                  onClick={() => {
                    propsFunction(item)
                    setClickedItemTitle(item)
                    setIsClickDropDown(false)
                  }}
                >
                  <div id="box" className="w-full gray-900-normal text-base font-['Pretendard']">
                    {item}
                  </div>
                </div>
              )
            })}
          {props.type === 'category' &&
            props.list.map((item: classifyListType, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex h-[42px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                  title={item.name}
                  onClick={() => {
                    propsFunction(item)
                    setClickedItem(item)
                    setClickedItemTitle(item.name)
                    setIsClickDropDown(false)
                  }}
                >
                  <div id="box" className="w-full gray-900-normal text-base font-['Pretendard']">
                    {item.name}
                  </div>
                </div>
              )
            })}
          {props.type === 'checkbox' &&
            props.list.map((item: string, i: number) => {
              return (
                <div className="flex w-full h-[42px] px-3 py-2.5 items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[14px] h-[14px] cursor-pointer"
                    id={item}
                    checked={checked.includes(item) && true}
                    onClick={e => {
                      if (!checked.includes(item) && e.currentTarget.checked) {
                        setChecked(prev => [...prev, item])
                      }
                      if (checked.includes(item)) {
                        setChecked(checked.filter((day, i) => day !== item))
                      }
                    }}
                  />
                  <label className="w-full gray-900-normal text-base cursor-pointer" htmlFor={item}>
                    {item}
                  </label>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
