import Image from 'next/image'

import closeIcon from 'public/assets/icons/close.svg'
import searchIcon from 'public/assets/icons/search.svg'
import searchIconWhite from 'public/assets/icons/search_white.svg'
import { ChangeEvent } from 'react'

export default function SearchInput() {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {}

  return (
    <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
      <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
        <Image src={searchIcon} width={16} height={16} alt="seachIcon" />
        <input
          className="w-[245px] border-none focus:ring-0"
          placeholder="Search"
          //   name={checkInputType() ? 'name' : 'phone'}
          //   type={checkInputType() ? 'text' : 'number'}
          //   value={inputValue}
          //   onChange={handleChangeInput}
          //   onKeyDown={checkInputType() ? preventInputDifferentType : allowOnlyNum}
        />
        <Image
          className="cursor-pointer"
          src={closeIcon}
          width={12}
          height={12}
          alt="closeIcon"
          //   onClick={handleClickInputRefresh}
        />
      </div>
      <div className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer">
        <Image src={searchIconWhite} width={20} height={20} alt="seachIcon" />
      </div>
    </div>
  )
}
