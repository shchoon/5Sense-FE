'use client'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import useInputNum from '@/hooks/useInputNum'
import instance from '@/lib/api/axios'
import StudentAddClassModal from '@/components/modal/StudentAddClassModal'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import StudentsSession from '@/components/studentsDetail/studentsSession'
import StudentsDuration from '@/components/studentsDetail/studentsDuartion'
import { sessionScheduleState } from '@/lib/state/studentSessionSchedule'
import { durationScheduleState } from '@/lib/state/studentDurationSchedule'
import { AddSessionLessonCheck } from '@/components/student/addSessionLessonCheck'

import ArrowBackIcon from 'public/assets/icons/allowBack.svg'
import EllipsisIcon from 'public/assets/icons/ellipsis75.svg'
import PlusIcon from 'public/assets/icons/plus_circle_bg_pri_600.svg'

interface studentInfo {
  name: string
  phone: string
  particulars: string
  durationLessons: any
  sessionLessons: any
}

export interface InputNumProps {
  name: string
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function StudentEdit() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id
  const durationSchedule = useRecoilValue(durationScheduleState)
  const sessionSchedule = useRecoilValue(sessionScheduleState)
  const setDurationSchedule = useSetRecoilState(durationScheduleState)
  const setSessionSchedule = useSetRecoilState(sessionScheduleState)
  const setModal = useSetRecoilState(modalState)
  const modal = useRecoilValue(modalState)

  const [isClickedAddClass, setIsClickedAddClass] = useState<boolean>(false)
  const [studentInfo, setStudentInfo] = useState<studentInfo>({
    name: '',
    phone: '',
    particulars: '',
    durationLessons: [],
    sessionLessons: []
  })
  const [InputValue, handleChange] = useInputNum({
    name: 'phone',
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  })
  /* const studentNameProps: InputFormProps = {
    title: '이름',
    placeholder: '이름을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  } */

  /* const studentMemoProps: TextareaFormProps = {
    title: '특이사항',
    placeholder: '수강생 특이사항을 적어주세요.',
    name: 'particulars',
    maxLength: 300,
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  } */

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength: number = e.target.maxLength
    const title: string = e.target.title
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }
    setStudentInfo(prev => ({
      ...prev,
      [title]: e.target.value
    }))
  }

  const onClose = () => {
    setModal(false)
    setIsClickedAddClass(false)
  }

  const reservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sessionSchedule.length !== 0) {
      if (
        studentInfo.sessionLessons.filter((data: any, i: number) => data.id === sessionSchedule[0].lessonId).length ===
        0
      ) {
        /* 수강생 정보 수정에서 새로운 회차반 클래스 추가하고 일정추가를 하는 경우 */
        instance
          .post('/session-lesson-registrations', {
            studentId: Number(studentId),
            lessonId: sessionSchedule[0].lessonId,
            paymentStatus: sessionSchedule[0].paymentStatus
          })
          .then(res => {
            instance
              .post('/session-lesson-schedules', {
                lessonId: sessionSchedule[0].lessonId,
                studentId: Number(studentId),
                sessionDate: sessionSchedule[0].sessionDate,
                startTime: sessionSchedule[0].startTime,
                endTime: sessionSchedule[0].endTime,
                roomId: sessionSchedule[0].roomId
              })
              .then(res => {
                router.push('/student')
              })
          })
      } else {
        /* 이미 추가된 회차반에 대해 일정 추가를 하는 경우 */
        instance
          .post('/session-lesson-schedules', {
            lessonId: sessionSchedule[0].lessonId,
            studentId: Number(studentId),
            sessionDate: sessionSchedule[0].sessionDate,
            startTime: sessionSchedule[0].startTime,
            endTime: sessionSchedule[0].endTime,
            roomId: sessionSchedule[0].roomId
          })
          .then(res => {
            router.push('/student')
          })
      }
    } else if (durationSchedule.length !== 0) {
      instance
        .post('/duration-lesson-registrations', {
          studentId: Number(studentId),
          lessonId: Number(durationSchedule[0].lessonId),
          paymentStatus: durationSchedule[0].paymentStatus
        })
        .then(res => {
          router.push('/student')
        })
    }
  }

  useEffect(() => {
    instance(`/students/${studentId}`).then(res => {
      const studentData = res.data.data
      console.log(studentData)
      setStudentInfo(prev => ({
        ...prev,
        name: studentData.name,
        phone: studentData.phone,
        particulars: studentData.particulars,
        durationLessons: studentData.durationLessons,
        sessionLessons: studentData.sessionLessons
      }))
    })

    return () => {
      setSessionSchedule([])
    }
  }, [])

  console.log(sessionSchedule)

  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <EllipsisIcon className="absolute left-[48px] top-[61px]" width={28} height={28} />
          <ArrowBackIcon className="absolute left-[55px] top-[68px]" width={14} height={14} />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">수강생 정보수정</div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <form className="flex flex-col gap-5 pb-[60px]" onSubmit={e => reservation(e)}>
          {/* 수강생 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard']">수강생 정보</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">이름</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  title="name"
                  placeholder="이름을 입력해주세요"
                  value={studentInfo.name}
                  maxLength={20}
                  onChange={onInputHandler}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.name.length}/20
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">전화번호</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="number"
                  title="phone"
                  placeholder="전화번호를 입력해주세요 (-제외)"
                  value={studentInfo.phone}
                  onChange={onInputHandler}
                  maxLength={12}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.phone.length}/12
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">특이사항</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  title="particulars"
                  placeholder="수강생 특이사항을 적어주세요"
                  value={studentInfo.particulars}
                  onChange={onInputHandler}
                  maxLength={300}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.particulars.length}/300
                </div>
              </div>
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl">클래스 목록</div>
            <div className="w-full flex flex-col gap-4">
              <button
                type="button"
                className="flex justify-center gap-2 w-full px-6 py-3.5 border rounded-lg border-primary-600"
                onClick={() => {
                  setModal(true)
                  setIsClickedAddClass(true)
                }}
              >
                <PlusIcon width={24} height={24} />
                <div className="text-base font-semibold text-primary-600">클래스 추가</div>
              </button>
              {sessionSchedule.map((data, i) => {
                return (
                  <AddSessionLessonCheck
                    className={data.name}
                    sessionDate={data.sessionDate}
                    startTime={data.startTime}
                    endTime={data.endTime}
                    roomName={data.roomName}
                    restOfSessions={data.restOfSessions}
                    totalSessions={data.totalSessions}
                    onDelete={() => {
                      setSessionSchedule([...sessionSchedule.filter((data, index) => index !== i)])
                    }}
                  />
                )
              })}

              {durationSchedule.map((data, i) => {
                return (
                  <StudentsDuration
                    className={data.name}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    startTime={data.startTime}
                    endTime={data.endTime}
                    room={data.roomName}
                    repeatDate={data.repeatDate}
                    type="check"
                  />
                )
              })}
              {studentInfo.sessionLessons.length !== 0 &&
                studentInfo.sessionLessons.map((data: any, i: number) => {
                  console.log(data)
                  return (
                    <StudentsSession
                      className={data.name}
                      paymentStatus={data.paymentStatus}
                      sessionSchedule={data.schedules}
                      type="check"
                      /* onDelete={() => {
                      setSessionSchedule([...sessionSchedule.filter((data, index) => index !== i)])
                    }} */
                    />
                  )
                })}
            </div>
          </div>
          {/* 등록 버튼 */}
          <button type="submit" className="w-full py-3.5 btn-purple-lg">
            <div className="text-white text-base font-semibold">등록하기</div>
          </button>
        </form>
        {isClickedAddClass && modal && (
          <Modal small>
            <StudentAddClassModal onClose={onClose} />
          </Modal>
        )}
      </div>
    </div>
  )
}
