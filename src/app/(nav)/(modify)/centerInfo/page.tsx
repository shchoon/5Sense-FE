'use client'
import Image from 'next/image'
import ProfileIcon from 'public/assets/images/defaultProfile.svg'
import CameraIcon from 'public/assets/icons/camera.svg'
import KakaoIcon from 'public/assets/logo/kakaoLogo.svg'
import ToggleOn from 'public/assets/icons/toggle_on.svg'
import ToggleOff from 'public/assets/icons/toggle_off.svg'
import GoogleIcon from 'public/assets/logo/googleLogo.svg'
import NaverIcon from 'public/assets/logo/naverLogo.svg'
import React, { useState } from 'react'
import DropDown from '@/components/common/DropDown'
import Script from 'next/script'

interface snsLinkType {
  kakao: boolean
  naver: boolean
  google: boolean
}

export default function ManageMent() {
  const [postData, setPostData] = useState({
    name: '',
    address: '',
    phone: '',
    openTime: '',
    closeTime: ''
  })
  const [snsLink, setSnsLink] = useState<snsLinkType>({
    kakao: true,
    naver: false,
    google: false
  })

  const onClickAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        setPostData({
          ...postData,
          address: data.address
        })
      }
    }).open()
  }
  const getTimeList = () => {
    const list = []
    for (var i = 0; i <= 48; i++) {
      let standard = i * 30
      let hour: string | number = Math.floor(standard / 60)
      let min: string | number = standard % 60
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (min === 0) {
        min = `0${min}`
      }
      let time = `${hour}:${min}`
      list.push(time)
    }
    return list
  }

  const DropDownProps1 = {
    title: '오픈 시간',
    list: getTimeList()
  }

  const DropDownProps2 = {
    title: '마감 시간',
    list: getTimeList()
  }

  const onClickToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    const title = e.currentTarget.title
    /* setToggleTarget((prevToggleTarget: snsLinkType) => ({
      ...prevToggleTarget,
      [title]: !prevToggleTarget[title as keyof snsLinkType]
    })) */
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.currentTarget.name
    setPostData({
      ...postData,
      [type]: e.target.value
    })
  }

  const handleChangeDropwdownFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      openTime: data.time
    }))
  }

  const handleChangeCloseTimeFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      closeTime: data.time
    }))
  }
  return (
    <div className="w-[640px] flex flex-col gap-5 justify-center">
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <form
        className="w-full px-6 py-8 flex flex-col rounded-xl border border-gray-200 justify-center gap-10"
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <div className="gray-900-bold text-xl font-['Pretendard']">센터 정보</div>
        <div className="w-full flex flex-col gap-10">
          <div className="relative w-[140px] mx-auto flex flex-col justify-center">
            <div className="w-[140px] h-[140px] rounded-full bg-primary-300">
              <ProfileIcon className="" width={140} height={140} alt="" />
            </div>
            <button className="absolute left-[35px] top-[124px] bg-white w-[70px] h-[34px] pl-2.5 pr-3 py-2 flex justify-center gap-1 rounded-lg border border-primary-600">
              <CameraIcon width={16} height={16} alt="" />
              <div className="indigo-500-semibold text-xs font-['Pretendard']">수정</div>
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
              onClick={onClickAddress}
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
            <div className="flex gap-2">
              <DropDown
                {...DropDownProps1}
                handleChangeParentsOpenTimeData={handleChangeDropwdownFromChild}
                type="open"
              />
              <span className="flex items-center">-</span>
              <DropDown
                {...DropDownProps2}
                handleChangeParentsCloseTimeData={handleChangeCloseTimeFromChild}
                type="close"
              />
            </div>
          </div>
          <button type="submit" className="w-full h-[52px] btn-purple">
            수정하기
          </button>
        </div>
      </form>
      {/* 계정 연결 */}
      <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200">
        <div className="gray-900-bold text-xl font-['Pretendard']">SNS 연결 설정</div>
        <div className="w-full flex flex-col gap-[14px]">
          <div className="relative w-full h-16 flex items-center bg-[#FFE812] rounded-md ">
            <KakaoIcon className="absolute left-2" width={48} height={48} alt="" />
            <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard']">
              카카오 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard']">
              2024.01.07
            </div>
            {snsLink.kakao ? (
              <ToggleOn
                className="absolute right-6 cursor-pointer"
                width={44}
                hiught={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    kakao: false
                  }))
                }}
              />
            ) : (
              <ToggleOff
                className="absolute right-6 cursor-pointer"
                width={44}
                hiught={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    kakao: true
                  }))
                }}
              />
            )}
          </div>
          <div className="relative w-full h-16 flex items-center border border-[#2BB500] rounded-md ">
            <NaverIcon className="absolute left-2" width={48} height={48} alt="" />
            <div className="absolute left-[68px] text-[#2BB500] text-base font-semibold font-['Pretendard']">
              네이버 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard']">
              2024.01.07
            </div>
            {snsLink.naver ? (
              <ToggleOn
                className="absolute right-6 cursor-pointer"
                width={44}
                heught={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    naver: false
                  }))
                }}
              />
            ) : (
              <ToggleOff
                className="absolute right-6 cursor-pointer"
                width={44}
                heught={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    naver: true
                  }))
                }}
              />
            )}
          </div>
          <div className="relative w-full h-16 flex items-center border border-gray-600 rounded-md ">
            <GoogleIcon className="absolute left-2 p-[15px]" width={48} height={48} alt="" />
            <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard']">
              구글 계정 연결
            </div>
            <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard']">
              2024.01.07
            </div>
            {snsLink.google ? (
              <ToggleOn
                className="absolute right-6 cursor-pointer"
                width={44}
                height={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    google: false
                  }))
                }}
              />
            ) : (
              <ToggleOff
                className="absolute right-6 cursor-pointer"
                width={44}
                height={24}
                onClick={() => {
                  setSnsLink(prev => ({
                    ...prev,
                    google: true
                  }))
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
