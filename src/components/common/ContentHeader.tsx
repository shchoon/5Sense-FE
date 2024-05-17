import { Button } from 'flowbite-react'

import PlusIcon from '@/icons/icon/plus.svg'
import BackIcon from '@/icons/icon/back.svg'

interface IProps {
  title: string
  btnName?: string
  back?: boolean
  onClick?: () => void
}

export default function ContentHeader({ title, btnName, back, onClick }: IProps) {
  return (
    <div className="flex w-full justify-between items-center mb-[30px]">
      <div className="flex gap-4 items-center">
        {back && (
          <BackIcon
            onClick={() => {
              if (onClick) {
                onClick()
              }
            }}
          />
        )}
        <div className="black-bold text-3xl">{title}</div>
      </div>
      {btnName && (
        <Button
          color="primary"
          size="sm"
          onClick={() => {
            if (onClick) {
              onClick()
            }
          }}
        >
          <PlusIcon className="mr-2" />
          {btnName}
        </Button>
      )}
    </div>
  )
}
