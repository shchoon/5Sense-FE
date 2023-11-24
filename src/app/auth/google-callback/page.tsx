"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function GoogleCallbak() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    console.log(window.location.href.split('&'))

    const res = require('/public/data/data.json');
    const num :number = Math.floor(Math.random() * 2);

    const state = searchParams.get('state');

    let [accessToken, setAccessToken] = useState<any>()
    let [refreshToken, setRefreshToken] = useState<any>()
    //const state = searchParams.get('state'); //state 값 인코딩하기
    //console.log(code);
    //console.log(state);

    /* const res = require('/public/data/data.json');
    const num :number = Math.floor(Math.random() * 2);

    if(res[0].status[num] === 'success'){
        router.push('/main');
    }else {
        router.push('/login_error');
    } */

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        console.log('state: ', state);
        console.log('code: ', code)
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code, state}) 
        }
        
        fetch('http://13.209.77.49:3000/auth/google/login', options)
        .then(res => res.json())
        /* 
        .then(result => {
            setAccessToken(result.data.accessToken);
            setRefreshToken(result.data.accessToken);
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);
            router.push('/)
        })
        .catch(() => {
            router.push('/login_error');
            alert('로그인을 다시 시도해주세요.')
        })
        */
        

        //토큰 받아서 프론트에서 저장 & 리프레시 토큰 저장 
    }, [])
    /* if(res[2].status[num] === 'success'){
        router.push('/main');
    }else {
        router.push('/login_error');
    } */

    return(
        <div>구글 계정으로 로그인 중입니다...</div>
    )
}