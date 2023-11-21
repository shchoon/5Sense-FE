"use client"
import Script from 'next/script';
import SocialLogin from '@/components/SocialLogin';

/* declare global { // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
      Kakao: any;
      naver: any;
    }
  } */

export default function Login() {


    /* function kakaoInit() { // 페이지가 로드되면 실행
        window.Kakao.init();
        console.log(window.Kakao.isInitialized());
      } */

    /* function kakaoLogin() {
    window.Kakao.Auth.authorize({
        redirectUri: ', 
    });
    } */

    
    

    return(
        <>
        {/* <Script id='kakao_SDK' src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js" 
        integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH" 
        crossOrigin="anonymous" onLoad={kakaoInit}>
        </Script> */}
        <div className='w-[430px] h-[200px] flex flex-col items-start gap-2'>
            <SocialLogin />
        </div>
        </>    
    )
}
