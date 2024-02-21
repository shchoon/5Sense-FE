'use client'

import { Dropdown } from 'flowbite-react'
import Image from 'next/image'
import chevronDown from 'public/assets/icons/chevron_down_gray.svg'

interface DropDownPropsType {
  title: string
  list: string[]
}

function ReactDropDown({ title, list }: DropDownPropsType) {
  return (
    <Dropdown
      label="Dropdown button"
      dismissOnClick={false}
      renderTrigger={() => (
        <div className="relative w-full flex items-center h-[52px] px-4 py-3.5 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:border-primary-700 focus:bg-gray-50 cursor-pointer">
          {title}
          <Image className="absolute right-4" src={chevronDown} width={16} height={16} alt="cheveon_gray" />
        </div>
      )}
    >
      {list.map((data, i) => {
        return (
          <Dropdown.Item className="rounded-[3px] bg-transparent hover:bg-purple-100 cursor-pointer" key={i}>
            <div className=" bg-blue-500">{data}</div>
            {/* <div className="rounded-[3px] hover:bg-purple-100 cursor-pointer">{data}</div> */}
          </Dropdown.Item>
        )
      })}
    </Dropdown>
  )
}

export default ReactDropDown
