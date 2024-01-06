import { ChangeEvent, useState } from 'react'

export function useInput(initialValue: string, maxLength: number): any {
  const [inputValue, setInputValue] = useState<string>(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    } else if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength))
    }
  }
  return [inputValue, handleChange]
}
