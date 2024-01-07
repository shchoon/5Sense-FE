'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchApi } from '@/hooks/useApi'
import local from 'next/font/local'

export default function KakaoCallback() {
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
      body: JSON.stringify({ code: code, state: state })
    }

    fetchApi(`/auth/kakao/login`, 'POST', {
      code: code,
      state: state
    }).then(result => {
      console.log(result)
      localStorage.setItem('accessToken', result.data.accessToken)
      localStorage.setItem('refreshToken', result.data.refreshToken)
      localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
      if (result.data.hasNextPage) {
        router.push('/home')
      } else {
        router.push('/myCenter')
      }
    })
    /* fetch(`${IP_ADDRESS}/auth/kakao/login`, options)
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
      }) */

    //토큰 받아서 프론트에서 저장 & 리프레시 토큰 저장
  }, [])

  return <div>카카오 계정으로 로그인중입니다...</div>
}
