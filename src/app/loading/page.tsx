"use client"
import { useRouter } from "next/navigation"

export default function Loading() {
    
    const router = useRouter();

    setTimeout(() => {
        router.push('/main');
      }, 500);

    return (
        <div>로그인중입니다...</div>
    )
}