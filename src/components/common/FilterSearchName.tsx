'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'

import { instructorDataType } from '../class/classFilter'
import { useGetData } from '@/hooks/useGetData'
import { filterState } from '@/lib/filter/filterState'

import searchIcon from 'public/assets/icons/search.svg'

interface IProps {
  title: string
  type: string
  handleChangeNameListFromChild: (data: string[]) => void
}

export default function FilterSearchName(props: IProps) {
  const setFilterState = useSetRecoilState(filterState)

  const [teacherData, setTeacherData] = useState<instructorDataType[]>([])
  const [searchName, setSearchName] = useState<string>('')
  const [checkedNameList, setCheckedNameList] = useState<string[]>([])

  const SearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)
  }

  const filterName = () => {
    if (searchName !== '') {
      let ifIncludeSearchName = teacherData.filter(info => info.name.includes(searchName))
      let sortBySearchName = ifIncludeSearchName.sort((a, b) => {
        return a.name.indexOf(searchName) - b.name.indexOf(searchName)
      })
      let result = []
      for (var i = 0; i < sortBySearchName.length; i++) {
        result.push(sortBySearchName[i])
      }
      return result
    } else {
      return []
    }
  }
  let sortFilterName = filterName()

  useEffect(() => {
    useGetData(`${props.type}`, 1, 100).then(res => {
      setTeacherData(res.data)
    })
  }, [])

  useEffect(() => {
    props.handleChangeNameListFromChild(checkedNameList)
  }, [checkedNameList])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-[42px] p-3 border rounded-lg border-gray-200 bg-gray-50 flex gap-2 focus:border-none focus-within:ring-1 focus-within:ring-[#7354E8]">
        <Image src={searchIcon} width={18} height={18} alt=" " />
        <input
          type="text"
          placeholder={props.title}
          value={searchName}
          className="w-full h-full bg-gray-50 focus:outline-none text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]"
          onChange={event => {
            SearchName(event)
          }}
        />
      </div>
      <div className="overflow-hidden">
        <div className="max-h-[150px]  flex flex-col items-center gap-3 overflow-auto ">
          {teacherData.map((data, i) => {
            return (
              <div key={i} className="w-full h-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id={data.id}
                  checked={checkedNameList.includes(data.name) ? true : false}
                  className="bg-gray-50 hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                  onChange={e => {
                    if (e.target.checked) {
                      setCheckedNameList(checkedTeacherNameList => [...checkedTeacherNameList, data.name])
                      setFilterState(prev => ({
                        ...prev,
                        teachers: [...prev.teachers, data.id]
                      }))
                    } else {
                      setCheckedNameList(checkedNameList.filter(name => name !== data.name))
                      setFilterState(prev => ({
                        ...prev,
                        teachers: prev.teachers.filter(id => id !== data.id)
                      }))
                    }
                  }}
                />

                <label className="hover:cursor-pointer" htmlFor={data.id}>
                  {data.name}
                </label>
              </div>
            )
          })}
        </div>
      </div>
      {/* 강사이름 자동완성 */}
      {searchName !== '' && sortFilterName.length !== 0 ? (
        <div className="absolute top-[62px] w-[162px] h-auto flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
          {sortFilterName.map((data, i) => {
            return (
              <div key={i} className="w-full flex items-center gap-2">
                <Image src={searchIcon} width={14} height={14} alt=" " />
                <span
                  className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px] hover:cursor-pointer"
                  id={data.name}
                  onClick={e => {
                    let teacherName = e.currentTarget.id
                    if (checkedNameList.includes(teacherName)) {
                      setSearchName('')
                    } else {
                      setCheckedNameList([...checkedNameList, e.currentTarget.id])
                      setFilterState(prev => ({
                        ...prev,
                        teachers: [...prev.teachers, data.id]
                      }))
                      setSearchName('')
                    }
                  }}
                >
                  {/* 1글자만 입력시 */}
                  {searchName.length === 1 && (
                    <>
                      {data.name.split('').map((nameSplit: string, i) => {
                        if (nameSplit === searchName) {
                          return (
                            <span
                              key={i}
                              className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]"
                            >
                              {searchName}
                            </span>
                          )
                        } else {
                          return (
                            <span
                              key={i}
                              className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]"
                            >
                              {nameSplit}
                            </span>
                          )
                        }
                      })}
                    </>
                  )}
                  {/* 1글자 이상 입력 & 입력 글자 === 찾고자하는 강사 이름 */}
                  {searchName.length > 1 && data.name === searchName && (
                    <>
                      <span key={i} className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]">
                        {searchName}
                      </span>
                    </>
                  )}
                  {/* 1글자 이상 입력 && 입력 글자 !== 찾고자 하는 강사 이름 */}
                  {searchName.length > 1 && data.name !== searchName && (
                    <>
                      {data.name.split(searchName).map((nameSplit: string, i: number) => {
                        if (nameSplit === '') {
                          return (
                            <span
                              key={i}
                              className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]"
                            >
                              {searchName}
                            </span>
                          )
                        } else {
                          return (
                            <span
                              key={i}
                              className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]"
                            >
                              {nameSplit}
                            </span>
                          )
                        }
                      })}
                    </>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
