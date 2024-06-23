/* 'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useParams, useRouter } from 'next/navigation'
import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import ClassInfo from '@/components/class/edit/classInfo'
import ClassType from '@/components/class/edit/classType'
import TeacherInfo from '@/components/class/edit/teacherInfo'
import { getDurationLessons, getSesstionLessons, putSesstionLessons } from '@/lib/api/class' */
import SessionEdit from '@/components/class/edit/SessionEdit'
import instance from '@/lib/api/axios'
import { access } from 'fs'
import { getStaticPaths } from 'next/dist/build/templates/pages'


export interface IClassInfo {
  name: string
  memo: string
  category: {
    id: number
    name: string
    subId: number
    subName: string
  }
  categoryId: string
  categoryName: string
}

export interface IInfoValid {
  valid: boolean
  name: boolean
  category: boolean
}

export interface ITypeValid {
  valid: boolean
  fee: boolean
  schedule: boolean
}

export interface IClassType {
  type: string
  lessonTime: number
  tuitionFee: string
  totalSessions: string
  capacity: number
}

export interface ITeacherInfo {
  id: string
  name: string
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{id: '7'}]
}

/* const getSessionClassId = async () => {
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS
  const accessToken = typeof window !== 'undefined' && localStorage.getItem('acccessToken')
  const res = await fetch(`${IP_ADDRESS}/lessons/filters?type=session&page=1&take=10`,{
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }).then(res => {
    return res.json()
  })

  const sessions = await res.data.lessons

  return sessions.map((lessons: {id: string}) => ({
    id: String(lessons.id)
  }))
} */

export default async function EditPage({params}: {params: {id: string}}) {
  //const classId = await getSessionClassId()
  console.log('params', params.id)
  return <SessionEdit classId={params.id} />
}
