import { ChangeEvent, useState } from 'react'

import Modal from '@/components/common/modal'
import AddClassModal from '@/components/modal/AddClassModal'
import { modalState } from '@/lib/state/modal'
import { useSetRecoilState } from 'recoil'

export default function Duration() {
  const setModal = useSetRecoilState(modalState)
  const [noticeModal, setNoticeModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  const [tuitionFee, setTuitionFee] = useState('')

  const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    if (value.length > 11) {
      setModal(true)
      setNoticeModal(true)
    }
    const removedCommaValue = value.replaceAll(',', '')
    setTuitionFee(Number(removedCommaValue.slice(0, 9)).toLocaleString())
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p className="gray-800-semibold">수강료</p>
        <input
          type="text"
          className="w-full h-[60px] py-3 box-border border-b-2 flex-row-reverse items-center justify-end border-gray-700 text-gray-900 text-2xl font-semibold focus:outline-none placeholder:text-gray-300"
          onChange={changeEnteredNum}
          value={tuitionFee}
          placeholder="0 원"
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">원</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="gray-800-semibold">일정</p>
        <button
          className="w-full px-6 py-3.5 btn-line-purple"
          onClick={() => {
            setModal(true)
            setScheduleModal(true)
          }}
        >
          일정 추가
        </button>
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
          <AddClassModal />
        </Modal>
      )}
    </div>
  )
}
