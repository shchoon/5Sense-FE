import Image from 'next/image'
import kakaoLogo from 'public/assets/logo/kakaoLogo.svg'
import naverLogo from 'public/assets/logo/naverLogo.svg'
import googleLogo from 'public/assets/logo/googleLogo.svg'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

export default function SocialLoginBtn() {
  function generateState() {
    let result = ''
    let basis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0
    while (counter < basis.length) {
      result += basis.charAt(Math.floor(Math.random() * basis.length))
      counter++
    }
    return result
  }
  const state = generateState()
  const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL + state
  const NAVER_AUTH_URL = process.env.NEXT_PUBLIC_NAVER_AUTH_URL + state
  const GOOGLE_AUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL + state

  const router = useRouter()
  const loginBtnData: {
    title: string
    logo: any
    bgColor: any
    borderColor: string
    textColor: string
    alt: string
    login: any
  }[] = [
    {
      title: '카카오 계정으로 로그인',
      logo: kakaoLogo,
      bgColor: 'bg-[#FFE812]',
      borderColor: 'border-[#FFE812]',
      textColor: 'text-[#374151]',
      alt: 'kakao',
      login: async function kakaoLogin() {
        window.location.href = KAKAO_AUTH_URL
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
        window.location.href = NAVER_AUTH_URL
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
        window.location.href = GOOGLE_AUTH_URL
      }
    }
  ]

  return (
    <>
      <Script
        type="text/javascript"
        src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
        charSet="utf-8"
      ></Script>
      <Script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></Script>
      {loginBtnData.map((data, i) => {
        return (
          <div
            className={`flex w-[430px] h-[52px] rounded-md ${data.bgColor} border ${data.borderColor} cursor-pointer`}
            key={i}
            onClick={data.login}
          >
            {data.alt === 'google' ? (
              <Image className="p-[15px]" src={data.logo} width={48} height={48} alt={data.alt} />
            ) : (
              <Image src={data.logo} width={48} height={48} alt={data.alt} />
            )}
            <div className={`font-semibold w-[190px] h-[16px] mt-[18px] mx-auto leading-4 ${data.textColor}`}>
              {data.title}
            </div>
          </div>
        )
      })}
    </>
  )
}
