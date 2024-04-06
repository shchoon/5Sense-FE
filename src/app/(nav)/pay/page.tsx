'use client'
import { useState, useEffect } from 'react'

import SearchInput from '@/components/common/SearchInput'
import { studentType, metaType } from '../student/page'
import ListInfo from '@/components/view/ListInfo'
import instance from '@/lib/api/axios'
import NoneResult from '@/components/common/NoneResult'
import List from '@/components/view/List'

export default function PayPage() {
  const [studentList, setStudentList] = useState<studentType[]>([])
  const [metaData, setMetaData] = useState<metaType[]>([])
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: ''
  })
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

  return (
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 py-[60px] box-border">
      <div className="flex w-full justify-between items-center mb-[30px]">
        <div className="black-bold text-3xl">청구/납부</div>
      </div>
      <div className="w-full flex justify-end">
        <SearchInput type="studnets" passInputData={getInputDataFromChild} />
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
    </div>
  )
}
