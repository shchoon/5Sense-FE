interface IProps {
  sessionData: { name: string; totalSessions: number; capacity: number }
}

export default function SessionDetailCard({ sessionData }: IProps) {
  return (
    <div className="w-full p-4 flex flex-col gap-0.5 border border-1 border-gray-200 rounded-lg bg-gray-50">
      <div className="w-full flex flex-col gap-px">
        <span className="text-secondary-600 text-[12px] font-bold">회차반</span>
        <span className="gray-900-semibold font-[15px] h-[23px]">{sessionData.name}</span>
      </div>
      <div className="w-full flex flex-col gap-0.5">
        <div className="w-full h-[21px] flex gap-2">
          <span className="w-[97px] gray-500-medium text-[14px]">• 총 세션 횟수</span>
          <span className="gray-800-normal text-[14px]">{sessionData.totalSessions}회</span>
        </div>
        <div className="w-full h-[21px] flex gap-2">
          <span className="w-[97px] gray-500-medium text-[14px]">• 권장 허용 인원</span>
          <span className="gray-800-normal text-[14px]">{sessionData.capacity}명</span>
        </div>
      </div>
    </div>
  )
}
