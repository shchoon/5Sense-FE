'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { SetStateAction, useState } from 'react'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import useInputNum from '@/hooks/useInputNum'
import instance from '@/lib/api/axios'

import ImgArrowBack from 'public/assets/icons/allowBack.svg'
import ImgEllipsis from 'public/assets/icons/ellipsis75.svg'
import ImgPlusCircle from 'public/assets/icons/plus_circle_bg_pri_600.svg'

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

  const [studentInfo, setStudentInfo] = useState<studentInfo>({
    name: '',
    phone: '',
    particulars: ''
  })
  const [InputValue, handleChage] = useInputNum({
    name: 'phone',
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  })
  const studentNameProps: InputFormProps = {
    title: '이름',
    placeholder: '이름을 입력해 주세요',
    name: 'name',
    maxLength: 20,
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  }

  const studentMemoProps: TextareaFormProps = {
    title: '특이사항',
    placeholder: '수강생 특이사항을 적어주세요.',
    name: 'particulars',
    maxLength: 300,
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  }

  const studentRigister = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    instance.post('/students', studentInfo).then((res: AxiosResponse) => {
      router.push('/student')
    })
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image className="absolute left-[48px] top-[61px]" src={ImgEllipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ImgArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard']">수강생 등록</div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <form className="flex flex-col gap-5" onSubmit={studentRigister}>
          {/* 수강생 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard']">수강생 정보</div>
            <div className="flex flex-col gap-4 w-full">
              <InputForm {...studentNameProps} />
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
              <TextareaForm {...studentMemoProps} />
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard']">클래스 목록</div>
            <button className="flex justify-center gap-2 w-full px-6 py-3.5 border rounded-lg border-primary-600">
              <Image src={ImgPlusCircle} width={24} height={24} alt="" />
              <div className="text-base font-semibold text-primary-600 font-['Pretendard']">클래스 추가</div>
            </button>
          </div>
          {/* 등록 버튼 */}
          <button type="submit" className="w-full py-3.5 btn-purple">
            <div className="text-white text-base font-semibold font-['Pretendard']">등록하기</div>
          </button>
        </form>
      </div>
    </div>
  )
}
