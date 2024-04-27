'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import DropDown from '../common/DropDown'
import RoomReservation from '../room/RoomReservation'
import instance from '@/lib/api/axios'

import CloseIcon from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
}

export interface classType {
  id: number
  name: string
  lessonTime: string
}

export default function StudentAddClassModal({ onClose }: IProps) {
  const params = useParams()
  const studentId = params.id.toString()
  const [classType, setClassType] = useState<string>('duration')
  const [selectedClass, setSelectedClass] = useState<classType>({
    id: 0,
    name: '',
    lessonTime: ''
  })
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [studentName, setStudentName] = useState('조성훈')

  const handleChangeClassData = (data: classType) => {
    setSelectedClass(data)
  }

  console.log(selectedClass)

  const handleClickPayment = () => {
    setIsPaid(prev => !prev)
  }

  const [dropDownProps, setDropDownProps] = useState<{ title: string; list: string[] }>({
    title: '클래스를 선택해주세요',
    list: []
  })

  useEffect(() => {
    if (classType === 'duration') {
      instance(`/duration-lessons`).then(res => {
        console.log(res)
        const lessonData = res.data.data
        setDropDownProps(prev => ({
          ...prev,
          list: lessonData
        }))
      })
    } else if (classType === 'session') {
      instance(`/session-lessons`, {
        params: {
          isCheckRegistrationsCount: true
        }
      }).then(res => {
        console.log(res)
        const lessonData = res.data.data

        setDropDownProps(prev => ({
          ...prev,
          list: lessonData
        }))
      })
    }

    return () => {
      setDropDownProps(prev => ({
        ...prev,
        title: '클래스를 선택해주세요',
        list: []
      }))
    }
  }, [classType])

  console.log(selectedClass, isPaid)

  return (
    <div className="w-[640px] border border-1 border-gray-200 rounded-xl bg-white">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 text-2xl gray-900-bold">클래스 추가</div>
        <CloseIcon className="absolute right-4 top-4 cursor-pointer" width={35} height={35} onClick={() => onClose()} />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-10">
        {/* 회차/기간반 버튼 */}
        <div className="w-full flex items-center h-[52px] p-1.5 border border-1 border-gray-300 rounded-md">
          <button
            className={`w-1/2 h-10 py-2 rounded-md ${
              classType === 'duration' ? 'text-white font-semibold bg-primary-600' : 'text-gray-500'
            } text-base`}
            onClick={() => {
              setClassType('duration')
              setIsPaid(false)
              setSelectedClass({
                id: 0,
                name: '',
                lessonTime: ''
              })
            }}
          >
            기간반
          </button>

          <button
            className={`w-1/2 h-10 py-2 rounded-md ${
              classType === 'session' ? 'text-white font-semibold bg-primary-600' : 'text-gray-500'
            } text-base`}
            onClick={() => {
              setClassType('session')
              setIsPaid(false)
              setSelectedClass({
                id: 0,
                name: '',
                lessonTime: ''
              })
            }}
          >
            회차반
          </button>
        </div>
        {/* 클래스 선택 */}

        {classType === 'duration' && (
          <>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full text-left gray-900-semibold text-base">클래스 선택</div>
              <DropDown {...dropDownProps} handleChangeParentsClassDropdownData={handleChangeClassData} type="class" />
              {selectedClass !== undefined && (
                <div className="w-full h-[69px] flex justify-between items-center px-6 py-[18px] bg-[#F8FAFD]">
                  <div className="w-[100px] h-[21px] flex items-center justify-center gray-900-semibold text-sm">
                    결제 상태
                  </div>
                  <div className="h-5 flex items-center gap-2">
                    <div className="w-[50px] gray-700-medium">미결제</div>
                    <button
                      className={`relative w-10 h-5 flex items-center rounded-full ${
                        isPaid ? 'bg-primary-600' : 'bg-gray-200'
                      } `}
                      onClick={() => handleClickPayment()}
                    >
                      <span
                        className={`absolute ${isPaid ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white`}
                      ></span>
                    </button>
                    <div className="w-[65px] gray-700-medium">결제완료</div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              className={`w-full h-[52px] mt-[300px] rounded-lg ${
                selectedClass !== undefined ? 'bg-primary-600' : 'bg-gray-400'
              } text-white text-base font-semibold flex items-center justify-center btn-purple`}
            >
              추가하기
            </button>
          </>
        )}

        {/* 강의실 예약 */}
        {classType === 'session' && (
          <>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full text-left gray-900-semibold text-base">클래스 선택</div>
              <DropDown {...dropDownProps} handleChangeParentsClassDropdownData={handleChangeClassData} type="class" />
              {selectedClass !== undefined && (
                <div className="w-full h-[69px] flex justify-between items-center px-6 py-[18px] bg-[#F8FAFD]">
                  <div className="w-[100px] h-[21px] flex items-center justify-center gray-900-semibold text-sm">
                    결제 상태
                  </div>
                  <div className="h-5 flex items-center gap-2">
                    <div className="w-[50px] gray-700-medium">미결제</div>
                    <button
                      className={`relative w-10 h-5 flex items-center rounded-full ${
                        isPaid ? 'bg-primary-600' : 'bg-gray-200'
                      } `}
                      onClick={() => handleClickPayment()}
                    >
                      <span
                        className={`absolute ${isPaid ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white`}
                      ></span>
                    </button>
                    <div className="w-[65px] gray-700-medium">결제완료</div>
                  </div>
                </div>
              )}
            </div>
            <RoomReservation
              class={selectedClass}
              studentId={studentId}
              classType="session"
              viewType="modal"
              paymentStatus={isPaid ? 'Paid' : 'Unpaid'}
              onClick={() => console.log('as')}
              lessonTime={selectedClass.lessonTime !== '' ? selectedClass.lessonTime.toString() : ''}
            />
          </>
        )}
      </div>
    </div>
  )
}
