import PlusIcon from 'public/assets/icons/circle/plus.svg'

interface IProps {
  title: string
  btnName: string
  onClick: () => void
}

export default function ContentHeader({ title, btnName, onClick }: IProps) {
  return (
    <div className="flex w-full justify-between items-center mb-[30px]">
      <div className="black-bold text-3xl">{title}</div>
      <button className="flex gap-2 btn-purple-sm lg:btn-purple-md" onClick={() => onClick()}>
        <PlusIcon />
        {btnName}
      </button>
    </div>
  )
}
