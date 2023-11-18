'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export default function ClassType() {
  const [one, setOne] = useState<string>('')
  const [count, setCount] = useState<string>('')

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
  const [calendar, setCalendar] = useState<boolean>(false)

  const onTabHandler = (date: string) => {
    if (date === '기간반') {
      return setTab(true)
    } else {
      return setTab(false)
    }
  }
  const [money, setMoney] = useState<string>('')

  const addComma = (price: string) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return returnString
  }

  const onChangePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    let str = value.replaceAll(',', '')
    setMoney(str)
  }
  const format = (price: string): any => {
    let returnString = parseInt(price) % 1000
    if (isNaN(returnString)) {
      return 0
    } else {
      let result = returnString.toString().split('').reverse().join('')
      return result
    }
  }
  const MyContainer = ({ className, children }: any) => {
    const [isDropdownView, setDropdownView] = useState(false)
    const [isSelectWeek, setIsSelectWeek] = useState(false)
    const [hour, setHour] = useState<number>(0)
    const h = [1, 2, 3, 4]
    const [select, setSelect] = useState<any>([])
    const week = ['월', '화', '수', '목', '금', '토', '일']

    const sortDow = (weekDay: any[]) => {
      const weekDaySorter: any = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 }
      weekDay.sort(function sortByWeekDay(a: number, b: number): number {
        return weekDaySorter[a] - weekDaySorter[b]
      })
      return weekDay
    }

    const handleClickHour = (i: number) => {
      setHour(i)
    }

    const handleClickWeek = (li: string) => {
      if (select.includes(li)) {
        setSelect(sortDow(select.filter((item: any) => item !== li)))
      } else {
        setSelect(sortDow([...select, li]))
      }
    }

    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }

    const handleClickContainer2 = () => {
      setIsSelectWeek(!isSelectWeek)
    }

    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200)
    }

    return (
      <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
        <CalendarContainer className={className}>
          <div style={{ background: '#f0f0f0' }}>
            What is your favorite day?
          </div>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
        <div className="container" onBlur={handleBlurContainer}>
          <label onClick={handleClickContainer}>
            <button>
              {hour > 0 ? hour : '시간 선택'}
              {isDropdownView ? '▲' : '▼'}
            </button>
          </label>
          {isDropdownView && (
            <ul>
              {h.map((li, i) => (
                <li key={i} value={i} onClick={() => handleClickHour(i)}>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="container" onBlur={handleBlurContainer}>
          <label onClick={handleClickContainer2}>
            <button>
              {select.length > 0 ? `${select} 반복 ` : '요일 선택'}
              {isSelectWeek ? '▲' : '▼'}
            </button>
          </label>
          {isSelectWeek && (
            <ul>
              {week.map(li => (
                <div key={li}>
                  <input
                    id={li}
                    type="checkbox"
                    value={li}
                    onClick={() => handleClickWeek(li)}
                  />
                  <label htmlFor={li[0]}>{li}</label>
                </div>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button onClick={() => setCalendar(false)}>취소</button>
          <button onClick={() => setCalendar(false)}>확인</button>
        </div>
      </div>
    )
  }

  const sum = (a: string, b: string) => {
    const result = parseInt(a) * parseInt(b)
    if (isNaN(result)) {
      return 0
    }
    return parseInt(a) * parseInt(b)
  }

  return (
    <div className="Container w-[640px] h-[864px] px-6 py-8 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-10 inline-flex">
      <div className="Title m-title">클래스 유형</div>
      <div className="w-full flex justify-around">
        <button onClick={() => onTabHandler('기간반')}>기간반</button>
        <button onClick={() => onTabHandler('회차반')}>회차반</button>
      </div>
      {tab ? (
        <div>
          <div className="w-full flex flex-col gap-2">
            <p className="s-title">수강료</p>
            <input
              className="w-[592px] h-[60px] py-3 border-b-2 border-gray-700 placeholder:m-placeholder"
              onChange={e => onChangePoints(e)}
              value={addComma(money) || ''}
              placeholder="0원"
            />
            <p className="text-right text-gray-500 text-sm font-normal font-['Inter']">
              {format(money)}만원
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="s-title">일정</p>
            <button className="w-[592px] h-[52px] px-6 py-3.5 bg-white rounded-lg border border-indigo-500">
              일정 추가
            </button>
            <button onClick={() => setCalendar(!calendar)}>기간 선택</button>
            {calendar === false ? (
              ''
            ) : (
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline={calendar}
                calendarContainer={MyContainer}
                monthsShown={2}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col gap-2">
            <p className="s-title">수강료</p>
            <div className="w-[592px] h-[113px] px-5 py-4 bg-white rounded-lg border border-gray-200 flex-col gap-4">
              <div>
                <span>1회 금액</span>
                <input
                  placeholder="0"
                  value={one}
                  onChange={onChangeHandler}
                ></input>
              </div>
              <div>
                <span>총 회차</span>
                <input
                  placeholder="0"
                  value={count}
                  onChange={oncountChangeHandler}
                ></input>
              </div>
            </div>
            <div className="w-[592px] h-[91px] p-5 bg-gray-50 rounded-lg flex justify-between">
              <p>총 금액</p>
              <p>{sum(count, one)}</p>
            </div>
          </div>
          <div className="Frame814133 w-[592px] h-[57px] flex-col justify-start items-start gap-3 inline-flex">
            <div className="Label text-gray-800 text-base font-semibold font-['Pretendard'] leading-normal">
              상세내역
            </div>
            <div className="Frame814143 self-stretch justify-start items-start gap-3.5 inline-flex">
              <div className="Rectangle2386 w-[3px] self-stretch bg-indigo-500 rounded-sm" />
              <div className="Frame814144 grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div className="Frame814141 self-stretch justify-center items-center gap-6 inline-flex">
                  <div className="Text text-gray-600 text-sm font-normal font-['Pretendard'] leading-[21px]">
                    1회 금액 * 총 회차
                  </div>
                  <div className="Text grow shrink basis-0 text-right text-gray-600 text-sm font-normal font-['Pretendard'] leading-[21px]">
                    {one}원 * {count}회
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
