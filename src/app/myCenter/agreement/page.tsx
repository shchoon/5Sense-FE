'use client'

export default function Agreement() {
  return (
    <form
      className="w-full flex flex-col gap-16"
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className="w-full flex flex-col items-center gap-8">
        <div className="gray-900-bold text-xl">약관에 동의해 주세요</div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full h-[60px] pl-6 flex items-center gap-[165px] border border-1 border-primary-200 rounded">
            <input id="all" className="w-4 h-4 cursor-pointer" type="checkbox" />
            <label htmlFor="all" className="w-full text-left gray-600-medium text-base cursor-pointer">
              전체 약관에 모두 동의합니다.
            </label>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex gap-2.5">
              <input type="checkbox" id="firstAgree" className="w-4 h-4 cursor-pointer" />
              <div className="w-full h-4 flex items-center gap-1.5">
                <label htmlFor="firstAgree" className="w-[87px] gray-600-medium text-base cursor-pointer">
                  이용약관 동의
                </label>
                <span className="flex-1 text-left primary-600-medium">(필수)</span>
              </div>
            </div>
            <div className="w-full flex gap-2.5">
              <input type="checkbox" id="firstAgree" className="w-4 h-4 cursor-pointer" />
              <div className="w-full h-4 flex items-center gap-1.5">
                <label htmlFor="firstAgree" className="w-[87px] gray-600-medium text-base cursor-pointer">
                  이용약관 동의
                </label>
                <span className="flex-1 text-left primary-600-medium">(필수)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="w-full h-[52px] btn-purple">
        등록
      </button>
    </form>
  )
}
