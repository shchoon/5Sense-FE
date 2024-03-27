'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import ClassFilter from '@/components/class/classFilter'
import ContentHeader from '@/components/common/contentHeader'
import instance from '@/lib/api/axios'
import { filterState } from '@/lib/filter/filterState'
import { filterStateType } from '@/lib/filter/filterState'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import DetailClassModal from '@/components/modal/DetailClassModal'

interface classType {
  category: string
  id: number
  type: string
  name: string
  teacher: string
  createdData: Date
  numberOfStudnets: string
}

export default function ClassPage() {
  const router = useRouter()

  const [classList, setClassList] = useState<classType[]>([])
  const filterValue = useRecoilValue(filterState)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const checkLessonUrl = (data: filterStateType) => {
    let baseUrl = ['lessons/filters?']
    if (data.classType !== '') {
      baseUrl.push(`type=${data.classType}`)
    } else {
      baseUrl.push('type=all')
    }
    if (data.teacherId.length !== 0) {
      baseUrl.push('&teachers=')
      baseUrl.push(data.teacherId.join())
    }
    if (data.subCategoryId !== '') {
      baseUrl.push('&categories=')
      baseUrl.push(data.subCategoryId)
    }
    return baseUrl.join('')
  }

  useEffect(() => {
    instance(checkLessonUrl(filterValue)).then(res => {
      const lessonData = res.data.data.lessons
      setClassList(lessonData)
    })
  }, [filterValue])

  return (
    <div>
      <ContentHeader title="클래스 관리" btnName="클래스 등록" onClick={() => router.push('class/register')} />
      <ClassFilter />
      <div className="container w-full max-w-[1872px] grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-5">
        {classList.length !== 0 &&
          classList.map((data, idx) => (
            <button
              key={idx}
              className="h-56 px-4 py-8 flex flex-col justify-between box-border bg-white rounded-lg shadow border border-gray-200"
              onClick={() => {
                setModal(true)
              }}
            >
              <div
                className={`categor w-fit h-fit px-2.5 py-2 box-border rounded justify-center items-center ${
                  data.type === 'duration' ? 'text-primary-600 bg-primary-100' : 'text-secondary-600 bg-secondary-100'
                } text-xs font-semibold`}
              >
                {data.type === 'duration' ? '(기간)' : '(회차)'} {data.category}
              </div>
              <div className="mt-4 flex-1 gray-900-semibold text-xl">{data.name}</div>
              <div className="flex justify-between items-end">
                <div className="gray-500-medium text-base">담당 강사 : {data.teacher}</div>
                <div className="gray-500-normal text-sm">회원 수 : {data.numberOfStudnets}</div>
              </div>
            </button>
          ))}
      </div>
      {modal && (
        <Modal>
          <DetailClassModal onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  )
}
