'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import instance from '@/lib/api/axios'

export default function NaverCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const postCode = () => {
    instance
      .post('/auth/naver/login', {
        code: code,
        state: state
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
        localStorage.setItem('accessTokenExp', res.data.data.accessTokenExp)
        localStorage.setItem('hasCenter', res.data.data.hasCenter)
        localStorage.setItem('isNew', res.data.data.isNew)
        localStorage.setItem('social', res.data.data.type)
        if (!res.data.data.isNew) {
          router.push('/home')
        } else {
          router.push('/myCenter')
        }
      })
      .catch(err => {
        console.log(err)
        //alert('err')
      })
  }

  useEffect(() => {
    postCode()
  }, [])
}
