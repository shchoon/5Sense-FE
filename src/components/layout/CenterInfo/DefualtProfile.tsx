import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function DefaultProfile() {
  const router = useRouter()
  return (
    <div className="w-full flex flex-col items-center gap-7">
      <div className="flex flex-col gap-4 items-center">
        <Image src="/assets/images/defaultProfile.png" alt="profile" width={88} height={88} />
        <div className="flex flex-col text-center text-white text-[21px] font-bold leading-loose ">
          마이센터 등록 후 <br />
          서비스를 이용해 보세요
        </div>
      </div>
      <button
        className="max-w-[200px] w-full px-4 py-3 bg-slate-50 bg-opacity-20 rounded-md text-center text-sm font-bold leading-[21px] cursor-pointer text-white "
        onClick={() => router.push('/mycenter/register')}
      >
        <span className="text-white">마이센터 등록하기</span>
      </button>
    </div>
  )
}
