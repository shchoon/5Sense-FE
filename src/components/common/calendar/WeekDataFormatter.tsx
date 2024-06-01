import { dateDataType } from './datePicker/dayDatePIcker'

export default function WeekDataFormatter(data: any, dateData: dateDataType) {
  let returnData = []
  for (var i = 0; i < data.length; i++) {
    data[i].sort((a: any, b: any) => a.startTime.split(':')[0] - b.startTime.split(':')[0])
  }
  const startDay = new Date(dateData.year, dateData.month, 0).getDay()
  for (var i = 0; i <= startDay; i++) {
    returnData.push({})
  }
  for (var i = 0; i < data.length; i++) {
    returnData.push(data[i])
  }
  console.log(returnData)
  let result: any = []
  for (var i = 0; i < returnData.length; i += 7) {
    result.push(returnData.slice(i, i + 7))
  }

  let resultList: {
    time: string
    classData: {
      index: number
      data: {
        id: string
        lessonTime: number
        name: string
        startTime: string
        type: string
        teacher: string
        studentNum: string
      }[]
    }[]
  }[][] = []

  for (var k = 0; k < result.length; k++) {
    let list: {
      time: string
      classData: {
        index: number
        data: {
          id: string
          lessonTime: number
          name: string
          startTime: string
          type: string
          teacher: string
          studentNum: '5'
        }[]
      }[]
    }[] = []

    for (var i = 0; i < result[k].length; i++) {
      for (var j = 0; j < result[k][i].length; j++) {
        if (list.filter(item => item.time === result[k][i][j].startTime).length === 0) {
          list.push({ time: result[k][i][j].startTime, classData: [] })
        }
        const timeIndex = list.findIndex(item => item.time === result[k][i][j].startTime)
        if (list[timeIndex].classData.filter(item => item.index === i).length !== 0) {
          list[timeIndex].classData[list[timeIndex].classData.length - 1].data.push({
            id: result[k][i][j].id,
            lessonTime: result[k][i][j].lessonTime,
            name: result[k][i][j].name,
            startTime: result[k][i][j].startTime,
            type: result[k][i][j].type,
            teacher: result[k][i][j].teacher,
            studentNum: '5'
          })
        } else {
          list[timeIndex].classData.push({
            index: i,
            data: [
              {
                id: result[k][i][j].id,
                lessonTime: result[k][i][j].lessonTime,
                name: result[k][i][j].name,
                startTime: result[k][i][j].startTime,
                type: result[k][i][j].type,
                teacher: result[k][i][j].teacher,
                studentNum: '5'
              }
            ]
          })
        }
      }
    }
    resultList.push(list)
  }

  for (var i = 0; i < resultList.length; i++) {
    resultList[i].sort(
      (a: { time: string }, b: { time: string }) => Number(a.time.split(':')[0]) - Number(b.time.split(':')[0])
    )
  }

  for (var k = 0; k < resultList.length; k++) {
    for (var i = 0; i < resultList[k].length; i++) {
      for (var j = 0; j < 7; j++) {
        if (resultList[k][i].classData.filter(item => item.index === j).length === 0) {
          resultList[k][i].classData.push({ index: j, data: [] })
        }
      }
      resultList[k][i].classData.sort((a: any, b: any) => a.index - b.index)
    }
  }

  return resultList
}
