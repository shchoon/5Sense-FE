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
  const [inputValue, handleChange] = useInput('')
  const ValueLength = inputValue.length
  return (
    <div className="flex flex-col gap-2">
      <p className="s-title">{title}</p>

      <input
        className={`${
          inputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
        } input-box`}
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
