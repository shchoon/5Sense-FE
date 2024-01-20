'use client'
import Image from 'next/image'
import ArrowBack from '../../../../assets/icon/allowBack.svg'
import Ellipsis from '../../../../assets/icon/ellipsis75.svg'
import profile from '../../../../assets/images/profile 1.png'
import camera from '../../../../assets/icon/camera.svg'
import Link from 'next/link'
import { useState } from 'react'

export default function ManageMent() {
  const [postData, setPostData] = useState({
    name: '',
    address: '',
    phone: ''
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.currentTarget.name
    setPostData({
      ...postData,
      [type]: e.target.value
    })
  }
  return (
    <div className="w-[640px] flex flex-col gap-5 justify-center">
      <form
        className="w-full px-6 py-8 flex flex-col justify-center gap-10"
        onSubmit={e => {
          e.preventDefault()
          console.log(postData)
        }}
      >
        <div className="text-gray-900 text-xl font-bold font-['Pretendard'] leading-tight">
          센터 정보
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="relative w-[140px] mx-auto flex flex-col justify-center">
            <Image className="" src={profile} width={140} height={140} alt="" />
            <button className="absolute left-[35px] top-[124px] bg-white w-[70px] h-[34px] pl-2.5 pr-3 py-2 flex justify-center gap-1 rounded-lg border border-primary-600">
              <Image src={camera} width={16} height={16} alt="" />
              <div className="text-indigo-500 text-xs font-semibold font-['Pretendard'] leading-[18px]">
                수정
              </div>
            </button>
          </div>

          <div className="w-full flex flex-col gap-4">
            <input
              name="name"
              value={postData.name}
              onChange={e => {
                onChangeHandler(e)
              }}
              className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
              placeholder="센터명을 입력해주세요."
            />
            <input
              name="address"
              value={postData.address}
              onChange={e => {
                onChangeHandler(e)
              }}
              className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
              placeholder="주소를 입력해주세요"
            />
            <input
              name="phone"
              value={postData.phone}
              onChange={e => {
                onChangeHandler(e)
              }}
              className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
              placeholder="대표번호를 입력해주세요"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[52px] btn-purple focus:ring-1 focus:ring-primary-200"
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  )
}
