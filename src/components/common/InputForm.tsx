import { IClassInfo } from '@/app/(service)/(nav)/class/register/page'

export interface InputFormProps {
  valid?: boolean
  label: string
  name: string
  placeholder: string
  maxLength: number
  value: string
  checkValid?: (vlaue: any) => void
  onChange: (vlaue: any) => void
}

export default function CustomInput({
  label,
  placeholder,
  maxLength,
  value,
  name,
  onChange,
  checkValid,
  valid = true // 초기값 true
}: InputFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length && checkValid) {
      checkValid({ [name]: true })
    }
    // checkValid(e.target.value)
    onChange({ [name]: newValue })
  }

  return (
    <div className="flex flex-col gap-2">
      <p className={`${valid ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>{label}</p>

      <input
        className={`${value.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-auto input-line-gray`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        maxLength={maxLength}
      />
    </div>
  )
}
