import { useState } from 'react'

type UseModalReturn = [boolean, () => void, () => void]

export default function UseModal(): UseModalReturn {
  const [active, setActive] = useState<boolean>(false)

  const handleClose = () => {
    setActive(false)
  }

  const handelOpen = () => {
    setActive(true)
  }
  return [active, handleClose, handelOpen]
}
