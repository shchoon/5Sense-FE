'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import ClassFilter from '@/components/class/classFilter'
import ContentHeader from '@/components/common/contentHeader'
import instance from '@/lib/api/axios'
import { classTypeState } from '@/lib/filter/classTypeState'
import { filterState } from '@/lib/filter/filterState'
import { filterStateType } from '@/lib/filter/filterState'

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
  const filter = useRecoilState(filterState)
  const filterValue = useRecoilValue(filterState)
  const [filterItems, setFilterItems] = useState({
    lessonType: filter,
    teacherId: [],
    mainCategoryId: '',
    subCategoryId: ''
  })

  const checkLessonUrl = (data: filterStateType) => {
    let baseUrl = ['lessons/filters?']
    if (data.classType !== '') {
      baseUrl.push(`type=${data.classType}`)
    } else {
      baseUrl.push('type=all')
    }
    if (data.teachers.length !== 0) {
      baseUrl.push('&teachers=')
      baseUrl.push(data.teachers.join())
    }
    return baseUrl.join('')
  }

  useEffect(() => {
    instance(checkLessonUrl(filterValue)).then(res => {
      const lessonData = res.data.data.lessons
      console.log(res.data.data.lessons)
      setClassList(lessonData)
    })
  }, [filterValue])

  console.log(filter)

  return (
    <div>
      <ContentHeader title="클래스 관리" btnName="클래스 등록" onClick={() => router.push('class/register')} />
      <ClassFilter />
      <div className="container w-full max-w-[1872px] grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-5">
        {classList.length !== 0 &&
          classList.map((data, idx) => (
            <div
              key={idx}
              className="h-56 px-4 py-8 flex flex-col justify-between box-border bg-white rounded-lg shadow border border-gray-200"
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
            </div>
          ))}
      </div>
    </div>
  )
}
