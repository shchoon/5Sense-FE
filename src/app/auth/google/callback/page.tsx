'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import instance from '@/lib/api/axios'

export default function GoogleCallbak() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const postCode = () => {
    instance
      .post('/auth/google/login', {
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
        if (res.data.data.isNew) {
          router.push('/myCenter/agreement')
        } else {
          router.push('/home')
        }
      })
      .catch(() => {
        alert('err')
      })
  }

  useEffect(() => {
    postCode()
  }, [])
}
