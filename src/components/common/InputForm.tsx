import { ClassInfo } from '@/app/(nav)/class/register/page'
import { useInput } from '@/hooks/useInput'
import { SetStateAction } from 'react'
import ClassFilter from '../class/classFilter/classFilter'

export interface InputFormProps {
  title: string
  placeholder: string
  name: string
  maxLength: number
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export type InputProps = Pick<
  InputFormProps,
  'name' | 'maxLength' | 'submitData' | 'setSubmitData'
>

export default function InputForm({
  title,
  placeholder,
  name,
  maxLength,
  submitData,
  setSubmitData
}: InputFormProps) {
  const [inputValue, handleChange] = useInput({
    name,
    maxLength,
    submitData,
    setSubmitData
  })
  const ValueLength = inputValue.length

  return (
    <div className="flex flex-col gap-2">
      <p className="gray-800-semibold">{title}</p>

      <input
        className={`${
          inputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
        } w-full h-auto input-line-gray gray-900-400`}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {maxLength && (
        <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
          {ValueLength}/{maxLength}
        </span>
      )}
    </div>
  )
}
