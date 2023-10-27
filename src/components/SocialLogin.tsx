import Image from "next/image"
import kakaoLogo from '../assets/logo/kakaoLogo.svg';
import naverLogo from '../assets/logo/naverLogo.svg';
import googleLogo from '../assets/logo/googleLogo.svg';

export default function SocialLoginBtn({socialLogo} :any) {

    const loginBtnData:{title: string, logo: any, bg: any, border: string, text:string,  alt: string}[] = [
        {
            title: '카카오 계정으로 로그인',
            logo: kakaoLogo,
            bg: '#FFE812',
            border: '#FFE812',
            text: '#374151',
            alt: 'kakao'
        },
        {
            title: '네이버 계정으로 로그인',
            logo: naverLogo,
            bg: '#FFF',
            border: '#2BB500',
            text: '#2BB500',
            alt: 'naver'
        },
        {
            title: '구글 계정으로 로그인',
            logo: googleLogo,
            bg: '#FFF',
            border: '#6B7280',
            text: '#374151',
            alt: 'google'
        },
        {
            title: '구글 계정으로 로그인',
            logo: googleLogo,
            bg: '#FFF',
            border: '#6B7280',
            text: '#374151',
            alt: 'apple'
        }
    ]
    return (
        <>
        {loginBtnData.map((data, i) => {
            console.log(data.bg)
            return (
                <div className={`flex w-[430px] h-[52px] rounded-md bg-[${data.bg}] border border-[${data.border}]` }  key={i}>
                    {data.alt !== 'google' ? <Image src={data.logo} width={48} height={48} alt={data.alt} />
                    : <Image className="p-[15px]" src={data.logo} width={48} height={48} alt={data.alt} />}
                    <div className={`font-semibold w-[190px] h-[16px] leading-4 mt-[18px] mx-auto text-[${data.text}]`}  >{data.title}</div>
                </div>
            )
        })}
        </>
    )
}