"use client"
import '../globals.css'
import Image from 'next/image'
import Script from 'next/script';

declare global { // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
      Kakao: any;
      naver: any;
    }
  }

export default function Login() {

    function kakaoInit() { // 페이지가 로드되면 실행
        window.Kakao.init('6bc5fda37065e978c7091b6f1987a7c2');
        console.log(window.Kakao.isInitialized());
      }

    function kakaoLogin() {
    window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/kakao_login', 
    });
    }

    function naverLogin() {
        //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
        window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=wCIY4BCK_aQX4TYCnq8T&state=test_STRING&redirect_uri=http://localhost:3000/naver_login'
    }
    

    return(
        <>
        <Script id='kakao_SDK' src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js" 
        integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH" 
        crossOrigin="anonymous" onLoad={kakaoInit}>
        </Script>
        <Script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charSet="utf-8"></Script>
        <Script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></Script>
        <div className='w-[430px] h-[250px] flex flex-col items-start gap-2'>
            <div className='flex w-[430px] h-[52px] rounded-md bg-[#FFE812]'>
                <svg xmlns="http://www.w3.org/2000/svg" className='my-0.5 ml-2' width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M23.9997 14.6934C18.43 14.6934 13.915 18.2534 13.915 22.6448C13.915 25.4838 15.8026 27.9751 18.642 29.3818C18.4875 29.9145 17.6494 32.809 17.616 33.0364C17.616 33.0364 17.5959 33.2072 17.7065 33.2724C17.8172 33.3375 17.9473 33.2869 17.9473 33.2869C18.2646 33.2426 21.6266 30.8811 22.2085 30.471C22.7898 30.5533 23.3884 30.5961 23.9997 30.5961C29.5693 30.5961 34.0843 27.0362 34.0843 22.6448C34.0843 18.2534 29.5693 14.6934 23.9997 14.6934Z" fill="#381F1F"/>
                </svg>
                <div className='font-semibold w-[190px] h-[16px] leading-4 mt-[18px] mx-auto' onClick={kakaoLogin}>카카오 계정으로 로그인</div>
            </div>
            <div className='flex w-[430px] h-[52px] rounded-md border border-[#2BB500]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M15.6729 16.6528V31.3467H21.4486V23.5498L26.9354 31.3467H32.3259V16.6528H26.9354V24.6493L21.4486 16.6528H15.6729Z" fill="#2BB500"/>
                </svg>
                <div className='mx-auto font-semibold h-[16px] leading-4 mt-[18px] text-[#2BB500]' onClick={naverLogin}>네이버 계정으로 로그인</div>
            </div>
            <div className='flex w-[430px] h-[52px] rounded-md border border-[#6B7280]'>
                <svg className='p-[15px]' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 18 18" fill="none">
                <g clip-path="url(#clip0_1045_4962)">
                    <path d="M17.8242 9.20731C17.8242 8.59552 17.7746 7.98041 17.6688 7.37854H9.17969V10.8443H14.041C13.8393 11.962 13.1911 12.9508 12.242 13.5792V15.8279H15.1422C16.8453 14.2604 17.8242 11.9455 17.8242 9.20731Z" fill="#4285F4"/>
                    <path d="M9.18032 18.0006C11.6077 18.0006 13.6547 17.2036 15.1461 15.8279L12.2459 13.5792C11.439 14.1281 10.3973 14.439 9.18363 14.439C6.83566 14.439 4.84484 12.8549 4.13053 10.7252H1.1377V13.0434C2.66553 16.0826 5.77742 18.0006 9.18032 18.0006Z" fill="#34A853"/>
                    <path d="M4.12659 10.7252C3.74959 9.60745 3.74959 8.39709 4.12659 7.27933V4.96112H1.13706C-0.139438 7.5042 -0.139438 10.5003 1.13706 13.0434L4.12659 10.7252Z" fill="#FBBC04"/>
                    <path d="M9.18032 3.56224C10.4634 3.5424 11.7036 4.02523 12.6328 4.9115L15.2024 2.34196C13.5753 0.814129 11.4159 -0.0258495 9.18032 0.000606499C5.77742 0.000606499 2.66553 1.91867 1.1377 4.96111L4.12722 7.27931C4.83823 5.1463 6.83235 3.56224 9.18032 3.56224Z" fill="#EA4335"/>
                </g>
                <defs>
                    <clipPath id="clip0_1045_4962">
                    <rect width="18" height="18" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <div className='mx-auto font-semibold h-[16px] leading-4 mt-[18px]'>구글 계정으로 로그인</div>
            </div>
            <div className='w-[430px] h-[52px] rounded-md border border-[#6B7280]'>애플 계정으로 로그인</div>
        </div>
        </>    
    )
}

