'use client'
import { useSearchParams } from 'next/navigation'

import Login from '@/utils/login'

export default function NaverCallback() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code') as string
  const state = searchParams.get('state') as string

  return <Login social='naver' code={code} state={state} />  
}
