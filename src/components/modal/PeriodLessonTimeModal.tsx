'use client'
import { useState } from 'react'

import DropDown from '../common/DropDown'

interface PeriodLessonTimeDataType {
  openTime: string
  closeTime: string
  date: string
}

interface IProps {
  handleChangeLessonTimeFromChild: (time: string, type: string) => void
}

export default function PeriodLessonTimeModal(props: IProps) {
  const [postData, setPostData] = useState<PeriodLessonTimeDataType>({
    openTime: '',
    closeTime: '',
    date: ''
  })

  const getTimeList = () => {
    const list = []
    for (var i = 16; i <= 44; i++) {
      let standard = i * 30
      let hour: string | number = Math.floor(standard / 60)
      let min: string | number = standard % 60
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (min === 0) {
        min = `0${min}`
      }
      let time = `${hour}:${min}`
      list.push(time)
    }
    return list
  }

  const startTimeDropdownProps = {
    title: '시',
    list: getTimeList()
  }

  const endTimeDropdownProps = {
    title: '시',
    list: getTimeList()
  }

  const dateDropdownProps = {
    title: '요일 선택',
    list: ['월', '화', '수', '목', '금', '토', '일']
  }

  const handleChangeStartTimeFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      openTime: data.time
    }))
  }

  const handleChangeCloseTimeFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      closeTime: data.time
    }))
  }

  const handleChangeLessonTimeFromChild = (data: string) => {
    setPostData(prev => ({
      ...prev,
      date: data
    }))
  }

  const handleClickCheck = () => {
    console.log(postData)
    if (postData.openTime !== '' && postData.closeTime !== '' && postData.date.length !== 0) {
      props.handleChangeLessonTimeFromChild(`${postData.openTime}-${postData.closeTime},${postData.date}`, 'duration')
    }
  }

  return (
    <div className="w-[380px] bg-white p-4 flex flex-col gap-6 rounded-lg border border-1 border-primary-600 shadow">
      <div className="w-full flex flex-col gap-2">
        <div className="gray-800-semibold text-base">수업시간</div>
        <div className="w-full flex gap-2.5">
          <div className="w-[168px] flex items-center gap-1.5">
            <div className="w-[130px]">
              <DropDown
                {...startTimeDropdownProps}
                handleChangeParentsOpenTimeData={handleChangeStartTimeFromChild}
                type="open"
              />
            </div>
            <div className="w-[30px] gray-800-medium text-sm">부터</div>
          </div>
          <div className="w-[168px] flex items-center gap-1.5">
            <div className="w-[130px]">
              <DropDown
                {...endTimeDropdownProps}
                handleChangeParentsCloseTimeData={handleChangeCloseTimeFromChild}
                type="close"
              />
            </div>
            <div className="w-[30px] gray-800-medium text-sm">까지</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="gray-800-semibold text-base">요일 선택</div>
        <DropDown
          {...dateDropdownProps}
          handleChangeParentsDropdownDataCheckbox={handleChangeLessonTimeFromChild}
          type="checkbox"
        />
      </div>
      <div className="w-full flex gap-2.5">
        <button
          type="button"
          className="w-full h-[41px] flex justify-center items-center gray-800-semibold text-sm btn-white"
        >
          취소
        </button>
        <button
          type="button"
          className="w-full h-[41px] flex justify-center items-center gray-800-semibold text-sm text-white btn-purple-sm"
          onClick={() => handleClickCheck()}
        >
          확인
        </button>
      </div>
    </div>
  )
}
