export default function Sesstion() {
  return (
    <div className="w-full flex flex-col">
      <div className="payBox w-full flex flex-col gap-2">
        <p className="gray-800-semibold">수강료</p>
        <div className="flex flex-col gap-2.5">
          <div className="w-full px-5 py-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-between gap-4">
            <div className="flex w-full">
              <span className="text-[#4B5563] text-base font-medium">1회 금액</span>
              <input
                type="number"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal outline-none"
                placeholder="0"
                //   value={addComma(one)}
                //   onChange={onChangeHandler}
              />
              <span className="text-gray-400 text-base font-normal">원</span>
            </div>
            <div className="w-[552px] h-px bg-gray-200" />
            <div className="flex w-full">
              <span className="text-[#4B5563] text-base font-medium">총 회차</span>
              <input
                type="number"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal outline-none"
                placeholder="0"
                //   value={count}
                //   onChange={oncountChangeHandler}
              />
              <span className="text-gray-400 text-base font-normal">회</span>
            </div>
          </div>
          <div className="w-full p-5 bg-gray-50 rounded-lg flex flex-col">
            <div className="flex w-full">
              <span className="gray-900-semibold text-base">총 금액</span>
              <span className="flex-grow text-right text-indigo-500 text-[22px] font-bold">원</span>
            </div>
            <p className="text-right text-gray-500 text-xs font-medium   leading-[18px]">만원</p>
          </div>
        </div>
      </div>
      <div className="detailInfo w-full flex flex-col gap-3 mt-6">
        <p className="gray-800-semibold">상세 내역</p>
        <div className="w-full flex">
          <div className="w-[3px] h-[21px] bg-indigo-500 rounded-sm" />
          <div className="text-gray-600 text-sm font-normal ml-3.5">1회 금액 * 총 회차</div>
          <div className="flex-grow text-right text-gray-600 text-sm font-normal">hihi</div>
        </div>
      </div>
      <div className="time"></div>
    </div>
  )
}
