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
        
        
        <div className='w-[430px] h-[209px] flex flex-col items-center gap-4'>
            <div className='w-[430px] h-[60px] flex items-center border rounded-lg border-[#E5E7EB]'>
                <input className='w-full px-3 py-5  rounded-lg border  outline-[#7354E8] '  placeholder='센터명' />
            </div>
            <div className='relative w-[430px] h-[62px]  flex flex-col items-center  rounded-lg border border-[#6B7280] bg-[#FFF]' onClick={onClickAdd}>
                <input className=' flex w-full py-[20px] h-[21px] rounded-lg' placeholder='typing' value={address} />
            </div>
            <div className='w-[430px] h-[60px] border rounded-lg border-[#E5E7EB]'>
                <input className='w-full px-3 py-5 rounded-lg border border-[#6B7280]' placeholder='대표번호' />
            </div>
        </div>
        <div className='flex justify-center items-center'>
        <button className='w-[200px] px-6 py-[10px] mt-[15px] rounded-lg bg-[#7354E8] text-[#FFF] font-semibold'>등록</button>
        </div>
        </>
    )
}

