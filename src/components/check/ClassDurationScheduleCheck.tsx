import { useRecoilValue, useSetRecoilState } from 'recoil'

import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'

import TrashIcon from '@/icons/icon/trash.svg'
import { useEffect, useState } from 'react'
import instance from '@/lib/api/axios'

export default function DurationScheduleCheck() {
  const setDurationScheduleState = useSetRecoilState(durationClassScheduleState)
  const titleList = ['기간', '시간', '요일', '강의실']
  const [roomName, setRoomName] = useState('')

  const durationSchedules = useRecoilValue(durationClassScheduleState)

  const deleteDurationSchedule = (index: number) => {
    setDurationScheduleState(durationSchedules.filter((schedule, i) => index !== i))
  }

  console.log(durationSchedules)

  useEffect(() => {
    instance('/lesson-rooms/daily', {
      params: {
        date: new Date().toISOString()
      }
    }).then(res => {
      const roomData = res.data.data
      const targetRoom = roomData.filter((room: { id: number }, i: number) => room.id === durationSchedules[0].roomId)
      setRoomName(targetRoom[0].name)
    })
  }, [])

  return (
    <>
      {durationSchedules.length !== 0 && (
        <div className="w-full flex flex-col gap-4">
          {durationSchedules.map((data, i) => {
            const startDate = new Date(data.startDate)
            const endDate = new Date(data.endDate)
            return (
              <div
                key={i}
                className="relative w-full flex flex-col px-4 py-3.5 border border-1 border-gray-200 rounded-lg bg-gray-50"
              >
                <button type="button" className="absolute top-[15px] right-4 flex items-center gap-1.5">
                  <TrashIcon className="text-gray-400" width={16} height={16} />
                  <div className="gray-500-normal text-[13px]" onClick={() => deleteDurationSchedule(i)}>
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
                        {data.startTime} - {data.endTime}
                      </div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
                      <div className="w-full gray-800-normal text-sm">{data.repeatDate} 반복</div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 강의실</div>
                      <div className="w-full gray-800-normal text-sm">{roomName}</div>
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
