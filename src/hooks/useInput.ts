import { ClassInfo } from '@/app/(nav)/class/register/page'
import { InputFormProps, InputProps } from '@/components/InputForm'
import { ChangeEvent, SetStateAction, useState } from 'react'

export function useInput({
  name,
  maxLength,
  submitData,
  setSubmitData
}: InputProps): any {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    } else if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength))
    }
    setSubmitData({ ...submitData, [name]: e.target.value })
  }

  return [inputValue, handleChange]
}
