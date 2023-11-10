"use client"
import '../globals.css'
import Image from 'next/image'
import Script from 'next/script'
import { useState } from 'react';

declare global {
    interface Window {
      daum: any;
    }
  }

interface IAddr {
address: string;
zonecode: string;
}

export default function MyCenter() {
      
    const onClickAdd = () => {
        new window.daum.Postcode({
            oncomplete: function(data :any) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                console.log(data)
                setAddress(data.address + `  (${data.buildingName})`);
            }
        }).open();
    }

    let [address, setAddress] = useState<string>('')

    return(
        <>
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
        
        <div className='flex justify-center items-center h-[1080px] py-[272px] w-[1920px]  bg-[#F8FAFD]'>
        <div className='inline-flex w-[442px] h-[523px] border px-[6px] pt-3 pb-2 rounded-2xl gap-[10px] border-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)'>
            <form className='w-[430px] flex-col items-center flex-col gap-14'>
                <header className='flex flex-col items-center gap-[30px]'>
                    <div className='w-[60px] h-[60px] p-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
                        <path d="M20.3819 9.38885C20.5092 9.64801 20.5933 9.92555 20.631 10.2109L21.3271 20.5607L21.6726 25.7627C21.6762 26.2977 21.7601 26.8292 21.9217 27.3401C22.339 28.3314 23.3429 28.9615 24.4351 28.9175L41.0783 27.8289C41.799 27.817 42.495 28.0866 43.0131 28.5782C43.4449 28.988 43.7236 29.5239 43.8114 30.1004L43.8409 30.4505C43.1522 39.9873 36.1479 47.9417 26.6309 49.995C17.1139 52.0484 7.35466 47.7108 2.65177 39.3373C1.29597 36.9046 0.449126 34.2307 0.160955 31.4725C0.0405714 30.656 -0.0124363 29.8313 0.00244806 29.0064C-0.0124149 18.7819 7.26868 9.94242 17.4608 7.81144C18.6875 7.62044 19.8901 8.26983 20.3819 9.38885Z" fill="#917AE6"/>
                        <path d="M27.1749 0.502048C38.5746 0.792066 48.1557 8.98947 49.9999 20.0307L49.9823 20.1122L49.932 20.2307L49.939 20.5559C49.9129 20.9868 49.7465 21.4014 49.4598 21.7362C49.1612 22.085 48.7532 22.3226 48.3039 22.4148L48.0299 22.4524L28.8279 23.6965C28.1892 23.7595 27.5533 23.5536 27.0783 23.1299C26.6825 22.7768 26.4294 22.3002 26.3579 21.7867L25.0691 2.61266C25.0466 2.54782 25.0466 2.47754 25.0691 2.4127C25.0867 1.88418 25.3193 1.3846 25.715 1.02557C26.1107 0.666549 26.6365 0.477999 27.1749 0.502048Z" fill="#FCD9BD"/>
                        </svg>
                    </div>
                    <div className='w-[383px] h-[60px] flex flex-col items-center gap-2'>
                        <div className='text-2xl leading-normal text-center font-bold'>내 센터 정보를 입력해주세요.</div>
                        <div className='text-[13px] font-normal leading-normal text-center'>오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!</div>
                        {/* font-size 다름 */}
                    </div>
                </header>
                <div className='w-[430px] h-[250px] flex flex-col items-center mt-[40px]'>
                    <div className='w-[430px] h-[60px] flex items-center'>
                        <input className='w-full px-3 py-5 rounded-lg border border-[#6B7280]' placeholder='센터명' />
                    </div>
                    <div className='relative w-[430px] h-[61px] py-[20px] mt-[36px] flex flex-col items-center  rounded-lg border border-[#6B7280] bg-[#FFF]' onClick={onClickAdd}>
                        <input className='relative flex w-[406px] h-[61px] rounded-lg' placeholder='typing' value={address} />
                        <div className='absolute left-[12px] top-[-10px] w-[32px] h-[12px] p-[4px] bg-[#FFF] text-[12px] font-medium text-[#563AC0]'>주소</div>
                    </div>
                    <div className='w-[430px] h-[60px] mt-[35px]  border rounded-lg border-[#E5E7EB]'>
                        <input className='w-full px-3 py-5 rounded-lg border border-[#6B7280]' placeholder='대표번호' />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                <button className='w-[200px] px-6 py-[10px] mt-[15px] rounded-lg bg-[#7354E8] text-[#FFF] font-semibold'>등록</button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

