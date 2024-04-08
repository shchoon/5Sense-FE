import Image from 'next/image'
import CloseCircle from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
  reservationData: {
    className?: string
    studentName?: string
    date: string
    lessonTime: string
    room: string
  }
}

export default function RoomReservationCheck(props: IProps) {
  return (
    <div className="w-[640px] bg-white border border-1 border-gray-900 rounded-xl">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 w-[100px] gray-900-bold text-[22px]">예약하기</div>
        <Image
          className="absolute right-4 top-4 cursor-pointer"
          src={CloseCircle}
          width={35}
          height={35}
          alt="CloseCircle"
          onClick={() => props.onClose()}
        />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-7">
        <div className="w-full flex flex-col gap-2.5">
          <div className="w-full px-4 py-3.5 flex flex-col gap-1.5 border border-1 border-gray-200 rounded-lg bg-gray-50">
            <div className="w-full flex flex-col gap-px">
              <div className="text-orange-500 text-xs font-bold">회차반</div>
              <div className="w-full gray-900-semibold text-[15px]">{props.reservationData.className}</div>
            </div>
            <div className="w-full flex flex-col gap-1/2">
              <div className="w-full flex gap-2">
                <div className="w-[70px] h-5 flex gap-1 items-center">
                  <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                  <span className="w-full gray-500-medium text-sm">수강생</span>
                </div>
                <div className="w-full text-gray-800 text-sm font-normal">{props.reservationData.studentName}</div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-[70px] h-5 flex gap-1 items-center">
                  <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                  <span className="w-full gray-500-medium text-sm">닐짜</span>
                </div>
                <div className="w-full text-gray-800 text-sm font-normal">{props.reservationData.date}</div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-[70px] h-5 flex gap-1 items-center">
                  <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                  <span className="w-full gray-500-medium text-sm">시간</span>
                </div>
                <div className="w-full text-gray-800 text-sm font-normal">{props.reservationData.lessonTime}</div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-[70px] h-5 flex gap-1 items-center">
                  <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                  <span className="w-full gray-500-medium text-sm">강의실</span>
                </div>
                <div className="w-full text-gray-800 text-sm font-normal">{props.reservationData.room}</div>
              </div>
            </div>
          </div>
        </div>
        <button className="flex w-full h-[52px] justify-center items-center text-white text-base font-semibold btn-purple">
          예약하기
        </button>
      </div>
    </div>
  )
}
