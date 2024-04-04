'use client'
// 모듈
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

//내장
import { getDataType, metaType } from '../student/page'
import { useGetData } from '@/hooks/useGetData'
import { modalState } from '@/lib/state/modal'
import NoneResult from '@/components/common/NoneResult'
import instance from '@/lib/api/axios'

//이미지
import ChevronRightIcon from 'public/assets/icons/chevron/chevron_right_pri_600.svg'
import PlusIcon from 'public/assets/icons/circle/plus.svg'
import SearchIconWhite from 'public/assets/icons/search_white.svg'
import CloseIcon from 'public/assets/icons/close.svg'
import SearchIconGray from 'public/assets/icons/search.svg'

interface instructorType {
  id: string
  name: string
  phone: string
}

export default function InstructorPage() {
  const inputRef = useRef<HTMLInputElement>(null)

  // 모달 상태관리
  const modal = useRecoilValue(modalState)
  const [isClickedRegister, setIsClickedRegister] = useState<boolean>(false)
  const [isClickedInstructor, setIsClickedInstructor] = useState<boolean>(false)
  /* 모달 기능 구현하기 */

  const target = useRef<HTMLDivElement>(null)
  const numberCheckList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [instructorList, setInstructorList] = useState<instructorType[]>([])
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState<any>('')
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

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
    instance(`/teachers?searchBy=${searchBy}&${searchBy}=${inputValue}`).then(res => {
      const instructorsData = res.data.data.teachers
      const meta = res.data.data.meta
      setInstructorList(instructorsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
    })
  }

  const handleClickInputRefresh = async () => {
    setInputValue('')
    instance('/teachers?searchBy=none').then(res => {
      const studentsData = res.data.data.teachers
      const meta = res.data.data.meta
      setInstructorList(studentsData)
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

  useEffect(() => {
    instance('/teachers?searchBy=none').then(res => {
      const instructorsData = res.data.data.teachers
      const meta = res.data.data.meta
      setInstructorList(instructorsData)
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
          instance(`/teachers?searchBy=none&page=${metaData.page + 1}`).then(res => {
            const instructorsData = res.data.data.teachers
            const meta = res.data.data.meta
            setInstructorList(prev => [...prev, ...instructorsData])
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
          instance(`/teachers?searchBy=${searchBy}&${searchBy}=${inputValue}&page=${metaData.page + 1}`).then(res => {
            const instructorsData = res.data.data.teachers
            const meta = res.data.data.meta
            setInstructorList(prev => [...prev, ...instructorsData])
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
        <div className=" h-[30px] black-bold text-3xl">강사 관리</div>
        <button className="flex w-[130px] gap-2 px-5 py-2.5 btn-purple-sm lg:btn-purple-md">
          <PlusIcon />
          <span className="text-sm">강사 등록</span>
        </button>
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
      {/* 검색 결과 없음 */}
      {isRefresh && instructorList.length === 0 ? <NoneResult /> : null}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorList?.map(({ id, name, phone }) => {
          return (
            <div
              key={id}
              className="w-full h-[240px] flex flex-col justify-between px-6 pt-8 pb-6 border border-gray-200 rounded-3xl shadow-[0px_5px_15px_0px_rgba(0, 0, 0, 0.02)]"
            >
              <div className="w-full flex flex-col gap-2">
                <div className="w-[307px] gray-900-semibold text-2xl font-['Pretendard']">{name}</div>
                <div className="w-[307px] text-gray-500 text-base font-medium font-['Pretendard']">
                  {phone.slice(0, 3)}-{phone.slice(3, 7)}-{phone.slice(7, 11)}
                </div>
              </div>
              <button
                type="button"
                className="w-full px-5 py-2.5 flex gap-2 justify-center border border-primary-600 rounded-lg"
              >
                <div className="indigo-500-semibold text-sm font-['Pretendard']">강사 정보</div>
                <ChevronRightIcon className="text-primary-600" width={20} height={20} />
              </button>
            </div>
          )
        })}
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
      {/* {isClickedStudent && (
        <Modal>
          <DetailStudent studentsId={clickedStudentsId} onClose={onClose} />
        </Modal>
      )} */}
    </div>
  )
}
