import Image from 'next/image'
import CloseIcon from 'public/assets/icons/closeCircle.svg'

import { useRecoilState, useSetRecoilState } from 'recoil'
import React, { useState } from 'react'
import instance from '@/lib/api/axios'
import { AxiosResponse } from 'axios'
import { modalState } from '@/lib/state/modal'

interface postDataType {
  name: string
  phone: string
}

interface IProps {
  onClose: () => void
  onCloseState?: () => void
  rigister: () => void
}

export default function RegisterModal(props: IProps) {
  const [postData, setPostData] = useState<postDataType>({
    name: '',
    phone: ''
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, valueName: string) => {
    if (valueName === 'name') {
      setPostData({
        ...postData,
        name: e.target.value
      })
    } else if (valueName === 'phone') {
      setPostData({
        ...postData,
        phone: e.target.value
      })
    }
  }

  const onKeyDownOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ['-', 'e', 'ArrowDown', 'ArrowUp']
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault()
    }
    if (e.currentTarget.value.length === 12 && e.key !== 'Backspace') {
      e.preventDefault()
    }
  }

  const limitLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const max = Number(e.currentTarget.getAttribute('maxlength'))
    if (target.value.length > max) {
      setPostData({
        ...postData,
        name: target.value.slice(0, max)
      })
    }
  }

  return (
    <form
      className="relative w-[424px] h-[326px] bg-white rounded-xl border border-gray-900 flex justify-center"
      onSubmit={e => {
        e.preventDefault()
        const data = postData
        if (postData.name === '' && postData.phone === '') {
          alert('강사정보를 올바르게 입력해주세요.')
          return
        }
        instance.post('/teachers', data).then((res: AxiosResponse) => {
          props.onClose()
          if (props.onCloseState) {
            props.onCloseState()
          }
          props.rigister()
        })
      }}
    >
      <div className="absolute left-6 top-10 gray-900-bold text-[22px]">강사 등록</div>
      <CloseIcon
        className="absolute right-4 top-4 cursor-pointer"
        width={35}
        height={35}
        onClick={() => {
          props.onClose()
          if (props.onCloseState) {
            props.onCloseState()
          }
        }}
      />
      <div className="absolute top-[90px] w-[376px] flex flex-col gap-7">
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="이름"
            value={postData.name}
            onChange={e => {
              onChangeHandler(e, 'name')
              limitLength(e)
            }}
            maxLength={20}
            className={`${postData.name.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-[58px] input-line-gray`}
          />
          <input
            type="number"
            placeholder="전화번호 (-제외)"
            value={postData.phone}
            onChange={e => {
              onChangeHandler(e, 'phone')
            }}
            onKeyDown={onKeyDownOnlyNum}
            className={`${postData.phone.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-[58px] input-line-gray`}
          />
        </div>
        <button type="submit" className="w-full h-[52px] btn-purple">
          <div className="text-white text-base font-semibold">등록</div>
        </button>
      </div>
    </form>
  )
}
