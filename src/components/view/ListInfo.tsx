interface IProps {
  type: string
  listInfo: string[]
}

export default function ListInfo({ listInfo, type }: IProps) {
  return (
    <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex items-center lg:gap-6 gap-5 rounded bg-[#F0EFFF]">
      <div className="w-[100px] indigo-500-semibold text-sm">{listInfo[0]}</div>
      <div className="lg:w-[160px] w-[130px] indigo-500-semibold text-sm">{listInfo[1]}</div>
      <div className="flex-grow min-w-[100px] indigo-500-semibold text-sm">{listInfo[2]}</div>
      <div
        className={`${
          type === 'student' ? 'xl:w-[400px] w-[200px]' : 'xl:w-[220px] w-40'
        }  indigo-500-semibold text-sm`}
      >
        {listInfo[3]}
      </div>
    </div>
  )
}
