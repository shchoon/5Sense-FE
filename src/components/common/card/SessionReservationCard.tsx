import { useEffect, useState } from "react"

import instance from "@/lib/api/axios"

export default function SessionReservationCard() {

    const [classData, setClasData] = useState({
        name: '',

    })

    useEffect(() => {
        const classId = localStorage.getItem('classId')
        instance(`/session-lessons/${classId}/details`).then(res => {
            const classDetail = res.data.data
            console.log(classDetail)
        })
    }, [])

    return (
        <div className="w-full px-6 py-8 border border-gray-200 rounded-xl bg-white">
            <div className="w-full flex flex-col gap-4">
            <div className="flex justify-center items-center w-[72px] h-7 px-2.5 py-2 rounded bg-secondary-100">
                <span className="text-secondary-600 font-semibold text-[12px]">카테고리</span>
            </div>
            <span className="gray-900-bold text-[20px]">클래스 ㅇ;름</span>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full h-6 flex gap-8 items-center">
                    <span className="w-[120px] gray-500-medium text-[16px]">• 강사</span>
                    <span className="gray-800-normal text-[16px]">회</span>
                </div>
                <div className="w-full h-6 flex gap-8 items-center">
                    <span className="w-[120px] gray-500-medium text-[16px]">• 날짜</span>
                    <span className="gray-800-normal text-[16px]">회</span>
                </div>
                <div className="w-full h-6 flex gap-8 items-center">
                    <span className="w-[120px] gray-500-medium text-[16px]">• 시간</span>
                    <span className="gray-800-normal text-[16px]">회</span>
                </div>
                <div className="w-full h-6 flex gap-8 items-center">
                    <span className="w-[120px] gray-500-medium text-[16px]">• 룸</span>
                    <span className="gray-800-normal text-[16px]">회</span>
                </div>
            </div>
            </div>
        </div>
    )
}