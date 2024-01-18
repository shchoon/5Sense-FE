'use client'
import plusCircle from '../../../assets/icon/plus-circle.svg'
import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import chevronRight from '../../../assets/icon/chevron_right_20.svg'
import NoneResult from '@/components/NoneResult'
import Image from 'next/image'
import instance from '@/hooks/useAxios'
import { AxiosResponse } from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { instructorRegisterModal } from '@/state/modal'
import SearchFeat from '@/components/SearchFeat'
import { useRef } from 'react'

export default function InstructorPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  let target: HTMLElement | null = document.getElementById('test')
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollCount, setScrollCount] = useState(0)
  const [instructorData, setInstructorData] = useState<any>([])

  const [modalValue, setModalValue] = useRecoilState(instructorRegisterModal)

  const [inputValue, setInputValue] = useState<any>('')
  const [postVar, setPostVar] = useState({
    page: '',
    cursor: '',
    hasNextPage: true
  })
  const handleObserver = (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting) {
      console.log(entry)
      observer.unobserve(entry.target)
      setScrollCount(prev => prev + 1)
    }
  }

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver(handleObserver, options)
  postVar.hasNextPage && target && observer.observe(target)

  useEffect(() => {
    if (scrollCount !== 0 && postVar.hasNextPage) {
      setLoading(true)
      setTimeout(() => {
        getInstructorList()
        setLoading(false)
      }, 500)
    }
  }, [scrollCount])

  const getInstructorList = () => {
    if (inputValue !== '') {
      const searchBy = inputRef.current?.name as string
      instance
        .get(
          `/teachers?searchBy=${searchBy}&phone=${inputValue}&page=${
            postVar.page + 1
          }&cursor=${postVar.cursor}`
        )
        .then((res: AxiosResponse) => {
          console.log(res)
          setInstructorData((preStudentData: any) => [
            ...preStudentData,
            ...res.data.data.teachers
          ])
          let index = res.data.data.teachers.length - 1
          setPostVar(prePostVar => ({
            ...prePostVar,
            page: res.data.data.meta.page,
            cursor: res.data.data.teachers[index].id,
            hasNextPage: res.data.data.meta.hasNextPage
          }))
        })
    } else {
      instance
        .get(
          `/teachers?searchBy=none&page=${postVar.page + 1}&cursor=${
            postVar.cursor
          }`
        )
        .then((res: AxiosResponse) => {
          console.log(inputRef.current)
          setInstructorData((preStudentData: any) => [
            ...preStudentData,
            ...res.data.data.teachers
          ])
          let index = res.data.data.teachers.length - 1
          setPostVar(prePostVar => ({
            ...prePostVar,
            page: res.data.data.meta.page,
            cursor: res.data.data.teachers[index].id,
            hasNextPage: res.data.data.meta.hasNextPage
          }))
        })
    }
  }

  useEffect(() => {
    if (!modalValue) {
      instance.get('/teachers?searchBy=none').then((res: AxiosResponse) => {
        setInstructorData(res.data.data.teachers)
        const lastTeacherId = res.data.data.teachers.length - 1
        if (res.data.data.meta.hasNextPage) {
          setPostVar(postVar => ({
            ...postVar,
            page: res.data.data.meta.page,
            cursor: res.data.data.teachers[lastTeacherId].id,
            hasNextPage: res.data.data.meta.hasNextPage
          }))
        }
        setRefresh(true)
      })
    }
  }, [modalValue])

  function onChangeInput(event: any) {
    setInputValue(event.target.value)
  }

  function searchClick() {
    const searchBy = inputRef.current?.name as string
    SearchFeat('teachers', searchBy, inputValue).then(res => {
      setInstructorData(res.teachers)
      if (res.meta.hasNextPage) {
        const lastId = res.teachers.length - 1
        setPostVar({
          ...postVar,
          page: res.meta.page,
          cursor: res.teachers[lastId].id,
          hasNextPage: res.meta.hasNextPage
        })
      } else {
        setPostVar(prePostVar => ({
          ...prePostVar,
          hasNextPage: false
        }))
      }
    })
  }
  function onClickX() {
    setInputValue('')
  }

  const modalClick = () => {
    setModalValue(true)
  }

  const checkInputType = () => {
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (inputValue !== '' && checkList.includes(inputValue[0])) {
      return false
    } else {
      return true
    }
  }

  const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let regex = /^[a-zA-Z]+$/
    const forbiddenKeys = ['-', 'e', 'ArrowUp', 'ArrowDown']
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (
      forbiddenKeys.includes(e.key) ||
      e.currentTarget.value.length > 12 ||
      (e.currentTarget.value.length === 12 && e.key !== 'Backspace')
    ) {
      e.preventDefault()
    }
    if (regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      searchClick()
    }
  }

  const preventInputDifferentType = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (inputValue !== '' && checkList.includes(e.key)) {
      e.preventDefault()
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      searchClick()
    }
  }

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-16">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            강사 관리
          </div>
        </div>

        <div
          className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 btn-purple"
          onClick={modalClick}
        >
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
            ref={inputRef}
            className="w-[245px] border-none focus:ring-0"
            placeholder="Search"
            name={checkInputType() ? 'name' : 'phone'}
            type={checkInputType() ? 'text' : 'number'}
            value={inputValue}
            onChange={onChangeInput}
            onKeyDown={
              checkInputType() ? preventInputDifferentType : allowOnlyNum
            }
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

        <div className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer">
          <Image src={search_20} width={20} height={20} alt=" " />
        </div>
      </div>
      {/* 강사 목록 시작 */}
      {instructorData.length === 0 && refresh ? <NoneResult /> : null}
      {/* 겅색 결과 없음 */}
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
      {!loading && !modalValue ? <div id="test"></div> : null}
      {loading ? (
        <div className="w-full h-[70px] pt-[50px] flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
