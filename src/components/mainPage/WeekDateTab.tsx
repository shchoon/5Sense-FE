import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { useState, useEffect } from 'react'
import DateSlideTab from './DateSlideTab'
import Calendar from '@/components/calendar'

export default function WeekDateTab() {
  const [dayData, setDayData] = useState<any>([])
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })
  //console.log('dateData', dateData)

  let [week, setWeek] = useState<number>(0)
  let [activeDay, setActiveDay] = useState(dateData.date)

  function clickDayTab(e: any) {
    //console.log(e.currentTarget.id)
    setActiveDay(e.currentTarget.id)
  }

  //console.log(currentDate.getDay())
  useEffect(() => {
    function calculateWeekNum() {
      let calculateEarlyMonthVar: number
      if (dateData.month == 1) {
        calculateEarlyMonthVar = 0
      } else {
        calculateEarlyMonthVar = dateData.month - 1
      }
      let calculateEndMonthVar: number = dateData.month

      const lastMonthLastDateData = new Date(
        dateData.year,
        calculateEarlyMonthVar,
        0
      )

      const currentMonthFirstDateDate = new Date(
        dateData.year,
        calculateEarlyMonthVar,
        1
      )
      const currentMonthLastDateData = new Date(
        dateData.year,
        calculateEndMonthVar,
        0
      )

      //console.log('currentMonth', currentMonthFirstDateDate)
      //console.log('nextMonth', currentMonthLastDateData)

      let date = []
      for (var i = 1; i <= currentMonthLastDateData.getDate(); i++) {
        date.push(i)
      }
      const firstWeekLength = 7 - currentMonthFirstDateDate.getDay()

      let weekData = []
      weekData.push(date.slice(0, firstWeekLength))
      for (
        var i = firstWeekLength;
        i < currentMonthLastDateData.getDate();
        i += 7
      ) {
        weekData.push(date.slice(i, i + 7))
      }

      const lastMonthEndDate = lastMonthLastDateData.getDate()
      const diffFirstWeekLength = 7 - weekData[0].length
      const diffLastWeekLength = 7 - weekData[weekData.length - 1].length

      for (
        var i = lastMonthEndDate;
        i > lastMonthEndDate - diffFirstWeekLength;
        i--
      ) {
        weekData[0].unshift(i)
      }

      for (var i = 1; i <= diffLastWeekLength; i++) {
        weekData[weekData.length - 1].push(i)
      }

      return weekData
    }
    let weekData = calculateWeekNum()

    let weekAndDateData: any = []
    const dayName = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일'
    ]
    for (var i = 0; i < weekData.length; i++) {
      let array: { week: string; data: { day: string; date: number }[] } = {
        week: `${i + 1}`,
        data: []
      }
      for (var j = 0; j < weekData[i].length; j++) {
        array.data.push({
          day: dayName[j],
          date: weekData[i][j]
        })
      }
      weekAndDateData.push(array)
    }
    //console.log(weekAndDateData)

    function checkWeekNum(date: number): any {
      for (var i = 0; i < weekData.length; i++) {
        if (weekData[i].includes(date)) {
          return Number(i + 1)
        }
      }
    }

    let week = checkWeekNum(dateData.date)
    /* 현재 연도 == dateData.year && 현재 월 == dateData.month */
    if (
      currentDate.getFullYear() == dateData.year &&
      currentDate.getMonth() + 1 == dateData.month
    ) {
      setWeek(week)
    } else if (
      currentDate.getFullYear() == dateData.year &&
      dateData.month < currentDate.getMonth() + 1
    ) {
      /* dateData.month < 현재 월 */
      setWeek(weekData.length)
    }
    setDayData(weekAndDateData)
    //console.log('newDayData', newDayData)
  }, [dateData.month])

  //console.log(dayData)

  function moveForwardWeek() {
    let standard = dayData.length
    if (week === standard) {
      if (dateData.month == 12) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 1
        })
        setWeek(1)
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1
        })
        setWeek(1)
      }
    } else {
      setWeek(week + 1)
    }
  }

  function moveBackWeek() {
    if (week == 1) {
      if (dateData.month == 1) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 12
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month - 1
        })
      }
      //console.log(dayData)
    } else {
      setWeek(week - 1)
    }
  }

  //console.log(dayData)
  return (
    <>
      <div className="mt-[80px] w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackWeek}
            >
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <button className="w-full px-3 py-2 flex justify-center gap-2 items-center group">
              <Calendar className="fill-[#6B7280] group-hover:fill-primary-600 group-focus:fill-primary-600" />
              <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal group-hover:text-primary-600 group-focus:text-primary-600">
                {dateData.year}년 {dateData.month}월 {week}주차
              </span>
            </button>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardWeek}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
        </div>
      </div>
      {/* 요일 선택 탭 */}
      <div className="w-full flex max-w-[1016px] mx-auto justify-end pt-[32px]">
        <div className="w-[51px] xl:mr-5 lg:mr-4"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dayData[week - 1]?.data.map((data: any, i: number) => {
            return (
              <div
                key={i}
                id={data.date}
                className={`xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col  border rounded-lg ${
                  activeDay == data.date
                    ? 'border-primary-600'
                    : 'border-gray-200'
                } bg-white cursor-pointer`}
                onClick={clickDayTab}
              >
                <div
                  className={`${
                    activeDay == data.date
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  } text-center text-sm font-medium   leading-[21px]`}
                >
                  {data.day}
                </div>
                <div
                  className={`${
                    activeDay == data.date
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  } text-center text-xl font-bold   leading-[30px]`}
                >
                  {data.date}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
