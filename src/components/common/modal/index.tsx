'use client'
import { modalState } from '@/lib/state/modal'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSetRecoilState } from 'recoil'

interface IProps {
  onClose?: () => void
  children: JSX.Element
  isOpen: boolean
}

// 모달 컴포넌트
const Modal = ({ isOpen, onClose, children }: IProps) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="absolute h-screen w-full bg-black bg-opacity-50 inset-y-0 inset-x-0 z-50">
      <div onClick={onClose}></div>
      <div className="w-[480px] h-screen bg-white">{children}</div>
    </div>,
    document.body
  )
}

// useModal 훅
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const setModal = useSetRecoilState(modalState)

  const openModal = () => {
    setIsOpen(true)
    setModal(true)
  }
  const closeModal = () => {
    setIsOpen(false)
    setModal(false)
  }

  const ModalComponent = ({ children }: { children: JSX.Element }) => (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {children}
    </Modal>
  )

  return {
    openModal,
    closeModal,
    Modal: ModalComponent
  }
}

export default useModal
