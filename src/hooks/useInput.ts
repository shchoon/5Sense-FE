import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

// interface IProps {
//   name: string
//   maxLength: number
//   submitData: IClassInfo
//   onChange: (name: string, value: string) => void
// }

type UseInputReturn = [string, (e: ChangeEvent<HTMLInputElement>) => void]

export function useInput({ name, maxLength, submitData, onChange }: any): UseInputReturn {
  const [inputValue, setInputValue] = useState(submitData?.name)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    } else if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength))
    }
  }

  useEffect(() => {
    onChange(name, inputValue)
  }, [inputValue])

  return [inputValue, handleChange]
}
