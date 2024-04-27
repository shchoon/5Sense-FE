import TrashIcon from 'public/assets/icons/trash.svg'

interface IProps {
  className: string
  sessionCount: number
  totalSessions: number
  type: string
  onDelete?: () => void
}

export default function StudentsSession({ className, sessionCount, totalSessions, type, onDelete }: IProps) {
  console.log(className, sessionCount, totalSessions)
  return (
    <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      {type === 'check' && (
        <button
          type="button"
          className="absolute top-[15px] right-4 w-[100px] h-[20px] px-3 py-2 flex items-center gap-1.5 "
        >
          <TrashIcon width={16} height={16} />
          <div className="gray-500-normal text-[13px]" onClick={onDelete}>
            삭제하기
          </div>
        </button>
      )}

      <div className="w-full flex flex-col gap-6">
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
      {type === 'detail' && (
        <div className="w-full flex justify-end">
          <div className="w-[65px] h-[29px] px-2 py-1 bg-primary-100 rounded text-sm text-center text-primary-600">
            결제완료
          </div>
        </div>
      )}
    </div>
  )
}
