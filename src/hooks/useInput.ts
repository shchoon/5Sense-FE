import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

interface IProps {
  name: string
  maxLength: number
  submitData: { [key: string]: string }
  setSubmitData: Dispatch<SetStateAction<{ [key: string]: string }>>
}

type UseInputReturn = [string, (e: ChangeEvent<HTMLInputElement>) => void]

export function useInput({
  name,
  maxLength,
  submitData,
  setSubmitData
}: IProps): UseInputReturn {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    } else if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength))
    }
    setSubmitData({ ...submitData, [name]: e.target.value })
  }

  useEffect(() => {
    setInputValue(submitData[name])
  }, [submitData[name]])

  return [inputValue, handleChange]
}
