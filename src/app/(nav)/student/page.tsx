'use client'

import plusCircle from '@/assets/icon/plus-circle.svg'

import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import noneResult from '../../../assets/icon/noneResult.svg'
import Image from 'next/image'
import { fetchApi } from '@/hooks/useApi'
import { useState, useEffect, useRef, use } from 'react'
import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { idState, modalState } from '@/state/modal'
import instance from '@/hooks/useAxios'
import { AxiosResponse, AxiosError } from 'axios'
import SearchFeat from '@/components/SearchFeat'

interface studentType {
  id: string
  name: string
  phone: string
  className: string
  particulars: string
}

export interface postVarType {
  page: string
  cursor: string
  hasNextPage: boolean
}

export default function StudentPage() {
  let target: HTMLElement | null = document.getElementById('test')
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        setInfiniteScrollCount(page => page + 1)
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)
  if (target) observer.observe(target)

  const [studentData, setStudentData] = useState<studentType[]>([])
  const [postVariable, setPostVariable] = useState<postVarType>({
    page: '',
    cursor: '',
    hasNextPage: true
  })
  const [refresh, setRefresh] = useState<boolean>(false)

  const [infiniteScrollCount, setInfiniteScrollCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const getStudentData = (page?: string, cursor?: string) => {
    if (page && cursor) {
      instance
        .get(
          `/students?searchBy=none&page=${postVariable.page + 1}&cursor=${
            postVariable.cursor
          }`
        )
        .then((res: AxiosResponse) => {
          let cursorIndex = res.data.data.students.length - 1
          setStudentData((preStudentData: studentType[]) => [
            ...preStudentData,
            ...res.data.data.students
          ])
          setPostVariable((prePostVariable: postVarType) => ({
            ...prePostVariable,
            page: res.data.data.meta.page,
            cursor: res.data.data.students[cursorIndex].id,
            hasNextPage: res.data.data.meta.hasNextPage
          }))
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      instance
        .get('/students?searchBy=none&page=1')
        .then((res: AxiosResponse) => {
          if (res.data.data.students.length !== 0) {
            let cursorIndex = res.data.data.students.length - 1
            setStudentData((preStudentData: studentType[]) => [
              ...preStudentData,
              ...res.data.data.students
            ])
            setPostVariable((prePostVariable: postVarType) => ({
              ...prePostVariable,
              page: res.data.data.meta.page,
              cursor: res.data.data.students[cursorIndex].id,
              hasNextPage: res.data.data.meta.hasNextPage
            }))
          }
        })
        .finally(() => {
          setRefresh(true)
        })
    }
  }
  const getStudentDataBynameOrPhone = (value: string) => {
    if (Number(value)) {
      instance
        .get(`/students?searchBy=phone&phone=${value}`)
        .then((res: AxiosResponse) => {
          setStudentData(res.data.data.students)
          setPostVariable({
            ...postVariable,
            hasNextPage: res.data.data.meta.hasNextPage
          })
        })
    } else {
      instance.get(`/students?searchBy=name&name=${value}`).then(res => {
        setStudentData(res.data.data.students)
        setPostVariable({
          ...postVariable,
          hasNextPage: res.data.data.meta.hasNextPage
        })
      })
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  async function searchClick() {
    getStudentDataBynameOrPhone(inputValue)
  }

  function preventDashAndPressEnter(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    const forbidden = ['-']

    if (forbidden.includes(event.key)) {
      event.preventDefault()
    }
    if (event.key == 'Enter') {
      searchClick()
    }
  }
  function onClickX() {
    setInputValue('')
    instance.get('/students?searchBy=none&page=1').then(res => {
      if (res.data.data.students.length !== 0) {
        let cursorIndex = res.data.data.students.length - 1
        setStudentData(res.data.data.students)
        setPostVariable((prePostVariable: postVarType) => ({
          ...prePostVariable,
          page: res.data.data.meta.page,
          cursor: res.data.data.students[cursorIndex].id,
          hasNextPage: res.data.data.meta.hasNextPage
        }))
      }
    })
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

  useEffect(() => {
    if (infiniteScrollCount === 0) {
      getStudentData()
    }
    if (infiniteScrollCount > 0 && postVariable.hasNextPage && !loading) {
      setLoading(true)
      setTimeout(() => {
        getStudentData(postVariable.page, postVariable.cursor)
      }, 500)
    }
  }, [infiniteScrollCount])

  const [modalValue, setModalValue] = useRecoilState(modalState)
  const [idValue, setIdValue] = useRecoilState(idState)

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            수강생 관리
          </div>
        </div>
        <Link
          href={'student/register'}
          className="Button flex flex-row px-5 py-2.5 btn-purple text-sm"
        >
          <Image
            src={plusCircle}
            alt="plus"
            width={20}
            height={20}
            className="mr-2"
          />
          수강생 등록
        </Link>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={search_16} width={16} height={16} alt=" " />
          <input
            className="w-[245px] border-none ring-0 focus:ring-0"
            placeholder="Search"
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

        <div
          className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
          onClick={searchClick}
        >
          <Image src={search_20} width={20} height={20} alt=" " />
        </div>
      </div>
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3">
        {/* 수강생 목록 설명 */}
        <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex lg:gap-6 gap-4 rounded bg-[#F0EFFF]">
          <div className="w-[100px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            이름
          </div>
          <div className="lg:w-[160px] w-[130px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            전화번호
          </div>
          <div className="xl:flex-1 lg:w-[100px] flex-1 text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            클래스명
          </div>
          <div className="xl:w-[400px] lg:flex-1 w-[200px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            특이사항
          </div>
        </div>
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {refresh && studentData.length === 0 ? (
            <div className="flex w-full h-screen justify-center items-center">
              <div className="flex flex-col gap-6 w-[432px] h-[244px]">
                <Image
                  className="mx-auto"
                  src={noneResult}
                  width={148}
                  height={148}
                  alt=" "
                />
                <div className="w-full flex flex-col gap-3">
                  <div className="w-[432px] text-center text-gray-900 text-2xl font-bold font-['Pretendard'] leading-9">
                    검색결과가 없습니다.
                  </div>
                  <div className="w-[432px] text-center text-gray-400 text-base font-medium font-['Pretendard'] leading-normal">
                    다른 검색어를 통해 검색을 이어나가보세요
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {studentData?.map((data: studentType, i: number) => {
            return (
              <div
                key={i}
                className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] cursor-pointer"
                onClick={() => {
                  setModalValue(!modalValue)
                  setIdValue(data.id)
                }}
              >
                <div className="flex lg:gap-6 gap-4 flex-1">
                  <div className="w-[100px] text-gray-800 text-sm font-semibold font-['Pretendard']">
                    {data.name}
                  </div>
                  <div className="lg:w-[160px] w-[130px] text-gray-800 text-sm font-semibold font-['Pretendard']">
                    {data.phone.slice(0, 3)}-{data.phone.slice(3, 7)}-
                    {data.phone.slice(7, 11)}
                  </div>
                  <div className="xl:flex-1 lg:w-[100px] flex-1 text-gray-800 text-sm font-semibold font-['Pretendard']">
                    {data.className}
                  </div>
                  <div className="xl:w-[400px] lg:flex-1 w-[200px] text-gray-900 text-base font-normal font-['Pretendard']">
                    {data.particulars}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {loading && (
        <div className="w-full h-14 flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {postVariable.hasNextPage ? <div id="test"></div> : null}
    </div>
  )
}
