import { FocusEventHandler, useEffect } from 'react'

import { UseFormSetFocus } from 'react-hook-form'
import { IInput } from './TextInput'

interface ITextArea extends IInput {
  setFocus: UseFormSetFocus<any>
}

export default function TextareaForm({ title, placeholder, register, errors, maxLength, value, setFocus }: ITextArea) {
  const { name } = register

  useEffect(() => {
    setFocus('content')
  }, [setFocus])

  const handleOnFocusTextarea: FocusEventHandler<HTMLTextAreaElement> = e => {
    const { target } = e
    setTimeout(() => {
      target.style.height = `${target.scrollHeight}px`
    }, 0)
  }

  return (
    <>
      <span
        className={`${errors[name] != null ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
      >
        {title}
      </span>
      <textarea
        className={`text-input resize-none overflow-hidden`}
        placeholder={placeholder}
        rows={1}
        maxLength={maxLength}
        {...register}
        onFocus={handleOnFocusTextarea}
      />

      <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
        {value?.length}/{maxLength}
      </span>
    </>
  )
}
