interface IProps {
  type: string
  name: string
  info: []
  onDelete?: boolean
  paymentStatus?: boolean
}

export default function ClassCard({ type, name, info }: IProps) {
  return (
    <div className="w-full px-4 py-3.5 bg-gray-50 rounded-lg border border-gray-200 flex-col justify-start">
      <span className={`${true ? 'text-[##7253E7]' : 'text-[#FF5A1F]'} text-xs font-bold`}>{type}</span>
      <span className="gray-900-semibold text-[15px] mb-1.5">{name}</span>
      <div className="w-full flex gap-2">
        <div className="w-[70px] gray-500-medium text-sm">• 기간</div>
        {/* <div className="w-full gray-800-normal text-sm">
                        {`${startDate.getFullYear()}.${
                          startDate.getMonth() + 1
                        }.${startDate.getDate()} - ${endDate.getFullYear()}.${
                          endDate.getMonth() + 1
                        }.${endDate.getDate()}`}
                      </div> */}
      </div>
      <div className="w-full flex gap-2">
        <div className="w-[70px] gray-500-medium text-sm">• 시간</div>
        {/* <div className="w-full gray-800-normal text-sm">
                        {data.startTime} - {data.endTime}
                      </div> */}
      </div>
      <div className="w-full flex gap-2">
        <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
        {/* <div className="w-full gray-800-normal text-sm">{data.repeatDate} 반복</div> */}
      </div>
      <div className="w-full flex gap-2">
        <div className="w-[70px] gray-500-medium text-sm">• 강의실</div>
        <div className="w-full gray-800-normal text-sm">A 룸</div>
      </div>
    </div>
  )
}
