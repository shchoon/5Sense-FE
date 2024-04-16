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
import ToggleOnIcon from 'public/assets/icons/toggle_on.svg'
import ToggleOffIcon from 'public/assets/icons/toggle_off.svg'

export interface PaymentType {
  id: number
  type: string
  paymentStatus: string
  name: string
  tuitionFee: number
  studentName: string
  studentPhone: string
}

export default function PayPage() {
  const target = useRef<HTMLDivElement>(null)

  const [studentList, setStudentList] = useState<PaymentType[]>([])
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: 'none'
  })
  const [isClickedDropdown, setIsClickedDropdown] = useState<boolean>(false)
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState<string>('All')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const listInfoProps = ['이름', '전화번호', '수강중인 클래스', '결제상태']
  //const [changePaymentStatus, setChangePaymentStatus] = useState<number>(0)

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: PaymentType[]; meta: metaType }) => {
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
    let requestUrl =
      inputData.value === ''
        ? `/lesson-registrations/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
        : `/lesson-registrations/billing-payments?page=1&take=10&searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&PaymentStatus=${currentPaymentStatus}`
    instance(requestUrl).then(res => {
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
  }, [currentPaymentStatus])

  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      const getData = () => {
        if (inputData.value === '') {
          instance(
            `/lesson-registrations/billing-payments?searchBy=none&page=${metaData.page + 1}&PaymentStatus=All`
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
        } else {
          instance(
            `/lesson-registrations/billing-payments?searchBy=${inputData.searchBy}&${inputData.searchBy}=${
              inputData.value
            }&page=${metaData.page + 1}&PaymentStatus=${currentPaymentStatus}`
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

  console.log(inputData)

  return (
    <div className="w-full h-full px-6 md:px-12 lg:px-6 xl:px-12 py-[60px] box-border">
      <div className="flex w-full justify-between items-center mb-[30px]">
        <div className="black-bold text-3xl">청구/납부</div>
      </div>
      <div className="w-full flex justify-between">
        <button
          className="group relative w-[100px] h-[37px] flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-600 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={() => {
            setIsClickedDropdown(prev => !prev)
          }}
        >
          <div className="text-primary-600 group-hover:text-white group-focus:text-white text-sm font-semibold">
            {currentPaymentStatus === 'All' ? '결제상태' : currentPaymentStatus === 'Paid' ? '결제' : '미결제'}
          </div>
          {isClickedDropdown ? (
            <ChevronUpIcon className="absolute top-2 right-3" width={16} height={16} />
          ) : (
            <ChevronDownIcon className="absolute top-2 right-3" width={16} height={16} />
          )}
          {isClickedDropdown && (
            <div className="absolute top-[40px] left-0 w-[120px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white">
              <div id="classTypeFilter" className="w-[130px] h-[54] flex flex-col gap-3 ">
                <p className="flex gap-2 items-center">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    id="paid"
                    value="결제"
                    checked={currentPaymentStatus === 'Paid' && true}
                    onChange={() => {
                      setCurrentPaymentStatus('Paid')
                    }}
                  />
                  <label
                    htmlFor="paid"
                    className="gray-900-semibold text-sm cursor-pointer"
                    onClick={() => {
                      setCurrentPaymentStatus('Paid')
                    }}
                  >
                    결제
                  </label>
                </p>
                <p className="flex gap-2 items-center cursor-pointer">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    id="unpaid"
                    value="미결제"
                    checked={currentPaymentStatus === 'Unpaid' && true}
                    onChange={() => {
                      setCurrentPaymentStatus('Unpaid')
                    }}
                  />
                  <label
                    htmlFor="unpaid"
                    className="gray-900-semibold text-sm cursor-pointer"
                    onClick={() => {
                      setCurrentPaymentStatus('Unpaid')
                    }}
                  >
                    미결제
                  </label>
                </p>
              </div>
            </div>
          )}
        </button>
        <SearchInput type="payment" paymentStatus={currentPaymentStatus} passInputData={getInputDataFromChild} />
      </div>
      <div className="w-full flex flex-col gap-3">
        <ListInfo type="pay" listInfo={listInfoProps} />
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? <NoneResult /> : null}
          {studentList?.map(({ id, studentName, name, studentPhone, type, paymentStatus }, i) => {
            return (
              <button
                key={i}
                className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] hover:outline-primary-600"
                onClick={() => {}}
              >
                <div className="flex lg:gap-6 gap-4 flex-1">
                  <div className="w-[100px] gray-800-semibold text-sm text-left">{studentName}</div>
                  <div className="lg:w-[160px] w-[130px] gray-800-semibold text-sm text-left">
                    {studentPhone.slice(0, 3)}-{studentPhone.slice(3, 7)}-{studentPhone.slice(7, 11)}
                  </div>
                  <div className="flex-grow min-w-[100px] gray-800-semibold text-sm text-left">{name}</div>
                  <div className={`xl:w-[220px] w-40  gray-900-normal text-base text-left`}>
                    <div className="w-full flex items-center xl:gap-2.5 gap-2">
                      <div className="text-gray-700 text-base font-medium">미결제</div>
                      {paymentStatus === 'Paid' ? (
                        <ToggleOnIcon
                          onClick={() => {
                            if (confirm('결제상태를 변경하시겠습니까?')) {
                              instance
                                .patch(`/lesson-registrations/${id}`, {
                                  type: type,
                                  paymentStatus: 'Unpaid'
                                })
                                .then(res => {
                                  instance(
                                    `/lesson-registrations/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
                                  ).then(res => {
                                    const studentsData = res.data.data.students
                                    const meta = res.data.data.meta
                                    setStudentList(studentsData)
                                    setMetaData(prev => ({
                                      ...prev,
                                      page: meta.page,
                                      hasNextPage: meta.hasNextPage
                                    }))
                                  })
                                })
                            } else {
                              return
                            }
                          }}
                        />
                      ) : (
                        <ToggleOffIcon
                          onClick={() => {
                            if (confirm('결제상태를 변경하시겠습니까?')) {
                              instance
                                .patch(`/lesson-registrations/${id}`, {
                                  type: type,
                                  paymentStatus: 'Paid'
                                })
                                .then(res => {
                                  instance(
                                    `/lesson-registrations/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
                                  ).then(res => {
                                    const studentsData = res.data.data.students
                                    const meta = res.data.data.meta
                                    setStudentList(studentsData)
                                    setMetaData(prev => ({
                                      ...prev,
                                      page: meta.page,
                                      hasNextPage: meta.hasNextPage
                                    }))
                                  })
                                })
                            } else {
                              return
                            }
                          }}
                        />
                      )}
                      <div className="text-gray-700 text-base font-medium">결제완료</div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && <Loading />}
    </div>
  )
}
