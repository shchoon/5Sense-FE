'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchApi } from '@/hooks/useApi'

export default function GoogleCallbak() {
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, state })
    }

    fetchApi(`/auth/kakao/login`, 'POST', {
      code: code,
      state: state
    }).then(result => {
      localStorage.setItem('accessToken', result.data.accessToken)
      localStorage.setItem('refreshToken', result.data.refreshToken)
      localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
      router.push('/home')
    })

    //토큰 받아서 프론트에서 저장 & 리프레시 토큰 저장
  }, [])
}
