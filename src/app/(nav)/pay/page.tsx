'use client'
import { useState, useEffect, useRef } from 'react'

import SearchInput from '@/components/common/SearchInput'
import { studentType, metaType } from '../student/page'
import ListInfo from '@/components/view/ListInfo'
import instance from '@/lib/api/axios'

import NoneResult from '@/components/common/NoneResult'
import List from '@/components/view/List'
import Loading from '@/components/common/Loading'
import ChevronDownIcon from 'public/assets/icons/chevron/chevron-down-blue.svg'
import ChevronUpIcon from 'public/assets/icons/chevron/chevron-up-blue.svg'

export default function PayPage() {
  const target = useRef<HTMLDivElement>(null)

  const [studentList, setStudentList] = useState<studentType[]>([])
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const listInfoProps = ['이름', '전화번호', '수강중인 클래스', '결제상태']

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
      <div className="flex w-full justify-between items-center mb-[30px]">
        <div className="black-bold text-3xl">청구/납부</div>
      </div>
      <div className="w-full flex justify-between">
        <button className="w-[100px] h-[37px] flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-600">
          <div className="text-primary-600 text-sm font-semibold">결제상태</div>
          <ChevronDownIcon width={16} height={16} />
        </button>
        <SearchInput type="students" passInputData={getInputDataFromChild} />
      </div>
      <div className="w-full flex flex-col gap-3">
        <ListInfo type="pay" listInfo={listInfoProps} />
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? <NoneResult /> : null}
          {studentList?.map(({ id, name, className, phone }) => {
            const props = { id: id, name: name, className: className, phone: phone }
            return <List type="pay" {...props} />
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && <Loading />}
    </div>
  )
}
