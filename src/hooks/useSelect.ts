import { ChangeEvent, useState } from 'react'

export function useSelect(initialValue: string): any {
  const [inputValue, setInputValue] = useState<string>(initialValue)
  const [activeValue, setActiveValue] = useState<boolean>(false)

  const handleChange = (inputValue: string) => {
    setInputValue(inputValue)
  }

  const handleActive = () => {
    setActiveValue(!activeValue)
  }

  return [inputValue, handleChange, activeValue, handleActive]
}
