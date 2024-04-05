'use client'
// 모듈
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

//내장
import { getDataType, metaType } from '../student/page'
import { modalState } from '@/lib/state/modal'
import NoneResult from '@/components/common/NoneResult'
import instance from '@/lib/api/axios'
import RegisterModal from '@/components/instructor/RegisterModal'
import Modal from '@/components/common/modal'
import DetailInstructor from '@/components/modal/DetailInstructor'
import SearchInput from '@/components/common/SearchInput'

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
  const target = useRef<HTMLDivElement>(null)

  // 모달 상태관리
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const [isClickedRegister, setIsClickedRegister] = useState<boolean>(false)
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [isClickedInstructor, setIsClickedInstructor] = useState<boolean>(false)

  const [instructorList, setInstructorList] = useState<instructorType[]>([])
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: ''
  })

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: instructorType[]; meta: metaType }) => {
    setInputData(prev => ({
      ...prev,
      value: data.value,
      searchBy: data.searchBy
    }))

    setInstructorList(data.list)
    setMetaData(prev => ({
      ...prev,
      page: data.meta.page,
      hasNextPage: data.meta.hasNextPage
    }))
  }

  /* 첫 로딩 실행 */
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

  /* 강사 등록하면 새로 강사 리스트 가져오기 */
  useEffect(() => {
    if (isRegistered) {
      instance('/teachers?searchBy=none').then(res => {
        const instructorsData = res.data.data.teachers
        const meta = res.data.data.meta
        setInstructorList(instructorsData)
        setMetaData(prev => ({
          ...prev,
          page: meta.page,
          hasNextPage: meta.hasNextPage
        }))
        setIsRegistered(false)
      })
    }
  }, [isRegistered])

  /* 무한스크롤 시행 */
  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      const getData = () => {
        if (inputData.value === '') {
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
          instance(
            `/teachers?searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&page=${
              metaData.page + 1
            }`
          ).then(res => {
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
        <button
          type="button"
          className="flex w-[130px] gap-2 px-5 py-2.5 btn-purple-sm lg:btn-purple-md"
          onClick={() => {
            setIsClickedRegister(true)
            setModal(true)
          }}
        >
          <PlusIcon />
          <span className="text-sm">강사 등록</span>
        </button>
      </div>
      {/* 검색창 */}
      <SearchInput type="teachers" passInputData={getInputDataFromChild} />
      {/* 검색 결과 없음 */}
      {isRefresh && instructorList.length === 0 ? <NoneResult /> : null}
      {/* 수강생 목록 시작 */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorList.length !== 0 &&
          instructorList?.map(({ id, name, phone }) => {
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
                  onClick={() => {
                    setModal(true)
                    setIsClickedInstructor(true)
                  }}
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
      {isClickedRegister && (
        <Modal small>
          <RegisterModal
            onClose={() => setIsClickedRegister(false)}
            onCloseState={() => setModal(false)}
            rigister={() => setIsRegistered(true)}
          />
        </Modal>
      )}
      {isClickedInstructor && (
        <Modal>
          <DetailInstructor onClose={() => setIsClickedInstructor(false)} onCloseState={() => setModal(false)} />
        </Modal>
      )}
    </div>
  )
}
