'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchApi } from '@/hooks/useApi'

export default function KakaoCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const postCodeAndState = () => {
    fetchApi(`/auth/kakao/login`, 'POST', {
      code: code,
      state: state
    }).then(result => {
      console.log(result)
      localStorage.setItem('accessToken', result.data.accessToken)
      localStorage.setItem('refreshToken', result.data.refreshToken)
      localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
      localStorage.setItem('hasCenter', result.data.hasCenter)
      localStorage.setItem('isNew', result.data.isNew)

      if (!result.data.isNew) {
        router.push('/home')
      } else {
        router.push('/myCenter')
      }
    })
  }

  useEffect(() => {
    postCodeAndState()
  }, [])

  /* 나중에 로딩 디자인 나오면 수정 예정 */
  return <div>카카오 계정으로 로그인중입니다...</div>
}
