'use client'
import plusCircle from '../../../assets/icon/plus-circle.svg'
import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import noneResult from '../../../assets/icon/noneResult.svg'
import Image from 'next/image'
import { fetchApi } from '@/hooks/useApi'
import { useState, useEffect, useRef, use } from 'react'
import Link from 'next/link'

interface studentType {
  id: string
  name: string
  phone: string
  className: string
  particulars: string
}

interface postVariableType {
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

  function getMoreData() {
    fetchApi(
      `/students?searchBy=none&page=${postVariable.page + 1}&cursor=${
        postVariable.cursor
      }`,
      'GET'
    )
      .then(result => {
        let cursorIndex = result.data.students.length - 1
        setStudentData((preStudentData: studentType[]) => [
          ...preStudentData,
          ...result.data.students
        ])
        setPostVariable((prePostVariable: postVariableType) => ({
          ...prePostVariable,
          page: result.data.meta.page,
          cursor: result.data.students[cursorIndex].id,
          hasNextPage: result.data.meta.hasNextPage
        }))
      })
      .finally(() => {
        setLoading(false)
      })
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

  let [studentData, setStudentData] = useState<studentType[]>([])
  let [postVariable, setPostVariable] = useState<postVariableType>({
    page: '',
    cursor: '',
    hasNextPage: true
  })
  let [infiniteScrollCount, setInfiniteScrollCount] = useState(0)
  let [loading, setLoading] = useState(false)

  let [searchInput, setSearchInput] = useState<any>('')

  useEffect(() => {
    fetchApi('/students?searchBy=none', 'GET').then(result => {
      let cursorIndex = result.data.students.length - 1
      console.log(cursorIndex)
      setStudentData((preStudentData: studentType[]) => [
        ...preStudentData,
        ...result.data.students
      ])
      setPostVariable((prePostVariable: postVariableType) => ({
        ...prePostVariable,
        page: result.data.meta.page,
        cursor: result.data.students[cursorIndex].id,
        hasNextPage: result.data.meta.hasNextPage
      }))
    })
  }, [])

  useEffect(() => {
    if (infiniteScrollCount > 0 && postVariable.hasNextPage && !loading) {
      setLoading(true)
      setTimeout(() => {
        getMoreData()
      }, 500)
    }
  }, [infiniteScrollCount])

  function onChangeInput(event: any) {
    setSearchInput(event.target.value)
  }

  async function searchClick() {
    console.log(searchInput)
    if (isNaN(searchInput)) {
      let res = await fetchApi(
        `/students?searchBy=name&name=${searchInput}`,
        'GET'
      )

      setStudentData(res.data.students)
      setPostVariable({
        ...postVariable,
        hasNextPage: res.data.meta.hasNextPage
      })
      /* if (res.data.students.length !== 0) {
        setStudentData(res.data.students)
        setPostVariable({
          ...postVariable,
          hasNextPage: res.data.meta.hasNextPage
        })
      } else {
        setStudentData(res.data.students)
        setPostVariable({
          ...postVariable,
          hasNextPage: res.data.meta.hasNextPage
        })
      } */
    } else {
      let res = await fetchApi(
        `/students?searchBy=phone&phone=${searchInput}`,
        'GET'
      )
      setStudentData(res.data.students)
      setPostVariable({
        ...postVariable,
        hasNextPage: res.data.meta.hasNextPage
      })
      /* if (res.data.students.length !== 0) {
        setStudentData(res.data.students)
        setPostVariable({
          ...postVariable,
          hasNextPage: res.data.meta.hasNextPage
        })
      } else {
        setStudentData(res.data.students)
        setPostVariable({
          ...postVariable,
          hasNextPage: res.data.meta.hasNextPage
        })
      } */
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
    fetchApi('/students?searchBy=none', 'GET').then(result => {
      let cursorIndex = result.data.students.length - 1
      console.log(cursorIndex)
      setStudentData((preStudentData: studentType[]) => [
        ...preStudentData,
        ...result.data.students
      ])
      setPostVariable((prePostVariable: postVariableType) => ({
        ...prePostVariable,
        page: result.data.meta.page,
        cursor: result.data.students[cursorIndex].id,
        hasNextPage: result.data.meta.hasNextPage
      }))
    })
  }

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            수강생 관리
          </div>
        </div>

        <Link href={'/student/register'}>
          <div className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 bg-primary-600  cursor-pointer">
            <Image src={plusCircle} width={20} height={20} alt=" " />
            <div className="h-[21px] w-16 text-white text-[11.5px] font-semibold font-['Pretendard'] leading-[21px]">
              수강생 등록
            </div>
          </div>
        </Link>
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
          {searchInput !== '' && studentData.length == 0 ? (
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
                className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)]"
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
      <div id="test"></div>
    </div>
  )
}
