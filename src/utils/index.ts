export function getDateFormat(today: Date) {
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return `${year}/${month}/${date}`
}

export function toLocalString(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
