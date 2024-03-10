import Image from 'next/image'
import CloseCircle from 'public/assets/icons/closeCircle.svg'

export default function RoomReservationCheck() {
  const reservationData = [
    {
      title: '수강생',
      name: '엄세리'
    },
    {
      title: '날짜',
      name: '2024.03.10 (월)'
    },
    {
      title: '시간',
      name: '9:00 - 11:00'
    },
    {
      title: '강의실',
      name: 'A룸'
    }
  ]
  return (
    <div className="w-[768px] border border-1 border-gray-900 rounded-xl">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 w-[100px] gray-900-bold text-[22px]">예약하기</div>
        <Image className="absolute right-4 top-4" src={CloseCircle} width={35} height={35} alt="CloseCircle" />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-2.5">
        <div className="w-full px-4 py-3.5 flex flex-col gap-1.5 border border-1 border-gray-200 rounded-lg bg-gray-50">
          <div className="w-full flex flex-col gap-px">
            <div className="text-orange-500 text-xs font-bold">회차반</div>
            <div className="w-full gray-900-semibold text-[15px]">요가 아침 클래스이름 클래스이름</div>
          </div>
          <div className="w-full flex flex-col gap-1/2">
            {reservationData.map((data, i) => {
              return (
                <div className="w-full flex gap-2">
                  <div className="w-[70px] h-5 flex gap-1 items-center">
                    <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                    <span className="w-full gray-500-medium text-sm">{data.title}</span>
                  </div>
                  <div className="w-full text-gray-800 text-sm font-normal">{data.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
