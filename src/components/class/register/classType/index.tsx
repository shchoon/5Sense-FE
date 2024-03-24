'use client'
import { ChangeEvent, useState } from 'react'
import Duration from './component/Duration'
import Sesstion from './component/Sesstion'

export type scheduleItem = {
  id: number
  content: string
  modal: boolean
}

export default function ClassType() {
  const [number, setNumber] = useState(1)
  const [one, setOne] = useState<string>('')
  const [count, setCount] = useState<string>('')
  const [calendarModal, setCalendarModal] = useState<boolean>(false)
  const [components, setComponents] = useState<any>([]) // 일정이 가지는 변수들 값
  const addSchedule = (schedule: scheduleItem) => {
    // 현재 컴포넌트 배열을 가져와 새로운 컴포넌트 추가
    setNumber(number + 1)
    setComponents([...components, schedule])
  }

  const deleteSchedule = (id: number) => {
    setComponents(components.filter((item: scheduleItem) => item.id !== id))
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOne(e.target.value)
  }
  const oncountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value)
  }

  const [tab, setTab] = useState<boolean>(true)

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
    const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
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
        const numberToKorean = index < length && valueToNumber === 1 ? '' : koreanNumber[valueToNumber]
        return `${acc}${numberToKorean}${tenUnit[length - index]}`
      }, '')

      answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`
      number = Math.floor(number / unit)
    }

    return answer
  }

  const multiplyAndFormat = (strNumber1: string, strNumber2: string): string => {
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

  const activeTab = (content: string, isActive: boolean) => {
    return (
      <button
        className={`w-[290px] h-10 rounded-md flex justify-center items-center text-base leading-normal ${
          isActive ? 'bg-primary-600 text-white font-semibold' : 'text-gray-500 font-medium'
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
        {activeTab('기간반', tab)}
        {activeTab('회차반', !tab)}
      </div>
      {tab ? <Duration /> : <Sesstion />}
    </div>
  )
}
