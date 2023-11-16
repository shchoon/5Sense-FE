"use client"
import { useWindowSize } from "@/components/useWindowSize"
import Image from "next/image"
import graph from '../../../assets/images/graph.svg'

export default function MainPageWeek() {
    const { width, height } = useWindowSize()
    console.log(width)
    
    return(
        <>
        <div className="w-full h-screen flex flex-col items-start rounded-2xl shadow-mainPage bg-white xl:px-12 lg:px-6 md:px-12 px-6 pt-[60px] gap-4">
            <div className="mx-auto w-full max-w-[1480px] h-[251px] flex lg:gap-6 md:gap-0">
                <div className="w-full 2xl:max-w-[593px] 2xl:mr-0 xl:max-w-[361px] xl:mr-0 lg:max-w-[321px] lg:min-w-[321px] lg:mr-0 mr-4 h-full 
                flex flex-col gap-5 border border-gray-200 rounded-xl p-6 ">
                    <div className="w-full flex flex-col h-[65px]">
                        <span className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">전체 등록된 학생 수</span>
                        <span className="w-full text-black text-[28px] font-bold font-['Pretendard']">3,123,432 명</span>
                    </div>
                    <div className="w-full h-full flex items-end gap-[57px]">
                        <div className="flex w-full flex-col gap-[6px]">
                            <div className="flex">
                                <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] mr-2">40%</span>
                                <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">힐링요가</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] mr-2">60%</span>
                                <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">소도구요가</span>
                            </div>
                        </div>
                        <Image src={graph} width={118} height={118} alt="" />
                    </div>
                </div>
                <div className="w-full 2xl:max-w-[593px] xl:max-w-[361px] lg:max-w-[321px] lg:min-w-[321px] h-full 
                flex flex-col gap-[10px] border border-gray-200 rounded-xl p-6 ">
                    <div className="w-full flex flex-col h-[65px]">
                        <span className="text-gray-600 text-base font-medium font-['Pretendard'] leading-normal">전체 등록된 학생 수</span>
                        <span className="w-full text-black text-[28px] font-bold font-['Pretendard']">1,515,181,153원</span>
                    </div>
                    <div className="w-full h-full flex items-end gap-[57px]">
                        <div className="flex w-full flex-col gap-[6px]">
                            <div className="flex">
                                <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] mr-2">40%</span>
                                <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">힐링요가</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-800 text-xs font-bold font-['Pretendard'] leading-[18px] mr-2">60%</span>
                                <span className="text-gray-400 text-xs font-medium font-['Pretendard'] leading-[18px]">소도구요가</span>
                            </div>
                        </div>
                        <Image src={graph} width={118} height={118} alt="" />
                    </div>
                </div>
                {/* 메모장 */}
                {width > 1024 ? 
                <div className="max-w-[246px]  lg:w-full md:w-0 h-full border rounded-xl border-gray-200 p-6 ">
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
        <div className="absolute top-[537px] lg:top-[391px] md:top-[537px] w-full flex justify-center xl:px-12 lg:px-6 md:px-12 px-6">
            <div className="relative flex gap-[138px] items-center w-full max-w-[1016px]  border h-[52px] xl:max-w-[1016px] lg:max-w-[936px] md:w-full ">
                <div className="mx-auto w-[420px] h-full bg-slate-400">tab 1</div>
                <div className="absolute right-0 w-[160px] h-[44px] bg-blue-200">tab 2</div>
            </div>
        </div> : null}
        {/* 날짜 & 주,일,월 탭 1000px 미만 */}
        {width < 1000 ? 
        <div className="absolute top-[537px] w-full h-[52px] flex justify-end md:pr-12 pr-6">
            <div className="w-[492px] h-full border flex items-center gap-5">
                <div className="mx-auto w-[420px] h-full bg-slate-400">tab 1di</div>
                <div className="w-[160px] h-[44px] bg-blue-200">tab 2</div>
            </div>
        </div>
        : null}
            
        </>
    )
}