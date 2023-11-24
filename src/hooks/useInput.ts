import { ChangeEvent, useState } from 'react'

export function useInput(initialValue: string): any {
  const [inputValue, setInputValue] = useState<string>(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return [inputValue, handleChange]
}
