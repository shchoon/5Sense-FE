export default function StudentsDuration() {
  return (
    <div className="w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50">
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
          <div className="w-full gray-900-semibold text-[15px]">요가 아침 클래스이름 클래스이름</div>
        </div>
        <div className="w-full flex flex-col gap-1/2 opacity-30">
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 기간</div>
            <div className="w-full gray-800-normal text-sm">2021.07.05 -2021.08.05</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-800-normal text-sm">09:00 - 11:00</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 요일</div>
            <div className="w-full gray-800-normal text-sm">월 수 금 반복</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-800-normal text-sm">A룸</div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-[65px] h-[29px] px-2 py-1 bg-primary-100 rounded text-sm text-center text-primary-600">
          결제완료
        </div>
      </div>
    </div>
  )
}
