'use client'
import { useState } from 'react'

export default function WriteBox() {
  const [memo, setMemo] = useState<string>('')

  const handleChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = e.target.maxLength
    const value = e.target.value
    if (value.length > maxLength) {
      e.target.value = value.slice(0, 300)
    }
    setMemo(e.target.value)
  }

  return (
    <div className="w-full  h-[220px] p-6 rounded-xl border border-gray-200 ">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="text-gray-600 text-base font-semibold">센터 메모</div>
        <textarea
          style={{ resize: 'none' }}
          className={`w-full h-[96px] p-0 border-none focus:outline-none text-xl focus:font-normal font-bold focus:text-gray-900 text-gray-800 placeholder:text-gray-300 placeholder:text-xl placeholder:font-bold`}
          placeholder="메모를 적어보세요."
          value={memo}
          maxLength={300}
          onChange={handleChangeMemo}
        />
        <div className="flex gap-5 justify-end">
          <div className="h-[41px] flex items-center">{memo.length}/300</div>
          <button className="w-[86px] h-[41px] px-5 py-[10px] rounded-lg bg-primary-600">
            <div className="text-white text-sm font-semibold">저장</div>
          </button>
        </div>
      </div>
    </div>
  )
}
