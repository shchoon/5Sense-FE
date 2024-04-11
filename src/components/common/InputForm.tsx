import { IClassInfo } from '@/app/(nav)/class/register/page'
import { useInput } from '@/hooks/useInput'
import { SetStateAction } from 'react'

export interface InputFormProps {
  vaild?: boolean
  title: string
  placeholder: string
  name: string
  maxLength: number
  submitData: IClassInfo
  onChange: (name: string, value: string) => void
}

export default function InputForm({
  name,
  title,
  placeholder,
  maxLength,
  submitData,
  onChange,
  vaild
}: InputFormProps) {
  const [inputValue, handleChange] = useInput({
    name,
    maxLength,
    submitData,
    onChange
  })
  const valueLength = inputValue?.length

  return (
    <div className="flex flex-col gap-2">
      <p className={`${vaild ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>{title}</p>

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
