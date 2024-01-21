'use client'
import instance from '@/hooks/useAxios'
import { useState } from 'react'
import { postVarType } from '@/app/(nav)/student/page'

export async function useSearchFeat(
  type: string,
  searchBy: string,
  inputValue: string
) {
  //const [getData, setGetData] = useState()
  /* const [postVar, setPostVar] = useState<postVarType>({
    page: '',
    cursor: '',
    hasNextPage: true
  }) */
  const res = await instance(
    `/${type}?searchBy=${searchBy}&${searchBy}=${inputValue}`
  )

  const data = res.data.data
  return data
  /* setGetData(data.students)
  if (data.meta.hasNextPage) {
    let cursorIndex = data.students.length - 1
    setPostVar(prePostVariable => ({
      ...prePostVariable,
      page: data.meta.page,
      cursor: data.students[cursorIndex].id,
      hasNextPage: data.meta.hasNextPage
    }))
  } else {
    setPostVar(prePostVar => ({
      ...prePostVar,
      hasNextPage: false
    }))
  }
  return [getData, postVar] */
}
