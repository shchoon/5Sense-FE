'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NaverCallback() {
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

    fetch(`${IP_ADDRESS}/auth/naver/login`, options)
      .then(res => {
        return res.json()
      })
      .then(result => {
        localStorage.setItem('accessToken', result.data.accessToken)
        localStorage.setItem('refreshToken', result.data.refreshToken)
        router.push('/home')
      })
      .catch(() => {
        alert('로그인을 다시 시도해주세요')
      })

    //토큰 받아서 프론트에서 저장 & 리프레시 토큰 저장
  }, [])
}
