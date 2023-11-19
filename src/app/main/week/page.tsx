"use client"
import { useWindowSize } from "@/components/useWindowSize"
import Image from "next/image"
import graph from '../../../assets/images/graph.svg'
import calender from '../../../assets/icons/calendar.svg'
import chevronLeft from '../../../assets/icons/chevron-left.svg'
import chevronRight from '../../../assets/icons/chevron-right.svg'

export default function MainPageWeek() {
    const { width, height } = useWindowSize()
    console.log(width);

    const dateData :{day: string, date: number}[]= [
        {
            day: '일요일',
            date: 5
        },
        {
            day: '월요일',
            date: 6
        },
        {
            day: '화요일',
            date: 7
        },
        {
            day: '수요일',
            date: 8
        },
        {
            day: '목요일',
            date: 9
        },
        {
            day: '금요일',
            date: 10
        },
        {
            day: '토요일',
            date: 11
        },
    ]

    const classData = [
        {
            time: '09:00',
            classInfo: [
                {
                    classTime : {time : '10:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '10:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    periodTime : {time : '10:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    classTime : {time : '10:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'} 
                },
                {
        
                },
                {
        
                },
                {
                    classTime : {time : '10:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '10:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    classTime : {time : '10:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                }
            ]
        },
        {
            time: '11:00',
            classInfo: [
                {
                    periodTime : {time : '11:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    periodTime : {time : '11:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {

                },
                {
        
                },
                {
        
                },
                {
                    periodTime : {time : '11:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    classTime : {time : '11:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                }
            ]
        },
        {
            time: '12:00',
            classInfo: [
                {

                },
                {
                    classTime : {time : '12:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},                
                },
                {
                    periodTime : {time : '12:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'} 
                },
                {
                    classTime : {time : '12:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '12:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    classTime : {time : '12:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                },
                {

                },
                {

                }
            ]
        },
        {
            time: '13:00',
            classInfo: [
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                },
                {

                },
                {

                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                }
            ]
        },
        {
            time: '14:00',
            classInfo: [
                {

                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                },
                {
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                },
                {

                },
                {

                }
            ]
        },
        {
            time: '15:00',
            classInfo: [
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'},
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {

                },
                {

                },
                {

                },
                {
                    periodTime : {time : '13:00', classTime : '90분', className: '반야사요가', teacherName: '정은담'}
                },
                {
                    classTime : {time : '13:00', classTime : '90분', className: '체형 교정 및 이완을 통한 삶의 균형 찾기', teacherName: '조성훈'}
                }
            ]
        }
        
    ]

    //console.log(classData[1].classTime === undefined)
    
    return(
        <div className="w-full h-[2000px]">
        <div className="w-full  flex flex-col items-start rounded-2xl shadow-mainPage bg-white xl:px-12 lg:px-6 md:px-12 px-6 pt-[60px] gap-4">
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
        {/* <div className="absolute top-[537px] lg:top-[391px] md:top-[537px] w-full flex xl:px-12 lg:px-6 md:px-12 px-6">
            <div className="relative flex items-center w-full max-w-[1016px]  border h-[52px] xl:max-w-[1016px] lg:max-w-[936px] md:w-full ">
                <div className="mx-auto z-1 max-w-[420px] w-full  h-full bg-slate-400">tab 1</div>
                <div className="absolute z-1 right-0 w-[160px] h-[44px] bg-blue-200">tab 2</div>
            </div>
        </div> */}
        {/* 날짜 & 주,일,월 탭 1000px 이상*/}
        {width >= 1000 ? 
        <div className="absolute  top-[537px] lg:top-[391px] md:top-[537px] w-full flex xl:px-12 lg:px-6 md:px-12 px-6">
            <div className="relative mx-auto flex gap-[138px] items-center w-full max-w-[1016px]  h-[52px] xl:max-w-[1016px] lg:max-w-[936px] md:w-full ">
                <div className="flex mx-auto w-[420px] h-full p-1.5 border rounded-md border-gray-100 bg-primary-50 ">
                    <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white">
                        <Image src={chevronLeft} width={24} height={24} alt=" " />
                    </div>
                    <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
                        <Image src={calender} width={18} height={18} alt=" " />
                        <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">2023년 10월 1주차</span>
                    </div>
                    <div className="h-full w-10 border p-1 rounded border-gray-200 bg-white">
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
        <div className="absolute top-[475px] w-full flex flex-col gap-6">
            <div className="mx-auto w-[1016px] h-full flex justify-end gap-[7px]">
                {dateData.map((date, i) => {
                    if(i == 3) {
                        return(
                            <div key={i} className="w-[129px] h-full px-3 py-2 flex flex-col  border rounded-lg border-primary-600 bg-white">
                                <div className="text-primary-600 text-center text-sm font-medium font-['Pretendard'] leading-[21px]">{date.day}</div>
                                <div className="text-primary-600 text-center text-xl font-bold font-['Pretendard'] leading-[30px]">{date.date}</div>
                            </div>
                        )
                    }else {
                        return(
                            <div key={i} className="w-[129px] h-full px-3 py-2 flex flex-col  border rounded-lg border-gray=-200 bg-white">
                                <div className="text-gray-400 text-center text-sm font-medium font-['Pretendard'] leading-[21px]">{date.day}</div>
                                <div className="text-gray-400 text-center text-xl font-bold font-['Pretendard'] leading-[30px]">{date.date}</div>
                            </div>
                        )
                    }
                    
                })}
            </div>
            {/* 시간표 회차/기간 */}
            <div className="w-[1016px] mx-auto flex flex-col items-end gap-4">
                <div className="w-[164px] h-4 flex gap-6 " >
                    <div className="w-[70px] h-full flex gap-2 items-center justify-end">
                        <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
                        <span className="text-orange-500 text-[13px] font-bold font-['Pretendard'] leading-none">회차반</span>
                    </div>
                    <div className="w-[70px] h-full flex gap-2 items-center justify-end">
                        <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
                        <span className="text-primary-500 text-[13px] font-bold font-['Pretendard'] leading-none">기간반</span>
                    </div>
                </div>
                {/* 시간표 */}
                <div className="flex flex-col">
                {classData.map((data, i) => {
                    return(
                        <div key={i} className="w-full flex gap-5">
                            <div className="w-[51px] text-right text-gray-800 text-base font-semibold font-['Pretendard'] leading-normal">{data.time}</div>
                            <div className=" w-full border border-gray-100 grid grid-cols-7" >
                                {/* 1 */}
                                {data.classInfo.map((classData, i) => {
                                    return(
                                        <div key={i} className="p-[5px] flex flex-col gap-1 border-e border-gray-200">
                                            {classData.classTime !== undefined ? 
                                            <div className="flex flex-col p-[5px] gap-2 border rounded border-orange-200 bg-[#FDFCF8]">
                                                <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-[#FFF0E3]">
                                                    <span className="w-full text-orange-500 text-[13px] font-bold font-['Pretendard'] leading-none">{classData.classTime.time}</span>
                                                    <span className="w-full text-orange-400 text-xs font-semibold font-['Pretendard'] leading-[15px]">{classData.classTime.classTime}</span>
                                                </div>
                                                <div className="flex flex-col gap-[2px]">
                                                    <span className="w-full text-orange-400 text-sm font-semibold font-['Pretendard'] leading-[21px]">{classData.classTime.className}</span>
                                                    <span className="w-full text-orange-500 text-xs font-bold font-['Pretendard'] leading-[18px]">{classData.classTime.teacherName}</span>
                                                </div>
                                            </div> : null}
                                            {classData.periodTime !== undefined ? 
                                            <div className="flex flex-col p-[5px] gap-2 border rounded border-primary-200 bg-primary-50">
                                                <div className="flex flex-col gap-[2px] px-1 py-[5px] rounded bg-primary-100">
                                                    <span className="w-full text-primary-600 text-[13px] font-bold font-['Pretendard'] leading-none">{classData.periodTime.time}</span>
                                                    <span className="w-full text-[#9B81FE] text-xs font-semibold font-['Pretendard'] leading-[15px]">{classData.periodTime.classTime}</span>
                                                </div>
                                                <div className="flex flex-col gap-[2px]">
                                                    <span className="w-full text-primary-500 text-sm font-semibold font-['Pretendard'] leading-[21px]">{classData.periodTime.className}</span>
                                                    <span className="w-full text-primary-600 text-xs font-bold font-['Pretendard'] leading-[18px]">{classData.periodTime.teacherName}</span>
                                                </div>
                                            </div> : null}
                                            
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    )
                })}
                </div>
                
                

                
            </div>
        </div>
        </div>
    )
}