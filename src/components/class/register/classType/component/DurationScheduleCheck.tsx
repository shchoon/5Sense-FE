import { useRecoilValue, useSetRecoilState } from 'recoil'

import { durationScheduleState } from '@/lib/state/durationSchedule'

import TrashIcon from 'public/assets/icons/delete.svg'

export default function DurationScheduleCheck() {
  const setDurationScheduleState = useSetRecoilState(durationScheduleState)
  const titleList = ['기간', '시간', '요일', '강의실']

  const durationSchedules = useRecoilValue(durationScheduleState)

  const deleteDurationSchedule = (index: number) => {
    console.log('s')
    setDurationScheduleState(durationSchedules.filter((schedule, i) => index !== i))
  }

  console.log(durationSchedules)

  return (
    <>
      {durationSchedules.length !== 0 && (
        <div className="w-full flex flex-col gap-4">
          {durationSchedules.map((data, i) => {
            const startDate = new Date(data.schedules.startDate)
            const endDate = new Date(data.schedules.endDate)
            return (
              <div
                key={i}
                className="relative w-full flex flex-col px-4 py-3.5 border border-1 border-gray-200 rounded-lg bg-gray-50"
              >
                <button className="absolute top-[15px] right-4 w-[105px] h-[37px] px-3 py-2 flex items-center gap-2 border border-1 border-gray-200 rounded-lg bg-white">
                  <TrashIcon className="text-primary-600" width={16} height={16} />
                  <div className="gray-800-semibold text-sm" onClick={() => deleteDurationSchedule(i)}>
                    삭제하기
                  </div>
                </button>
                <div className="w=full text-primary-600 text-xs font-bold">기간반</div>
                <div className="w-full flex flex-col gap-1.5">
                  <div className="w-full gray-900-semibold text-[15px]">요가 아침 클래스이름 클래스이름</div>
                  <div className="w-full flex flex-col gap-1/2">
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 기간</div>
                      <div className="w-full gray-800-normal text-sm">
                        {`${startDate.getFullYear()}.${
                          startDate.getMonth() + 1
                        }.${startDate.getDate()} - ${endDate.getFullYear()}.${
                          endDate.getMonth() + 1
                        }.${endDate.getDate()}`}
                      </div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 시간</div>
                      <div className="w-full gray-800-normal text-sm">
                        {data.schedules.startTime} - {data.schedules.endTime}
                      </div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
                      <div className="w-full gray-800-normal text-sm">{data.schedules.repeatDate} 반복</div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 강의실</div>
                      <div className="w-full gray-800-normal text-sm">A 룸</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
