import { useInput } from '@/hooks/useInput'
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export interface TextareaFormProps {
  title: string
  placeholder: string
  name: string
  maxLength: number
  height?: string
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function TextareaForm({
  title,
  placeholder,
  name,
  maxLength,
  submitData,
  setSubmitData
}: TextareaFormProps) {
  console.log(name)
  const [inputValue, setInputValue] = useState<string>('')
  const ValueLength = inputValue.length

  const textarea = useRef<HTMLTextAreaElement | null>(null)
  const handleResizeHeight = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!textarea.current) return
      setInputValue(textarea.current.value)
      textarea.current.style.height = 'auto'
      textarea.current.style.height = textarea.current?.scrollHeight + 'px'
    },
    [textarea]
  )
  const handelChage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSubmitData({ ...submitData, [name]: e.target.value })
  }

  useEffect(() => {
    setInputValue(submitData[name])
  }, [submitData[name]])

  return (
    <>
      <p className="gray-800-semibold">{title}</p>
      <textarea
        ref={textarea}
        className={`${
          inputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
        } w-full h-auto input-line-gray gray-900-400 resize-none overflow-hidden`}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onInput={handleResizeHeight}
        onChange={handelChage}
        rows={1}
        maxLength={maxLength}
      />

      <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
        {ValueLength}/{maxLength}
      </span>
    </>
  )
}
