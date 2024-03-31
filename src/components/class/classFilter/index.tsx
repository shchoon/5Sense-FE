import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import DropDown from '@/components/common/DropDown'
import FilterSearchName from '@/components/common/FilterSearchName'
import { filterState } from '@/lib/filter/filterState'

import chevronDownBlue from 'public/assets/icons/chevron/chevron-down-blue.svg'
import chevronUpBlue from 'public/assets/icons/chevron/chevron-up-blue.svg'
import instance from '@/lib/api/axios'

export interface instructorDataType {
  id: string
  name: string
  phone: string
}

export interface classifyListType {
  id: number
  name: string
}

interface categoryType {
  mainCategory: { id: number; name: string }[]
  subCategory: { id: number; name: string; parentId: number }[]
}

export default function ClassFilter() {
  const setFilterState = useSetRecoilState(filterState)
  const filterValue = useRecoilValue(filterState)
  const [isClickedfilter, setIsClickedfilter] = useState({
    isClickedCategoryFilter: false,
    isClickedClassFilter: false,
    isClickedTeacherFilter: false
  })

  const [classType, setClassType] = useState<string>('')
  const [checkedNameList, setCheckedNameList] = useState<string[]>([])
  const [categoryList, setCategoryList] = useState<categoryType>({
    mainCategory: [],
    subCategory: []
  })
  const [categoryData, setCategoryData] = useState({
    mainClass: '카테고리',
    mainClassId: '',
    subClass: '',
    subClassId: ''
  })
  const [subClassProps, setSubClassProps] = useState<{ title: string; list: any; type: string }>({
    title: '소분류 선택',
    list: [{ name: '없음' }],
    type: 'category'
  })

  const categoryProps = {
    main: {
      title: '대분류 선택',
      list: categoryList.mainCategory,
      type: 'category'
    },
    sub: {
      title: '소분류 선택'
    }
  }

  const handleChangeParentsCategoryData = (data: any, type: string) => {
    if (type === 'main') {
      setCategoryData(prev => ({
        ...prev,
        mainClass: data.title,
        mainClassId: data.id
      }))
    } else if (type === 'sub') {
      setCategoryData(prev => ({
        ...prev,
        subClass: data.title,
        subClassId: data.id
      }))
      setIsClickedfilter(prev => ({
        ...prev,
        isClickedCategoryFilter: false
      }))
    }
  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '기간반') {
      setClassType('기간반')
      setFilterState(prev => ({
        ...prev,
        classType: 'duration'
      }))
    } else if (event.target.value === '회차반') {
      setClassType('회차반')
      setFilterState(prev => ({
        ...prev,
        classType: 'session'
      }))
    }

    setIsClickedfilter(prev => ({
      ...prev,
      isClickedClassFilter: false
    }))
  }

  function getCheckedName() {
    if (filterValue.teacherName.length === 1) {
      return `${filterValue.teacherName[0]}`
    } else if (filterValue.teacherName.length == 2) {
      return `${filterValue.teacherName[0]},${filterValue.teacherName[1]}`
    } else {
      return `${filterValue.teacherName[0]},${filterValue.teacherName[1]},${filterValue.teacherName[2][0]}..`
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

  const handleClickClassInside = () => {
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

  const sortedMainCategory = (data: any) => {
    if (data.name === '기타') {
      return 1
    } else {
      return -1
    }
  }

  useEffect(() => {
    instance.get('/lesson-categories').then(res => {
      const data: categoryType = res.data.data
      const mainCategory = data.mainCategory.toSorted((a, b) => sortedMainCategory(a))
      setCategoryList(prev => ({
        ...prev,
        mainCategory: mainCategory,
        subCategory: data.subCategory
      }))
    })
  }, [])

  useEffect(() => {
    if (categoryData.mainClass !== '카테고리') {
      setSubClassProps(prev => ({
        ...prev,
        list: categoryList.subCategory.filter(data => data.parentId === Number(categoryData.mainClassId))
      }))
      setFilterState(prev => ({
        ...prev,
        mainCategoryId: categoryData.mainClassId,
        subCategoryId: categoryData.subClassId !== '' ? categoryData.subClassId : ''
      }))
    }
  }, [categoryData])

  return (
    <div className="flex flex-col gap-2 h-[50px]">
      <div className="w-full h-[37px] items-start gap-2 flex">
        <button
          ref={classTypeRef}
          className="group flex items-center gap-2 w-[120px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={e => {
            handleClickClassInside()
          }}
        >
          <span className="w-20 text-sm indigo-500-semibold group-hover:text-white group-focus:text-white">
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
          className="group flex items-center gap-2 max-w-[160px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9] focus-within:text-white"
          onClick={() => {
            handleClickTeacherInside()
          }}
        >
          <span className="max-w-[120px] text-sm indigo-500-semibold group-hover:text-white group-focus:text-white">
            {filterValue.teacherName.length === 0 ? '강사명' : getCheckedName()}
          </span>
          {isClickedfilter.isClickedTeacherFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
        <button
          ref={categoryTypeRef}
          className="group flex items-center gap-2 max-w-[200px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={() => {
            handleClickCategoryInside()
          }}
        >
          <span className="max-w-[150px] text-sm indigo-500-semibold group-hover:text-white group-focus:text-white">
            {categoryData.mainClass} {categoryData.subClass !== '' && `/ ${categoryData.subClass}`}
          </span>
          {isClickedfilter.isClickedCategoryFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
      </div>
      <div className="relative">
        {/* 필터링 UI 기준점 */}
        {/* 기간반/회차반 필터링 */}
        {isClickedfilter.isClickedClassFilter ? (
          <div
            ref={classTypeRefClick}
            className="absolute w-[150px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white"
          >
            <div id="classTypeFilter" className="w-[130px] h-[54] flex flex-col gap-3 ">
              <p className="flex gap-2 items-center">
                <input
                  className="cursor-pointer"
                  type="radio"
                  id="timeClass"
                  name="classType"
                  value="회차반"
                  checked={classType === '회차반' && true}
                  onChange={radioHandler}
                />
                <label htmlFor="timeClass" className="gray-900-semibold text-sm cursor-pointer">
                  회차반
                </label>
              </p>
              <p className="flex gap-2 items-center cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="radio"
                  id="preiodClass"
                  name="classType"
                  value="기간반"
                  checked={classType === '기간반' && true}
                  onChange={radioHandler}
                />
                <label htmlFor="preiodClass" className="gray-900-semibold text-sm cursor-pointer">
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
            <FilterSearchName />
          </div>
        ) : null}
        {/* 카테고리명 대분류/소분류 필터링 */}
        {isClickedfilter.isClickedCategoryFilter ? (
          <div
            ref={categoryTypeRefClick}
            className="absolute left-[212.5px] flex flex-col w-[195px] h-auto p-4 gap-3 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]"
          >
            <div className="relative">
              <DropDown {...categoryProps.main} handleChangeParentsCategoryData={handleChangeParentsCategoryData} />
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
