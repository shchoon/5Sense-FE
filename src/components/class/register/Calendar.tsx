import SelectForm from '@/components/SelectForm'
import { useSelect } from '@/hooks/useSelect'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import ko from 'date-fns/locale/ko'
import React from 'react'
import { constSelector } from 'recoil'

export default function Calendar({ className, children }: any) {
  const [startH, handleStartH, activeSH, handleActiveSH] = useSelect('시')
  const [startM, handleStartM, activeSM, handleActiveSM] = useSelect('분')
  const [endH, handleEndH, activeEH, handleActiveEH] = useSelect('시')
  const [endM, handleEndM, activeEM, handelActiveEM] = useSelect('분')
  const hourArray = Array.from({ length: 23 }, (_, index) => index + 1)
  const minArray = Array.from({ length: 12 }, (_, index) => index * 5)
  const [selectWeek, setSelectWeek] = useState<any>([])
  const [activeWeek, setActiveWeek] = useState(false)
  const week = ['월', '화', '수', '목', '금', '토', '일']

  const sortDow = (weekDay: any[]) => {
    const weekDaySorter: any = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 }
    weekDay.sort(function sortByWeekDay(a: number, b: number): number {
      return weekDaySorter[a] - weekDaySorter[b]
    })
    return weekDay
  }

  const handlerAddWeek = (li: string) => {
    if (selectWeek.includes(li)) {
      setSelectWeek(sortDow(selectWeek.filter((item: any) => item !== li)))
    } else {
      setSelectWeek(sortDow([...selectWeek, li]))
    }
  }

  // const daysOfWeek: string[] = ['일', '월', '화', '수', '목', '금', '토']

  // interface Range {
  //   start: Date | null
  //   end: Date | null
  // }
  // const [selectedRange, setSelectedRange] = useState<Range>({
  //   start: null,
  //   end: null
  // })
  // const [num, setNum] = useState(1)

  // const handleDateClick = (day: Date): void => {
  //   if (num % 2 === 1) {
  //     setSelectedRange({ start: day, end: null })
  //   } else {
  //     setSelectedRange({ start: selectedRange.start, end: day })
  //   }
  //   setNum(num + 1)
  // }
  // function SimpleCalendar() {
  //   const [currentDate, setCurrentDate] = useState<Date>(new Date())

  //   const getDaysInMonth = (date: Date): Date[] => {
  //     const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  //     const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  //     const daysInMonth: Date[] = []

  //     let currentDay = new Date(firstDay)

  //     while (currentDay <= lastDay) {
  //       daysInMonth.push(new Date(currentDay))
  //       currentDay.setDate(currentDay.getDate() + 1)
  //     }

  //     return daysInMonth
  //   }

  //   const renderCalendar = (): React.ReactNode[] => {
  //     const daysInMonth = getDaysInMonth(currentDate)
  //     const firstDayOfWeek = daysInMonth[0].getDay()

  //     const calendar: React.ReactNode[] = []

  //     // Add empty cells for the days before the first day of the month
  //     for (let i = 0; i < firstDayOfWeek; i++) {
  //       calendar.push(<div key={`empty-${i}`} className="empty-cell"></div>)
  //     }

  //     // Add cells for each day in the month
  //     daysInMonth.forEach(day => {
  //       const isSelected =
  //         day >= (selectedRange.start as Date) &&
  //         day <= (selectedRange.end as Date)

  //       calendar.push(
  //         <div onClick={() => handleDateClick(day)} key={day.toISOString()}>
  //           {day.getDate()}
  //         </div>
  //       )
  //     })

  //     return calendar
  //   }

  //   return (
  //     <div className="simple-calendar">
  //       <div className="header">
  //         <button
  //           onClick={() =>
  //             setCurrentDate(
  //               new Date(
  //                 currentDate.getFullYear(),
  //                 currentDate.getMonth() - 1,
  //                 1
  //               )
  //             )
  //           }
  //         >
  //           이전 달
  //         </button>
  //         <h2>{`${currentDate.getFullYear()}년 ${
  //           currentDate.getMonth() + 1
  //         }월`}</h2>
  //         <button
  //           onClick={() =>
  //             setCurrentDate(
  //               new Date(
  //                 currentDate.getFullYear(),
  //                 currentDate.getMonth() + 1,
  //                 1
  //               )
  //             )
  //           }
  //         >
  //           다음 달
  //         </button>
  //       </div>
  //       <div className="days-of-week">
  //         {daysOfWeek.map((day, index) => (
  //           <div key={index} className="day-of-week">
  //             {day}
  //           </div>
  //         ))}
  //       </div>
  //       <div className="calendar">{renderCalendar()}</div>
  //     </div>
  //   )
  // }

  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className="w-[640px] p-4 bg-white rounded-lg flex flex-col justify-start items-center gap-6 border border-primary-600">
      <div className="w-[592px] flex flex-col gap-4">
        <div className="flex gap-4">
          <DatePicker
            renderCustomHeader={({
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {'<'}
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {'>'}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
          />
        </div>
        <div className="w-[5px] flex flex-row justify-between">
          <button className="w-[279px] h-12 px-5 py-3 rounded-lg border border-gray-200 justify-center items-center">
            취소
          </button>
          <button className="w-[279px] h-12 px-5 py-3 bg-indigo-500 rounded-lg justify-center items-center">
            확인
          </button>
        </div>

        <div className="w-full flex gap-7">
          <div className="w-full h-[83px] flex flex-col justify-start gap-2.5">
            <p className="gray-800-semibold text-sm">시작 시간</p>
            <div className="flex w-full justify-between gap-2">
              <SelectForm
                initialValue={startH}
                handleValue={handleStartH}
                activeOption={activeSH}
                handleOption={handleActiveSH}
                OptionList={hourArray}
              />
              <div className="leading-[52px]">:</div>
              <SelectForm
                initialValue={startM}
                handleValue={handleStartM}
                activeOption={activeSM}
                handleOption={handleActiveSM}
                OptionList={minArray}
              />
            </div>
          </div>
          <div className="w-full h-[83px] flex flex-col justify-start gap-2.5">
            <p className="gray-800-semibold text-sm">마치는 시간</p>
            <div className="flex w-full justify-between gap-2">
              <SelectForm
                initialValue={endH}
                handleValue={handleEndH}
                activeOption={activeEH}
                handleOption={handleActiveEH}
                OptionList={hourArray}
              />
              <div className="leading-[52px]">:</div>
              <SelectForm
                initialValue={endM}
                handleValue={handleEndM}
                activeOption={activeEM}
                handleOption={handelActiveEM}
                OptionList={minArray}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[83px] flex flex-col justify-start gap-2.5">
          <p className="gray-800-semibold text-sm">요일 선택</p>
          <div className="relative w-full flex flex-col flex-grow gap-1 ">
            <button
              className={`flex justify-between items-center w-full h-[52px] px-4 py-3.5 bg-white rounded-lg border ${
                activeWeek ? 'border-primary-600' : 'border-gray-300`'
              }`}
              onClick={() => setActiveWeek(!activeWeek)}
            >
              <span className="h-full gray-500-normal text-sm leading-[17.50px]">
                {selectWeek.length > 0 ? `${selectWeek} 반복` : '요일 선택'}
              </span>
              <span className="w-4 h-4 leading-[17.50px]">
                {activeWeek ? '▲' : '▼'}
              </span>
            </button>

            {activeWeek && (
              <ul className="w-full h-[184px] overflow-auto p-1 bg-white rounded-md shadow border border-primary-600 ">
                {week.map(item => (
                  <li
                    className="flex w-full h-[42px] px-3 py-2.5 rounded-[3px] justify-start items-center gap-2 hover:bg-violet-100 cursor-pointer"
                    key={item}
                  >
                    <input
                      className={`w-3.5 h-3.5 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-offset-0 checked:outline-none checked:bg-primary-500 cursor-pointer`}
                      id={item}
                      type="checkbox"
                      value={item}
                      checked={selectWeek.includes(item)}
                      onClick={() => handlerAddWeek(item)}
                    />
                    <label
                      className={`w-full ${
                        selectWeek.includes(item)
                          ? 'text-gray-900 hover:text-primary-600'
                          : 'text-gray-500'
                      }  bg-inherit cursor-pointer`}
                      htmlFor={item}
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
