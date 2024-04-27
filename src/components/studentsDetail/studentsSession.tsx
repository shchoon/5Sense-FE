interface IProps {
  className: string
  sessionCount: number
  totalSessions: number
}

export default function StudentsSession({ className, sessionCount, totalSessions }: IProps) {
  console.log(className, sessionCount, totalSessions)
  return (
    <div className="w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
          <div className="w-full gray-900-semibold text-[15px]">{className}</div>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="w-[80px] gray-500-medium text-sm">• 잔여회차</div>
          <div className="w-full flex items-center gap-px">
            <div className="w-[10px] gray-800-semibold text-sm">{sessionCount}</div>
            <div className="w-full gray-500-medium text-sm">/{totalSessions}</div>
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
