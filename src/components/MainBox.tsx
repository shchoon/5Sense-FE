"use client"
import { useWindowSize } from "@/components/useWindowSize"
import Image from "next/image"
import graph from '../assets/images/graph.svg'
import calender from '../assets/icons/calendar.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'

export default function MainBox() {

    const { width, height } = useWindowSize()
    console.log(width);

    const studentNum = [
        {
            bg_color : 'bg-[#563AC0]',
            percentage : '30%',
            className: '요가'
        },
        {
            bg_color : 'bg-primary-600',
            percentage : '20%',
            className: '필라테스'
        },
        {
            bg_color : 'bg-[#9B81FE]',
            percentage : '15%',
            className: '소도구 필라테스'
        },
        {
            bg_color : 'bg-primary-200',
            percentage : '10%',
            className: '플라잉 요가'
        },
        {
            bg_color : 'bg-gray-200',
            percentage : '10%',
            className: '체형 교정 및 ...'
        }
    ]

    return(
        <>
        <div className="w-full flex items-start rounded-2xl shadow-mainPage pt-[60px] ">
            <div className=" w-full xl:max-w-[1480px] lg:max-w-[1016px] h-[251px] flex lg:gap-6 md:gap-0">
                <div className="w-full 2xl:max-w-[593px] 2xl:mr-0 xl:max-w-[361px] xl:mr-0 lg:max-w-[321px] lg:min-w-[321px] lg:mr-0 mr-4 h-full 
                flex flex-col gap-5 border border-gray-200 rounded-xl p-6 ">
                    <div className="w-full flex flex-col h-[65px]">
                        <span className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">전체 등록된 학생 수</span>
                        <span className="w-full text-black text-[28px] font-bold font-['Pretendard']">3,123,432 명</span>
                    </div>
                    <div className="w-full h-full flex items-end gap-[57px]">
                        <div className="flex w-full flex-col gap-[6px]">
                            {studentNum.map((data, i) => {
                                return(
                                    <div key={i} className="flex gap-1 items-center">
                                        <span className={`w-3 h-[9px] rounded-[3px] ${data.bg_color}`}></span>
                                        <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] ">{data.percentage}</span>
                                        <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">{data.className}</span>
                                    </div>        
                                )
                            })}
                            
                        </div>
                        <Image src={graph} width={118} height={118} alt="" />
                    </div>
                </div>
                <div className="w-full 2xl:max-w-[593px] xl:max-w-[361px] lg:max-w-[321px] lg:min-w-[321px] h-full 
                flex flex-col gap-[10px] border border-gray-200 rounded-xl p-6 ">
                    <div className="w-full flex flex-col h-[65px]">
                        <span className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">지난달 수입</span>
                        <span className="w-full text-black text-[28px] font-bold font-['Pretendard']">1,515,181,153원</span>
                    </div>
                    <div className="w-full h-full flex items-end gap-[57px]">
                        <div className="flex w-full flex-col gap-[6px]">
                            {studentNum.map((data, i) => {
                                return(
                                    <div key={i} className="flex gap-1 items-center">
                                        <span className={`w-3 h-[9px] rounded-[3px] ${data.bg_color}`}></span>
                                        <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] ">{data.percentage}</span>
                                        <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">{data.className}</span>
                                    </div>        
                                )
                            })}
                            
                        </div>
                        <Image src={graph} width={118} height={118} alt="" />
                    </div>
                </div>
                {/* 메모장 */}
                {width > 1024 ? 
                <div className=" lg:w-full md:w-0 h-full border rounded-xl border-gray-200 p-6 ">
                    <div className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">센터 메모</div>
                    <textarea placeholder="메모를 적어보세요" className="w-full h-full border-0 pl-0 focus:ring-0" />
                </div> : null}
                
                {/* <div className="max-w-[593px] h-full flex flex-col gap-[10px] border border-gray-200 rounded-xl p-6 ">

                </div>
                <div className="max-w-[246px] h-full flex flex-col gap-[10px] border border-gray-200 rounded-xl p-6">

                </div> */}
            </div>
            {/* 메모장 태블릿 */}
            {width <= 1024 ? 
            <div className="w-full h-[144px] border rounded-xl border-gray-200 p-5 ">
                <div className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">센터 메모</div>
                <textarea placeholder="메모를 적어보세요" className="w-full border-0 pl-0 focus:ring-0" />
            </div> : null}
        </div>
        {/* 날짜 & 주,일,월 탭 1000px 이상*/}
        {width >= 1000 ? 
        <div className="mt-[80px] w-full flex ">
            <div className="relative mx-auto flex gap-[138px] items-center w-full max-w-[1016px]  h-[52px] xl:max-w-[1016px] lg:max-w-[936px] md:w-full ">
                <div className="flex mx-auto w-[420px] h-full p-1.5 border rounded-md border-gray-100 bg-primary-50 ">
                    <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
                        <Image src={chevronLeft} width={24} height={24} alt=" " />
                    </div>
                    <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
                        <Image src={calender} width={18} height={18} alt=" " />
                        <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">2023년 10월 1주차</span>
                    </div>
                    <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center">
                        <Image src={chevronRight} width={24} height={24} alt=" " />
                    </div>
                </div>
                <div className="absolute right-0 flex items-center w-[160px] h-[44px] border rounded-full border-gray-200">
                    <div className="w-[33.33%] px-3 py-1.5 rounded-full hover:bg-primary-60">
                        <p className="text-gray-500  text-base text-center font-medium font-['Pretendard'] leading-normal ">일</p>
                    </div>
                    <div className="w-[33.33%] px-3 py-1.5 rounded-full hover:bg-primary-600">
                        <p className="text-gray-500 text-base text-center font-medium font-['Pretendard'] leading-normal hover:text-white">주</p>
                    </div>
                    <div className="w-[33.33%] px-3 py-1.5 rounded-full hover:bg-primary-600">
                        <p className="text-gray-500 text-base text-center font-medium font-['Pretendard'] leading-normal hover:text-white">월</p>
                    </div>
                </div>
            </div>
        </div> : null}
        {/* 날짜 & 주,일,월 탭 1000px 미만 */}
        {width < 1000 ? 
        <div className="absolute top-[537px] w-full h-[52px] flex md:px-12 px-6">
            <div className="relative w-full flex">
                <div className="mx-auto w-[312px] md:w-[300px]  h-full bg-slate-400">tab 1</div>
                <div className="absolute right-0 w-[160px] h-[44px] bg-blue-200">tab 2</div>
            </div>
        </div>
        : null}
        </>
    )
}