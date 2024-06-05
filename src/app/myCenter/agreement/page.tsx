'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Checked from '@/icons/icon/checked.svg'
import ChevronDownIcon from 'public/assets/icons/chevron/chevron_down_gray.svg'
import ChevronUpIcon from 'public/assets/icons/chevron/chevron_up_gray.svg'

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
    <form
      className="w-full flex flex-col gap-16"
      onSubmit={e => {
        e.preventDefault()
        const isClickedAccessTermValue = Object.keys(isClickedAccessTerm).every(type => isClickedAccessTerm[type])
        if (isClickedAccessTermValue) {
          router.push('/myCenter/rigister')
        } else {
          alert('이용약관을 모두 동의해주세요')
        }
      }}
    >
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full gray-900-bold text-[20px] h-5 leading-5">약관에 동의해 주세요</div>
        {/* 체크 박스 */}
        <div className="w-full flex flex-col gap-6">
          <div
            className="w-full h-[60px] pl-6 flex items-center gap-[165px] border border-1 border-primary-200 rounded cursor-pointer"
            onClick={() => {
              handleClickAccessTerm('all')
            }}
          >
            <input type="checkbox" id="all" checked={isClickedAccessTerm.all} className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer" />
            <span className="w-full h-4 text-left gray-800-semibold text-[16px] leading-4">전체 약관에 모두 동의합니다.</span>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex cursor-pointer">
              <div
                className="w-[113px] flex gap-2.5"
                onClick={() => {
                  handleClickAccessTerm('first')
                }}
              >
                <input type="checkbox" checked={isClickedAccessTerm.first} id="firstAgree" className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer" />
                <div className="h-4 flex items-center gap-1.5">
                  <span className="w-[87px] gray-600-medium text-base">이용약관 동의</span>
                  <span className="flex-1 text-left primary-600-medium">(필수)</span>
                </div>
              </div>
              <div
                className="flex-1 flex justify-end"
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
                {isShownAccessTerm.first ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                  </div>
                </div>
              </div>
            )}

            <div className="w-full flex gap-2.5 cursor-pointer">
              <div
                className="w-[160px] flex gap-2.5"
                onClick={() => {
                  handleClickAccessTerm('second')
                }}
              >
                <input type="checkbox" checked={isClickedAccessTerm.second} id="secondAgree" className="w-4 h-4 rounded border border-gray-300 bg-gray-50 cursor-pointer" />
                <div className="w-[135px] h-4 flex items-center gap-1.5">
                  <span className="w-[87px] gray-600-medium text-base">이용약관 동의</span>
                  <span className="flex-1 text-left primary-600-medium">(필수)</span>
                </div>
              </div>

              <div
                className="flex-1 flex justify-end"
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
                {isShownAccessTerm.second ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
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
                    “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
                    있도록 회사가 준수해야 할 지침을 의미합니다.
                    <br />본 개인정보 처리방침은 surfit.io 서비스(이하 '서비스')에 적용됩니다.
                    <br />
                    2. 개인정보 수집
                    <br />
                    서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                    <br />
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와
                    같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="w-full h-[52px] btn-purple">
        다음으로
      </button>
    </form>
  )
}