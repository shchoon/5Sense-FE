'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import ClassFilter from '@/components/class/classFilter'
import instance from '@/lib/api/axios'
import { filterState } from '@/lib/filter/filterState'
import { filterStateType } from '@/lib/filter/filterState'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import DetailClassModal from '@/components/modal/DetailClassModal'

import ContentHeader from '@/components/common/ContentHeader'
import { Drawer } from 'flowbite-react'

interface classType {
  category: string
  id: number
  type: string
  name: string
  teacher: string
  createdData: Date
  numberOfStudents: string
}

export default function ClassPage() {
  const router = useRouter()
  const target = useRef<HTMLDivElement>(null)
  const filterValue = useRecoilValue(filterState)
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => setIsOpen(false)

  const [classList, setClassList] = useState<classType[]>([])
  const [props, setProps] = useState<{ id: number; type: string }>({
    id: 0,
    type: ''
  })
  const [metaData, setMetaData] = useState<{ page: number; hasNextPage: boolean }>({
    page: 1,
    hasNextPage: false
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)

  const checkLessonUrl = (data: filterStateType, page: number) => {
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
    baseUrl.push(`&page=${page}&take=10`)
    return baseUrl.join('')
  }

  useEffect(() => {
    instance(checkLessonUrl(filterValue, 1)).then(res => {
      const lessonData = res.data.data.lessons
      const meta = res.data.data.meta
      setClassList(lessonData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
      setIsRefresh(true)
    })
  }, [filterValue])

  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }

      const getData = () => {
        instance(checkLessonUrl(filterValue, metaData.page + 1)).then(res => {
          const lessonData = res.data.data.lessons
          const meta = res.data.data.meta
          setClassList(prev => [...prev, ...lessonData])
          setMetaData(prev => ({
            ...prev,
            page: meta.page,
            hasNextPage: meta.hasNextPage
          }))
          setIsLoading(false)
        })
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
    <div className="w-full">
      <ContentHeader title="클래스 관리" btnName="클래스 등록" onClick={() => router.push('class/register')} />
      <ClassFilter />
      <div className="container w-full grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-5">
        {classList.length !== 0 &&
          classList.map((data, idx) => (
            <button
              key={idx}
              className="h-56 px-4 py-8 flex flex-col justify-between box-border bg-white rounded-lg shadow border border-gray-200 hover:border-primary-600"
              onClick={() => {
                setProps(prev => ({
                  ...prev,
                  id: data.id,
                  type: data.type
                }))
                setModal(true)
              }}
            >
              <div
                className={`categor w-fit h-fit px-2.5 py-2 box-border rounded justify-center items-center ${
                  data.type === 'duration' ? 'text-primary-600 bg-primary-100' : 'text-secondary-600 bg-secondary-100'
                } text-xs font-semibold`}
              >
                {data.category}
              </div>
              <div className="mt-4 flex-1 gray-900-semibold text-xl">{data.name}</div>
              <div className="w-full flex justify-between">
                <div className="gray-500-medium text-base">담당 강사 : {data.teacher}</div>
                <div className="gray-500-normal text-sm">회원 수 : {data.numberOfStudents}</div>
              </div>
            </button>
          ))}
      </div>
      {/* {!isLoading && <div ref={target}></div>}
      {isLoading && (
        <div className="w-full h-[70px] pt-[50px] flex justify-center items-center">
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
      {/* {modal && (
        <Modal>
          <DetailClassModal {...props} onClose={() => setModal(false)} />
        </Modal>
      )}
      {isRefresh && classList.length === 0 && <NoneResult />} */}
      {/* <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header />
        <Drawer.Items>
          <div className=" bg-red-50">
            <div className="h-[700px]">byebye</div>
            <div className="h-[600px]">byebye</div>
          </div>
        </Drawer.Items>
      </Drawer> */}
    </div>
  )
}
