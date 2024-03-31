import React from 'react'
import ReactDOM from 'react-dom'

interface IProps {
  onClose?: () => void
  children: JSX.Element
  small?: boolean
  props?: {
    id: number
    type: string
  }
}

export default function Modal({ children, small, props }: IProps) {
  return ReactDOM.createPortal(
    <div className="absolute h-screen w-full bg-black bg-opacity-50 inset-y-0 inset-x-0 z-50">
      {small ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">{children}</div>
      ) : (
        <div className="w-[480px] h-screen">{children}</div>
      )}
    </div>,
    document.body
  )
}
