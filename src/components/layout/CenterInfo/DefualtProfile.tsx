import Image from 'next/image'

export default function DefaultProfile() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image src="/assets/images/defaultProfile.png" alt="profile" width={88} height={88} />
      <div className="flex flex-col text-center text-white text-[21px] font-bold leading-loose ">
        마이센터 등록 후 <br />
        서비스를 이용해 보세요
      </div>
    </div>
  )
}
