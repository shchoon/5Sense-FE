'use client'
import { useState } from 'react'
import Image from 'next/image'
import chevron_gray from 'public/assets/icons/chevron_down_gray.svg'
import DropDown from '@/components/common/DropDown'
import ReactDropDown from '@/components/common/ReactDropDown'

export default function WithDrawal() {
  const [postData, setPostData] = useState('')

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData(e.target.value)
  }

  const dropDownList = ['기능의 버그가 많아서', '필요한 기능들이 부족해서', '속도가 느려서', '그냥']

  const dropDownProps = {
    title: '선택해주세요.',
    list: dropDownList
  }
  return (
    <form
      className="w-[640px] px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200"
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className="gray-900-bold text-xl font-['Pretendard']">회원 탈퇴</div>
      <div className="w-full p-4 flex flex-col gap-10 rounded-lg bg-primary-50">
        <div className="w-[560px] text-black text-base font-semibold font-['Pretendard']">탈퇴유의사항</div>
        <div className="w-[560px]">
          <span className="gray-500-normal text-sm font-['Pretendard']">
            회원 재가입 제한
            <br />
          </span>
          <span className="gray-500-normal text-sm font-['Pretendard']">
            • 회원탈퇴 후 재가입 시 신규회원으로 가입되며, 탈퇴 전의 회원정보, 주문정보, 마일리지, 쿠폰은 복원되지
            않습니다.
            <br />• 사이트 정책에 따라 최대 30일 동안 회원 재가입이 불가능합니다.
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-[592px] gray-800-semibold text-base font-['Pretendard']">탈퇴 사유 및 개선점(선택)</div>
          {/* <DropDown {...dropDownProps} /> */}
          <ReactDropDown {...dropDownProps} />
        </div>
        <textarea
          placeholder="탈퇴 사유 및 개선점을 적어주세요"
          value={postData}
          onChange={onChangeHandler}
          className="w-full h-[144px] p-x-4 py-3.5 border rounded-lg border-gray-200 focus:ring-0 focus:border-primary-700 focus:bg-gray-50 resize-none overflow-hidden"
        />
      </div>
      <button type="submit" className="w-full h-[52px] btn-purple">
        수정하기
      </button>
    </form>
  )
}
