import PlusCircleIcon from '../../../../public/assets/icons/plus-circle'

interface IProps {
  title: string
  btnName: string
  onClick: () => void
}

const whitePlusCircleProps = {
  width: '20',
  height: '20',
  color: '#FFF'
}

export default function ContentHeader({ title, btnName, onClick }: IProps) {
  return (
    <div className="flex w-full justify-between items-center mb-[30px]">
      <div className="black-bold text-3xl">{title}</div>
      <button className="flex gap-2 btn-purpl-sm lg:btn-purpl-md" onClick={() => onClick()}>
        <PlusCircleIcon {...whitePlusCircleProps} />
        {btnName}
      </button>
    </div>
  )
}
