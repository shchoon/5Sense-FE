'use client'
import { useState } from 'react'

export default function WriteBox() {
  let [memo, setMemo] = useState<string>('')

  function onChangeMemo(e: any) {
    setMemo(e.target.value)
  }

  function preventInput(e: any) {
    /* if (e.code == 'Backspace') {
      onChangeMemo
    } else {
      e.preventDefault()
    } */
    e.preventDefault()
  }

  console.log(/^[a-zA-Z]+$/.test(memo[98]))

  return (
    <div className="w-full  h-[220px] p-6 rounded-xl border border-gray-200 ">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="text-gray-600 text-base font-semibold leading-normal">
          센터 메모
        </div>
        <textarea
          style={{ resize: 'none' }}
          className={`w-full h-[96px] p-0 border-none focus:ring-0 text-xl focus:font-normal font-bold focus:text-gray-900 text-gray-800 placeholder:text-gray-300 placeholder:text-xl placeholder:font-bold`}
          placeholder="메모를 적어보세요."
          value={memo}
          maxLength={/^[a-zA-Z]+$/.test(memo[98]) == true ? 99 : 99}
          onChange={onChangeMemo}
          onKeyDown={memo.length >= 300 ? preventInput : undefined}
        />
        <div className="flex gap-5 justify-end">
          <div className="h-[41px] flex items-center">{memo.length}/100</div>
          <button className="w-[86px] h-[41px] px-5 py-[10px] rounded-lg bg-primary-600">
            <div className="text-white text-sm font-semibold font-['Pretendard'] leading-[21px]">
              저장
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
