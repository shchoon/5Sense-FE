import Image from 'next/image'
import x_circle from '../assets/icon/x_circle_35.svg'
import { instructorRegisterModal } from '@/state/modal'
import { useRecoilState } from 'recoil'
import React, { useState } from 'react'
import instance from '@/hooks/useAxios'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

interface postDataType {
  name: string
  phone: string
}

export default function () {
  const router = useRouter()

  const [modal, setModal] = useRecoilState(instructorRegisterModal)

  const [postData, setPostData] = useState<postDataType>({
    name: '',
    phone: ''
  })

  const clickClose = () => {
    setModal(false)
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueName: string
  ) => {
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

  return (
    <form
      className="relative w-[424px] h-[326px] bg-white rounded-xl border border-gray-900 flex justify-center"
      onSubmit={e => {
        e.preventDefault()
        const data = postData
        instance.post('/teachers', data).then((res: AxiosResponse) => {
          console.log(res)
          setModal(false)
        })

        //console.log(postData)
      }}
    >
      <div className="absolute left-6 top-10 gray-900-bold text-[22px]">
        강사 등록
      </div>
      <Image
        className="absolute right-4 top-4 cursor-pointer"
        src={x_circle}
        width={35}
        height={35}
        alt=""
        onClick={clickClose}
      />
      <div className="absolute top-[90px] w-[376px] flex flex-col gap-7">
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="이름"
            value={postData.name}
            onChange={e => {
              onChangeHandler(e, 'name')
            }}
            className="w-full px-3 h-[58px] py-5 rounded-lg border-gray-200"
          />
          <input
            type="text"
            placeholder="전화번호 (-제외)"
            value={postData.phone}
            onChange={e => {
              onChangeHandler(e, 'phone')
            }}
            className="w-full px-3 h-[58px] py-5 rounded-lg border-gray-200"
          />
        </div>
        <button
          type="submit"
          className="w-full h-[52px] btn-purple flex justify-center items-center"
        >
          <div className="text-white text-base font-semibold leading-normal">
            등록
          </div>
        </button>
      </div>
    </form>
  )
}
