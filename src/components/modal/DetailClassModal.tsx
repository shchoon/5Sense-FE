import Image from 'next/image'
import CloseCircle from 'public/assets/icons/closeCircle.svg'

interface IProps {
  onClose: () => void
}

export default function DetailClassModal({ onClose }: IProps) {
  const classInfo = [
    {
      title: '담당 강사',
      text: ['김솔지']
    },
    {
      title: '클래스 유형',
      text: ['기간반']
    },
    {
      title: '기간 정보',
      text: ['2024.03.17 - 2024.03.24']
    },
    {
      title: '일정 정보',
      text: ['9:00 - 12:00 / 월/ 수, 금 반복', '9:00 - 12:00 / 화,목 반복']
    },
    {
      title: '클레스메모',
      text: [
        '여기는 클래스 메모 여기는 클래스 메모 여기는 클래스 메모 여기는 클래스 메모 여기는 클래스 메모 여기는 클래스 메모 여기는 클래스 메모'
      ]
    }
  ]

  const studentList = [
    {
      name: '조성훈',
      phone: '010-1548-1786'
    },
    {
      name: '윤태식',
      phone: '010-1548-4897'
    },
    {
      name: '엄세리',
      phone: '010-7589-8874'
    },
    {
      name: '조영은',
      phone: '010-4564-4564'
    },
    {
      name: '정은담',
      phone: '010-4879-9388'
    },
    {
      name: '유원석',
      phone: '010-4669-7889'
    },
    {
      name: '김동언',
      phone: '010-4878-9325'
    },
    {
      name: '권오성',
      phone: '010-4856-9872'
    },
    {
      name: '박준형',
      phone: '010-4567-2319'
    },
    {
      name: '안지민',
      phone: '010-4566-7858'
    },
    {
      name: '손병호',
      phone: '010-7489-4562'
    },
    {
      name: '장유훈',
      phone: '010-4563-1235'
    },
    {
      name: '유호승',
      phone: '010-4897-1233'
    }
  ]
  return (
    <div className="relative w-[480px] h-screen rounded-tr-[32px] bg-white">
      <Image
        className="absolute right-6 top-6 cursor-pointer"
        src={CloseCircle}
        width={35}
        height={35}
        alt="CloseCircle"
        onClick={() => onClose()}
      />
      <div className="absolute top-[72px] w-full px-6 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6">
          {/* 카테고리 명 */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-start w-[72px] px-2.5 py-2 rounded bg-primary-100">
              <div className="text-center text-primary-600 text-xs font-semibold">카테고리명</div>
            </div>
            <div className="gray-900-bold text-[26px] font-bold">
              체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기
            </div>
          </div>
          {/* 클래스 정보 */}
          <div className="w-full flex flex-col gap-2.5">
            {classInfo.map((info, i) => {
              return (
                <div className="w-full flex gap-8">
                  <div className="w-[120px] gray-500-medium text-base">• {info.title}</div>
                  <div className="w-full flex flex-col gap-1.5">
                    {info.text.map((text, i) => {
                      return <div className="w-full gray-800-medium text-base">{text}</div>
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* 회원 목록 */}
        <div className="w-full flex flex-col gap-4 p-6 border border-1 border-gray-200 rounded-lg shadow">
          <div className="w-full flex gap-1.5">
            <div className="text-gray-800 text-base font-bold">회원 목록</div>
            <div className="gray-800-semibold text-base">({studentList.length})</div>
          </div>
          {/* 학생 리스트 */}
          <div className="w-full flex flex-col gap-2.5">
            {studentList.map((data, i) => {
              return (
                <div className="w-full flex gap-1">
                  <span className="w-[22px] text-primary-600 text-sm font-bold">{i + 1}</span>
                  <div className="w-full flex gap-2.5">
                    <div className="gray-800-medium text-sm">{data.name}</div>
                    <div className="gray-500-normal text-sm">{data.phone}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-6 pb-[18px] flex gap-2.5">
        <button className="w-1/2 h-[52px] btn-white">종료하기</button>
        <button className="w-1/2 h-[52px] btn-purple-lg">수정하기</button>
      </div>
    </div>
  )
}
