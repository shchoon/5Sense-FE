import { ChangeEvent, useEffect, useState } from 'react'

import Modal from '@/components/common/modal'
import AddClassModal from '@/components/modal/AddClassModal'
import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import DurationScheduleCheck from '../../../../check/ClassDurationScheduleCheck'

import PlusIcon from '@/icons/icon/plus.svg'
import { ITypeProps } from '..'
import { getKoreanNumber } from '@/utils'
import { Button } from 'flowbite-react'

export default function Duration({ classType, setClassType, valid }: ITypeProps) {
  const setModal = useSetRecoilState(modalState)
  const duarationSchedule = useRecoilValue(durationClassScheduleState)
  const [noticeModal, setNoticeModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    const removedCommaValue = value.replaceAll(',', '')
    if (isNaN(Number(removedCommaValue))) {
      return setClassType(prev => ({ ...prev, tuitionFee: '' }))
    }

    if (removedCommaValue.length > 9) {
      setModal(true)
      setNoticeModal(true)
    }

    setClassType(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  }

  console.log(duarationSchedule)

  // useEffect(() => {
  //   setIsParams(Boolean(params))
  //   console.log(isParams)
  // }, [params])

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p className={`${valid?.fee ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>수강료</p>
        <input
          type="text"
          className="w-full h-[60px] py-3 box-border border-b-2 flex-row-reverse items-center justify-end border-gray-700 text-gray-900 text-2xl font-semibold focus:outline-none placeholder:text-gray-300"
          onChange={changeTuitionFee}
          value={classType.tuitionFee}
          placeholder="0 원"
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">{getKoreanNumber(classType.tuitionFee)}원</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className={`${valid?.schedule ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>일정</p>
        <Button color="outline" fullSized>
          <PlusIcon className="mr-2" />
          일정 추가
        </Button>

        <DurationScheduleCheck />
        {/**여기 일정 UI 들어가면 됩니다. */}
      </div>
      {/* {noticeModal && (
        <Modal small>
          <div className="w-[424px] h-[282px] px-6 pt-[82px] pb-6 bg-white rounded-xl border border-gray-900 flex flex-col justify-center items-center">
            <p className="text-gray-900 text-2xl font-bold">
              최대 금액 <span className="text-indigo-500">₩999,999,999</span>
            </p>
            <p className="text-gray-900 text-2xl font-bold mb-[52px]">초과 했습니다.</p>
            <div
              className="w-full btn-purple-lg"
              onClick={() => {
                setModal(false)
                setNoticeModal(false)
              }}
            >
              확인
            </div>
          </div>
        </Modal>
      )}
      {scheduleModal && (
        <Modal small>
          <AddClassModal
            onClick={() => {
              setModal(false)
              setScheduleModal(false)
            }}
          />
        </Modal>
      )} */}
    </div>
  )
}
