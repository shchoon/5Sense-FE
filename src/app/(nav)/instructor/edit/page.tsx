'use client'
import Image from 'next/image'
import Ellipsis from '../../../../assets/icon/ellipsis75.svg'
import ArrowBack from '../../../../assets/icon/allowBack.svg'
import PlusCircle from '../../../../assets/icon/plusCirclePrimary600.svg'
import { SetStateAction, useEffect, useState } from 'react'
import InputForm, { InputFormProps } from '@/components/InputForm'
import TextareaForm, { TextareaFormProps } from '@/components/TextareaForm'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useInputNum from '@/hooks/useInputNum'
import { AxiosError, AxiosResponse } from 'axios'
import instance from '@/hooks/useAxios'
import { useRecoilState } from 'recoil'
import { idState, studentmodalState } from '@/state/modal'
import { userInfo } from 'os'

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
  const [modalValue, setModalValue] = useRecoilState(studentmodalState)
  const [idValue, setIdValue] = useRecoilState(idState)

  const editStudentInfo = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    instance
      .put(`/students/${idValue}`, studentInfo)
      .then((res: AxiosResponse) => {
        router.push('/student')
        setModalValue(true)
      })
  }

  console.log(studentInfo)

  const getUserInfo = () => {
    instance.get(`/students/${idValue}`).then(res => {
      console.log(res)
      setStudentInfo({
        name: res.data.data.name,
        phone: res.data.data.phone,
        particulars: res.data.data.particulars
      })
      console.log(studentInfo)
    })
  }
  useEffect(() => {
    setModalValue(false)
    getUserInfo()
  }, [])

  return (
    <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image
            className="absolute left-[48px] top-[61px]"
            src={Ellipsis}
            width={28}
            height={28}
            alt=""
          />
          <Image
            className="absolute left-[55px] top-[68px]"
            src={ArrowBack}
            width={14}
            height={14}
            alt=""
          />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl font-['Pretendard'] leading-[30px]">
          강사 정보수정
        </div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <form className="flex flex-col gap-5" onSubmit={editStudentInfo}>
          {/* 수강생 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
              강사 정보
            </div>
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
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard'] leading-tight">
              클래스 목록
            </div>
          </div>
          {/* 등록 버튼 */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 btn-purple focus:ring-1 focus:ring-primary-200"
          >
            <div className="text-white text-base font-semibold font-['Pretendard'] leading-normal">
              수정하기
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
