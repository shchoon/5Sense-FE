'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import instance from '@/lib/api/axios'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { modalState } from '@/lib/state/modal'
import Modal from '@/components/common/modal'
import RegisterModal from '@/components/instructor/RegisterModal'

import searchIcon from 'public/assets/icons/search.svg'
import close_bg_gray from 'public/assets/icons/close_bg_gray.svg'
import vecterIcon from 'public/assets/icons/vector.svg'
import plusIcon from 'public/assets/icons/plus.svg'
import close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'
import close_Circle from 'public/assets/icons/closeCircle.svg'
import userCircle from 'public/assets/icons/user_circle.svg'

interface IPops {
  handleChangeTeacherId: (id: string) => void
}

export default function TeacherInfo(props: IPops) {
  const inputClickRef = useRef<HTMLInputElement>(null)
  const autoCompleteTeacherNameRef = useRef<HTMLDivElement>(null)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const handleClickOutsideOfInput = (e: any) => {
    if (openTeacherList && !autoCompleteTeacherNameRef.current?.contains(e.target)) {
      setOpenTeacherList(false)
    }
  }

  const handleClickInsideOfInput = () => {
    setOpenTeacherList(prev => !prev)
  }

  useOnClickOutside(inputClickRef, handleClickOutsideOfInput)

  let [teacherName, setTeacherName] = useState<string>('')
  let [checkInclude, setCheckInclude] = useState<boolean>(false)
  let [isClickedAddTeacher, setIsClickedAddTeacher] = useState<boolean>(false)
  let [newTeacherName, setNewTeacherName] = useState<string>('')
  let [newTeacherPhoneNum, setNewTeacherPhoneNum] = useState<string>('')
  let [openTeacherList, setOpenTeacherList] = useState<boolean>(false)
  let [nameValue, setNameValue] = useState<string>('')

  const emptyInput = () => {
    setTeacherName('')
  }

  const [teacherList, setTeacherList] = useState<{ id: string; name: string; phone: string }[]>([])
  useEffect(() => {
    instance('/teachers?searchBy=none&take=100').then(res => {
      setTeacherList(res.data.data.teachers)
    })
  }, [isClickedAddTeacher])

  return (
    <>
      <div className="flex flex-col items-start gap-10 w-[640px] py-8 px-6 border border-[#E5E7EB] rounded-xl bg-[#FFF] ">
        <div className="gray-900-bold text-[20px]">강사 정보</div>
        <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
          <div className="relative flex w-[100%] items-center gap-2">
            <Image src={searchIcon} width={18} height={18} alt="search" />
            <input
              ref={inputClickRef}
              className="w-[100%] text-[16px] bg-[#F9FAFB] text-[#111928] font-normal outline-none"
              placeholder="강사 이름을 입력해주세요"
              value={teacherName}
              onClick={() => {
                //clickInput
                handleClickInsideOfInput()
              }}
              onChange={e => {
                setTeacherName(e.target.value)
              }}
            />

            {teacherName !== '' && teacherName !== nameValue ? (
              <Image
                className="cursor-pointer"
                src={close_bg_gray}
                width={16}
                height={16}
                alt="X"
                onClick={emptyInput}
              />
            ) : null}
            {teacherName === nameValue && teacherName !== '' ? (
              <Image
                className="absolute left-[80px] cursor-pointer"
                src={close_Circle_bg}
                width={20}
                height={20}
                alt=""
                onClick={() => {
                  setTeacherName('')
                  setCheckInclude(prev => !prev)
                }}
              />
            ) : null}
          </div>
        </div>
        {openTeacherList ? (
          <div
            ref={autoCompleteTeacherNameRef}
            className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]"
          >
            <div className="w-[100%] text-[14px] gray-900-semibold">강사 이름</div>
            <div className=" w-full overflow-hidden">
              <div className="max-h-[185px] overflow-y-scroll">
                {teacherList.map((data, index) => {
                  if (data.name.includes(teacherName)) {
                    return (
                      <div
                        data-teachername={data.name}
                        key={index}
                        className="flex w-[100%] px-3 py-2 items-center rounded-lg gap-2 bg-[#F9FAFB] cursor-pointer hover:opacity-70"
                        onClick={e => {
                          const name: any = e.currentTarget.getAttribute('data-teachername')
                          setTeacherName(name)
                          setCheckInclude(prev => !prev)
                          setNameValue(data.name)
                          setOpenTeacherList(prev => !prev)
                          props.handleChangeTeacherId(data.id)
                        }}
                      >
                        <Image src={userCircle} width={14} height={15} alt="" />
                        <div id="name" className="w-[100%] text-[14px] gray-500-normal">
                          {data.name}
                        </div>
                        <Image src={vecterIcon} width={14} height={15} alt="" />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            <div className="flex w-[100%] h-[auto] pt-3 border-t border-t-[#E5E7EB] gap-3">
              <Image src={plusIcon} width={14} height={15} alt="" />
              <div
                className="text-[14px] text-primary-600 font-semibold cursor-pointer"
                onClick={() => {
                  setIsClickedAddTeacher(true)
                  setModal(true)
                }}
              >
                강사 추가
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {isClickedAddTeacher && (
        <Modal small>
          <RegisterModal onClose={() => setModal(false)} onCloseState={() => setIsClickedAddTeacher(false)} />
        </Modal>
      )}
    </>
  )
}
