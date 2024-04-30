import TrashIcon from 'public/assets/icons/trash.svg'

import instance from '@/lib/api/axios'
import { useEffect } from 'react'

interface IProps {
  className: string
  sessionDate: string
  startTime: string
  endTime: string
  roomName: string
  restOfSessions?: number
  totalSessions: string
  onDelete: () => void
}

export function AddSessionLessonCheck(props: IProps) {
  useEffect(() => {}, [])

  return (
    <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      <button
        type="button"
        className="absolute top-[15px] right-4 w-[100px] h-[20px] px-3 py-2 flex items-center gap-1.5 "
      >
        <TrashIcon width={16} height={16} />
        <div className="gray-500-normal text-[13px]" /* onClick={props.onDelete} */>삭제하기</div>
      </button>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
          <div className="w-full gray-900-semibold text-[15px]">{props.className}</div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 잔여회차</div>
            <div className="w-full gray-500-medium text-sm">
              {props.restOfSessions ? props.restOfSessions : props.totalSessions}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 일자</div>
            <div className="w-full gray-500-medium text-sm">{props.sessionDate}</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-500-medium text-sm">
              {props.startTime} - {props.endTime}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-500-medium text-sm">{props.roomName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
