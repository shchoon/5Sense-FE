'use client'
import { useState } from 'react'

import ToggleOnIcon from 'public/assets/icons/toggle_on.svg'
import ToggleOffIcon from 'public/assets/icons/toggle_off.svg'

interface IProps {
  type: string
  id: string
  name: string
  className: string
  phone: string
  particulars?: string
  onClick?: () => void
}

export default function List(props: IProps) {
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <button
      key={props.id}
      className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] hover:outline-primary-600"
      onClick={() => {
        if (props.onClick) {
          props.onClick()
        } else {
          return
        }
      }}
    >
      <div className="flex lg:gap-6 gap-4 flex-1">
        <div className="w-[100px] gray-800-semibold text-sm text-left">{props.name}</div>
        <div className="lg:w-[160px] w-[130px] gray-800-semibold text-sm text-left">
          {props.phone.slice(0, 3)}-{props.phone.slice(3, 7)}-{props.phone.slice(7, 11)}
        </div>
        <div className="flex-1 min-w-[100px] gray-800-semibold text-sm text-left">{props.className}</div>
        <div
          className={`xl:w-[400px] w-[200px] text-ellipsis overflow-hidden hover:overflow-visible gray-900-normal text-base text-left`}
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaa
        </div>
      </div>
    </button>
  )
}
