import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

export interface IInput {
  title: string
  placeholder: string
  register: UseFormRegisterReturn
  errors: FieldErrors<any>
  maxLength: number
  value: string
}

export default function TextInput({ title, placeholder, register, errors, maxLength, value }: IInput) {
  const { name } = register

  return (
    <div className="w-full flex flex-col gap-2.5">
      <span
        className={`${errors[name] != null ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
      >
        {title}
      </span>
      <input {...register} placeholder={placeholder} maxLength={maxLength} className="text-input" />
      {maxLength && (
        <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
          {value?.length}/{maxLength}
        </span>
      )}
    </div>
  )
}
