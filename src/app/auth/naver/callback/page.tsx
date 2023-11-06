"use client"
import { useSearchParams, useRouter } from "next/navigation"

export default function NaverCallback() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    console.log(code, state);

    const res = require('/public/data/data.json');
    const num :number = Math.floor(Math.random() * 2);

    if(res[1].status[num] === 'success'){
        router.push('/main');
    }else {
        router.push('/login_error');
    }


    return (
        <div>네이버 계정으로 로그인 중입니다...</div>
    )
}