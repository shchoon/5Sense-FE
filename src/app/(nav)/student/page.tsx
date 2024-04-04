'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import NoneResult from '@/components/common/NoneResult'
import { useGetData } from '@/hooks/useGetData'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import DetailStudent from '@/components/modal/DetailStudent'
import instance from '@/lib/api/axios'

import PlusIcon from 'public/assets/icons/circle/plus.svg'
import SearchIconWhite from 'public/assets/icons/search_white.svg'
import CloseIcon from 'public/assets/icons/close.svg'
import SearchIconGray from 'public/assets/icons/search.svg'

interface studentType {
  id: string
  name: string
  phone: string
  className: string
  particulars: string
}

export interface metaType {
  page: number
  hasNextPage: boolean
}

export interface getDataType {
  id: string
  name: string
  phone: string
}

export default function StudentPage() {
  const target = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const numberCheckList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const [isClickedStudent, setIsClickedStudent] = useState<boolean>(false)
  const [clickedStudentsId, setClickedStudentsId] = useState<string>('')

  const [studentList, setStudentList] = useState<studentType[]>([])
  const [metaData, setMetaData] = useState<{ page: number; hasNextPage: boolean }>({
    page: 1,
    hasNextPage: false
  })
  const [postVar, setPostVar] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClickSearch = () => {
    let searchBy: string = ''
    if (inputRef.current?.type === 'text') {
      searchBy = 'name'
    } else if (inputRef.current?.type === 'number') {
      searchBy = 'phone'
    }
    instance(`/students?searchBy=${searchBy}&${searchBy}=${inputValue}`).then(res => {
      const studentsData = res.data.data.students
      const meta = res.data.data.meta
      setStudentList(studentsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
    })
  }

  const handleClickInputRefresh = async () => {
    setInputValue('')
    instance('/students?searchBy=none').then(res => {
      const studentsData = res.data.data.students
      const meta = res.data.data.meta
      setStudentList(studentsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
    })
  }

  const checkInputType = () => {
    if (inputValue !== '' && numberCheckList.includes(inputValue[0])) {
      return false
    } else {
      return true
    }
  }

  const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let regex = /^[a-zA-Z]+$/
    const forbiddenKeys = ['-', 'e', 'ArrowUp', 'ArrowDown']
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
      handleClickSearch()
    }
  }

  const preventInputDifferentType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue !== '' && numberCheckList.includes(e.key)) {
      e.preventDefault()
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      handleClickSearch()
    }
  }

  const onClose = () => {
    setModal(false)
    setIsClickedStudent(false)
  }

  useEffect(() => {
    /*  /students?searchBy=none&name=string&phone=string&page=number&take=number&cursor=number */
    instance('/students?searchBy=none').then(res => {
      const studentsData = res.data.data.students
      const meta = res.data.data.meta
      setStudentList(studentsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
      setIsRefresh(true)
    })
  }, [])

  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      const getData = () => {
        if (inputValue === '') {
          instance(`/students?searchBy=none&page=${metaData.page + 1}`).then(res => {
            const studentsData = res.data.data.students
            const meta = res.data.data.meta
            setStudentList(prev => [...prev, ...studentsData])
            setMetaData(prev => ({
              ...prev,
              page: meta.page,
              hasNextPage: meta.hasNextPage
            }))
            setIsLoading(false)
          })
        } else {
          let searchBy: string = ''
          if (inputRef.current?.type === 'text') {
            searchBy = 'name'
          } else if (inputRef.current?.type === 'number') {
            searchBy = 'phone'
          }
          instance(`/students?searchBy=${searchBy}&${searchBy}=${inputValue}&page=${metaData.page + 1}`).then(res => {
            const studentsData = res.data.data.students
            const meta = res.data.data.meta
            setStudentList(prev => [...prev, ...studentsData])
            setMetaData(prev => ({
              ...prev,
              page: meta.page,
              hasNextPage: meta.hasNextPage
            }))
            setIsLoading(false)
          })
        }
      }

      const callback = (entry: any) => {
        if (entry[0].isIntersecting) {
          setIsLoading(true)
          setTimeout(() => {
            getData()
          }, 500)
        }
      }
      const observer = new IntersectionObserver(callback, options)
      if (target.current) {
        observer.observe(target.current)
      }

      return () => {
        if (observer && target.current) {
          observer.unobserve(target.current)
        }
      }
    }
  }, [metaData])

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px] black-bold text-3xl">수강생 관리</div>
        <Link href={'student/register'} className="flex w-[150px] gap-2 px-5 py-2.5 btn-purple-sm lg:btn-purple-md">
          <PlusIcon />
          <span className="text-sm">수강생 등록</span>
        </Link>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="relative lg:w-[325px] lg:gap-2.5 w-[280px] flex items-center gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <SearchIconGray width={16} height={16} alt=" " />
          <input
            ref={inputRef}
            className="xl:w-[245px] w-[222px] focus:outline-none"
            placeholder="Search"
            //name={checkInputType() ? 'name' : 'phone'}
            type={checkInputType() ? 'text' : 'number'}
            value={inputValue}
            onChange={handleChangeInput}
            onKeyDown={checkInputType() ? preventInputDifferentType : allowOnlyNum}
          />
          <CloseIcon
            className="absolute right-4 cursor-pointer"
            width={12}
            height={12}
            onClick={() => handleClickInputRefresh()}
          />
        </div>
        <div
          className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
          onClick={() => {
            handleClickSearch()
          }}
        >
          <SearchIconWhite width={20} height={20} alt="" />
        </div>
      </div>
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3">
        {/* 수강생 목록 설명 */}
        <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex lg:gap-6 gap-4 rounded bg-[#F0EFFF]">
          <div className="w-[100px] indigo-500-semibold text-sm font-['Pretendard']">이름</div>
          <div className="lg:w-[160px] w-[130px] indigo-500-semibold text-sm font-['Pretendard']">전화번호</div>
          <div className="xl:flex-1 lg:w-[100px] flex-1 indigo-500-semibold text-sm font-['Pretendard']">클래스명</div>
          <div className="xl:w-[400px] lg:flex-1 w-[200px] indigo-500-semibold text-sm font-['Pretendard']">
            특이사항
          </div>
        </div>
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? <NoneResult /> : null}
          {/* 검색 결과 없음 */}
          {studentList?.map(({ id, name, className, phone, particulars }) => {
            return (
              <button
                key={id}
                className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] hover:outline-primary-600"
                onClick={() => {
                  setModal(true)
                  setIsClickedStudent(true)
                  setClickedStudentsId(id)
                }}
              >
                <div className="flex lg:gap-6 gap-4 flex-1">
                  <div className="w-[100px] gray-800-semibold text-sm font-['Pretendard'] text-left">{name}</div>
                  <div className="lg:w-[160px] w-[130px] gray-800-semibold text-sm font-['Pretendard'] text-left">
                    {phone.slice(0, 3)}-{phone.slice(3, 7)}-{phone.slice(7, 11)}
                  </div>
                  <div className="xl:flex-1 lg:w-[100px] flex-1 gray-800-semibold text-sm font-['Pretendard'] text-left">
                    {className}
                  </div>
                  <div className="xl:w-[400px] lg:flex-1 w-[200px] gray-900-normal text-base font-['Pretendard'] text-left">
                    {particulars}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && (
        <div className="w-full h-14 flex justify-center items-center pt-[50px]">
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
      {isClickedStudent && (
        <Modal>
          <DetailStudent studentsId={clickedStudentsId} onClose={onClose} />
        </Modal>
      )}
    </div>
  )
}
