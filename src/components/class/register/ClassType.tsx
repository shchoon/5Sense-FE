'use client'

import { useSelect } from '@/hooks/useSelect'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import { getMonth, getYear, getDate } from 'date-fns'

import plus from '@/assets/icons/plus-circle.svg'
import calendaricon from '@/assets/icons/calendar-month.svg'
import Schedule from './Schedule'

import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import Image from 'next/image'

export default function ClassType() {
  const [one, setOne] = useState<string>('')
  const [count, setCount] = useState<string>('')
  const [calendar, setCalendar] = useState<boolean>(false)
  const [components, setComponents] = useState<any>([])
  const createComponent = () => {
    // 현재 컴포넌트 배열을 가져와 새로운 컴포넌트 추가
    const newComponents = [
      ...components,
      <>
        <button
          className="flex justify-start items-center w-[592px] h-[52px] px-4 py-3.5 bg-white rounded-lg border border-gray-300 gap-[2px]"
          onClick={() => setCalendar(!calendar)}
        >
          <Image src={calendaricon} alt="icon" />
          <span className="text-gray-500 text-base font-normal   leading-normal">
            기간 선택
          </span>
        </button>
      </>
    ]
    setComponents(newComponents)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOne(e.target.value)
  }
  const oncountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value)
  }

  const [tab, setTab] = useState<boolean>(true)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const onTabHandler = (date: string) => {
    if (date === '기간반') {
      return setTab(true)
    } else {
      return setTab(false)
    }
  }
  const [money, setMoney] = useState<string>('')

  const addComma = (price: any) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function getKoreanNumber(num: string) {
    let number = parseInt(num)
    const koreanNumber = [
      '',
      '일',
      '이',
      '삼',
      '사',
      '오',
      '육',
      '칠',
      '팔',
      '구'
    ]
    const tenUnit = ['', '십', '백', '천']
    const tenThousandUnit = ['조', '억', '만', '']
    const unit = 10000

    let answer = ''

    while (number > 0) {
      const mod = number % unit
      const modToArray = mod.toString().split('')
      const length = modToArray.length - 1

      const modToKorean = modToArray.reduce((acc, value, index) => {
        const valueToNumber = +value
        if (!valueToNumber) return acc
        // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
        const numberToKorean =
          index < length && valueToNumber === 1
            ? ''
            : koreanNumber[valueToNumber]
        return `${acc}${numberToKorean}${tenUnit[length - index]}`
      }, '')

      answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`
      number = Math.floor(number / unit)
    }

    return answer
  }

  const multiplyAndFormat = (
    strNumber1: string,
    strNumber2: string
  ): string => {
    // 문자열을 숫자로 변환하여 곱셈 수행
    const number1 = parseFloat(strNumber1.replace(/,/g, ''))
    const number2 = parseFloat(strNumber2.replace(/,/g, ''))
    const result = number1 * number2

    if (isNaN(result)) {
      return '0'
    } else {
      const formattedResult = addComma(result)

      return formattedResult
    }
    // 3자리수 마다 콤마를 찍는 함수 호출
  }

  const onChangePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    let str = value.replaceAll(',', '')
    setMoney(str)
  }

  const [isSelectWeek, setIsSelectWeek] = useState(false)

  const hourArray = Array.from({ length: 23 }, (_, index) => index + 1)
  const minArray = Array.from({ length: 12 }, (_, index) => index * 5)
  const [select, setSelect] = useState<any>([])
  const week = ['월', '화', '수', '목', '금', '토', '일']

  const sortDow = (weekDay: any[]) => {
    const weekDaySorter: any = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 }
    weekDay.sort(function sortByWeekDay(a: number, b: number): number {
      return weekDaySorter[a] - weekDaySorter[b]
    })
    return weekDay
  }

  const handleClickWeek = (li: string) => {
    if (select.includes(li)) {
      setSelect(sortDow(select.filter((item: any) => item !== li)))
    } else {
      setSelect(sortDow([...select, li]))
    }
  }

  const handleClickContainer2 = () => {
    setIsSelectWeek(!isSelectWeek)
  }

  const activeButton = (content: string, isActive: boolean) => {
    return (
      <button
        className={`w-[290px] h-10 rounded-md flex justify-center items-center text-base leading-normal ${
          isActive
            ? 'bg-primary-600 text-white font-semibold'
            : 'text-gray-500 font-medium'
        }`}
        onClick={() => onTabHandler(content)}
      >
        {content}
      </button>
    )
  }

  return (
    <div className="class-box">
      <div className="Title gray-900-bold text-xl">클래스 유형</div>
      <div className="flex w-full h-[52px] p-1.5 rounded-md border border-gray-300 ">
        {activeButton('기간반', tab)}
        {activeButton('회차반', !tab)}
      </div>
      {tab ? (
        <div className="flex flex-col gap-10">
          <div className="w-full flex flex-col gap-2">
            <p className="gray-800-semibold">수강료</p>
            <input
              className="w-full h-[60px] py-3 box-border border-b-2 flex-row-reverse items-center justify-end border-gray-700 text-gray-900 text-2xl font-semibold   leading-[34px] focus:outline-none placeholder:m-placeholder"
              onChange={e => onChangePoints(e)}
              value={addComma(money) || ''}
              placeholder="0원"
            />
            <p className=" text-gray-500 text-sm font-normal font-['Inter']">
              {getKoreanNumber(money)}원
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="gray-800-semibold">일정</p>
            <button
              onClick={createComponent}
              className="w-full h-[52px] px-6 py-3.5 btn-line-purple"
            >
              일정 추가
            </button>
            {components}
            {calendar === false ? (
              ''
            ) : (
              <DatePicker
                locale={ko}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline={calendar}
                calendarContainer={Schedule}
                monthsShown={2}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          <p className="gray-800-semibold">수강료</p>
          <div className="relative w-[592px] h-[113px] px-5 py-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-between gap-4">
            <div className="flex">
              <span className=" text-gray-600 text-base font-medium   leading-normal">
                1회 금액
              </span>
              <div className="relative">
                <input
                  className="w-[482px] text-right placeholder:text-gray-400 text-base font-normal  "
                  placeholder="0"
                  value={addComma(one)}
                  onChange={onChangeHandler}
                />
                <span className="text-gray-400 text-base font-normal  ">
                  원
                </span>
              </div>
            </div>
            <div className="Rectangle2385 absolute top-[56px] left-[20px] w-[552px] h-px bg-gray-200" />
            <div className="flex">
              <span className=" text-gray-600 text-base font-medium   leading-normal">
                총 회차
              </span>
              <div className="relative">
                <input
                  className="w-[488px] text-right placeholder:text-gray-400 text-base font-normal  "
                  placeholder="0"
                  value={count}
                  onChange={oncountChangeHandler}
                />
                <span className="text-gray-400 text-base font-normal  ">
                  회
                </span>
              </div>
            </div>
          </div>
          <div className=" w-[592px] h-[91px] p-5 bg-gray-50 rounded-lg flex justify-between">
            <p>총 금액</p>
            <div className="flex flex-col item-end">
              <p className="w-[494px] text-right text-indigo-500 text-[22px] font-bold   leading-[33px]">
                {multiplyAndFormat(count, one)}원
              </p>
              <span className="text-right text-gray-500 text-xs font-medium   leading-[18px]">
                {getKoreanNumber(multiplyAndFormat(count, one))}만원
              </span>
            </div>
          </div>
          <div className="Frame814133 w-[592px] h-[57px] flex flex-col justify-start items-start gap-3 mt-6">
            <p className="gray-800-semibold">상세 내역</p>
            <div className="Frame814143 w-full flex gap-3.5">
              <div className="Rectangle2386 w-[3px] h-[21px] bg-indigo-500 rounded-sm" />
              <div className="Frame814144 w-full flex justify-between">
                <div className="Text text-gray-600 text-sm font-normal   leading-[21px]">
                  1회 금액 * 총 회차
                </div>
                <div className="Text grow shrink basis-0 text-right text-gray-600 text-sm font-normal   leading-[21px]">
                  {addComma(one)}원 * {count}회
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
