import Image from 'next/image'
import mainLogo from '../../assets/logo/mainlogo.svg'

export default function loginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex justify-center w-screen h-screen items-center bg-[#F8FAFD]">
        <div className="flex items-start flex-col w-[478px] gap-14 px-6 pt-12 pb-8 outline outline-1 rounded-2xl outline-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col w-[383px] gap-[30px] mx-auto">
            <Image
              className="mx-auto"
              src={mainLogo}
              width={60}
              height={60}
              alt=" "
            />
            <div className="flex flex-col gap-2 items-center">
              <div className="text-center h-[33px] text-gray-900 text-[28px] font-bold font-['Pretendard']">
                센스있는 매니저, 오센스
              </div>
              <div className="w-full h-[19px] text-gray-600 text-[13.5px] font-['Pretendard']">
                오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}
