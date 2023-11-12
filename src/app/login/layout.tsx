import Image from "next/image"
import mainLogo from '../../assets/logo/mainlogo.svg';

export default function loginLayout({
    children
  }: {
    children: React.ReactNode
  }) {

    return (
      <>
      <div className='flex justify-center h-[1080px] items-center py-[272px] w-[1920px]  bg-[#F8FAFD]'>
        <div className='flex items-start flex-col w-[442px]  h-[476px] gap-14 px-[6px] pt-3 pb-2 border rounded-2xl border-[#E5E7EB] bg-[#FFF] shadow-[-3px_5px_20px_0px_rgba(0,0,0,0.03)]'>
            <div className='flex items-center gap-[56px] mx-auto'>
                <div className='flex items-center flex-col w-[383px] h-[150px] gap-[30px]'>
                        <Image src={mainLogo} width={60} height={60} className="p-[5px]" alt="main-logo"/>
                        <div className='flex flex-col w-[383px] h-[60px] items-center gap-2'>
                            <div className='text-center text-[28px] font-bold leading-normal'>센스있는 매니저, 오센스</div>
                            <div className='text-center text-[13px] font-normal leading-normal text-[#4B5563]'>오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!</div>
                            {/* font-size 다름 */}
                        </div>
                </div>
            </div>
            {children}
        </div>
      </div>
      </>
    )
  }