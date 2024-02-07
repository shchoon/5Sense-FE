import axios from 'axios'

export default function useGetHolidayData(year: number) {
  /* const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY
  var queryParams = '?' + 'serviceKey' + '=' + `${serviceKey}`
  queryParams += '&' + 'numOfRows' + '=' + '20'
  queryParams += '&' + 'solYear' + '=' + `2021`
  queryParams += '&' + '_type' + '=' + 'json'

  axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo${queryParams}`
    )
    .then(res => {
      const data = res.data.response.body.items.item

      let holidatList = []
      for (var i = 0; i < data.length; i++) {
        let month = data[i].locdate.toString().slice(4, 6)
        let date = data[i].locdate.toString().slice(6, 8)
        holidatList.push({ month: month, date: date })
      }

      const groupedData = holidatList.reduce((acc: any, curr) => {
        const { month, date } = curr
        if (!acc[Number(month)]) {
          acc[Number(month)] = { month: month, date: [] }
        }
        acc[Number(month)].date.push(Number(date))
        return acc
      }, {})

      console.log(JSON.stringify(groupedData))
    }) */

  const holidayData_2021 = {
    '1': { month: '01', date: [1] },
    '2': { month: '02', date: [11, 12, 13] },
    '3': { month: '03', date: [1] },
    '5': { month: '05', date: [5, 19] },
    '6': { month: '06', date: [6] },
    '8': { month: '08', date: [15, 16] },
    '9': { month: '09', date: [20, 21, 22] },
    '10': { month: '10', date: [3, 4, 9, 11] },
    '12': { month: '12', date: [25] }
  }
  const holidayData_2022 = {
    '1': { month: '01', date: [1, 31] },
    '2': { month: '02', date: [1, 2] },
    '3': { month: '03', date: [1, 9] },
    '5': { month: '05', date: [5, 8] },
    '6': { month: '06', date: [1, 6] },
    '8': { month: '08', date: [15] },
    '9': { month: '09', date: [9, 10, 11, 12] },
    '10': { month: '10', date: [3, 9, 10] },
    '12': { month: '12', date: [25] }
  }
  const holidayData_2023 = {
    '1': { month: '01', date: [1, 21, 22, 23, 24] },
    '3': { month: '03', date: [1] },
    '5': { month: '05', date: [5, 27, 29] },
    '6': { month: '06', date: [6] },
    '8': { month: '08', date: [15] },
    '9': { month: '09', date: [28, 29, 30] },
    '10': { month: '10', date: [2, 3, 9] },
    '12': { month: '12', date: [25] }
  }

  const holidayData_2024 = {
    '1': { month: '01', date: [1] },
    '2': { month: '02', date: [9, 10, 11, 12] },
    '3': { month: '03', date: [1] },
    '4': { month: '04', date: [10] },
    '5': { month: '05', date: [5, 6, 15] },
    '6': { month: '06', date: [6] },
    '8': { month: '08', date: [15] },
    '9': { month: '09', date: [16, 17, 18] },
    '10': { month: '10', date: [3, 9] },
    '12': { month: '12', date: [25] }
  }

  const holidayData_2025 = {
    '1': { month: '01', date: [1, 28, 29, 30] },
    '3': { month: '03', date: [1, 3] },
    '5': { month: '05', date: [5, 5, 6] },
    '6': { month: '06', date: [6] },
    '8': { month: '08', date: [15] },
    '10': { month: '10', date: [3, 5, 6, 7, 8, 9] },
    '12': { month: '12', date: [25] }
  }

  const holidayList: { [key: number]: any } = {
    2021: holidayData_2021,
    2022: holidayData_2022,
    2023: holidayData_2023,
    2024: holidayData_2024,
    2025: holidayData_2025
  }

  return holidayList[year]
}
