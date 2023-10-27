"use client"
import '../globals.css'
import Image from 'next/image'
import Script from 'next/script';
import SocialLogin from '@/components/SocialLogin';
import kakaoLogo from '../../assets/logo/kakaoLogo.svg';
import naverLogo from '../../assets/logo/naverLogo.svg';
import googleLogo from '../../assets/logo/googleLogo.svg';

/* declare global { // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
      Kakao: any;
      naver: any;
    }
  } */

export default function Login() {

    const KAKAO_REST_API_KEY = process.env.REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REDIRECT_URI;
    console.log(KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI)
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`

    /* function kakaoInit() { // 페이지가 로드되면 실행
        window.Kakao.init();
        console.log(window.Kakao.isInitialized());
      } */

    /* function kakaoLogin() {
    window.Kakao.Auth.authorize({
        redirectUri: ', 
    });
    } */

    function naverLogin() {
        //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
        window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=wCIY4BCK_aQX4TYCnq8T&state=test_STRING&redirect_uri=http://localhost:3000/naver_login'
    }
    

    return(
        <>
        {/* <Script id='kakao_SDK' src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js" 
        integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH" 
        crossOrigin="anonymous" onLoad={kakaoInit}>
        </Script> */}
        <Script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charSet="utf-8"></Script>
        <Script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></Script>
        <div className='w-[430px] h-[250px] flex flex-col items-start gap-2'>
            <SocialLogin />
        </div>
        </>    
    )
}

