'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Checked from '@/icons/icon/checked.svg'
import ChevronDown from '@/icons/icon/chevronDown.svg'
import ChevronUp from '@/icons/icon/chevronUp.svg'

import { Button } from 'flowbite-react'
import LoginHeader from '@/components/login/LoginHeader'

export default function Agreement() {
  const router = useRouter()
  const [isShownAccessTerm, setIsShownAccessTerm] = useState<{ first: boolean; second: boolean }>({
    first: false,
    second: false
  })

  const [isClickedAccessTerm, setIsClickedAccessTerm] = useState<{ [key: string]: boolean }>({
    all: false,
    first: false,
    second: false
  })

  const handleClickAccessTerm = (type: string) => {
    if (type === 'all') {
      if (isClickedAccessTerm.all) {
        setIsClickedAccessTerm(prev => ({
          ...prev,
          all: false,
          first: false,
          second: false
        }))
      } else {
        setIsClickedAccessTerm(prev => ({
          ...prev,
          all: true,
          first: true,
          second: true
        }))
      }
    } else if (type === 'first') {
      if (isClickedAccessTerm.first) {
        setIsClickedAccessTerm(prev => ({
          ...prev,
          all: false,
          first: false
        }))
      } else {
        if (isClickedAccessTerm.second) {
          setIsClickedAccessTerm(prev => ({
            ...prev,
            all: true,
            first: true
          }))
        } else {
          setIsClickedAccessTerm(prev => ({
            ...prev,
            first: true
          }))
        }
      }
    } else if (type === 'second') {
      if (isClickedAccessTerm.second) {
        setIsClickedAccessTerm(prev => ({
          ...prev,
          all: false,
          second: false
        }))
      } else {
        if (isClickedAccessTerm.first) {
          setIsClickedAccessTerm(prev => ({
            ...prev,
            all: true,
            second: true
          }))
        } else {
          setIsClickedAccessTerm(prev => ({
            ...prev,
            second: true
          }))
        }
      }
    }
  }
  return (
    <div className="w-full">
      <LoginHeader
        title="반갑습니다,오센스입니다."
        subTitle="오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!"
      />
      <form
        className="w-full flex flex-col gap-16 mt-16"
        onSubmit={e => {
          e.preventDefault()
          const isClickedAccessTermValue = Object.keys(isClickedAccessTerm).every(type => isClickedAccessTerm[type])
          if (isClickedAccessTermValue) {
            /* all true */
            router.push('/mycenter/register')
          } else {
            alert('이용약관을 모두 동의해주세요')
          }
        }}
      >
        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full gray-900-bold text-[20px] h-5 leading-5">약관에 동의해 주세요</div>
          {/* 체크 박스 */}
          <div className="w-full flex flex-col gap-6">
            {/* 전체 동의 */}
            <div
              className="w-full h-[60px] pl-6 flex items-center gap-[165px] border border-1 border-primary-200 rounded cursor-pointer"
              onClick={() => {
                handleClickAccessTerm('all')
              }}
            >
              {isClickedAccessTerm.all ? <div
                        className="w-4 h-4 rounded bg-primary-600 flex justify-center items-center"
                        onClick={() => {
                          handleClickAccessTerm('all')
                        }}
                      >
                        <Checked />
                      </div> : <input
                type="checkbox"
                id="all"
                checked={isClickedAccessTerm.all}
                className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer focus:ring-offset-0 focus:ring-0"
              />}
              <span className="h-4 text-left gray-800-semibold text-[16px] leading-4">
                전체 약관에 모두 동의합니다.
              </span>
            </div>
            <div className="w-full flex flex-col gap-5">
              {/* 동의 1 */}
              <div className="w-full h-5 flex gap-6 items-start">
                <div className="flex gap-[5px] h-4">
                  <div className="w-[113px] h-full flex gap-2.5">
                    {isClickedAccessTerm.first ? (
                      <div
                        className="w-4 h-4 rounded bg-primary-600 flex justify-center items-center"
                        onClick={() => {
                          handleClickAccessTerm('first')
                        }}
                      >
                        <Checked />
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={isClickedAccessTerm.first}
                        id="firstAgree"
                        className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer focus:ring-offset-0 focus:ring-0"
                        onClick={() => {
                          handleClickAccessTerm('first')
                        }}
                      />
                    )}
                    <span className="h-4 gray-800-medium text-[16px] leading-4">이용약관 동의</span>
                  </div>
                  <div className="w-10 h-4 text-[16px] text-primary-600 leading-4">(필수)</div>
                </div>
                <div
                  className="w-full h-full flex justify-end"
                  onClick={() => {
                    if (isShownAccessTerm.first) {
                      setIsShownAccessTerm(prev => ({
                        ...prev,
                        first: false
                      }))
                    } else {
                      setIsShownAccessTerm(prev => ({
                        ...prev,
                        first: true,
                        second: false
                      }))
                    }
                  }}
                >
                  {isShownAccessTerm.first ? (
                    <ChevronUp className="text-gray-500" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>
              {isShownAccessTerm.first && (
                <div className="w-full pl-6 pr-4 py-6 border border-1 border-gray-200 rounded-xl max-h-[200px] overflow-y-auto">
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                  </div>
                </div>
              )}
              {/* 동의 2 */}
              <div className="w-full h-5 flex gap-6 items-start">
                <div className="flex gap-[5px] h-4">
                  <div className="w-[113px] h-full flex gap-2.5">
                    {isClickedAccessTerm.second ? (
                      <div
                        className="w-4 h-4 rounded bg-primary-600 flex justify-center items-center"
                        onClick={() => {
                          handleClickAccessTerm('second')
                        }}
                      >
                        <Checked />
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={isClickedAccessTerm.second}
                        id="secondAgree"
                        className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer focus:ring-offset-0 focus:ring-0"
                        onClick={() => {
                          handleClickAccessTerm('second')
                        }}
                      />
                    )}

                    <span className="h-4 gray-800-medium text-[16px] leading-4">이용약관 동의</span>
                  </div>
                  <div className="w-10 h-4 text-[16px] text-primary-600 leading-4">(필수)</div>
                </div>
                <div
                  className="w-full h-full flex justify-end"
                  onClick={() => {
                    if (isShownAccessTerm.second) {
                      setIsShownAccessTerm(prev => ({
                        ...prev,
                        second: false
                      }))
                    } else {
                      setIsShownAccessTerm(prev => ({
                        ...prev,
                        first: false,
                        second: true
                      }))
                    }
                  }}
                >
                  {isShownAccessTerm.second ? (
                    <ChevronUp className="text-gray-500" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>
              {isShownAccessTerm.second && (
                <div className="w-full pl-6 pr-4 py-6 border border-1 border-gray-200 rounded-xl max-h-[200px] overflow-y-auto">
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                    <div className="w-full text-black text-sm font-normal ">
                      1. 개인정보처리방침이란?
                      <br />
                      주식회사 헤이컬렉티브(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고
                      있으며,‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.
                      <br />
                      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                      가이드라인을 준수하고 있습니다.
                      <br />
                      “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할
                      수 있도록 회사가 준수해야 할 지침을 의미합니다.
                      <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                      <br />
                      2. 개인정보 수집
                      <br />
                      서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                      <br />
                      회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                      아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button color="primary" fullSized type="submit" size="lg">
          다음으로
        </Button>
      </form>
    </div>
  )
}