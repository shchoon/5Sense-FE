import '../app/globals.css'
import Image from "next/image"
import kakaoLogo from '../assets/logo/kakaoLogo.svg';
import naverLogo from '../assets/logo/naverLogo.svg';
import googleLogo from '../assets/logo/googleLogo.svg';
import appleLogo from '../assets/logo/appleLogo.svg';
import Script from 'next/script';

export default function SocialLoginBtn({socialLogo} :any) {

    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URI;
    console.log(GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URL)

    const loginBtnData:{title: string, logo: any, bgColor: any, borderColor: string, textColor:string,  alt: string, login: any}[] = [
        {
            title: '카카오 계정으로 로그인',
            logo: kakaoLogo,
            bgColor: 'bg-[#FFE812]',
            borderColor: 'border-[#FFE812]',
            textColor: 'text-[#374151]',
            alt: 'kakao',
            login: function kakaoLogin() {
                window.location.href = KAKAO_AUTH_URL;
            }
        },
        {
            title: '네이버 계정으로 로그인',
            logo: naverLogo,
            bgColor: 'bg-[#FFF]',
            borderColor: 'border-[#2BB500]',
            textColor: 'text-[#2BB500]',
            alt: 'naver',
            login: function naverLogin() {
                //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
                window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=wCIY4BCK_aQX4TYCnq8T&state=test_STRING&redirect_uri=http://localhost:3000/naver_login'
            }
        },
        {
            title: '구글 계정으로 로그인',
            logo: googleLogo,
            bgColor: 'bg-[#FFF]',
            borderColor: 'border-[#6B7280]',
            textColor: 'text-[#374151]',
            alt: 'google',
            login: function googleLogin() {
                //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
                window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=1029862850093-6eekvfv1b0qulsj3stq9ldtiupivqmce.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google_login&scope=profile email&response_type=code&access_type=offline'
            }
        },
        {
            title: '애플 계정으로 로그인',
            logo: appleLogo,
            bgColor: 'bg-[#FFF]',
            borderColor: 'border-[#6B7280]',
            textColor: 'text-[#374151]',
            alt: 'apple',
            login: function naverLogin() {
                //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
                window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=wCIY4BCK_aQX4TYCnq8T&state=test_STRING&redirect_uri=http://localhost:3000/naver_login'
            }
        }
    ]

    function kakaoLogin() {
        window.location.href = KAKAO_AUTH_URL;
    }

    function naverLogin() {
        //window.naver('wCIY4BCK_aQX4TYCnq8T', 'http://localhost:3000/naver_login');
        window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=wCIY4BCK_aQX4TYCnq8T&state=test_STRING&redirect_uri=http://localhost:3000/naver_login'
    }
    return (
        <>
        <Script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charSet="utf-8"></Script>
        <Script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></Script>
        {loginBtnData.map((data, i) => {
            return (
                <div className={`flex w-[430px] h-[52px] rounded-md ${data.bgColor} border ${data.borderColor}`} key={i} onClick={data.login}>
                    {data.alt === 'google' || data.alt === 'apple' ? <Image className="p-[15px]" src={data.logo}  width={48} height={48} alt={data.alt} />
                    : <Image src={data.logo} width={48} height={48} alt={data.alt} />}
                    <div className={`font-semibold w-[190px] h-[16px] leading-4 mt-[18px] mx-auto ${data.textColor}`}>{data.title}</div>
                </div>
            )
        })}
        </>
    )
}