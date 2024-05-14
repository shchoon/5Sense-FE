'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import instance from '@/lib/api/axios'

interface data {
  code: string | null
  state: string | null
}

export default function KakaoCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const postCode = () => {
    instance
      .post('/auth/kakao/login', {
        code: code,
        state: state
      })
      .then(res => {
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
        localStorage.setItem('accessTokenExp', res.data.data.accessTokenExp)
        localStorage.setItem('hasCenter', res.data.data.hasCenter)
        localStorage.setItem('isNew', res.data.data.isNew)
        localStorage.setItem('social', res.data.data.type)
        /* if (res.data.data.isNew) {
          router.push('/myCenter/agreement')
        } else {
          router.push('/home')
        } */
      })
      .catch(error => {
        alert('error')
      })
  }

  useEffect(() => {
    postCode()
  }, [])

  /* 나중에 로딩 디자인 나오면 수정 예정 */
  return <div>카카오 계정으로 로그인중입니다...</div>
}
