import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { useGetData } from '@/hooks/useGetData'
import DropDown from '@/components/common/DropDown'

import chevronDownBlue from 'public/assets/icons/chevron/chevron-down-blue.svg'
import chevronUpBlue from 'public/assets/icons/chevron/chevron-up-blue.svg'
import searchIcon from 'public/assets/icons/search.svg'
import chevronDownGray from 'public/assets/icons/chevron/chevron_down_gray.svg'
import chevronUpGray from 'public/assets/icons/chevron/chevron_up_gray.svg'
import instance from '@/lib/api/axios'

export interface instructorDataType {
  id: string
  name: string
  phone: string
}

export interface classifyListType {
  id: string
  name: string
  parentId: string
  subClass?: { id: string; name: string; parentId: string }[]
}
;[]

export default function ClassFilter() {
  const [isClickedfilter, setIsClickedfilter] = useState({
    isClickedCategoryFilter: false,
    isClickedClassFilter: false,
    isClickedTeacherFilter: false
  })

  const [classType, setClassType] = useState<string>('')
  const [searchTeacher, setSearchTeacher] = useState<string>('')
  const [checkedTeacherNameList, setCheckedTeacherNameList] = useState<string[]>([])
  const [instructorList, setInstructorList] = useState<instructorDataType[]>([])
  const [classifyList, setClassifyList] = useState<classifyListType[]>([])
  const [categoryData, setCategoryData] = useState({
    title: '카테고리',
    id: '',
    subClass: '',
    subClassId: ''
  })
  const [subClassProps, setSubClassProps] = useState<{ title: string; list: any; type: string }>({
    title: '소분류 선택',
    list: ['없음'],
    type: 'category'
  })
  const props1 = {
    title: '대분류 선택',
    list: classifyList,
    type: 'category'
  }
  const handleChangeParentsCategoryData = (data: any, type: string) => {
    if (type === 'classify') {
      setCategoryData(prev => ({
        ...prev,
        title: data.title,
        id: data.id
      }))
      setSubClassProps(prev => ({
        ...prev,
        list: classifyList[Number(data.id) - 1].subClass
      }))
    } else if (type === 'subClass') {
      setCategoryData(prev => ({
        ...prev,
        subClass: data.title,
        subClassId: data.id
      }))
    }
  }

  function SearchTeacherName(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTeacher(event.target.value)
  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassType(event.target.value)
    setIsClickedfilter(prev => ({
      ...prev,
      isClickedClassFilter: false
    }))
  }

  function getCheckedName() {
    if (checkedTeacherNameList.length === 1) {
      return `${checkedTeacherNameList[0]}`
    } else if (checkedTeacherNameList.length == 2) {
      return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]}`
    } else {
      return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]},${checkedTeacherNameList[2][0]}..`
    }
  }

  const classTypeRef = useRef<HTMLButtonElement>(null)
  const classTypeRefClick = useRef<HTMLDivElement>(null)
  const teacherNameTypeRef = useRef<HTMLButtonElement>(null)
  const teacherNameTypeRefClick = useRef<HTMLDivElement>(null)
  const categoryTypeRef = useRef<HTMLButtonElement>(null)
  const categoryTypeRefClick = useRef<HTMLDivElement>(null)

  const handleClickCategoryOutside = (e: any) => {
    if (isClickedfilter.isClickedCategoryFilter && !categoryTypeRefClick.current?.contains(e.target)) {
      setIsClickedfilter(prev => ({
        ...prev,
        isClickedCategoryFilter: false
      }))
    }
  }

  const handleClickCategoryInside = () => {
    setIsClickedfilter(prev => ({
      ...prev,
      isClickedCategoryFilter: !prev.isClickedCategoryFilter
    }))
  }

  const handleClickClassOutside = (e: any) => {
    if (isClickedfilter.isClickedClassFilter && !classTypeRefClick.current?.contains(e.target)) {
      setIsClickedfilter(prev => ({
        ...prev,
        isClickedClassFilter: false
      }))
    }
  }

  const handleCLickClassInside = () => {
    setIsClickedfilter(prev => ({
      ...prev,
      isClickedClassFilter: !prev.isClickedClassFilter
    }))
  }

  const handleClickTeacherOutside = (e: any) => {
    if (isClickedfilter.isClickedTeacherFilter && !teacherNameTypeRefClick.current?.contains(e.target)) {
      setIsClickedfilter(prev => ({
        ...prev,
        isClickedTeacherFilter: false
      }))
    }
  }

  const handleClickTeacherInside = () => {
    setIsClickedfilter(prev => ({
      ...prev,
      isClickedTeacherFilter: !prev.isClickedTeacherFilter
    }))
  }
  /* 카테고리 영역 밖 클릭 */
  useOnClickOutside(categoryTypeRef, handleClickCategoryOutside)
  /* 클래스 필터링 영역 밖 클릭 */
  useOnClickOutside(classTypeRef, handleClickClassOutside)
  /* 강사명 필터링 영역 밖 클릭 */
  useOnClickOutside(teacherNameTypeRef, handleClickTeacherOutside)

  function filterName() {
    if (searchTeacher !== '') {
      let ifIncludeSearchName = instructorList.filter(info => info.name.includes(searchTeacher))
      let sortBySearchName = ifIncludeSearchName.sort((a, b) => {
        return a.name.indexOf(searchTeacher) - b.name.indexOf(searchTeacher)
      })
      let result = []
      for (var i = 0; i < sortBySearchName.length; i++) {
        result.push(sortBySearchName[i].name)
      }
      return result
    } else {
      return []
    }
  }
  let sortFilterName = filterName()

  useEffect(() => {
    useGetData('teachers', 1, 100).then(res => {
      setInstructorList(res.data)
    })

    instance.get('/categories').then(res => {
      const data: { id: string; name: string; parentId: string }[] = res.data.data
      let classification: classifyListType[] = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId === null) {
          const getParentId = data[i].parentId !== null ? data[i].parentId : '0'
          classification.push({
            id: data[i].id,
            name: data[i].name,
            parentId: getParentId
          })
        } else {
          break
        }
      }
      for (var i = 0; i < classification.length; i++) {
        const subClassList = data.filter(list => list.parentId === String(i + 1))
        classification[i].subClass = subClassList
      }
      setClassifyList(classification)
    })
  }, [])

  return (
    <div className="absolute top-[120px] flex flex-col gap-2 h-[50px]">
      <div className=" max-w-[375px] h-[37px] items-start gap-2 flex">
        <button
          ref={classTypeRef}
          className="group flex items-center gap-2 w-[112px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={e => {
            handleCLickClassInside()
          }}
        >
          <span className="w-16 h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {classType === '' ? '클래스 유형' : classType}
          </span>
          {isClickedfilter.isClickedClassFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
        <button
          ref={teacherNameTypeRef}
          className="group flex items-center gap-2 max-w-[150px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9] focus-within:text-white"
          onClick={() => {
            handleClickTeacherInside()
          }}
        >
          <span className="max-w-[110px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {checkedTeacherNameList.length === 0 ? '강사명' : getCheckedName()}
          </span>
          {isClickedfilter.isClickedTeacherFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
        <button
          ref={categoryTypeRef}
          className="group flex items-center gap-2 w-[97px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={() => {
            handleClickCategoryInside()
          }}
        >
          <span className="w-[49px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {categoryData.title}
          </span>
          {isClickedfilter.isClickedCategoryFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
      </div>
      <div className="relative">
        {' '}
        {/* 필터링 UI 기준점 */}
        {/* 기반반/회차반 필터링 */}
        {isClickedfilter.isClickedClassFilter ? (
          <div
            ref={classTypeRefClick}
            className="absolute w-[150px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white"
          >
            <div id="classTypeFilter" className="w-[130px] h-[54] flex flex-col gap-3 ">
              <p className="flex gap-2 items-center">
                <input type="radio" id="timeClass" name="classType" value="회차반" onChange={radioHandler} />
                <label
                  htmlFor="timeClass"
                  className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]"
                >
                  회차반
                </label>
              </p>
              <p className="flex gap-2 items-center">
                <input type="radio" id="preiodClass" name="classType" value="기간반" onChange={radioHandler} />
                <label
                  htmlFor="preiodClass"
                  className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]"
                >
                  기간반
                </label>
              </p>
            </div>
          </div>
        ) : null}
        {/* 강사이름 필터링 */}
        {isClickedfilter.isClickedTeacherFilter ? (
          <div
            ref={teacherNameTypeRefClick}
            className="absolute left-[120px] flex gap-[5px] w-[195px] py-4 pl-4 pr-2 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]"
          >
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[42px] p-3 border rounded-lg border-gray-200 bg-gray-50 flex gap-2 focus:border-none focus-within:ring-1 focus-within:ring-[#7354E8]">
                <Image src={searchIcon} width={18} height={18} alt=" " />
                <input
                  type="text"
                  placeholder="강사이름"
                  value={searchTeacher}
                  className="w-full h-full focus:outline-none text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]"
                  onChange={event => {
                    SearchTeacherName(event)
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="max-h-[150px]  flex flex-col items-center gap-3 overflow-auto ">
                  {instructorList.map((data, i) => {
                    return (
                      <div key={i} className="w-full h-4 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={data.id}
                          checked={checkedTeacherNameList.includes(data.name) ? true : false}
                          className="hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                          onChange={e => {
                            if (e.target.checked) {
                              setCheckedTeacherNameList(checkedTeacherNameList => [
                                ...checkedTeacherNameList,
                                data.name
                              ])
                            } else {
                              setCheckedTeacherNameList(checkedTeacherNameList.filter(name => name !== data.name))
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
              {searchTeacher !== '' && sortFilterName.length !== 0 ? (
                <div className="absolute top-[62px] w-[162px] h-auto flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
                  {sortFilterName.map((teacherName, i) => {
                    return (
                      <div key={i} className="w-full flex items-center gap-2">
                        <Image src={searchIcon} width={14} height={14} alt=" " />
                        <span
                          className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px] hover:cursor-pointer"
                          id={teacherName}
                          onClick={e => {
                            let teacherName = e.currentTarget.id
                            if (checkedTeacherNameList.includes(teacherName)) {
                              setSearchTeacher('')
                            } else {
                              setCheckedTeacherNameList([...checkedTeacherNameList, e.currentTarget.id])
                              setSearchTeacher('')
                            }
                          }}
                        >
                          {/* 1글자만 입력시 */}
                          {searchTeacher.length === 1 && (
                            <>
                              {teacherName.split('').map((nameSplit: string, i) => {
                                if (nameSplit === searchTeacher) {
                                  return (
                                    <span
                                      key={i}
                                      className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]"
                                    >
                                      {searchTeacher}
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
                          {searchTeacher.length > 1 && teacherName === searchTeacher && (
                            <>
                              <span
                                key={i}
                                className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]"
                              >
                                {searchTeacher}
                              </span>
                            </>
                          )}
                          {/* 1글자 이상 입력 && 입력 글자 !== 찾고자 하는 강사 이름 */}
                          {searchTeacher.length > 1 && teacherName !== searchTeacher && (
                            <>
                              {teacherName.split(searchTeacher).map((nameSplit: string, i) => {
                                if (nameSplit === '') {
                                  return (
                                    <span
                                      key={i}
                                      className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px]"
                                    >
                                      {searchTeacher}
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
                        {/* 앞 순서부터만 색 변경 가능 이슈 고치기 */}
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* 카테고리명 대분류/소분류 필터링 */}
        {isClickedfilter.isClickedCategoryFilter ? (
          <div
            ref={categoryTypeRefClick}
            className="absolute left-[212.5px] flex flex-col w-[195px] h-auto p-4 gap-3 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]"
          >
            <div className="relative">
              <DropDown {...props1} handleChangeParentsCategoryData={handleChangeParentsCategoryData} />
              {/* 대분류 필터링 */}
            </div>
            <div className="relative">
              <DropDown {...subClassProps} handleChangeParentsCategoryData={handleChangeParentsCategoryData} />
              {/* 소분류 필터링 */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
