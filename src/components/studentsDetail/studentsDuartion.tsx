import TrashIcon from 'public/assets/icons/trash.svg'

interface IProps {
  className: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  room: string
  repeatDate: string
  type: string
  onDelete?: () => void
}

export default function StudentsDuration(props: IProps) {
  console.log(props)
  return (
    <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      {props.type === 'check' && (
        <button
          type="button"
          className="absolute top-[15px] right-4 w-[100px] h-[20px] px-3 py-2 flex items-center gap-1.5 "
        >
          <TrashIcon width={16} height={16} />
          <div className="gray-500-normal text-[13px]" onClick={props.onDelete}>
            삭제하기
          </div>
        </button>
      )}
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-primary-600 text-xs font-bold">기간반</div>
          <div className="w-full gray-900-semibold text-[15px]">{props.className}</div>
        </div>
        <div className="w-full flex flex-col gap-1/2">
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 기간</div>
            <div className="w-full gray-800-normal text-sm">
              {props.startDate.slice(0, 10)}-{props.endDate.slice(0, 10)}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-800-normal text-sm">
              {props.startTime.slice(0, 5)} - {props.endTime.slice(0, 5)}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 요일</div>
            <div className="w-full gray-800-normal text-sm">{props.repeatDate} 반복</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-800-normal text-sm">{props.room}</div>
          </div>
        </div>
      </div>
      {props.type === 'detail' && (
        <div className="w-full flex justify-end">
          <div className="w-[65px] h-[29px] px-2 py-1 bg-primary-100 rounded text-sm text-center text-primary-600">
            결제완료
          </div>
        </div>
      )}
    </div>
  )
}
