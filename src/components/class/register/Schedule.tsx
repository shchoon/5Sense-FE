import SelectForm from '@/components/SelectForm'
import CalendarCss from '@/components/calendarcss'
import { useSelect } from '@/hooks/useSelect'
import { useState } from 'react'
import { CalendarContainer } from 'react-datepicker'

export default function Schedule({ className, children }: any) {
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

  return (
    <div className="w-[600px] p-4 bg-white rounded-lg shadow flex flex-col justify-start items-center gap-6">
      <div className="w-full flex flex-col gap-4">
        <CalendarCss />
        <CalendarContainer>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
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
        {/* <div className="w-full flex flex-row justify-between">
          <button
            className="w-[279px] h-12 px-5 py-3 rounded-lg border border-gray-200 justify-center items-center"
            onClick={() => setCalendar(false)}
          >
            취소
          </button>
          <button
            className="w-[279px] h-12 px-5 py-3 bg-indigo-500 rounded-lg justify-center items-center"
            onClick={() => setCalendar(false)}
          >
            확인
          </button>
        </div> */}
      </div>
    </div>
  )
}
