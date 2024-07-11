'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import instance from '@/lib/api/axios'
import { modalState } from '@/lib/state/modal'
import { AddSessionState } from '@/lib/state/addSessionState'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { classDataType } from '@/app/(service)/(nav)/class/register/page'

import Close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'
import PlusIcon from 'public/assets/icons/plus.svg'
import SearchIcon from 'public/assets/icons/search.svg'
import UserCircle from 'public/assets/icons/user_circle.svg'
import VecterIcon from 'public/assets/icons/vector.svg'

interface IProps {
  type: string
  getValues?: UseFormGetValues<classDataType>
  setValue?: UseFormSetValue<classDataType>
}

export default function MemberOfCenter({ type, getValues, setValue }: IProps) {
  const inputClickRef = useRef<HTMLInputElement>(null)
  const autoCompleteTeacherNameRef = useRef<HTMLDivElement>(null)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const setAddSessionState = useSetRecoilState(AddSessionState)

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

  const [nameList, setNameList] = useState<
    { id: string; name: string; phone: string; particulars?: string; sessionCount?: string }[]
  >([])
  useEffect(() => {
    if (type === 'teachers') {
      instance(`/teachers?searchBy=none&take=100`).then(res => {
        const data = res.data.data.teachers
        setNameList(data)
      })
    } else if (type === 'students') {
      const classId = localStorage.getItem('classId')
      if (classId !== 'null') {
        instance(`/session-lessons/${classId}/details`).then(res => {
          let studentsData = res.data.data.registeredStudents
          setNameList(studentsData)
          instance(`/students/lessons/${classId}`).then(res => {
            const studentsList = res.data.data
            for (var i = 0; i < studentsData.length; i++) {
              const compareValue = studentsList.filter(
                (data: { name: string; phone: string }) =>
                  data.name === studentsData[i].name && data.phone === studentsData[i].phone
              )
              console.log(compareValue)
              studentsData[i].id = compareValue[0].id
            }
          })
        })
      }
    }
  }, [isClickedAddTeacher])

  return (
    <>
      <div className={`flex flex-col items-start w-[640px] py-8 px-6 border rounded-xl bg-[#FFF]`}>
        <div className="gray-900-bold text-xl pb-10">{type === 'students' ? '수강생 정보' : '강사 정보'}</div>
        {type === 'students' && <div className="w-full text-left gray-800-semibold text-base pb-2">수강생 찾기</div>}
        <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
          <div className="relative flex w-[100%] items-center gap-2">
            <SearchIcon />
            <input
              ref={inputClickRef}
              className="w-[100%] text-[16px] bg-[#F9FAFB] text-[#111928] font-normal outline-none"
              placeholder={type === 'teachers' ? '강사 이름을 입력해주세요' : '수강생 이름을 입력해주세요'}
              value={searchingName}
              onClick={() => {
                handleClickInsideOfInput()
              }}
              onChange={e => {
                setSearchingName(e.target.value)
                setValue?.('teacherId', e.target.value)
              }}
            />
            {searchingName.includes(nameValue) && searchingName !== '' && nameValue !== '' ? (
              <Close_Circle_bg
                className={`absolute ${type === 'teachers' ? 'left-[100px]' : 'left-[200px]'}  cursor-pointer`}
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
        {openNameList ? (
          <div
            ref={autoCompleteTeacherNameRef}
            className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]"
          >
            {type === 'teachers' && <div className="w-[100%] text-[14px] gray-900-semibold">강사 이름</div>}
            <div className=" w-full overflow-hidden">
              <div className="max-h-[185px] overflow-y-scroll">
                {nameList.map((data, index) => {
                  console.log(data)
                  let sessionCount = null
                  if (type === 'students' && data.sessionCount) {
                    sessionCount = Number(data.sessionCount.split('/')[1]) - Number(data.sessionCount.split('/')[0])
                  }

                  if (data.name.includes(searchingName)) {
                    return (
                      <div
                        data-teachername={data.name}
                        key={index}
                        className="relative flex w-full px-3 py-2 items-center gap-2 rounded-lg bg-[#F9FAFB] cursor-pointer hover:opacity-70"
                        onClick={e => {
                          const name: any = e.currentTarget.getAttribute('data-teachername')
                          sessionCount === null
                            ? setSearchingName(name)
                            : setSearchingName(`${name} (잔여회차: ${sessionCount}회)`)
                          setCheckInclude(prev => !prev)
                          setNameValue(data.name)
                          setOpenNameList(prev => !prev)
                          setValue?.('teacherId', data.id)
                          type === 'students' &&
                            setAddSessionState(prev => ({
                              ...prev,
                              studentId: Number(data.id)
                            }))
                        }}
                      >
                        <UserCircle className="text-gray-400" />
                        <div id="name" className="text-gray-500 text-sm font-normal">
                          {data.name} ({data.phone.slice(data.phone.length - 4, data.phone.length)})
                        </div>
                        <VecterIcon className="absolute right-3" width={14} height={15} />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            {type === 'teachers' && (
              <div
                className="flex w-full pt-3 border-t border-t-[#E5E7EB] gap-1 text-[14px] text-primary-600 font-semibold items-center cursor-pointer"
                onClick={() => {
                  setIsClickedAddTeacher(true)
                  setModal(true)
                }}
              >
                <PlusIcon />
                강사 추가
              </div>
            )}
          </div>
        ) : null}
      </div>
      {/* {type === 'teachers' && isClickedAddTeacher && (
        <Modal small>
          <RegisterModal onClose={() => setModal(false)} onCloseState={() => setIsClickedAddTeacher(false)} />
        </Modal>
      )} */}
    </>
  )
}
