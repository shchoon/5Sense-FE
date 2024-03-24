import { useInput } from '@/hooks/useInput'
import { SetStateAction } from 'react'

export interface InputFormProps {
  title: string
  placeholder: string
  name: string
  maxLength: number
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function InputForm({ name, title, placeholder, maxLength, submitData, setSubmitData }: InputFormProps) {
  const [inputValue, handleChange] = useInput({
    name,
    maxLength,
    submitData,
    setSubmitData
  })
  console.log(inputValue)
  const valueLength = inputValue.length

  return (
    <div className="flex flex-col gap-2">
      <p className="gray-800-semibold">{title}</p>

      <input
        className={`${valueLength > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-auto input-line-gray`}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onChange={handleChange}
        maxLength={maxLength}
      />

      <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
        {valueLength}/{maxLength}
      </span>
    </div>
  )
}
