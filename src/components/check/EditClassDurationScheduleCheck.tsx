import { useRecoilValue, useSetRecoilState } from 'recoil'

import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'

import PencilIcon from 'public/assets/icons/pencil.svg'
import { modalState } from '@/lib/state/modal'
import { useState } from 'react'
import Modal from '../common/modal'
import AddClassModal from '../modal/AddClassModal'

// interface IProps {
//   edit: boolean
// }

export default function EditDurationScheduleCheck() {
  const setModal = useSetRecoilState(modalState)
  const [scheduleModal, setScheduleModal] = useState(false)
  const setDurationScheduleState = useSetRecoilState(durationClassScheduleState)
  const titleList = ['기간', '시간', '요일', '강의실']

  const durationSchedules = useRecoilValue(durationClassScheduleState)

  console.log('here', durationSchedules)

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
                <button className="absolute top-[15px] right-4 w-[105px] h-[37px] px-3 py-2 flex items-center gap-2 border border-1 border-gray-200 rounded-lg bg-white">
                  <PencilIcon className="text-primary-600" />
                  <div
                    className="gray-800-semibold text-sm"
                    onClick={() => {
                      setModal(true)
                      setScheduleModal(true)
                    }}
                  >
                    수정하기
                  </div>
                </button>
                <div className="w=full text-primary-600 text-xs font-bold">기간반</div>
                <div className="w-full flex flex-col gap-1.5">
                  {/* <div className="w-full gray-900-semibold text-[15px]">요가 아침 클래스이름 클래스이름</div> */}
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
                      <div className="w-full gray-800-normal text-sm">A 룸</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {/* {scheduleModal && (
        <Modal small>
          <AddClassModal
            onClick={() => {
              setModal(false)
              setScheduleModal(false)
            }}
          />
        </Modal>
      )} */}
    </>
  )
}
