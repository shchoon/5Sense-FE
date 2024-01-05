import { useInput } from '@/hooks/useInput'

export interface InputFormProps {
  title: string
  placeholder: string
  name: string
  maxLength?: number
}

export default function InputForm({
  title,
  placeholder,
  name,
  maxLength
}: InputFormProps) {
  const [inputValue, handleChange] = useInput('', maxLength)
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
      {maxLength ? (
        <span className="text-right">
          {ValueLength}/{maxLength}
        </span>
      ) : (
        ''
      )}
    </div>
  )
}
