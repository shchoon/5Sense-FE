'use client'
import TextareaForm, {
  TextareaFormProps
} from '@/components/common/TextareaForm'
import { useState } from 'react'

export default function WithDrawal() {
  const [postData, setPostData] = useState('')

  const onChangeHalder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData(e.target.value)
  }

  return (
    <form
      className="w-[640px] px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200"
      onSubmit={e => {
        e.preventDefault()
        console.log(postData)
      }}
    >
      <div className="text-gray-900 text-xl font-bold font-['Pretendard'] leading-tight">
        회원 탈퇴
      </div>
      <div className="w-full p-4 flex flex-col gap-10 rounded-lg bg-primary-50">
        <div className="w-[560px] text-black text-base font-semibold font-['Pretendard'] leading-normal">
          탈퇴유의사항
        </div>
        <div className="w-[560px]">
          <span className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]">
            회원 재가입 제한
            <br />
          </span>
          <span className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]">
            • 회원탈퇴 후 재가입 시 신규회원으로 가입되며, 탈퇴 전의 회원정보,
            주문정보, 마일리지, 쿠폰은 복원되지 않습니다.
            <br />• 사이트 정책에 따라 최대 30일 동안 회원 재가입이
            불가능합니다.
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-[592px] text-gray-800 text-base font-semibold font-['Pretendard'] leading-normal">
            탈퇴 사유 및 개선점(선택)
          </div>
          <input className="w-full p-x-4 py-3.5 h-[52px] border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50" />
        </div>
        <textarea
          placeholder="탈퇴 사유 및 개선점을 적어주세요"
          value={postData}
          onChange={onChangeHalder}
          className="w-full h-[144px] p-x-4 py-3.5 border rounded-lg border-gray-200 focus:ring-0 focus:border-primary-700 focus:bg-gray-50 resize-none overflow-hidden"
        />
      </div>
      <button
        type="submit"
        className="w-full h-[52px] btn-purple focus:ring-1 focus:ring-primary-200"
      >
        수정하기
      </button>
    </form>
  )
}
