import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { IDuration } from '@/app/(nav)/class/register/page'
import Modal from '@/components/common/modal'
import AddClassModal from '@/components/modal/AddClassModal'
import { modalState } from '@/lib/state/modal'
import { useSetRecoilState } from 'recoil'

import PlusIcon from 'public/assets/icons/circle/plus.svg'

interface IProps {
  duration: IDuration
  setDuration: Dispatch<SetStateAction<IDuration>>
}

export default function Duration({ duration, setDuration }: IProps) {
  const setModal = useSetRecoilState(modalState)
  const [noticeModal, setNoticeModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  const changeKoreanNumber = (value: string) => {
    const unit1 = ['', '십', '백', '천']
    const unit2 = ['', '만', '억', '조', '경']
    const digits = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']

    const numStr = value.replaceAll(',', '')
    let result = ''

    for (let i = numStr.length - 1, j = 0; i >= 0; i--, j++) {
      const num = Number(numStr[i])
      if (num !== 0) {
        result = digits[num] + unit1[j % 4] + result
      }
      if (j % 4 === 0 && j !== 0) {
        result = unit2[j / 4] + result
      }
    }

    return result
  }

  const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    const removedCommaValue = value.replaceAll(',', '')
    if (isNaN(Number(removedCommaValue))) {
      return setDuration(prev => ({ ...prev, tuitionFee: '' }))
    }

    if (removedCommaValue.length > 9) {
      setModal(true)
      setNoticeModal(true)
    }

    setDuration(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p className="gray-800-semibold">수강료</p>
        <input
          type="text"
          className="w-full h-[60px] py-3 box-border border-b-2 flex-row-reverse items-center justify-end border-gray-700 text-gray-900 text-2xl font-semibold focus:outline-none placeholder:text-gray-300"
          onChange={changeTuitionFee}
          value={duration.tuitionFee}
          placeholder="0 원"
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">{changeKoreanNumber(duration.tuitionFee)}원</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="gray-800-semibold">일정</p>
        <button
          className="w-full px-6 py-3.5 btn-line-purple flex items-center justify-center gap-2"
          onClick={() => {
            setModal(true)
            setScheduleModal(true)
          }}
        >
          <PlusIcon width={24} height={24} />
          일정 추가
        </button>
        {/**여기 일정 UI 들어가면 됩니다. */}
      </div>
      {noticeModal && (
        <Modal small>
          <div className="w-[424px] h-[282px] px-6 pt-[82px] pb-6 bg-white rounded-xl border border-gray-900 flex flex-col justify-center items-center">
            <p className="text-gray-900 text-2xl font-bold">
              최대 금액 <span className="text-indigo-500">₩999,999,999</span>
            </p>
            <p className="text-gray-900 text-2xl font-bold mb-[52px]">초과 했습니다.</p>
            <div
              className="w-full btn-purpl-lg"
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
      )}
    </div>
  )
}
