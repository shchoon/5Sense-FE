export interface InputFormProps {
  title: string
  name: string
  placeholder: string
  maxLength?: number
  value: string
  onChange: (value: any) => void
}

export default function InputForm({ title, placeholder, maxLength, value, name, onChange }: InputFormProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className={`gray-800-semibold`}>{title}</p>

      <input
        className={`${value.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full text-input`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        maxLength={maxLength}
      />
      {maxLength && (
        <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
          {value?.length}/{maxLength}
        </span>
      )}
    </div>
  )
}
