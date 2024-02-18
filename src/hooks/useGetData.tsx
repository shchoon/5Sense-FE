'use client'
import instance from '@/lib/api/axios'
import { useState } from 'react'
import { postVarType } from '@/app/(nav)/student/page'

export async function useGetData(
  type: string,
  page: number,
  searchBy?: string,
  inputValue?: string
) {
  if (searchBy) {
    const res = await instance(
      `/${type}?searchBy=${searchBy}&${searchBy}=${inputValue}&page=${page}`
    )
    const data = res.data.data
    return { data: data[`${type}`], meta: data.meta }
  } else {
    const res = await instance(`/${type}?searchBy=none&page=${page}`)
    const data = res.data.data
    return { data: data[`${type}`], meta: data.meta }
  }
}
