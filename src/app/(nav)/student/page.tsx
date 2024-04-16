'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import NoneResult from '@/components/common/NoneResult'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import DetailStudent from '@/components/modal/DetailStudent'
import instance from '@/lib/api/axios'
import ContentHeader from '@/components/common/contentHeader'
import SearchInput from '@/components/common/SearchInput'
import ListInfo from '@/components/view/ListInfo'
import { PaymentType } from '../pay/page'
import List from '@/components/view/List'

export interface studentType {
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
  const router = useRouter()
  const target = useRef<HTMLDivElement>(null)

  const setModal = useSetRecoilState(modalState)
  const [isClickedStudent, setIsClickedStudent] = useState<boolean>(false)
  const [clickedStudentsId, setClickedStudentsId] = useState<string>('')

  const [studentList, setStudentList] = useState<studentType[]>([])
  const [metaData, setMetaData] = useState<{ page: number; hasNextPage: boolean }>({
    page: 1,
    hasNextPage: false
  })

  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: ''
  })

  const listInfoProps = ['이름', '전화번호', '수강중인 클래스', '특이사항']

  const onClose = () => {
    setModal(false)
    setIsClickedStudent(false)
  }

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: studentType[]; meta: metaType }) => {
    setInputData(prev => ({
      ...prev,
      value: data.value,
      searchBy: data.searchBy
    }))

    setStudentList(data.list)
    setMetaData(prev => ({
      ...prev,
      page: data.meta.page,
      hasNextPage: data.meta.hasNextPage
    }))
  }

  useEffect(() => {
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
        if (inputData.value === '') {
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
          instance(
            `/students?searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&page=${
              metaData.page + 1
            }`
          ).then(res => {
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
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 py-[60px] box-border">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <ContentHeader title="수강생 관리" btnName="수강생 등록" onClick={() => router.push('student/register')} />
      {/* 검색창 */}
      <SearchInput type="students" passInputData={getInputDataFromChild} />
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3">
        {/* 수강생 목록 설명 */}
        <ListInfo type="student" listInfo={listInfoProps} />
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? <NoneResult /> : null}
          {/* 검색 결과 없음 */}
          {studentList?.map(({ id, name, className, phone, particulars }) => {
            const props = { id: id, name: name, className: className, phone: phone, particulars: particulars }
            return (
              <List
                type="student"
                {...props}
                onClick={() => {
                  setModal(true)
                  setIsClickedStudent(true)
                  setClickedStudentsId(id)
                }}
              />
            )
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && <Loading />}
      {isClickedStudent && (
        <Modal>
          <DetailStudent studentsId={clickedStudentsId} onClose={onClose} />
        </Modal>
      )}
    </div>
  )
}
