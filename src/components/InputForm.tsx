import { useInput } from '@/hooks/useInput'
import { Textarea } from 'flowbite-react'

export interface InputFormProps {
  title: string
  placeholder: string
  name: string
  maxLength: number
  textarea?: boolean
}

export default function InputForm({
  title,
  placeholder,
  name,
  maxLength,
  textarea
}: InputFormProps) {
  const [inputValue, handleChange] = useInput('')
  const ValueLength = inputValue.length
  return (
    <>
      <p className="s-title">{title}</p>
      {textarea ? (
        <textarea
          className="w-[592px] h-[52px] px-4 py-3.5 bg-white rounded-lg border border-gray-200 placeholder:s-placeholder"
          placeholder={placeholder}
          name={name}
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength}
        />
      ) : (
        <input
          className="w-[592px] h-[52px] px-4 py-3.5 bg-white rounded-lg border border-gray-200 placeholder:s-placeholder"
          placeholder={placeholder}
          name={name}
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength}
        />
      )}

      <span className="text-right">
        {ValueLength}/{maxLength}
      </span>
    </>
  )
}
