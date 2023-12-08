export default function SelectForm({
  startH,
  handleStartH,
  activeSH,
  handleActiveSH,
  list
}: any) {
  console.log(startH)
  console.log(list[0])
  return (
    <div className="time-box" onBlur={handleActiveSH}>
      <button
        className="w-full h-full flex justify-between items-center"
        onClick={handleActiveSH}
      >
        <span className="h-full text-gray-500 text-sm font-normal font-['Inter'] leading-[17.50px]">
          {startH}
        </span>
        <span className="w-4 h-4 leading-[17.50px]">
          {activeSH ? '▲' : '▼'}
        </span>
      </button>
      {activeSH && (
        <ul className="absolute top-[52px] w-[124px] h-[184px] overflow-auto p-1 bg-white rounded-md shadow border border-indigo-500">
          {list.map((item: string, i: any) => (
            <li
              className="w-full h-[42px] px-3 py-2.5 text-gray-500 bg-white hover:bg-violet-100 rounded-[3px] justify-start cursor-pointer"
              key={i}
              value={item}
              onClick={() => handleStartH(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
