'use client'
import Image from 'next/image'
import profile from '../../../../assets/images/profile 1.png'
import camera from '../../../../assets/icon/camera.svg'
import KakaoLogo from '../../../../assets/logo/kakaoLogo.svg'
import ToggleOn from '../../../../assets/icon/toggleOn.svg'
import ToggleOff from '../../../../assets/icon/toggleOff.svg'
import GoogleLogo from '../../../../assets/logo/googleLogo.svg'
import NaverLogo from '../../../../assets/logo/naverLogo.svg'
import React, { useState } from 'react'

export default function ManageMent() {
  const [postData, setPostData] = useState({
    name: '',
    address: '',
    phone: ''
  })

  const [toggleTarget, setToggleTarget] = useState('kakao')

  const onClickToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    console.log(e.currentTarget.id)
    setToggleTarget(e.currentTarget.id)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.currentTarget.name
    setPostData({
      ...postData,
      [type]: e.target.value
    })
  }

  const onToggle = (e: any) => {}

  return (
    <div className="w-[640px] flex flex-col gap-5 justify-center">
      <form
        className="w-full px-6 py-8 flex flex-col rounded-xl border border-gray-200 justify-center gap-10"
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
          센터 정보
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="relative w-[140px] mx-auto flex flex-col justify-center">
            <Image className="" src={profile} width={140} height={140} alt="" />
            <button className="absolute left-[35px] top-[124px] bg-white w-[70px] h-[34px] pl-2.5 pr-3 py-2 flex justify-center gap-1 rounded-lg border border-primary-600">
              <Image src={camera} width={16} height={16} alt="" />
              <div className="indigo-500-semibold text-xs font-['Pretendard'] leading-[18px]">
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
          <button type="submit" className="w-full h-[52px] btn-purple">
            수정하기
          </button>
        </div>
      </form>
      <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200">
        <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
          SNS 연결 설정
        </div>
        <div className="w-full flex flex-col gap-[14px]">
          <div className="relative w-full h-16 flex items-center bg-[#FFE812] rounded-md ">
            <Image
              className="absolute left-2"
              src={KakaoLogo}
              width={48}
              height={48}
              alt=""
            />
            <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard'] leading-none">
              카카오 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard'] leading-none">
              2024.01.07
            </div>
            <Image
              id="kakao"
              className="absolute right-6 cursor-pointer"
              onClick={e => {
                onClickToggle(e)
              }}
              src={toggleTarget === 'kakao' ? ToggleOn : ToggleOff}
              width={44}
              height={24}
              alt=""
            />
          </div>
          <div className="relative w-full h-16 flex items-center border border-[#2BB500] rounded-md ">
            <Image
              className="absolute left-2"
              src={NaverLogo}
              width={48}
              height={48}
              alt=""
            />
            <div className="absolute left-[68px] text-[#2BB500] text-base font-semibold font-['Pretendard'] leading-none">
              네이버 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard'] leading-none">
              2024.01.07
            </div>
            <Image
              id="naver"
              className="absolute right-6 cursor-pointer"
              onClick={e => {
                onClickToggle(e)
              }}
              src={toggleTarget === 'naver' ? ToggleOn : ToggleOff}
              width={44}
              height={24}
              alt=""
            />
          </div>
          <div className="relative w-full h-16 flex items-center border border-gray-600 rounded-md ">
            <Image
              className="absolute left-2 p-[15px]"
              src={GoogleLogo}
              width={48}
              height={48}
              alt=""
            />
            <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard'] leading-none">
              구글 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard'] leading-none">
              2024.01.07
            </div>
            <Image
              id="google"
              className="absolute right-6 cursor-pointer"
              onClick={e => {
                onClickToggle(e)
              }}
              src={toggleTarget === 'google' ? ToggleOn : ToggleOff}
              width={44}
              height={24}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
