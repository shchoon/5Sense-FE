import TrashIcon from 'public/assets/icons/trash.svg'
import PencilIcon from 'public/assets/icons/pencil.svg'

export default function StudentsClasssReservationCheck() {
  return (
    <div className="relative w-full flex flex-col px-4 py-3.5 border border-1 border-gray-200 rounded-lg bg-gray-50">
      {/* <button className="absolute top-[15px] right-4 w-[105px] h-[37px] px-3 py-2 flex items-center gap-2 border border-1 border-gray-200 rounded-lg bg-white">
        <TrashIcon className="text-primary-600" />
        <div className="gray-800-semibold text-sm">삭제하기</div>
      </button> */}
      <div className="absolute right-4 flex gap-3.5">
        <button className="flex gap-1.5">
          <TrashIcon className="text-gray-400" width={16} height={16} />
          <div className="gray-500-medium text-[13px]">삭제하기</div>
        </button>
        <button className="flex gap-1.5">
          <PencilIcon width={16} height={16} />
          <div className="gray-500-medium text-[13px]">수정하기</div>
        </button>
      </div>
      <div className="w=full text-primary-600 text-xs font-bold">기간반</div>
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full gray-900-semibold text-[15px]">요가 아침 클래스이름 클래스이름</div>
        <div className="w-full flex flex-col gap-1/2">
          <div className="w-full flex gap-2">
            <div className="w-[70px] gray-500-medium text-sm">• 기간</div>
            <div className="w-full gray-800-normal text-sm">
              {/* {`${startDate.getFullYear()}.${
                          startDate.getMonth() + 1
                        }.${startDate.getDate()} - ${endDate.getFullYear()}.${
                          endDate.getMonth() + 1
                        }.${endDate.getDate()}`} */}
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-[70px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-800-normal text-sm">
              {/* {data.schedules.startTime} - {data.schedules.endTime} */}
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
            <div className="w-full gray-800-normal text-sm">{/* {data.schedules.repeatDate} */} 반복</div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-[70px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-800-normal text-sm">A 룸</div>
          </div>
        </div>
      </div>
    </div>
  )
}
