'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import NotFoundPage from '@/components/common/NotFoundPage'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import DetailStudent from '@/components/modal/DetailStudent'
import instance from '@/lib/api/axios'
import ContentHeader from '@/components/common/ContentHeader'
import SearchInput from '@/components/common/SearchInput'
import ListInfo from '@/components/view/ListInfo'
import { PaymentType } from '../pay/page'
import List from '@/components/view/List'
import { studentForClass } from '@/lib/state/studentForClass'
import StudentsDuration from '@/components/studentsDetail/studentsDuartion'

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
  const setStudentForClass = useSetRecoilState(studentForClass)
  const [isClickedStudent, setIsClickedStudent] = useState<boolean>(false)
  const [clickedStudentsId, setClickedStudentsId] = useState<string>('')

  const [studentList, setStudentList] = useState<
    { id: string; name: string; phone: string; className: string; particulars: string; lessons: any }[]
  >([])
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

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: any; meta: metaType }) => {
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
    instance('/students?searchBy=none&page=1&take=10').then(res => {
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

  console.log(studentList)

  return (
    <div>
      <ContentHeader title="수강생 관리" btnName="수강생 등록" onClick={() => router.push('student/register')} />
      {/* 검색창 */}
      <SearchInput type="students" passInputData={getInputDataFromChild} />
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3">
        {/* 수강생 목록 설명 */}
        <ListInfo type="student" listInfo={listInfoProps} />
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? (
            <div className="w-full mt-[140px]">
              <NotFoundPage title="검색결과가 없습니다." subTitle="다른 검색어를 통해 검색을 이어나가보세요" />
            </div>
          ) : null}
          {/* 검색 결과 없음 */}
          {studentList?.map(({ id, name, lessons, phone, particulars }) => {
            const props = { id: id, name: name, lessons: lessons, phone: phone, particulars: particulars }
            return (
              <List
                key={id}
                type="student"
                {...props}
                onClick={() => {
                  setModal(true)
                  setIsClickedStudent(true)
                  setClickedStudentsId(id)
                  localStorage.setItem('studentId', id)
                  router.push(`/student/edit/${id}`)
                  /* setStudentForClass(prev => ({
                    ...prev,
                    id: id
                  })) */
                }}
              />
            )
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && <Loading />}
      {/* {isClickedStudent && (
        <Modal>
          <DetailStudent studentsId={clickedStudentsId} onClose={onClose} />
        </Modal>
      )} */}
    </div>
  )
}
