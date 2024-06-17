export function getDateFormat(today: Date) {
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return `${year}/${month}/${date}`
}

export function toLocalString(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function changePhoneNumberToString(phoneNumber: string) {
  if (phoneNumber.slice(0, 2) === '02') {
    if (phoneNumber.length === 9) {
      return phoneNumber.slice(0, 2) + '-' + phoneNumber.slice(2, 5) + '-' + phoneNumber.slice(5, 9)
    } else {
      return phoneNumber.slice(0, 2) + '-' + phoneNumber.slice(2, 6) + '-' + phoneNumber.slice(6, 10)
    }
  } else if (phoneNumber.slice(0, 3) === '010') {
    return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7, 11)
  }
}

export function formatClassTime(classTime: string) {
  return classTime.slice(0, 5)
}

export function formatLessonDate(date: string) {
    const formatDate = date.slice(0, 10).split('-')
    return formatDate[0] + '.' + formatDate[1] + '.' + formatDate[2]
}

export function getKoreanNumber(value: string) {
  const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  const tenUnit = ['', '십', '백', '천']
  const tenThousandUnit = ['조', '억', '만', '']
  const unit = 10000

  let number = Number(value.replaceAll(',', ''))

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

export const formatPhoneNum = (phoneNumber: string) => {
  const part1 = phoneNumber.slice(0, 3)
  const part2 = phoneNumber.slice(3, 7)
  const part3 = phoneNumber.slice(7, 11)

  return `${part1}-${part2}-${part3}`
}
