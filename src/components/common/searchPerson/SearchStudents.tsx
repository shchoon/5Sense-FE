'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Modal from '@/components/common/modal'
import RegisterModal from '@/components/instructor/RegisterModal'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import instance from '@/lib/api/axios'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'
import PlusIcon from 'public/assets/icons/plus.svg'
import SearchIcon from 'public/assets/icons/search.svg'
import UserCircle from 'public/assets/icons/user_circle.svg'
import VecterIcon from 'public/assets/icons/vector.svg'

interface IProps {
  onChange: (name: string) => void
  classId: number
}

export default function SearchStudents({ onChange, classId }: IProps) {
  console.log(classId)
  const inputClickRef = useRef<HTMLInputElement>(null)
  const autoCompleteTeacherNameRef = useRef<HTMLDivElement>(null)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const handleClickOutsideOfInput = (e: any) => {
    if (openNameList && !autoCompleteTeacherNameRef.current?.contains(e.target)) {
      setOpenNameList(false)
    }
  }

  const handleClickInsideOfInput = () => {
    setOpenNameList(prev => !prev)
  }

  useOnClickOutside(inputClickRef, handleClickOutsideOfInput)

  let [searchingName, setSearchingName] = useState<string>('')
  let [checkInclude, setCheckInclude] = useState<boolean>(false)
  let [isClickedAddTeacher, setIsClickedAddTeacher] = useState<boolean>(false)
  let [openNameList, setOpenNameList] = useState<boolean>(false)
  let [nameValue, setNameValue] = useState<string>('')

  const emptyInput = () => {
    setSearchingName('')
  }

  const [nameList, setNameList] = useState<{ id: string; name: string; phone: string; particulars?: string }[]>([])
  
  useEffect(() => {
    instance(`/students/lessons/${classId}`).then(res => {
      const data = res.data.data
      setNameList(data)
    })
    /* if (type === 'teachers') {
      instance(`/teachers?searchBy=none&take=100`).then(res => {
        const data = res.data.data.teachers
        setNameList(data)
      })
    } else if (type === 'students') {
      const classId = localStorage.getItem('classId')
      if (classId !== 'null') {
        instance(`/students/lessons/${classId}`).then(res => {
          const data = res.data.data
          setNameList(data)
        })
      }
    } */
  }, [classId])

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className="gray-800-semibold text-[16px]">수강생 찾기</div>
      <div className="flex flex-col w-full h-[52px] px-4 py-[14px] justify-center bg-white border border-gray-200 rounded-lg focus-within:border-[#7354E8]">
        <div className="relative flex w-full items-center gap-2">
          <SearchIcon />
          <input
            ref={inputClickRef}
            className="flex-1 text-[16px] bg-inherit text-[#111928] font-normal outline-none"
            placeholder='수강생 이름을 입력해주세요'
            value={searchingName}
            onClick={() => {
              handleClickInsideOfInput()
            }}
            onChange={e => {
              setSearchingName(e.target.value)
              onChange(e.target.value)
            }}
          />
          {/* 
            {searchingName !== '' && searchingName !== nameValue ? (
              <CloseCircleIcon className="text-gray-400 cursor-pointer" onClick={emptyInput} />
            ) : null} */}
          {searchingName === nameValue && searchingName !== '' ? (
            <Close_Circle_bg
              className="absolute left-[100px] cursor-pointer"
              width={20}
              height={20}
              onClick={() => {
                setSearchingName('')
                setCheckInclude(prev => !prev)
              }}
            />
          ) : null}
        </div>
      </div>
      {openNameList && (
        <div
          ref={autoCompleteTeacherNameRef}
          className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]"
        >
          <div className="w-[100%] text-[14px] gray-900-semibold">수강생 이름</div>
          <div className=" w-full overflow-hidden">
            <div className="max-h-[185px] overflow-y-scroll">
              {nameList.map((data, index) => {
                if (data.name.includes(searchingName)) {
                  return (
                    <div
                      data-teachername={data.name}
                      key={index}
                      className="relative flex w-full px-3 py-2 items-center gap-2 rounded-lg bg-[#F9FAFB] cursor-pointer hover:opacity-70"
                      onClick={e => {
                        const name: any = e.currentTarget.getAttribute('data-teachername')
                        setSearchingName(name)
                        setCheckInclude(prev => !prev)
                        setNameValue(data.name)
                        setOpenNameList(prev => !prev)
                        onChange(data.id)
                      }}
                    >
                      <UserCircle className="text-gray-400" />
                      <div id="name" className="text-gray-500 text-sm font-normal">
                        {data.name}
                      </div>
                      <VecterIcon className="absolute right-3" width={14} height={15} />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
