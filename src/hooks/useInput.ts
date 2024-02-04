import { ClassInfo } from '@/app/(nav)/class/register/page'
import { InputFormProps, InputProps } from '@/components/common/InputForm'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'

export function useInput({
  name,
  maxLength,
  submitData,
  setSubmitData
}: InputProps): any {
  const [inputValue, setInputValue] = useState<string>('')
  console.log(submitData.name)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    } else if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength))
    }
    setSubmitData({ ...submitData, [name]: e.target.value })
  }

  useEffect(() => {
    setInputValue(submitData[name])
  }, [submitData[name]])

  return [inputValue, handleChange]
}
