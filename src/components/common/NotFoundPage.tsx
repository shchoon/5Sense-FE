import Image from 'next/image'

interface IProps {
  title: string
  subTitle: string
  button?: React.ReactNode
}
export default function NotFoundPage({ title, subTitle, button }: IProps) {
  return (
    <div className="relative flex-1 bg-white rounded-2xl lg:bottom-[22px] bottom-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center ">
          <Image src="/assets/images/notFound.svg" alt="not-Found" width={148} height={148} />
          <div className="w-full flex flex-col gap-3 mt-6">
            <span className="text-center gray-900-bold text-2xl">{title}</span>
            <span className="text-center text-gray-400 text-base font-medium">{subTitle}</span>
          </div>
          {button}
        </div>
      </div>
    </div>
  )
}
