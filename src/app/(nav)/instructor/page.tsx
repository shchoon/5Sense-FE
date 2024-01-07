'use client'
import plusCircle from '../../../assets/icon/plus-circle.svg'
import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import chevronRight from '../../../assets/icon/chevron_right_20.svg'
import Image from 'next/image'
import { fetchApi } from '@/hooks/useApi'
import { useState, useEffect } from 'react'

export default function InstructorPage() {
  const allInstructorData = [
    {
      name: '엄세리',
      phone: '010-1234-5678'
    },
    {
      name: '조성훈',
      phone: '010-1231-1315'
    },
    {
      name: '정은담',
      phone: '010-8435-1536'
    },
    {
      name: '윤태식',
      phone: '010-3556-5678'
    },
    {
      name: '조영은',
      phone: '010-2166-5678'
    },
    {
      name: '엄세리',
      phone: '010-2365-5678'
    },
    {
      name: '엄세리',
      phone: '010-1234-1565'
    }
  ]
  const [instructorData, setInstructorData] = useState<any>()

  let [searchInput, setSearchInput] = useState<any>('')

  useEffect(() => {
    fetchApi('/teachers?searchBy=none', 'GET').then(result => {
      setInstructorData(result.data.teachers)
    })
  }, [])

  function onChangeInput(event: any) {
    setSearchInput(event.target.value)
  }

  function searchClick() {
    if (isNaN(searchInput)) {
      let result = allInstructorData.filter(data =>
        data.name.includes(searchInput)
      )
      setInstructorData(result)
    } else {
      let result = allInstructorData.filter(data =>
        data.phone.replaceAll('-', '').includes(searchInput)
      )
      setInstructorData(result)
    }
  }

  function preventDashAndPressEnter(event: any) {
    /* dash(-)의 event.which가 189 */
    if (event.which === 189) {
      event.preventDefault()
    }
    if (event.key == 'Enter') {
      searchClick()
    }
  }

  function onClickX() {
    setSearchInput('')
  }

  function pressEnter() {
    console.log('enter')
  }

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            강사 관리
          </div>
        </div>

        <div className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 bg-primary-600">
          <Image src={plusCircle} width={20} height={20} alt=" " />
          <div className="h-[21px] w-16 text-white text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] cursor-pointer">
            강사 등록
          </div>
        </div>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={search_16} width={16} height={16} alt=" " />
          <input
            className="w-[245px] focus:outline-none"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeInput}
            onKeyDown={preventDashAndPressEnter}
          />
          <Image
            className="cursor-pointer"
            src={x_icon_12}
            width={12}
            height={12}
            alt=" "
            onClick={onClickX}
          />
        </div>

        <div
          className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
          onClick={searchClick}
        >
          <Image src={search_20} width={20} height={20} alt=" " />
        </div>
      </div>
      {/* 강사 목록 시작 */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorData?.map(
          (data: { name: string; phone: string }, i: number) => {
            return (
              <div
                key={i}
                className="w-full h-[240px] flex flex-col justify-between px-6 pt-8 pb-6 border border-gray-200 rounded-3xl shadow-[0px_5px_15px_0px_rgba(0, 0, 0, 0.02)]"
              >
                <div className="w-full flex flex-col gap-2">
                  <div className="w-[307px] text-gray-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                    {data.name}
                  </div>
                  <div className="w-[307px] text-gray-500 text-base font-medium font-['Pretendard'] leading-normal">
                    {data.phone}
                  </div>
                </div>
                <div className="w-full px-5 py-2.5 flex gap-2 justify-center border border-primary-600 rounded-lg">
                  <div className="text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[21px]">
                    강사 정보
                  </div>
                  <Image src={chevronRight} width={20} height={20} alt="" />
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
