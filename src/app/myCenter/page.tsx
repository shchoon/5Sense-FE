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

    let [address, setAddress] = useState<string>('');
    let [centerName, setCenterName] = useState<string>('');
    let [userNum, setUserNum] = useState<string>('');

    return(
        <>
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
        <form className="flex flex-col w-[430px] h-[297px] gap-5" onSubmit={e => {
            e.preventDefault();
            console.log(centerName);
            console.log(address);
            console.log(userNum);

            /* const options = {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({centerName, address, userNum})
            }

            fetch('url', options)
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            }) */
        }}>
        
        <div className='w-[430px] h-[209px] flex flex-col items-center gap-4'>
            <div className='w-[430px] h-[60px] flex items-center border rounded-lg border-[#E5E7EB]'>
                <input className='w-full px-3 py-5  rounded-lg border  outline-[#7354E8] '  placeholder='센터명' value={centerName} onChange={e => {
                    setCenterName(e.target.value);
                    
                }}/>
            </div>
            <div className='relative w-[430px] h-[60px]  flex items-center  rounded-lg border border-[#E5E7EB]' onClick={onClickAdd}>
                <input className='w-full px-3 py-5 rounded-lg border outline-[#7354E8]' placeholder='typing' value={address} />
                <div className='absolute left-3 top-[-12px] bg-[#FFF] focus:text-[#563AC0]' >주소</div>
            </div>
            <div className='w-[430px] h-[60px] border rounded-lg border-[#E5E7EB]'>
                <input className='w-full px-4 py-5 rounded-lg border outline-[#7354E8]' placeholder='대표번호' value={userNum} onChange={e => {
                    setUserNum(e.target.value);
                }} />
            </div>
        </div>
        <div className='flex justify-center items-center'>
        <button type='submit' className='w-[200px] px-6 py-[10px] rounded-lg bg-[#7354E8] text-[#FFF] font-semibold' >등록</button>
        </div>
        </form>
        </>
    )
}

