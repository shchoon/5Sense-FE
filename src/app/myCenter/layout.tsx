import Image from 'next/image'
import mainLogo from 'public/assets/logo/mainlogo.svg'

export default function myCenterLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <div className="flex items-start flex-col w-[478px] h-[657px] px-6 pt-12 pb-8 border rounded-2xl border-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center gap-14 mx-auto">
          <div className="flex items-center flex-col w-[383px] h-[150px] gap-[30px]">
            <Image
              src={mainLogo}
              width={60}
              height={60}
              className="p-[5px]"
              alt="main-logo"
            />
            <div className="flex flex-col w-[383px] h-[60px] items-center gap-2">
              <div className="h-[33px] text-center text-[28px] gray-900-bold">
                내 센터 정보를 입력해주세요.
              </div>
              <div className="w-full h-[19px] text-center text-[13px] gray-600-normal">
                오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!
              </div>
              {/* font-size 다름 */}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
