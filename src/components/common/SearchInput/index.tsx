import { useRef, useState } from 'react'

import instance from '@/lib/api/axios'

import { studentType, metaType } from '@/app/(nav)/student/page'
import { PaymentType } from '@/app/(nav)/pay/page'

import SearchIconWhite from 'public/assets/icons/search_white.svg'
import CloseIcon from 'public/assets/icons/close.svg'
import SearchIconGray from 'public/assets/icons/search.svg'

interface IProps {
  type: string
  passInputData: (data: { value: string; searchBy: string; list: any; meta: metaType }) => void
  paymentStatus?: string
}

export default function SearchInput(props: IProps) {
  const checkNumTypeList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClickSearch = () => {
    let searchBy: string = ''
    if (checkNumTypeList.includes(inputValue[0])) {
      searchBy = 'phone'
    } else {
      searchBy = 'name'
    }
    if (props.type === 'payment') {
      instance(
        `/lesson-registrations/billing-payments?searchBy=${searchBy}&${searchBy}=${inputValue}&PaymentStatus=${props.paymentStatus}`
      ).then(res => {
        const data = res.data.data.students
        const meta = res.data.data.meta

        props.passInputData({ value: inputValue, searchBy: searchBy, list: data, meta: meta })
      })
    } else {
      instance(`/${props.type}?searchBy=${searchBy}&${searchBy}=${inputValue}`).then(res => {
        const data = props.type === 'teachers' ? res.data.data.teachers : res.data.data.students
        const meta = res.data.data.meta

        props.passInputData({ value: inputValue, searchBy: searchBy, list: data, meta: meta })
      })
    }
  }

  const handleClickInputRefresh = () => {
    setInputValue('')
  }

  const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleClickSearch()
    }
  }

  console.log(inputValue)

  return (
    <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
      <div className="relative lg:w-[325px] lg:gap-2.5 w-[280px] flex items-center gap-2 xl:px-4 pl-3  lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
        <SearchIconGray width={16} height={16} alt=" " />
        <input
          className="xl:w-[245px] w-[222px] focus:outline-none"
          placeholder="이름 또는 전화번호를 입력해주세요."
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={e => clickEnter(e)}
        />
        <CloseIcon
          className="absolute xl:right-4 right-2 cursor-pointer"
          width={12}
          height={12}
          onClick={() => handleClickInputRefresh()}
        />
      </div>
      <div
        className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
        onClick={() => {
          handleClickSearch()
        }}
      >
        <SearchIconWhite width={20} height={20} alt="" />
      </div>
    </div>
  )
}
