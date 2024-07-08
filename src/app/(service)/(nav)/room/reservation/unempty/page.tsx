'use client'
import { useRouter } from "next/navigation"

import ContentHeader from "@/components/common/ContentHeader"
import MemberOfCenter from "@/components/class/register/memberOfCenter"
import SessionReservationCard from "@/components/common/card/SessionReservationCard"

export default function Unempty() {
    const router = useRouter()

    return (
        <div className="w-full flex flex-col items-center pb-[60px]">
            <ContentHeader title="예약하기" back onClick={() => router.push('/room')} />
            <div className="w-[640px] flex flex-col gap-5">
                <SessionReservationCard />
            <MemberOfCenter type="students" />
            </div>
            
        </div>
    )
}