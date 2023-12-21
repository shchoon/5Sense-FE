'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Loading() {
  const router = useRouter()

  /* const res = require('/public/data/data.json');
    const num: number = Math.floor(Math.random() * res.length);
    console.log(res, num);
    console.log(res[num].status)

    if(res[num].status === 'success'){
        router.push('/main');
    }else if(res[num].status === 'fail'){
        router.push('/login_error')
    } */

  setTimeout(() => {
    router.push('/main')
  }, 500)

  return <div>로그인중입니다...</div>
}
