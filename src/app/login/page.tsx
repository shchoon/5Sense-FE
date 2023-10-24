"use client"
import '../globals.css'
import Image from 'next/image'
import Script from 'next/script';
import kakaoLogo from '../../assets/logo/kakaoLogo.svg';
import naverLogo from '../../assets/logo/naverLogo.svg';
import googleLogo from '../../assets/logo/googleLogo.svg';

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
                <Image src={kakaoLogo} width={48} height={48} alt='kakaoLogo' />
                <div className='font-semibold w-[190px] h-[16px] leading-4 mt-[18px] mx-auto' onClick={kakaoLogin}>카카오 계정으로 로그인</div>
            </div>
            <div className='flex w-[430px] h-[52px] rounded-md border border-[#2BB500]'>
                <Image src={naverLogo} width={48} height={48} alt='naverLogo' />
                <div className='mx-auto font-semibold h-[16px] leading-4 mt-[18px] text-[#2BB500]' onClick={naverLogin}>네이버 계정으로 로그인</div>
            </div>
            <div className='flex w-[430px] h-[52px] rounded-md border border-[#6B7280]'>
                <Image className='p-[15px]' src={googleLogo} width={48} height={48} alt='googleLogo' />
                <div className='mx-auto font-semibold h-[16px] leading-4 mt-[18px]'>구글 계정으로 로그인</div>
            </div>
            <div className='w-[430px] h-[52px] rounded-md border border-[#6B7280]'>애플 계정으로 로그인</div>
        </div>
        </>    
    )
}

