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
        <div className="flex-grow min-w-[100px] gray-800-semibold text-sm text-left">{props.className}</div>
        <div
          className={`${
            props.type === 'student' ? 'xl:w-[400px] w-[200px]' : 'xl:w-[220px] w-40'
          }  gray-900-normal text-base text-left`}
        >
          {props.type === 'student' && props.particulars}
          {props.type === 'pay' && (
            <div className="w-full flex items-center xl:gap-2.5 gap-2">
              <div className="text-gray-700 text-base font-medium">미결제</div>
              {toggle ? (
                <ToggleOnIcon
                  onClick={() => {
                    setToggle(false)
                  }}
                />
              ) : (
                <ToggleOffIcon
                  onClick={() => {
                    setToggle(true)
                  }}
                />
              )}
              <div className="text-gray-700 text-base font-medium">결제완료</div>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
