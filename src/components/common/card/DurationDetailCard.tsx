import { formatStartTime, calculateEndTime, formatLessonDate } from '@/utils'

interface IProps {
  durationData: {
    name: string
    schedules: {
      startDate: string
      endDate: string
      startTime: string
      endTime: string
      repeatDate: string
    }
  }
}

export default function DurationDetailCard({ durationData }: IProps) {
  return (
    <div className="w-full p-4 flex flex-col gap-0.5 border border-1 border-gray-200 rounded-lg bg-gray-50">
      <div className="w-full flex flex-col gap-px">
        <span className="text-primary-600 text-[12px] font-bold">기간반</span>
        <span className="gray-900-semibold font-[15px] h-[23px]">{durationData.name}</span>
      </div>
      <div className="w-full flex flex-col gap-0.5">
        <div className="w-full h-[21px] flex gap-2">
          <span className="w-[70px] gray-500-medium text-[14px]">• 기간</span>
          <span className="gray-800-normal text-[14px]">
            {formatLessonDate(durationData.schedules.startDate)} - {formatLessonDate(durationData.schedules.endDate)}
          </span>
        </div>
        <div className="w-full h-[21px] flex gap-2">
          <span className="w-[70px] gray-500-medium text-[14px]">• 시간</span>
          <span className="gray-800-normal text-[14px]">
            {formatStartTime(durationData.schedules.startTime)} - {formatStartTime(durationData.schedules.endTime)}
          </span>
        </div>
        <div className="w-full h-[21px] flex gap-2">
          <span className="w-[70px] gray-500-medium text-[14px]">• 요일</span>
          <span className="gray-800-normal text-[14px]">{durationData.schedules.repeatDate} 반복</span>
        </div>
        {/* <div className="w-full h-[21px] flex gap-2">
                <span className="w-[px] gray-500-medium text-[14px]">• 강의실</span>
                <span className="gray-800-normal text-[14px]">10회</span>
              </div> */}
      </div>
    </div>
  )
}
