import { InputNumProps } from '@/app/(nav)/student/register/page'
import { ChangeEvent, useState } from 'react'

export default function useInputNum({
  name,
  submitData,
  setSubmitData
}: InputNumProps): any {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^0-9]/g, ''))
    setSubmitData({ ...submitData, [name]: e.target.value })
  }

  return [inputValue, handleChange]
}
