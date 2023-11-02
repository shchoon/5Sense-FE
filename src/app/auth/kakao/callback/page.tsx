"use client"
import { useRouter } from "next/navigation"

export default function Callback() {
    
    const router = useRouter();

    setTimeout(() => {
        router.push('/main');
      }, 500);

    function generateState() {
        let result = '';
        let basis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let counter = 0;
        while(counter < basis.length){
            result += basis.charAt(Math.floor(Math.random() * basis.length));
            counter ++;
        }
        return result;
    }
    /* function postLogin() {
        const state = generateState();
        const key = 'asd' // 암호화하기   
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state, key}) 
        }
        fetch('url', options)
        .then(res => res.json())
        .then(result => {
            router.push('/');
            console.log(result)
        })
    } */
    return (
        <div>로그인중입니다...</div>
    )
}