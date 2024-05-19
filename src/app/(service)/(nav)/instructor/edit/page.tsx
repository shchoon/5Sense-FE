'use client'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import ArrowBack from 'public/assets/icons/allowBack.svg'
import Ellipsis from 'public/assets/icons/ellipsis75.svg'

import instance from '@/lib/api/axios'
import useInputNum from '@/hooks/useInputNum'
import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import InputForm, { InputFormProps } from '@/components/common/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import { modalState } from '@/lib/state/modal'

type studentInfo = {
  name: string
  phone: string
  particulars: string
}

export interface InputNumProps {
  name: string
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function StudentRegister() {
  const router = useRouter()

  const [teacher, setTeacher] = useState({
    name: '',
    phone: ''
  })

  const [InputValue, handleChage] = useInputNum({
    name: 'phone',
    submitData: teacher,
    setSubmitData: setTeacher
  })
  /* const studentNameProps: InputFormProps = {
    title: '이름',
    placeholder: '이름을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: teacher,
    setSubmitData: setTeacher
  } */

  /* const studentMemoProps: TextareaFormProps = {
    title: '특이사항',
    placeholder: '수강생 특이사항을 적어주세요.',
    name: 'particulars',
    maxLength: 300,
    submitData: teacher,
    setSubmitData: setTeacher
  } */

  const [Modal, setModal] = useRecoilState(modalState)

  /* const handleModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      active: !Modal.active
    }))
  } */

  /* const editInstructorInfo = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    instance
      .put(`/teachers/${Modal.id}`, teacher)
      .then((res: AxiosResponse) => {
        router.push('/instructor')
        handleModal()
      })
  } */

  /* const getInstructorInfo = () => {
    instance.get(`/teachers/${Modal.id}`).then(res => {
      setTeacher({
        ...teacher,
        name: res.data.data.name,
        phone: res.data.data.phone
      })
    })
  } */

  /* useEffect(() => {
    getInstructorInfo()
  }, []) */

  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image className="absolute left-[48px] top-[61px]" src={Ellipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl  leading-[30px]">강사 정보수정</div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <form className="flex flex-col gap-5" /* onSubmit={editInstructorInfo} */>
          {/* 강사 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl  leading-tight">강사 정보</div>
            <div className="flex flex-col gap-4 w-full">
              {/* <InputForm {...studentNameProps} /> */}
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">전화번호</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  placeholder="전화번호를 입력해주세요 (-제외)"
                  value={InputValue}
                  onChange={handleChage}
                  maxLength={12}
                />
              </div>
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl  leading-tight">클래스 목록</div>
          </div>
          {/* 등록 버튼 */}
          <button type="submit" className="w-full py-3.5 px-6 btn-purple focus:ring-1 focus:ring-primary-200">
            <div className="text-white text-base font-semibold  leading-normal">수정하기</div>
          </button>
        </form>
      </div>
    </div>
  )
}