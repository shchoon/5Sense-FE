import TrashIcon from 'public/assets/icons/trash.svg'

interface IProps {
  className: string
  type: string
  paymentStatus?: string
  sessionSchedule: any
  onDelete?: () => void
}

export default function StudentsSession(props: IProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {props.sessionSchedule.map((data: any, i: number) => {
        return (
          <div
            key={i}
            className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 "
          >
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

            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex items-center flex-col gap-px">
                <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
                <div className="w-full gray-900-semibold text-[15px]">{props.className}</div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 잔여회차</div>
                  <div className="w-full gray-500-medium text-sm">{data.restOfSessions}</div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 일자</div>
                  <div className="w-full gray-500-medium text-sm">{data.sessionDate}</div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
                  <div className="w-full gray-500-medium text-sm">
                    {data.startTime} - {data.endTime}
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
                  <div className="w-full gray-500-medium text-sm">{data.room}</div>
                </div>
              </div>
            </div>

            {props.type === 'detail' && (
              <div className="w-full flex justify-end">
                <div className="w-[65px] h-[29px] px-2 py-1 bg-primary-100 rounded text-sm text-center text-primary-600">
                  {props.paymentStatus === 'Paid' ? '결제완료' : '미결제'}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
