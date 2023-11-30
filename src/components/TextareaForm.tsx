import { useInput } from '@/hooks/useInput'
import { ChangeEvent, useCallback, useRef, useState } from 'react'

export interface TextareaFormProps {
  title: string
  placeholder: string
  name: string
  maxLength: number
  height?: string
}

export default function TextareaForm({
  title,
  placeholder,
  name,
  maxLength
}: TextareaFormProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const ValueLength = inputValue.length

  const textarea = useRef<HTMLTextAreaElement | null>(null)
  const handleResizeHeight = useCallback(() => {
    if (!textarea.current) return
    setInputValue(textarea.current.value)
    textarea.current.style.height = 'auto'
    textarea.current.style.height = textarea.current?.scrollHeight + 'px'
  }, [textarea])

  return (
    <>
      <p className="s-title">{title}</p>
      <textarea
        ref={textarea}
        className={`${
          inputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
        } input-box`}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onInput={handleResizeHeight}
        rows={1}
        maxLength={maxLength}
      />

      <span className="text-right">
        {ValueLength}/{maxLength}
      </span>
    </>
  )
}
