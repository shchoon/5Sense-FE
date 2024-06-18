import Image from 'next/image'

import Logo from 'public/assets/logo/Logo.png'

interface IProp {
  title: string
  subTitle: string
}

export default function LoginHeader({ title, subTitle }: IProp) {
  return (
    <div className="w-full flex flex-col gap-[30px] items-center">
      <Image src={Logo} alt="logo" width={55} height={55} className="p-[5px]" />
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-gray-900 text-[28px] font-bold leading-[inherit]">{title}</span>
        <span className="text-gray-600 text-base font-normal leading-[inherit]">{subTitle}</span>
      </div>
    </div>
  )
}
