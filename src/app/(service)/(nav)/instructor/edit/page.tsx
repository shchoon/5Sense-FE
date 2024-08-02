'use client'
import { useEffect, useState } from 'react'

import instance from '@/lib/api/axios'
import { useRouter } from 'next/navigation'
import ContentHeader from '@/components/common/ContentHeader'

export default function InstructorRegister() {
  const router = useRouter()
  const instructorId = localStorage.getItem('instructorId') as string

  const [instructorInfo, setInstructorInfo] = useState<{ name: string; phone: string }>({
    name: '',
    phone: ''
  })

  const onChangeInstructorInfo = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setInstructorInfo(prev => ({
      ...prev,
      [type]: e.target.value
    }))
  }

  const onSubmit = () => {
    instance
      .put(`/teachers/${instructorId}`, {
        ...instructorInfo
      })
      .then(res => {
        alert('강사정보 수정이 완료되었습니다.')
      })
  }

  useEffect(() => {
    instance(`/teachers/${instructorId}`).then(res => {
      const data = res.data.data
      setInstructorInfo(prev => ({
        ...prev,
        name: data.name,
        phone: data.phone
      }))
    })
  }, [])

  return (
    <>
      <ContentHeader
        title="강사정보 수정"
        back
        onClick={() => {
          router.push('/instructor')
        }}
      />
      <div className="w-full flex flex-col gap-5 items-center">
        <form
          className="flex flex-col gap-5"
          onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl  leading-tight">강사 정보</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">이름</div>
                <input
                  className={`${
                    instructorInfo.name.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  value={instructorInfo.name}
                  onChange={e => onChangeInstructorInfo('name', e)}
                  maxLength={20}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">전화번호</div>
                <input
                  className={`${
                    instructorInfo.phone.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="number"
                  value={instructorInfo.phone}
                  onChange={e => onChangeInstructorInfo('phone', e)}
                  maxLength={12}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl leading-tight">클래스 목록</div>
            <div className="w-full flex h-[170px] rounded-lg bg-primary-50 items-center justify-center">
              <span className="text-gray-400 text-[16px] font-semibold">
                담당 강사 변경은 해당 클래스 관리페이지에서 가능합니다.
              </span>
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 px-6 btn-purple focus:ring-1 focus:ring-primary-200">
            <div className="text-white text-base font-semibold  leading-normal">수정하기</div>
          </button>
        </form>
      </div>
    </>
  )
}

{
  /* <div className="w-full">
      <div className="relative">
        <Link href={'/student'}>
          <Image className="absolute left-[48px] top-[61px]" src={Ellipsis} width={28} height={28} alt="" />
          <Image className="absolute left-[55px] top-[68px]" src={ArrowBack} width={14} height={14} alt="" />
        </Link>
        <div className="absolute left-[92px] top-[60px] black-bold text-3xl  leading-[30px]">강사 정보수정</div>
      </div>
      <div className="w-full pt-[120px] flex justify-center">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl  leading-tight">강사 정보</div>
            <div className="flex flex-col gap-4 w-full">
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
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl  leading-tight">클래스 목록</div>
          </div>
          <button type="submit" className="w-full py-3.5 px-6 btn-purple focus:ring-1 focus:ring-primary-200">
            <div className="text-white text-base font-semibold  leading-normal">수정하기</div>
          </button>
        </form>
      </div>
    </div> */
}
