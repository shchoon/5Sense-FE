"use client"
import { useSearchParams, useRouter } from "next/navigation";

export default function GoogleCallbak() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    console.log(window.location.href.split('&'))

    const res = require('/public/data/data.json');
    const num :number = Math.floor(Math.random() * 2);

    /* if(res[2].status[num] === 'success'){
        router.push('/main');
    }else {
        router.push('/login_error');
    } */

    return(
        <div>구글 계정으로 로그인 중입니다...</div>
    )
}