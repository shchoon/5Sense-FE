import { useState } from 'react'

import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import DurationScheduleCheck from '../../../../check/ClassDurationScheduleCheck'

import { classDataType } from '@/app/(service)/(nav)/class/register/page'
import PlusIcon from '@/icons/icon/plus.svg'
import { Button } from 'flowbite-react'
import { UseFormReturn } from 'react-hook-form'
import { getKoreanNumber } from '@/utils'

export default function Duration({
  register,
  watch,
  formState,
  getValues
}: UseFormReturn<classDataType, any, undefined>) {
  const { errors, defaultValues } = formState
  const setModal = useSetRecoilState(modalState)
  const duarationSchedule = useRecoilValue(durationClassScheduleState)
  const [noticeModal, setNoticeModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  // const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value: string = e.target.value
  //   const removedCommaValue = value.replaceAll(',', '')
  //   if (isNaN(Number(removedCommaValue))) {
  //     return setClassType(prev => ({ ...prev, tuitionFee: '' }))
  //   }

  //   if (removedCommaValue.length > 9) {
  //     setModal(true)
  //     setNoticeModal(true)
  //   }

  //   setClassType(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  // }

  // console.log(duarationSchedule)

  // useEffect(() => {
  //   setIsParams(Boolean(params))
  //   console.log(isParams)
  // }, [params])

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p
          className={`${errors.tuitionFee != null ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
        >
          수강료
        </p>
        <input
          type="number"
          className="w-full h-[60px] border-b-2 border-x-0 border-t-0 flex-col justify-center items-start gray-900-semibold text-2xl placeholder:text-gray-300 focus:shadow-none focus:border-current focus:ring-0 focus:ring-transparent"
          placeholder="0 원"
          {...register('tuitionFee', { required: true })}
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">
          {getKoreanNumber(watch('tuitionFee').toString())}원
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className={`gray-800-semibold`}>일정</p>
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
      )} */}
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
    </div>
  )
}
