'use client'
import '../globals.css'
import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { fetchApi } from '@/hooks/useApi'
import Router from 'next/navigation'
import { useRouter } from 'next/navigation'
import local from 'next/font/local'

declare global {
  interface Window {
    daum: any
  }
}

interface IAddr {
  address: string
  zonecode: string
}

interface postDataType {
  name: string
  address: string
  mainPhone: string
}

export default function MyCenter() {
  const router = useRouter()
  const centerNameInputRef = useRef<HTMLInputElement>(null)
  const addressNameInputRef = useRef<HTMLInputElement>(null)
  const phoneNumInputRef = useRef<HTMLInputElement>(null)

  const [postData, setPostData] = useState<postDataType>({
    name: '',
    address: '',
    mainPhone: ''
  })
  const [onFocusInput, setOnFocusInput] = useState({
    nameInput: false,
    addressInput: false,
    phoneInput: false
  })

  const [danger, setDanger] = useState({
    name: false,
    address: false,
    phone: false
  })

  const onClickAdd = () => {
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

  const handleOnFocus = (inputName: string) => {
    if (inputName === 'center') {
      setOnFocusInput({
        ...onFocusInput,
        nameInput: true
      })
      setDanger(danger => ({
        ...danger,
        name: false
      }))
    } else if (inputName === 'address') {
      setOnFocusInput({
        ...onFocusInput,
        addressInput: true
      })
      setDanger(danger => ({
        ...danger,
        address: false
      }))
    } else if (inputName === 'phone') {
      setOnFocusInput({
        ...onFocusInput,
        phoneInput: true
      })
      setDanger(danger => ({
        ...danger,
        phone: false
      }))
    }
  }
  const handelClickOutsideCenter = () => {
    setOnFocusInput({
      ...onFocusInput,
      nameInput: false
    })
  }
  const handelClickOutsideAddress = () => {
    setOnFocusInput({
      ...onFocusInput,
      addressInput: false
    })
  }
  const handelClickOutsidePhone = () => {
    setOnFocusInput({
      ...onFocusInput,
      phoneInput: false
    })
  }

  const handelChangeName = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === 'name') {
      setPostData({
        ...postData,
        name: e.target.value
      })
    } else if (name === 'phone') {
      setPostData({
        ...postData,
        mainPhone: e.target.value
      })
    }
  }

  useOnClickOutside(addressNameInputRef, handelClickOutsideAddress)
  useOnClickOutside(phoneNumInputRef, handelClickOutsidePhone)
  useOnClickOutside(centerNameInputRef, handelClickOutsideCenter)

  /* 전화번호 입력 -> '-' &  number type 아닌 것들 입력 방지*/
  async function allowOnlyNum(e: any) {
    let ASCIICode = e.which ? e.which : e.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false
    return true
    /* if (isNaN(e.key) && e.key !== 'Backspace') {
      e.preventDefault()
    } */
  }
  console.log(danger)
  console.log(postData)
  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <form
        className="flex flex-col w-[430px] h-[297px] gap-9"
        onSubmit={async e => {
          e.preventDefault()
          /* if (postData.mainPhone.length !== 11) {
            alert('번호를 다시 입력해주세요. ex) 010xxxxxxxx')
          } */

          Object.entries(postData).forEach(([key, value]) => {
            if (key === 'name' && value === '') {
              setDanger(danger => ({
                ...danger,
                name: true
              }))
            } else if (key === 'address' && value === '') {
              setDanger(danger => ({
                ...danger,
                address: true
              }))
            } else if (key === 'mainPhone' && value === '') {
              setDanger(danger => ({
                ...danger,
                phone: true
              }))
            }
          })

          console.log(danger)
          fetchApi('/centers', 'POST', {
            name: postData.name,
            address: postData.address,
            mainPhone: postData.mainPhone
          }).then(result => {
            console.log(result)
            localStorage.setItem('accessToken', result.data.accessToken)
            localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
            router.push('/home')
          })
        }}
      >
        <div className="w-[430px] h-[209px] flex flex-col items-center gap-4">
          <div className="relative w-[430px] h-[60px] flex items-center border rounded-lg border-[#E5E7EB] ">
            <input
              ref={centerNameInputRef}
              type="text"
              name="center"
              value={postData.name}
              onFocus={e => {
                handleOnFocus(e.target.name)
              }}
              className={`w-full px-3 py-5 text-sm text-gray-900  
                rounded-lg border-1 ${
                  danger.name
                    ? 'border-red-600'
                    : !onFocusInput.nameInput && postData.name !== ''
                      ? 'border-green-600'
                      : 'border-gray-200'
                } appearance-none focus:outline-none focus:ring-0 focus:border-primary-700 placeholder-gray-500 focus:placeholder-opacity-0`}
              placeholder="센터명"
              onChange={e => {
                handelChangeName('name', e)
              }}
            />
            {(onFocusInput.nameInput ||
              postData.name !== '' ||
              danger.name) && (
              <label className="absolute -top-2 left-3 w-[42px] h-5 bg-white">
                <div
                  className={`${
                    danger.name
                      ? 'text-red-600'
                      : !onFocusInput.nameInput
                        ? 'text-green-600'
                        : 'text-indigo-700'
                  }  text-xs font-medium font-['Inter'] leading-3`}
                >
                  센터명
                </div>
              </label>
            )}
          </div>
          <div className="relative w-[430px] h-[60px]  flex items-center  rounded-lg border border-[#E5E7EB]">
            <input
              ref={addressNameInputRef}
              type="text"
              name="address"
              value={postData.address}
              onFocus={e => {
                handleOnFocus(e.target.name)
              }}
              className={`w-full px-3 py-5 text-sm text-gray-900  
              rounded-lg border-1 ${
                danger.address
                  ? 'border-red-600'
                  : !onFocusInput.addressInput && postData.address !== ''
                    ? 'border-green-600'
                    : 'border-gray-200'
              } appearance-none focus:outline-none focus:ring-0 focus:border-primary-700 placeholder-gray-500 focus:placeholder-opacity-0`}
              placeholder="주소"
              onClick={onClickAdd}
            />
            {(onFocusInput.addressInput ||
              postData.address !== '' ||
              danger.address) && (
              <label className="absolute -top-2 left-3 w-[28px] h-3 bg-white">
                <div
                  className={`${
                    danger.address
                      ? 'text-red-600'
                      : !onFocusInput.addressInput
                        ? 'text-green-600'
                        : 'text-indigo-700'
                  }  text-xs font-medium font-['Inter'] leading-3`}
                >
                  주소
                </div>
              </label>
            )}
          </div>
          <div className="relative w-[430px] h-[60px]  flex items-center  rounded-lg border border-[#E5E7EB]">
            <input
              ref={phoneNumInputRef}
              name="phone"
              onFocus={e => {
                handleOnFocus(e.target.name)
              }}
              className={`w-full px-3 py-5 text-sm text-gray-900  
              rounded-lg border-2 ${
                danger.phone
                  ? 'border-red-600'
                  : !onFocusInput.phoneInput && postData.mainPhone !== ''
                    ? 'border-green-600'
                    : 'border-gray-200'
              } appearance-none focus:outline-none focus:ring-0 focus:border-primary-700 placeholder-gray-500 focus:placeholder-opacity-0`}
              placeholder="대표번호 (- 없이 입력해주세요)"
              value={postData.mainPhone}
              onKeyDown={allowOnlyNum}
              onChange={e => {
                handelChangeName('phone', e)
              }}
            />
            {(onFocusInput.phoneInput ||
              postData.mainPhone !== '' ||
              danger.phone) && (
              <label className="absolute -top-2 left-3 w-[60px] h-5 bg-white">
                <div
                  className={`${
                    danger.phone
                      ? 'text-red-600'
                      : !onFocusInput.phoneInput
                        ? 'text-green-600'
                        : 'text-indigo-700'
                  }  text-xs font-medium font-['Inter'] leading-3`}
                >
                  전화번호
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="w-[200px] h-[52px] px-6 py-[10px] rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-1 focus:ring-primary-200 text-[#FFF] font-semibold"
          >
            등록
          </button>
        </div>
      </form>
    </>
  )
}
